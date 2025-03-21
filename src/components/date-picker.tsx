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

  // Custom navigation component for the calendar
  const CustomNavigation = ({
    goToMonth,
    nextMonth,
    previousMonth,
    currentMonth,
  }: {
    goToMonth: (date: Date) => void;
    nextMonth: Date | undefined;
    previousMonth: Date | undefined;
    currentMonth: Date;
  }) => {
    return (
      <div className="flex items-center justify-between px-1">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth || disabled}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-sm font-medium">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth || disabled}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
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
            components={{
              Caption: ({ displayMonth }) => (
                <CustomNavigation
                  currentMonth={displayMonth}
                  goToMonth={date => {
                    const dayPicker = calendarRef.current?.querySelector(
                      '.rdp'
                    ) as any;
                    if (dayPicker?.showMonth) {
                      dayPicker.showMonth(date);
                    }
                  }}
                  nextMonth={
                    new Date(
                      displayMonth.getFullYear(),
                      displayMonth.getMonth() + 1,
                      1
                    )
                  }
                  previousMonth={
                    new Date(
                      displayMonth.getFullYear(),
                      displayMonth.getMonth() - 1,
                      1
                    )
                  }
                />
              ),
            }}
            classNames={{
              months: 'flex flex-col space-y-4',
              month: 'space-y-4',
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
            styles={{
              caption: { display: 'flex', margin: '0' },
            }}
          />
        </div>
      )}
    </div>
  );
};
