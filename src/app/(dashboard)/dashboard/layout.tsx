import DashHeader from '@/components/DashHeader';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <DashHeader />
      <main className="px-4 sm:px-6 md:px-8 lg:px-14 max-w-screen-2xl mx-auto w-full">
        {children}
      </main>
      ;
    </>
  );
};

export default DashboardLayout;
