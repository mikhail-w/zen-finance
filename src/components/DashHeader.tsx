import React from 'react';
import DashLogo from './DashLogo';
import DashNavigation from './DashNavigation';
import DashWelcomMsg from './DashWelcomeMsg';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import { Filters } from '@/components/filters';

const DashHeader = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center ">
            <DashLogo />
            <DashNavigation />
          </div>
          <ClerkLoaded>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: 'h-12 w-12 border-2 border-white',
                  userButtonTrigger: 'focus:shadow-none',
                },
              }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
        <DashWelcomMsg />
        <Filters />
      </div>
    </header>
  );
};

export default DashHeader;
