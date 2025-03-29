'use client';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';
import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet';

// Loading component for the accounts page
const AccountsLoading = () => (
  <div className="w-full pb-10 -mt-24 flex items-center justify-center h-[500px]">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Use dynamic import with ssr: false for the client component
const ClientAccountsPage = dynamic(
  () => import('./client-accounts-page').then(mod => mod.ClientAccountsPage),
  {
    ssr: false,
    loading: () => <AccountsLoading />,
  }
);

export default function AccountsPage() {
  return (
    <>
      <ClientAccountsPage />
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
}

export const dynamicConfig = 'force-dynamic';
