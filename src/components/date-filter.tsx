'use client';

import { useEffect, useState } from 'react';
import { format, subDays, parse, isValid } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { ChevronDown } from 'lucide-react';
import qs from 'query-string';
import { useRouter, usePathname } from 'next/navigation';
import { Suspense } from 'react';

import { cn, formatDateRange } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';

// Create a client component that uses useSearchParams
const DateFilterContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  // Move this import to the client component
  const { useSearchParams } = require('next/navigation');
  const params = useSearchParams();

  const accountId = params.get('accountId');
  const fromParam = params.get('from') || '';
  const toParam = params.get('to') || '';

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  // Parse date from string, with graceful fallback
  const parseDate = (dateStr: string, fallback: Date): Date => {
    if (!dateStr) return fallback;

    try {
      const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
      return isValid(parsed) ? parsed : fallback;
    } catch (error) {
      console.error(`Error parsing date: ${dateStr}`, error);
      return fallback;
    }
  };

  // Initialize date state from URL parameters
  const [date, setDate] = useState<DateRange | undefined>({
    from: parseDate(fromParam, defaultFrom),
    to: parseDate(toParam, defaultTo),
  });

  // Popover state
  const [open, setOpen] = useState(false);

  // Update URL with selected date range
  const pushToUrl = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from || !dateRange?.to) return;

    const query = {
      from: format(dateRange.from, 'yyyy-MM-dd'),
      to: format(dateRange.to, 'yyyy-MM-dd'),
      accountId,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  // Reset to default date range
  const onReset = () => {
    const resetRange = {
      from: defaultFrom,
      to: defaultTo,
    };
    setDate(resetRange);
    pushToUrl(resetRange);
    setOpen(false);
  };

  // Apply selected date range and close popover
  const onApply = () => {
    if (date?.from && date?.to) {
      pushToUrl(date);
      setOpen(false);
    }
  };

  // Ensure we have valid dates for display
  const displayRange = {
    from: date?.from || defaultFrom,
    to: date?.to || defaultTo,
  };

  // Format range for display
  const formattedDateRange = formatDateRange
    ? formatDateRange(displayRange)
    : `${format(displayRange.from, 'MMM d, yyyy')} - ${format(
        displayRange.to,
        'MMM d, yyyy'
      )}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
        >
          <span>{formattedDateRange}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <div className="flex flex-col">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            showOutsideDays
          />
          <div className="p-4 border-t flex items-center gap-x-2">
            <Button onClick={onReset} className="w-full" variant="outline">
              Reset
            </Button>
            <Button
              onClick={onApply}
              disabled={!date?.from || !date?.to}
              className="w-full"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Create a wrapper component that uses Suspense
export const DateFilter = () => {
  return (
    <Suspense
      fallback={
        <Button
          size="sm"
          variant="outline"
          className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
        >
          Loading...
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      }
    >
      <DateFilterContent />
    </Suspense>
  );
};
