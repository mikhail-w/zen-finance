import { useState, useEffect } from 'react';
import { format, parse, isValid } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { convertAmountToMiliunits } from '@/lib/utils';
import { ImportTable } from './import-table';
import { toast } from 'sonner';
import { useCreateCategory } from '@/features/categories/api/use-create-category';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { ImportedTransaction } from './types';

// Multiple date formats to try parsing
const DATE_FORMATS = [
  'M/d/yyyy HH:mm', // Primary format: 1/8/2024 20:18
  'M/d/yyyy H:mm', // Alternative without leading zero in hours
  'yyyy-MM-dd', // ISO format
  'yyyy-MM-dd HH:mm:ss', // Full ISO format
];

// API expected format
const outputFormat = 'yyyy-MM-dd';

// Required fields for the import
const requiredOptions = ['amount', 'date', 'payee'];

// Define field mapping type for better TypeScript support
interface FieldMapping {
  [key: string]: string;
}

// Map your CSV headers to application fields
const defaultFieldMapping: FieldMapping = {
  Amount: 'amount',
  'Started Date': 'date',
  Description: 'payee',
  Category: 'category',
  'Category Name': 'category',
  category: 'category'
};

interface SelectedColumnsState {
  [key: string]: string | null;
}

interface RowData {
  [key: string]: string;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: ImportedTransaction[]) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const createCategory = useCreateCategory();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const headers = data[0];
  const body = data.slice(1);

  // Try to automatically map known columns on component mount
  useEffect(() => {
    const initialMapping: SelectedColumnsState = {};

    headers.forEach((header, index) => {
      // Check if this header has a default mapping
      console.log('Checking header:', header);
      // Normalize header for comparison
      const normalizedHeader = header.trim();
      const mappedField = defaultFieldMapping[normalizedHeader];
      if (mappedField) {
        console.log(`Mapped ${normalizedHeader} to ${mappedField}`);
        initialMapping[`column_${index}`] = mappedField;
      }
    });

    console.log('Initial column mapping:', initialMapping);
    setSelectedColumns(initialMapping);
  }, [headers]);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns(prev => {
      const newSelectedColumns = { ...prev };

      // If this value is already selected for another column, clear it
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  // Helper function to parse date with multiple formats
  const parseMultiFormatDate = (dateString: string): Date | null => {
    for (const dateFormat of DATE_FORMATS) {
      try {
        const parsedDate = parse(dateString, dateFormat, new Date());
        if (isValid(parsedDate)) {
          console.log(
            `Successfully parsed date "${dateString}" with format "${dateFormat}"`
          );
          return parsedDate;
        }
      } catch (err) {
        // Continue to next format
      }
    }

    console.error(`Failed to parse date: "${dateString}" with any format`);
    return null;
  };

  const handleContinue = async () => {
    setIsProcessing(true);

    try {
      // Log the current state of mappings
      console.log('Current column mappings:', selectedColumns);
      console.log('Headers:', headers);
      console.log('Available categories:', categories);

      // Prepare the mapped data structure
      const mappedData = {
        // Map the headers to their selected types (or null if not selected)
        headers: headers.map((header, index) => {
          const mapping = selectedColumns[`column_${index}`] || null;
          console.log(`Header "${header}" mapped to "${mapping}"`);
          return mapping;
        }),

        // Transform each row by mapping its cells to the appropriate columns
        body: body
          .map(row => {
            const transformedRow = row.map((cell, index) => {
              // Use the column selection directly using the current index
              const mapping = selectedColumns[`column_${index}`];
              const value = mapping ? cell : null;
              if (mapping === 'category') {
                console.log(`Found category value in row: "${cell}"`);
              }
              return value;
            });

            // Filter out rows that have all null values
            return transformedRow.every(item => item === null)
              ? []
              : transformedRow;
          })
          .filter(row => row.length > 0),
      };

      // Create array of objects with proper typing
      const arrayOfData: RowData[] = mappedData.body.map(row => {
        return row.reduce<RowData>((acc, cell, index) => {
          const header = mappedData.headers[index];
          if (header !== null && cell !== null) {
            // Normalize category field
            if (header === 'category') {
              console.log(`Processing category value: "${cell}"`);
              acc[header] = cell.trim();
            } else {
              acc[header] = cell;
            }
          }
          return acc;
        }, {});
      });

      console.log('Processed array data:', arrayOfData);

      // Only process rows that have both amount and date
      const validData = arrayOfData.filter(
        item =>
          item.hasOwnProperty('amount') &&
          item.hasOwnProperty('date') &&
          item.hasOwnProperty('payee')
      );

      if (validData.length === 0) {
        toast.error(
          'No valid transactions found. Please check your column mapping.'
        );
        setIsProcessing(false);
        return;
      }

      // Debug log the raw data before processing
      console.log('Raw valid data before processing:', validData);

      // Create a map of category names to IDs
      const categoryMap = new Map(
        categories.map(cat => {
          console.log(`Adding category to map: ${cat.name} -> ${cat.id}`);
          return [cat.name.toLowerCase(), cat.id];
        })
      );
      console.log('Category map:', Object.fromEntries(categoryMap));

      // Create missing categories first
      const uniqueCategories = new Set(
        validData
          .filter(item => item.category)
          .map(item => {
            const category = item.category.trim();
            console.log(`Found category in data: ${category}`);
            return category.toLowerCase();
          })
      );

      console.log('Unique categories found:', Array.from(uniqueCategories));

      // Create any missing categories
      for (const categoryName of uniqueCategories) {
        if (!categoryMap.has(categoryName)) {
          try {
            console.log('Creating new category:', categoryName);
            const result = await createCategory.mutateAsync({ 
              name: categoryName.charAt(0).toUpperCase() + categoryName.slice(1) 
            });
            if ('data' in result && result.data?.[0]) {
              console.log('Created category with ID:', result.data[0].id);
              categoryMap.set(categoryName, result.data[0].id);
            }
          } catch (err) {
            console.error(`Failed to create category ${categoryName}:`, err);
          }
        } else {
          console.log(`Category already exists: ${categoryName}`);
        }
      }

      const formattedData = validData
        .map((item, index) => {
          try {
            // Parse amount
            let amountValue: number;
            try {
              amountValue = parseFloat(item.amount);
              if (isNaN(amountValue)) {
                throw new Error(`Invalid amount value: ${item.amount}`);
              }
            } catch (err) {
              console.error(`Error parsing amount at row ${index}:`, err);
              return null;
            }

            // Parse date
            let parsedDate: Date | null;
            try {
              parsedDate = parseMultiFormatDate(item.date);
              if (!parsedDate) {
                throw new Error(`Could not parse date: ${item.date}`);
              }
            } catch (err) {
              console.error(`Error parsing date at row ${index}:`, err);
              return null;
            }

            // Format the transaction data
            const transaction: ImportedTransaction = {
              amount: convertAmountToMiliunits(amountValue),
              date: format(parsedDate, outputFormat),
              payee: item.payee,
              categoryId: undefined // Initialize categoryId
            };

            // Add categoryId if category exists
            if (item.category) {
              const normalizedCategory = item.category.trim().toLowerCase();
              console.log(`Processing category for row ${index}:`, {
                original: item.category,
                normalized: normalizedCategory
              });
              const categoryId = categoryMap.get(normalizedCategory);
              if (categoryId) {
                console.log(`Found category ID for "${item.category}":`, categoryId);
                transaction.categoryId = categoryId;
              } else {
                console.warn(`No category ID found for "${item.category}"`);
              }
            }

            console.log(`Final transaction for row ${index}:`, transaction);
            return transaction;
          } catch (err) {
            console.error(`Error processing row ${index}:`, err);
            return null;
          }
        })
        .filter((item): item is ImportedTransaction => item !== null);

      if (formattedData.length === 0) {
        toast.error(
          'Failed to process any transactions. Check the date format.'
        );
        setIsProcessing(false);
        return;
      }

      console.log('Final formatted data:', formattedData);
      onSubmit(formattedData);
    } catch (error) {
      console.error('Error processing import data:', error);
      toast.error(
        'Error processing import data. Please check console for details.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm w-full">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transaction
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              onClick={onCancel}
              size={'sm'}
              className="w-full lg:w-auto"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              size={'sm'}
              disabled={progress < requiredOptions.length || isProcessing}
              onClick={handleContinue}
              className="w-full lg:w-auto"
            >
              {isProcessing
                ? 'Processing...'
                : `Continue (${progress} / ${requiredOptions.length})`}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
