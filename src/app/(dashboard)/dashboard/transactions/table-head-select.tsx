import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

// Expanded options based on common transaction fields
const options = [
  { value: 'amount', label: 'Amount' },
  { value: 'date', label: 'Date' },
  { value: 'payee', label: 'Description/Payee' },
  { value: 'category', label: 'Category' },
  { value: 'note', label: 'Note' },
  { value: 'reference', label: 'Reference' },
];

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelection || ''}
      onValueChange={value =>
        onChange(columnIndex, value === 'skip' ? null : value)
      }
    >
      <SelectTrigger
        className={cn(
          'focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize',
          currentSelection && 'text-blue-500'
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map(option => {
          const disabled =
            Object.values(selectedColumns).includes(option.value) &&
            selectedColumns[`column_${columnIndex}`] !== option.value;

          return (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={disabled}
              className="capitalize"
            >
              {option.label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
