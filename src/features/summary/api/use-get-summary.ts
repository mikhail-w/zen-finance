'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { ComponentType } from 'react';

// Define the types for your summary data
export type SummaryData = {
  remainingAmount: number;
  remainingChange: number;
  incomeAmount: number;
  incomeChange: number;
  expensesAmount: number;
  expensesChange: number;
  categories: Array<{ value: number; name: string }>;
  days: Array<{ date: string; income: number; expenses: number }>;
};

// Define the return type of the hook
type UseGetSummaryResult = {
  data: SummaryData | null;
  isLoading: boolean;
  error: Error | null;
  ClientComponent: ComponentType;
};

const emptyData: SummaryData = {
  remainingAmount: 0,
  remainingChange: 0,
  incomeAmount: 0,
  incomeChange: 0,
  expensesAmount: 0,
  expensesChange: 0,
  categories: [],
  days: [],
};

export const useGetSummary = (): UseGetSummaryResult => {
  const [result, setResult] = useState<{
    data: SummaryData | null;
    isLoading: boolean;
    error: Error | null;
  }>({
    data: emptyData,
    isLoading: true,
    error: null,
  });

  // Component that uses the client-side hook
  const ClientComponent = dynamic(
    () =>
      import('./client-summary-hook').then(mod => {
        return function HookComponent() {
          const { data, isLoading, error } = mod.useClientSummary();

          useEffect(() => {
            setResult(prev => ({
              data: data ?? emptyData,
              isLoading,
              error,
            }));
          }, [data, isLoading, error]);

          return null;
        };
      }),
    { ssr: false }
  );

  return {
    ...result,
    ClientComponent,
  };
};
