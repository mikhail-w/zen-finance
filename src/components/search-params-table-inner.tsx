'use client';

import { useSearchParams } from 'next/navigation';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';

interface DataTableWithParamsProps<TData, TValue> {
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
    <DataTable
      data={data}
      columns={columns}
      filterKey={filterKey}
      onDelete={onDelete}
      disabled={disabled}
    />
  );
}
