'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { NewTransactionSheet } from '@/features/transactions/components/new-transaction-sheet';
import { EditTransactionSheet } from '@/features/transactions/components/edit-transaction-sheet';

// Loading component for the transactions page
const TransactionsLoading = () => (
  <div className="w-full pb-10 flex items-center justify-center h-[500px]">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Use dynamic import with ssr: false for the simplified component
const SimplifiedTransactionsPage = dynamic(
  () =>
    import('./simplified-transactions-page').then(
      mod => mod.SimplifiedTransactionsPage
    ),
  {
    ssr: false,
    loading: () => <TransactionsLoading />,
  }
);

export default function TransactionsPage() {
  return (
    <>
      <SimplifiedTransactionsPage />
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
}

export const dynamicConfig = 'force-dynamic';
