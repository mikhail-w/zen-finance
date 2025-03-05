import DashHeader from '@/components/DashHeader';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <DashHeader />
      <main>{children}</main>;
    </>
  );
};

export default DashboardLayout;
