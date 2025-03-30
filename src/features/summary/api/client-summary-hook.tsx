'use client';

import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { convertAmountFromMiliunits } from '@/lib/utils';

// Inline type definitions

interface Category {
  name: string;
  value: number;
}

interface DaySummary {
  date: string;
  income: number;
  expenses: number;
}

interface SummaryData {
  incomeAmount: number;
  expensesAmount: number;
  remainingAmount: number;
  categories: Category[];
  days: DaySummary[];
  // Add any additional fields here if needed
}

export function useClientSummary() {
  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const accountId = params.get('accountId') || '';

  return useQuery<SummaryData | null>({
    queryKey: ['summary', { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: { from, to, accountId },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }

      const { data } = await response.json();

      // If data is missing, return null instead of undefined.
      if (!data) {
        return null;
      }

      return {
        ...data,
        incomeAmount: convertAmountFromMiliunits(data.incomeAmount),
        expensesAmount: convertAmountFromMiliunits(data.expensesAmount),
        remainingAmount: convertAmountFromMiliunits(data.remainingAmount),
        categories: data.categories.map((category: Category) => ({
          ...category,
          value: convertAmountFromMiliunits(category.value),
        })),
        days: data.days.map((day: DaySummary) => ({
          ...day,
          income: convertAmountFromMiliunits(day.income),
          expenses: convertAmountFromMiliunits(day.expenses),
        })),
      };
    },
  });
}
