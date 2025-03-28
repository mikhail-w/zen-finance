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
    <SearchParamsWrapper>
      {({ searchParams }) => {
        // You can use searchParams here if needed
        // For example, to filter data or set initial state

        return (
          <DataTable
            data={data}
            columns={columns}
            filterKey={filterKey}
            disabled={disabled}
            onDelete={onDelete}
            // Don't pass searchParams since it's not in the props interface
          />
        );
      }}
    </SearchParamsWrapper>
  );
}
