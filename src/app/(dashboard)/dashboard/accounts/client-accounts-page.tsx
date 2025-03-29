'use client';

import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { columns } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete-accounts';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';
import { DataTable } from '@/components/ui/data-table';

// Loading component for data table
const DataTableLoading = () => (
  <div className="h-[500px] w-full flex items-center justify-center">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Loading component to display while data is being fetched
export const AccountsLoading = () => (
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

// Client component wrapper for DataTable to handle search params
const DataTableClientWrapper = ({ data, columns, disabled, onDelete }) => {
  return (
    <Suspense fallback={<DataTableLoading />}>
      <SearchParamsWrapper>
        {({ searchParams }) => (
          <DataTable
            disabled={disabled}
            onDelete={onDelete}
            filterKey="name"
            columns={columns}
            data={data}
          />
        )}
      </SearchParamsWrapper>
    </Suspense>
  );
};

export function ClientAccountsPage() {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return <AccountsLoading />;
  }

  return (
    <div className="w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-3xl line-clamp-1">Accounts page</CardTitle>
          <Button
            className="text-white text-lg font-medium w-auto"
            size={'sm'}
            onClick={newAccount.onOpen}
          >
            <Plus size={24} className="mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTableClientWrapper
            disabled={isDisabled}
            onDelete={row => {
              const ids = row.map(r => r.original.id);
              deleteAccounts.mutate({ ids });
            }}
            columns={columns}
            data={accounts}
          />
        </CardContent>
      </Card>
    </div>
  );
}
