'use client';

import { Suspense } from 'react';
import { ClientAccountsPage, AccountsLoading } from './client-accounts-page';
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';
import { EditAccountSheet } from '@/features/accounts/components/edit-account-sheet';

export default function AccountsPage() {
  return (
    <>
      <Suspense fallback={<AccountsLoading />}>
        <ClientAccountsPage />
      </Suspense>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
}
