'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

type SearchParamsWrapperProps = {
  children: (props: { searchParams: URLSearchParams }) => ReactNode;
  fallback?: ReactNode;
};

// Inner component that uses useSearchParams
function SearchParamsInner({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  return <>{children({ searchParams })}</>;
}

// Wrapper with Suspense boundary
export function SearchParamsWrapper({
  children,
  fallback = <div>Loading search parameters...</div>,
}: SearchParamsWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      <SearchParamsInner>{props => children(props)}</SearchParamsInner>
    </Suspense>
  );
}
