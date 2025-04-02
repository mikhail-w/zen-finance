'use client';
import React, { useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { transactions as transactionSchema } from '@/db/schema';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { DataTableWithParams } from '@/components/data-table-with-params';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';
import { UploadButton } from './upload-button';
import { ImportCard } from './import-card';
import { useSelectAccount } from '@/features/accounts/hooks/use-select-account';
import { toast } from 'sonner';
import { useBulkCreateTransactions } from '@/features/transactions/api/use-bulk-create-transactions';
import { ParseResult, ParseError } from 'papaparse';

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

function TransactionsContent() {
  const [AccountDialog, confirm] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState<ImportResultsType>(
    INITIAL_IMPORT_RESULTS
  );

  // Updated to accept the ParseResult type from PapaParse
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

  // Updated to match the ImportedTransaction interface and convert data types
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
          date: new Date(value.date),
          payee: value.payee,
        };
      });

      await createTransactions.mutateAsync(data);
      toast.success('Transactions imported successfully');
      setVariant(VARIANTS.LIST);
      setImportResults(INITIAL_IMPORT_RESULTS);
    } catch (error) {
      console.error('Error importing transactions:', error);
      toast.error('Failed to import transactions');
    }
  };

  if (variant === VARIANTS.IMPORT) {
    return (
      <div className="w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-3xl line-clamp-1">
              Import Transactions
            </CardTitle>
            <Button
              className="text-white text-lg font-medium w-auto"
              size={'sm'}
              onClick={onCancelImport}
            >
              Cancel
            </Button>
          </CardHeader>
          <CardContent>
            <ImportCard
              data={importResults.data}
              onCancel={onCancelImport}
              onSubmit={onSubmitImport}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (transactionsQuery.isLoading) {
    return (
      <div className="w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
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
  }

  return (
    <div className="w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-3xl line-clamp-1">Transactions page</CardTitle>
          <div className="flex items-center gap-x-2">
            <UploadButton onUpload={onUpload} />
            <Button
              className="text-white text-lg font-medium w-auto"
              size={'sm'}
              onClick={newTransaction.onOpen}
            >
              <Plus size={24} className="mr-2" />
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTableWithParams
            disabled={isDisabled}
            onDelete={row => {
              const ids = row.map(r => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            filterKey="payee"
            columns={columns}
            data={transactions}
          />
        </CardContent>
      </Card>
      <AccountDialog />
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionsContent />
    </Suspense>
  );
}
