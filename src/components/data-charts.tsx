'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClientSummary } from '@/features/summary/api/client-summary-hook';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';
import { Suspense } from 'react';

function DataChartsInner() {
  const { data, isLoading } = useClientSummary();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.incomeAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {data.incomeChange >= 0 ? '+' : ''}${data.incomeChange.toFixed(2)} from last period
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.expensesAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {data.expensesChange >= 0 ? '+' : ''}${data.expensesChange.toFixed(2)} from last period
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${data.remainingAmount.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {data.remainingChange >= 0 ? '+' : ''}${data.remainingChange.toFixed(2)} from last period
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function DataCharts() {
  return (
    <SearchParamsWrapper>
      {({ searchParams }) => (
        <Suspense fallback={<div>Loading...</div>}>
          <DataChartsInner />
        </Suspense>
      )}
    </SearchParamsWrapper>
  );
}
