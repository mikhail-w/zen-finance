'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useNewCategory } from '@/features/categories/hooks/use-new-category';
import { columns, ResponseType } from './columns';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { Skeleton } from '@/components/ui/skeleton';
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories';
import { SearchParamsTable } from '@/components/search-params-table';
import { Row } from '@tanstack/react-table';

// Loading component
const LoadingComponent = () => (
  <div className="w-full pb-10 -mt-24">
    <Card className="border-none drop-shadow-sm">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent>
        <div className="h-[500px] w-full flex items-center justify-center">
          <Loader2 className="size-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  </div>
);

const ClientCategoriesPage = () => {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;

  if (categoriesQuery.isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm ">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-3xl line-clamp-1">
            Categories page
          </CardTitle>
          <Button
            className="text-white text-lg font-medium w-auto"
            size={'sm'}
            onClick={newCategory.onOpen}
          >
            <Plus size={24} className="mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          {/* <SearchParamsTable<ResponseType, unknown>
            disabled={isDisabled}
            onDelete={(rows: Row<ResponseType>[]) => {
              const ids = rows.map(r => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            filterKey="name"
            columns={columns}
            data={categories}
          /> */}
          {categoriesQuery.ClientComponent && (
            <categoriesQuery.ClientComponent />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientCategoriesPage;
