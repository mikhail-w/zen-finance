'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

interface SearchParamsWrapperProps {
  children: (props: { searchParams: URLSearchParams }) => ReactNode;
}

function SearchParamsWrapperInner({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  return <>{children({ searchParams })}</>;
}

export function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsWrapperInner>{children}</SearchParamsWrapperInner>
    </Suspense>
  );
} 