'use client';
import nextDynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { NewCategorySheet } from '@/features/categories/components/new-category-sheet';
import { EditCategorySheet } from '@/features/categories/components/edit-category-sheet';

// Loading component for the categories page
const CategoriesLoading = () => (
  <div className="w-full pb-10 -mt-24 flex items-center justify-center h-[500px]">
    <Loader2 className="size-6 text-slate-300 animate-spin" />
  </div>
);

// Use dynamic import with ssr: false for the client component
const ClientCategoriesPage = nextDynamic(
  () => import('./client-categories-page').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <CategoriesLoading />,
  }
);

export default function CategoriesPage() {
  return (
    <>
      <ClientCategoriesPage />
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
}

// Rename to avoid conflict with the imported 'dynamic'
export const dynamic = 'force-dynamic';
