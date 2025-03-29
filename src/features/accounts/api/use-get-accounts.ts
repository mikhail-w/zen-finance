// In use-get-accounts.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { ReactNode } from 'react';

// Define an extended type that includes ClientComponent
type ExtendedQueryResult<T> = UseQueryResult<T> & {
  ClientComponent?: React.ComponentType;
};

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch accounts');
      }

      const { data } = await response.json();
      return data;
    },
  }) as ExtendedQueryResult<{ id: string; name: string }[]>;

  return query;
};
