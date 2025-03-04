'use client'; // Required for client-side navigation

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Import your custom Button component
import { SignOutButton } from '@clerk/nextjs';

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-5xl font-bold">
      <p className="mb-8">Dashboard</p>
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
