'use client';

import { useMountedState } from 'react-use';

import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';

const SheetPovider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
    </>
  );
};

export default SheetPovider;
