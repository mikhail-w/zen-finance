'use client';

import qs from 'query-string';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useGetSummary } from '@/features/summary/api/use-get-summary';
import { SearchParamsWrapper } from '@/components/search-params-wrapper';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Inner component that uses useSearchParams
function AccountFilterInner() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const accountId = params.get('accountId') || 'all';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const { isLoading: isLoadingSummary } = useGetSummary();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };

    if (newValue === 'all') {
      query.accountId = '';
    }
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger
        style={{ color: 'white' }}
        className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-blue-600 
                  hover:bg-blue-700 border-none focus:ring-offset-0 
                  focus:ring-transparent outline-none transition"
      >
        <SelectValue style={{ color: 'white' }} placeholder="Account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Accounts</SelectItem>
        {accounts?.map(account => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Wrapper component with Suspense boundary
export function AccountFilter() {
  return (
    <SearchParamsWrapper>
      {({ searchParams }) => <AccountFilterInner />}
    </SearchParamsWrapper>
  );
}
