'use client';

import { useUser } from '@clerk/nextjs';
import React from 'react';

const DashWelcomMsg = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl md:text-4xl text-white font-medium">
        Welcome Back{isLoaded ? ', ' : ''}
        {user?.firstName}
      </h2>
      <p className="text-md md:text-lg text-white">
        This is your Financial Overview Report
      </p>
    </div>
  );
};

export default DashWelcomMsg;
