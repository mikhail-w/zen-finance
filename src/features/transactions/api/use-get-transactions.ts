'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

export const useGetTransactions = () => {
  // Define a state to hold the data that would be returned by the hook
  const [result, setResult] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  // Component that uses the client-side hook
  const ClientComponent = dynamic(
    () =>
      import('./client-transactions-hook').then(mod => {
        return function HookComponent() {
          const { data, isLoading, error } = mod.useClientTransactions();

          useEffect(() => {
            setResult({
              data,
              isLoading,
              error,
            });
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
