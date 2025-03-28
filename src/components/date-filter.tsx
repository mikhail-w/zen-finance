'use client';

import { useState } from 'react';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

// Import the SearchParamsWrapper
import { SearchParamsWrapper } from '@/components/search-params-wrapper';
import { DateFilterClient } from '@/components/date-filter-client';

// Loading fallback component
const DateFilterFallback = () => (
  <Button
    size="sm"
    variant="outline"
    className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
  >
    Loading...
    <ChevronDown className="ml-2 size-4 opacity-50" />
  </Button>
);

// Main component with Suspense boundary
export function DateFilter() {
  return (
    <Suspense fallback={<DateFilterFallback />}>
      <SearchParamsWrapper>
        {({ searchParams }) => <DateFilterClient searchParams={searchParams} />}
      </SearchParamsWrapper>
    </Suspense>
  );
}
