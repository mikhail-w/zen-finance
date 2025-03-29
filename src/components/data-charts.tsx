'use client';

import { useClientSummary } from '@/features/summary/api/client-summary-hook';
import { Chart, ChartLoading } from '@/components/chart';
import { SpendingPie, SpendingPieLoading } from '@/components/spending-pie';
import { useEffect } from 'react';

export const DataCharts = () => {
  const { data, isLoading } = useClientSummary();

  // Add debugging to see what's happening
  useEffect(() => {
    console.log('DataCharts render:', { data, isLoading });
  }, [data, isLoading]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  if (!data || !data.days || !data.categories) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <div className="h-96 rounded-md border flex items-center justify-center">
            No data available
          </div>
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <div className="h-96 rounded-md border flex items-center justify-center">
            No spending data
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data.categories} />
      </div>
    </div>
  );
};
