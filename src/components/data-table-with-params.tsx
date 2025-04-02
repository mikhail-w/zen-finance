'use client';

import { DataTable } from '@/components/ui/data-table';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';
import { Suspense } from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';

interface DataTableWithParamsProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  onDelete: (rows: Row<TData>[]) => void;
  disabled?: boolean;
}

function DataTableWithParamsInner<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  disabled,
}: DataTableWithParamsProps<TData, TValue>) {
  return (
    <DataTable
      columns={columns}
      data={data}
      filterKey={filterKey}
      onDelete={onDelete}
      disabled={disabled}
    />
  );
}

export function DataTableWithParams<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  disabled,
}: DataTableWithParamsProps<TData, TValue>) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapper>
        {({ searchParams }: { searchParams: URLSearchParams }) => (
          <DataTableWithParamsInner
            columns={columns}
            data={data}
            filterKey={filterKey}
            onDelete={onDelete}
            disabled={disabled}
          />
        )}
      </SearchParamsWrapper>
    </Suspense>
  );
} 