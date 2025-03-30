'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { UploadButton } from './upload-button';
import { ImportCard } from './import-card';
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import { toast } from 'sonner';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';
import { ParseResult, ParseError } from 'papaparse';
import { ResponseType } from './columns';
import { Row } from '@tanstack/react-table';
import { SimpleDataTable } from '@/components/ui/simple-data-table'; // Use the simple table

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

// Define the ImportedTransaction interface to match what ImportCard returns
interface ImportedTransaction {
  amount: number;
  date: string;
  payee: string;
  [key: string]: string | number;
}

// Loading component
const DataTableLoading = () => (
  <div className="h-[500px] w-full flex items-center justify-center">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

export default function TransactionsContent() {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState<ImportResultsType>(
    INITIAL_IMPORT_RESULTS
  );

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
  const transactionsQuery = useGetTransactions();
  const transactions = transactionsQuery.data || [];

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

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

      // Transform the data to match the schema, converting string dates to Date objects
      const data = values.map(value => {
        // Create a new object with the correct types
        return {
          accountId,
          amount: value.amount,
          date: new Date(value.date), // Convert string date to Date object
          payee: value.payee,
        };
      });

      createTransactions.mutate(data, {
        onSuccess: () => {
          onCancelImport();
        },
      });
    } catch (error) {
      console.error('Error in import submission:', error);
      toast.error('An error occurred while importing transactions.');
    }
  };

  if (transactionsQuery.isLoading) {
    return (
      <div className="w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <div className="h-8 w-48 bg-gray-200 animate-pulse rounded"></div>
          </CardHeader>
          <CardContent>
            <DataTableLoading />
          </CardContent>
        </Card>
      </div>
    );
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
          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
              No transactions found. Add a transaction to get started.
            </div>
          ) : (
            <SimpleDataTable
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
