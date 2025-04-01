'use client';
import { useSearchParams } from 'next/navigation';
import { useGetSummary } from '@/features/summary/api/use-get-summary';
import { formatDateRange } from '@/lib/utils';
import { FaPiggyBank } from 'react-icons/fa';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { DataCard, DataCardLoading } from '@/components/data-card';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';

// Define the type for your summary data
type SummaryData = {
  remainingAmount: number;
  remainingChange: number;
  incomeAmount: number;
  incomeChange: number;
  expensesAmount: number;
  expensesChange: number;
  categories?: Array<{ value: number; name: string }>;
  days?: Array<{ date: string; income: number; expenses: number }>;
};

// Inner component that uses useSearchParams
function ClientDataGridInner() {
  const { data, isLoading, ClientComponent } = useGetSummary();
  const params = useSearchParams();
  const to = params.get('to') || undefined;
  const from = params.get('from') || undefined;
  const dateRangeLabel = formatDateRange({ to, from });

  // Render the ClientComponent to fetch data
  if (ClientComponent) {
    return (
      <>
        <ClientComponent />
        {renderContent()}
      </>
    );
  }

  // Function to render content based on loading state
  function renderContent() {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
          <DataCardLoading />
          <DataCardLoading />
          <DataCardLoading />
        </div>
      );
    }

    const typedData = data as SummaryData | null;

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCard
          title="Remaining"
          value={typedData?.remainingAmount}
          percentageChange={typedData?.remainingChange}
          icon={FaPiggyBank}
          variant="default"
          dateRange={dateRangeLabel}
        />
        <DataCard
          title="Income"
          value={typedData?.incomeAmount}
          percentageChange={typedData?.incomeChange}
          icon={FaArrowTrendUp}
          variant="default"
          dateRange={dateRangeLabel}
        />
        <DataCard
          title="Expenses"
          value={typedData?.expensesAmount}
          percentageChange={typedData?.expensesChange}
          icon={FaArrowTrendDown}
          variant="default"
          dateRange={dateRangeLabel}
        />
      </div>
    );
  }

  return renderContent();
}

// Wrapper component with Suspense boundary
export function ClientDataGrid() {
  return (
    <SearchParamsWrapper>
      {({ searchParams }) => <ClientDataGridInner />}
    </SearchParamsWrapper>
  );
}
