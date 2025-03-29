'use client';

import dynamic from 'next/dynamic';
import { DataCardLoading } from '@/components/data-card';

// Loading component
const LoadingGrid = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
    <DataCardLoading />
    <DataCardLoading />
    <DataCardLoading />
  </div>
);

// Dynamically import the client component
const ClientDataGrid = dynamic(
  () => import('./client-data-grid').then(mod => mod.ClientDataGrid),
  { ssr: false, loading: () => <LoadingGrid /> }
);

export const DataGrid = () => {
  return <ClientDataGrid />;
};
