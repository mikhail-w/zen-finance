// use-create-account.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client, getAuthenticatedClient } from '@/lib/hono';
import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (values: { name: string }) => {
      const token = await getToken();
      const authenticatedClient = token ? getAuthenticatedClient(token) : client;
      
      const response = await authenticatedClient.api.accounts.$post({
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