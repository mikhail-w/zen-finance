'use client';

import { ReactNode, Suspense } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef, Row } from '@tanstack/react-table';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';

type DataTableClientWrapperProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filterKey: string;
  disabled?: boolean;
  onDelete: (rows: Row<TData>[]) => void;
};

export function DataTableClientWrapper<TData, TValue>({
  data,
  columns,
  filterKey,
  disabled,
  onDelete,
}: DataTableClientWrapperProps<TData, TValue>) {
  return (
    <Suspense fallback={<div>Loading table parameters...</div>}>
      <SearchParamsWrapper>
        {({ searchParams }) => (
          <DataTable
            data={data}
            columns={columns}
            filterKey={filterKey}
            disabled={disabled}
            onDelete={onDelete}
          />
        )}
      </SearchParamsWrapper>
    </Suspense>
  );
}
