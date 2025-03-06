'use client'; // Required for client-side navigation

'use client';
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Import your custom Button component
import { SignOutButton } from '@clerk/nextjs';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

const Dashboard = () => {
  const router = useRouter();
  const accountsQuery = useGetAccounts();
  const { onOpen } = useNewAccount();

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-8 text-5xl font-bold">
      <p className="mb-8">Dashboard</p>
      <div>
        {accountsQuery.data?.map(account => (
          <div key={account.id}>{account.name}</div>
        ))}
      </div>
      <Button className="mb-8" onClick={onOpen}>
        Add an Account
      </Button>
      <Button
        variant="nav"
        size="lg"
        className="text-lg px-6 py-3"
        onClick={() => router.push('/')} // Navigate back to the main page
      >
        Back to Home
      </Button>
      <div className="mt-20">
        <SignOutButton>
          <button className="px-4 py-2 bg-red-500 text-white rounded">
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Dashboard;
