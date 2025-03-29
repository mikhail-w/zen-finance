'use client';

import { Suspense } from 'react';
import { ClientTransactionsPage } from './client-transactions-page';
import { NewTransactionSheet } from '@/features/transactions/components/new-transaction-sheet';
import { EditTransactionSheet } from '@/features/transactions/components/edit-transaction-sheet';
import { Loader2 } from 'lucide-react';

// Loading component for the transactions page
const TransactionsLoading = () => (
  <div className="w-full pb-10 -mt-24 flex items-center justify-center h-[500px]">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

export default function TransactionsPage() {
  return (
    <>
      <Suspense fallback={<TransactionsLoading />}>
        <ClientTransactionsPage />
      </Suspense>
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
}

export const dynamic = 'force-dynamic';
