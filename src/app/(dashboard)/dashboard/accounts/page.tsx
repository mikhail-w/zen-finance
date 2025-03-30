'use client';

import { Loader2 } from 'lucide-react';
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';
import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet';
import nextDynamic from 'next/dynamic';

// Basic loading component
const AccountsLoading = () => (
  <div className="w-full pb-10 -mt-24 flex items-center justify-center h-[500px]">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Use dynamic import with ssr: false to avoid useSearchParams issues
const AccountsContent = nextDynamic(() => import('./accounts-content'), {
  ssr: false,
  loading: () => <AccountsLoading />,
});

// Main page component - completely static with no hooks
export default function AccountsPage() {
  return (
    <>
      <AccountsContent />
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
