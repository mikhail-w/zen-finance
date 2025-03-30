'use client';

import { Loader2 } from 'lucide-react';
import { NewCategorySheet } from '@/features/categories/components/new-category-sheet';
import { EditCategorySheet } from '@/features/categories/components/edit-category-sheet';
import nextDynamic from 'next/dynamic';

// Basic loading component
const CategoriesLoading = () => (
  <div className="w-full pb-10 -mt-24 flex items-center justify-center h-[500px]">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Use dynamic import with ssr: false to avoid useSearchParams issues
const CategoriesContent = nextDynamic(() => import('./categories-content'), {
  ssr: false,
  loading: () => <CategoriesLoading />,
});

// Main page component - completely static with no hooks
export default function CategoriesPage() {
  return (
    <>
      <CategoriesContent />
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
}

// Force dynamic rendering
export const dynamic = 'force-dynamic';
