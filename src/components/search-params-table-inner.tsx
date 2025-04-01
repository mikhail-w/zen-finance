'use client';

import { useSearchParams } from 'next/navigation';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';

export interface DataTableWithParamsProps<TData = unknown, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filterKey: string;
  disabled?: boolean;
  onDelete: (rows: Row<TData>[]) => void;
}

// Inner component that uses useSearchParams
function DataTableInner<TData, TValue>({
  data,
  columns,
  filterKey,
  disabled,
  onDelete,
}: DataTableWithParamsProps<TData, TValue>) {
  useSearchParams();
  return (
    <DataTable<TData, TValue>
      data={data}
      columns={columns}
      filterKey={filterKey}
      onDelete={onDelete}
      disabled={disabled}
    />
  );
}

// Wrapper component with Suspense boundary
export function DataTableWithParams<TData, TValue>({
  data,
  columns,
  filterKey,
  disabled,
  onDelete,
}: DataTableWithParamsProps<TData, TValue>) {
  return (
    <SearchParamsWrapper>
      {({ searchParams }) => (
        <DataTableInner
          data={data}
          columns={columns}
          filterKey={filterKey}
          onDelete={onDelete}
          disabled={disabled}
        />
      )}
    </SearchParamsWrapper>
  );
}
