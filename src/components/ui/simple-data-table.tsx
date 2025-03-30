'use client';

import * as React from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';

// Import the base DataTable component directly
import { DataTable } from '@/components/ui/data-table';

// Create a wrapper component that doesn't use SearchParamsWrapper
interface SimpleDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterKey: string;
  onDelete: (rows: Row<TData>[]) => void;
  disabled?: boolean;
}

export function SimpleDataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  onDelete,
  disabled,
}: SimpleDataTableProps<TData, TValue>) {
  // Just pass through to DataTable directly without using SearchParamsWrapper
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
