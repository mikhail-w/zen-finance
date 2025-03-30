'use client';

import { useSearchParams } from 'next/navigation';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';

export interface DataTableWithParamsProps<TData = unknown, TValue = unknown> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filterKey: string;
  disabled?: boolean;
  onDelete: (rows: Row<TData>[]) => void;
}

export function DataTableWithParams<TData, TValue>({
  data,
  columns,
  filterKey,
  disabled,
  onDelete,
}: DataTableWithParamsProps<TData, TValue>) {
  // This component exists solely to safely handle the useSearchParams hook
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
