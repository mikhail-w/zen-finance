'use client';
import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { columns } from './columns';
import { useNewTransaction } from '@/features/transactions/hooks/use-new-transaction';
import { DataTable } from '@/components/ui/data-table';
import { useGetTransactions } from '@/features/transactions/api/use-get-transactions';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteTransactions } from '@/features/transactions/api/use-bulk-delete-transactions';

// Loading component for Suspense fallback
const TransactionsLoading = () => (
  <div className="max-w-screen-md mx-auto w-full pb-10 -mt-24">
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

// The main transactions content component
// This will be wrapped in Suspense since it uses hooks that depend on useSearchParams()
const TransactionsContent = () => {
  const newTransaction = useNewTransaction();
  const deleteTransactions = useBulkDeleteTransactions();
  const transactionsQuery = useGetTransactions(); // This uses useSearchParams() internally
  const transactions = transactionsQuery.data || [];

  const isDisabled =
    transactionsQuery.isLoading || deleteTransactions.isPending;

  if (transactionsQuery.isLoading) {
    return <TransactionsLoading />;
  }

  return (
    <div className="max-w-screen-md mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-3xl line-clamp-1">
            Transaction History
          </CardTitle>
          <Button
            className="text-white text-lg font-medium w-auto"
            size={'sm'}
            onClick={newTransaction.onOpen}
          >
            <Plus size={24} className="mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
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
    </div>
  );
};

// Main page component that wraps the content in a Suspense boundary
const TransactionsPage = () => {
  return (
    <Suspense fallback={<TransactionsLoading />}>
      <TransactionsContent />
    </Suspense>
  );
};

export default TransactionsPage;
