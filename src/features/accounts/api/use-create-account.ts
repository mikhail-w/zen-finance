'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: { name: string }) => {
      const response = await client.api.accounts.$post({
        json: values,
      });

      return response.json();
    },
    onSuccess: () => {
      toast.success('Account created successfully');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: error => {
      console.error('Error creating account:', error);
      toast.error('Failed to create account');
    },
  });
};
