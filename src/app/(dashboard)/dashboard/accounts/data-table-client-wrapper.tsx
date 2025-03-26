'use client';

import { ReactNode } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef, Row } from '@tanstack/react-table';

type DataTableClientWrapperProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  filterKey: string;
  disabled?: boolean;
  onDelete: (rows: Row<TData>[]) => void; // Remove the optional '?' mark to make it required
};

export function DataTableClientWrapper<TData, TValue>({
  data,
  columns,
  filterKey,
  disabled,
  onDelete,
}: DataTableClientWrapperProps<TData, TValue>) {
  return (
    <DataTable
      data={data}
      columns={columns}
      filterKey={filterKey}
      disabled={disabled}
      onDelete={onDelete}
    />
  );
}
