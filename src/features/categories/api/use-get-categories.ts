import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import React from 'react';

// Define extended type
type ExtendedQueryResult<T> = UseQueryResult<T> & {
  ClientComponent?: React.ComponentType;
};

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await client.api.categories.$get();

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const { data } = await response.json();
      return data;
    },
  }) as ExtendedQueryResult<{ id: string; name: string }[]>;

  return query;
};
