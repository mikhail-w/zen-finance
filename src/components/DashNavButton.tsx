import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

const DashNavButton = ({ href, label, isActive = false }: Props) => {
  return (
    <Button
      asChild
      variant={'outline'}
      size={'sm'}
      className={cn(
        'w-full md:w-auto justify-between font-4xl hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition',
        isActive ? 'bg-white/10 text-white' : 'bg-transparent'
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default DashNavButton;
