'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { convertAmountFromMiliunits } from '@/lib/utils';

// Define the Transaction type inline
interface Transaction {
  amount: number;
  id: string;
  date: string;
  category: string | null;
  categoryId: string | null;
  payee: string;
  notes: string | null;
  account: string;
  accountId: string;
}

export function useGetTransactions() {
  return useQuery<Transaction[] | null>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await client.api.transactions.$get({ query: {} });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const { data } = await response.json();

      // If no data is returned (i.e. undefined or falsy), return null.
      if (!data) {
        return null;
      }

      // Map the transactions and convert the amount properly.
      const transactions: Transaction[] = data.map(
        (transaction: Transaction) => ({
          ...transaction,
          amount: convertAmountFromMiliunits(transaction.amount),
        })
      );
      return transactions;
    },
  });
}
