'use client';
import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { useMedia } from 'react-use';
import DashNavButton from './DashNavButton';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

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
  // Use state to control the opening/closing of the Sheet
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia('(max-width: 767px)', false);

  // Add a delay to close the sheet when a route is clicked
  const onClick = (href: string) => {
    // Only navigate if it's a different route
    if (pathname !== href) {
      // First close the sheet with a slight delay before navigation
      setIsOpen(false);
      // Delay navigation to allow sheet closing animation
      setTimeout(() => {
        router.push(href);
      }, 500); // Increased from 300ms to 500ms to match our sheet animation duration
    } else {
      // If it's the same route, just close the sheet
      setIsOpen(false);
    }
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant={'outline'}
            size={'sm'}
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side={'left'} className="px-2">
          <SheetHeader>
            <SheetTitle className="hidden">Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-y-2 pt-10">
            {routes.map(route => (
              <Button
                key={route.href}
                variant={route.href === pathname ? 'secondary' : 'ghost'}
                size={'lg'}
                onClick={() => onClick(route.href)}
                className="w-full justify-start text-2xl transition-all duration-300"
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-x-2 overflow-x-auto font-semibold text-xl ml-10">
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
