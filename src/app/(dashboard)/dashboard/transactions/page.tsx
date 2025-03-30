'use client';

import { Loader2 } from 'lucide-react';
import { NewTransactionSheet } from '@/features/transactions/components/new-transaction-sheet';
import { EditTransactionSheet } from '@/features/transactions/components/edit-transaction-sheet';
import nextDynamic from 'next/dynamic';

// Basic loading component
const TransactionsLoading = () => (
  <div className="w-full pb-10 flex items-center justify-center h-[500px]">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Use dynamic import with ssr: false to avoid useSearchParams issues
const TransactionsContent = nextDynamic(
  () => import('./transactions-content'),
  {
    ssr: false,
    loading: () => <TransactionsLoading />,
  }
);

// Main page component - completely static with no hooks
export default function TransactionsPage() {
  return (
    <>
      <TransactionsContent />
      <NewTransactionSheet />
      <EditTransactionSheet />
    </>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
