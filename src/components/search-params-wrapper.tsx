'use client';

import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

type SearchParamsWrapperProps = {
  children: (props: { searchParams: URLSearchParams }) => ReactNode;
};

export function SearchParamsWrapper({ children }: SearchParamsWrapperProps) {
  const searchParams = useSearchParams();
  return children({ searchParams });
}
