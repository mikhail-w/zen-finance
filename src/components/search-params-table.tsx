'use client';
import * as React from 'react';
import dynamic from 'next/dynamic';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';
import type { DataTableWithParamsProps } from './search-params-table-inner';

// Loading component for data table
const TableLoading = () => (
  <div className="h-[500px] w-full flex items-center justify-center">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Dynamically import the component with search params
const DynamicDataTableWithParams = dynamic(
  () =>
    import('./search-params-table-inner').then(
      mod =>
        mod.DataTableWithParams as <TData, TValue>(
          props: DataTableWithParamsProps<TData, TValue>
        ) => React.ReactElement
    ),
  { ssr: false, loading: () => <TableLoading /> }
);

// Generic wrapper component defined in the same file
function GenericDataTableWithParams<TData, TValue>(
  props: DataTableWithParamsProps<TData, TValue>
) {
  const Component = DynamicDataTableWithParams as unknown as (
    props: DataTableWithParamsProps<TData, TValue>
  ) => React.ReactElement;
  return <Component {...props} />;
}

interface SearchParamsTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filterKey: string;
  disabled?: boolean;
  onDelete: (rows: Row<TData>[]) => void;
}

export function SearchParamsTable<TData, TValue>({
  data,
  columns,
  filterKey,
  disabled,
  onDelete,
}: SearchParamsTableProps<TData, TValue>) {
  return (
    <GenericDataTableWithParams
      data={data}
      columns={columns}
      filterKey={filterKey}
      disabled={disabled}
      onDelete={onDelete}
    />
  );
}
