'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'; // Add this import
import { columns } from './columns';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { useClientTransactions } from '@/features/transactions/api/client-transactions-hook';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { UploadButton } from './upload-button';
import { ImportCard } from './import-card';
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import { toast } from 'sonner';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';
import { ParseResult, ParseError } from 'papaparse';
import { ResponseType } from './columns';
import { Row } from '@tanstack/react-table';
import { SearchParamsTable } from '@/components/search-params-table';
import { ImportedTransaction } from './types';

enum VARIANTS {
  LIST = 'LIST',
  IMPORT = 'IMPORT',
}

// Define types for the import results
interface ImportMetadata {
  delimiter?: string;
  linebreak?: string;
  aborted?: boolean;
  truncated?: boolean;
  cursor?: number;
  fields?: string[];
}

interface ImportResultsType {
  data: string[][];
  errors: ParseError[];
  meta: ImportMetadata;
}

const INITIAL_IMPORT_RESULTS: ImportResultsType = {
  data: [],
  errors: [],
  meta: {},
};

// Loading component
export const TransactionsLoading = () => (
  <div className="w-full pb-10">
    <Card className="border-none drop-shadow-sm w-full">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full flex items-center justify-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export function SimplifiedTransactionsPage() {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState<ImportResultsType>(
    INITIAL_IMPORT_RESULTS
  );

  // Use useClientTransactions directly instead of useGetTransactions
  const { data, isLoading, error } = useClientTransactions();
  const transactions = useMemo(() => data || [], [data]);

  // Debug logging
  useEffect(() => {
    console.log('Transaction data:', {
      isLoading,
      hasError: !!error,
      errorMessage: error?.message,
      dataExists: !!data,
      transactionCount: transactions.length,
      sampleData: transactions.slice(0, 2),
    });
  }, [data, isLoading, error, transactions]);

  const onUpload = (results: ParseResult<string[]>) => {
    console.log({ results });
    setImportResults({
      data: results.data,
      errors: results.errors,
      meta: results.meta,
    });
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newTransaction = useNewTransaction();
  const createTransactions = useBulkCreateTransactions();
  const deleteTransactions = useBulkDeleteTransactions();

  const isDisabled = isLoading || deleteTransactions.isPending;

  const handleDelete = (rows: Row<ResponseType>[]) => {
    const ids = rows.map(r => r.original.id);
    deleteTransactions.mutate({ ids });
  };

  const onSubmitImport = async (values: ImportedTransaction[]) => {
    try {
      const accountId = await confirm();

      if (!accountId || typeof accountId !== 'string') {
        return toast.error('Please select an account to continue.');
      }

      // Transform the data to match the schema
      const data = values.map(value => {
        // Create base transaction object
        const transaction = {
          accountId,
          amount: value.amount,
          date: new Date(value.date), // Convert string to Date object
          payee: value.payee,
        };

        // Add categoryId if it exists
        if (value.categoryId) {
          console.log(`Adding categoryId to transaction: ${value.categoryId}`);
          return {
            ...transaction,
            categoryId: value.categoryId
          };
        }

        return transaction;
      });

      console.log('Transformed transactions:', data);

      createTransactions.mutate(data, {
        onSuccess: () => {
          toast.success('Transactions imported successfully');
          onCancelImport();
        },
        onError: (error) => {
          console.error('Import error:', error);
          toast.error('Failed to import transactions');
        }
      });
    } catch (error) {
      console.error('Error in import submission:', error);
      toast.error('An error occurred while importing transactions.');
    }
  };

  if (isLoading) {
    return <TransactionsLoading />;
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-3xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              onClick={newTransaction.onOpen}
              size="sm"
              className="w-full lg:w-auto"
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-md text-red-700">
              Error loading transactions: {error.message}
            </div>
          ) : transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
              No transactions found. Add a transaction to get started.
            </div>
          ) : (
            <SearchParamsTable<ResponseType, unknown>
              filterKey="payee"
              disabled={isDisabled}
              onDelete={handleDelete}
              columns={columns}
              data={transactions}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
