'use client';

import dynamic from 'next/dynamic';
import { ColumnDef, Row } from '@tanstack/react-table';
import { Loader2 } from 'lucide-react';

// Loading component for data table
const TableLoading = () => (
  <div className="h-[500px] w-full flex items-center justify-center">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Dynamically import the component with search params
const DataTableWithParams = dynamic(
  () =>
    import('./search-params-table-inner').then(mod => mod.DataTableWithParams),
  { ssr: false, loading: () => <TableLoading /> }
);

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
    <DataTableWithParams
      data={data}
      columns={columns}
      filterKey={filterKey}
      disabled={disabled}
      onDelete={onDelete}
    />
  );
}
