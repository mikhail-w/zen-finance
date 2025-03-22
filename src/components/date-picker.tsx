import * as React from 'react';
import { format } from 'date-fns';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type Props = {
  value?: Date | null;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
};

// Define a proper interface for the day picker element with showMonth method
interface DayPickerWithShowMonth extends HTMLElement {
  showMonth: (date: Date) => void;
}

export const DatePicker = ({
  value,
  onChange,
  disabled,
  placeholder = 'Pick a date',
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Close the calendar when clicking outside of it
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Function to navigate to next month
  const handleNextMonthClick = (currentMonth: Date) => {
    const dayPicker = calendarRef.current?.querySelector(
      '.rdp'
    ) as DayPickerWithShowMonth | null;

    if (dayPicker && dayPicker.showMonth) {
      const nextMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      );
      dayPicker.showMonth(nextMonth);
    }
  };

  // Function to navigate to previous month
  const handlePrevMonthClick = (currentMonth: Date) => {
    const dayPicker = calendarRef.current?.querySelector(
      '.rdp'
    ) as DayPickerWithShowMonth | null;

    if (dayPicker && dayPicker.showMonth) {
      const prevMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      );
      dayPicker.showMonth(prevMonth);
    }
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        disabled={disabled}
        variant="outline"
        className={cn(
          'w-full justify-start text-left font-normal',
          !value && 'text-muted-foreground'
        )}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <CalendarIcon className="size-4 mr-2" />
        {value ? format(value, 'PPP') : <span>{placeholder}</span>}
      </Button>

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-1 p-3 bg-background rounded-md border shadow-md"
          style={{ minWidth: '300px' }}
        >
          <DayPicker
            mode="single"
            selected={value || undefined}
            onSelect={date => {
              onChange?.(date);
              setIsOpen(false);
            }}
            disabled={disabled}
            captionLayout="dropdown"
            showOutsideDays
            fixedWeeks
            navProps={{
              className: 'flex items-center justify-between p-1',
              prevButtonProps: {
                className:
                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                children: <ChevronLeft className="h-4 w-4" />,
                disabled: disabled,
              },
              nextButtonProps: {
                className:
                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                children: <ChevronRight className="h-4 w-4" />,
                disabled: disabled,
              },
            }}
            classNames={{
              months: 'flex flex-col space-y-4',
              month: 'space-y-4',
              caption: 'flex justify-center pt-1 relative items-center',
              caption_label: 'text-sm font-medium',
              nav: 'space-x-1 flex items-center',
              nav_button:
                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex',
              head_cell:
                'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] px-0',
              row: 'flex w-full mt-2',
              cell: 'h-9 w-9 text-center text-sm relative p-0 focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md',
              day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              day_today: 'bg-accent text-accent-foreground',
              day_outside: 'text-muted-foreground opacity-50',
              day_disabled: 'text-muted-foreground opacity-50',
              day_hidden: 'invisible',
              button_reset: 'button_reset',
              vhidden: 'sr-only',
            }}
          />
        </div>
      )}
    </div>
  );
};
