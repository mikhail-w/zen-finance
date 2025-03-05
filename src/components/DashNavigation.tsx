'use client';

import { nav } from 'framer-motion/client';
import React from 'react';
import DashNavButton from './DashNavButton';

import { usePathname } from 'next/navigation';

const routes = [
  {
    href: '/dashboard',
    label: 'Overview',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/accounts',
    label: 'Accounts',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  {
    href: '/settings',
    label: 'Settings',
  },
];

const DashNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-x-2 overflow-x-auto font-semibold  text-xl ml-10">
      {routes.map(route => (
        <DashNavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};

export default DashNavigation;
