'use client';

import { ReactNode, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface FilterWrapperProps {
  children: (props: { searchParams: URLSearchParams }) => ReactNode;
}

function FilterWrapperInner({ children }: FilterWrapperProps) {
  const searchParams = useSearchParams();
  return <>{children({ searchParams })}</>;
}

export function FilterWrapper({ children }: FilterWrapperProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FilterWrapperInner>{children}</FilterWrapperInner>
    </Suspense>
  );
} 