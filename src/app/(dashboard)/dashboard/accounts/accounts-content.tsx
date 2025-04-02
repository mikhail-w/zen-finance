'use client';

import { DataTableWithParams } from '@/components/data-table-with-params';
import { columns } from './columns';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';
import { Suspense } from 'react';
import { Row } from '@tanstack/react-table';
import { ResponseType } from './columns';

function AccountsContentInner() {
  const { data: accounts, isLoading } = useGetAccounts();

  const handleDelete = async (rows: Row<ResponseType>[]) => {
    // TODO: Implement delete functionality
    console.log('Delete accounts:', rows.map(row => row.original));
  };

  return (
    <DataTableWithParams
      columns={columns}
      data={accounts || []}
      filterKey="name"
      onDelete={handleDelete}
      disabled={isLoading}
    />
  );
}

function AccountsContentWrapper() {
  return (
    <SearchParamsWrapper>
      {({ searchParams }: { searchParams: URLSearchParams }) => (
        <Suspense fallback={<div>Loading...</div>}>
          <AccountsContentInner />
        </Suspense>
      )}
    </SearchParamsWrapper>
  );
}

export function AccountsContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountsContentWrapper />
    </Suspense>
  );
} 