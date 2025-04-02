'use client';

import { useGetSummary } from '@/features/summary/api/use-get-summary';
import { Chart, ChartLoading } from '@/components/chart';
import { SpendingPie, SpendingPieLoading } from '@/components/spending-pie';
import { Suspense } from 'react';

export const DataCharts = () => {
  const { data, isLoading, ClientComponent } = useGetSummary();

  return (
    <>
      <Suspense fallback={null}>
        <ClientComponent />
      </Suspense>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          {isLoading && !data ? <ChartLoading /> : <Chart data={data?.days ?? []} />}
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          {isLoading && !data ? <SpendingPieLoading /> : <SpendingPie data={data?.categories ?? []} />}
        </div>
      </div>
    </>
  );
};