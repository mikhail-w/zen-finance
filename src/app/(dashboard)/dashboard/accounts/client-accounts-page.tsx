'use client';

import React, { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { columns, ResponseType } from './columns';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useBulkDeleteAccounts } from '@/features/accounts/api/use-bulk-delete-accounts';
import { SearchParamsTable } from '@/components/search-params-table';
import { Row } from '@tanstack/react-table';

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

// Wrapper for the table component that uses search params
const TableWithSearchParams = ({
  accounts,
  isDisabled,
  deleteAccounts,
}: {
  accounts: ResponseType[];
  isDisabled: boolean;
  deleteAccounts: {
    mutate: (params: { ids: string[] }) => void;
    isPending: boolean;
  };
}) => {
  return (
    // <SearchParamsTable<ResponseType, unknown>
    //   disabled={isDisabled}
    //   onDelete={(rows: Row<ResponseType>[]) => {
    //     const ids = rows.map(r => r.original.id);
    //     deleteAccounts.mutate({ ids });
    //   }}
    //   filterKey="name"
    //   columns={columns}
    //   data={accounts}
    // />
    <></>
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
          <Suspense fallback={<DataTableLoading />}>
            <TableWithSearchParams
              accounts={accounts}
              isDisabled={isDisabled}
              deleteAccounts={deleteAccounts}
            />
          </Suspense>
          {accountsQuery.ClientComponent && <accountsQuery.ClientComponent />}
        </CardContent>
      </Card>
    </div>
  );
}
