import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';
import { toast } from 'sonner';

// Define the account data structure
interface Account {
  id: string;
  plaidId: string | null;
  name: string;
  userId: string;
}

// Define the response data structure
interface AccountResponse {
  data: Account;
  error?: string;
}

// Define the request data structure
interface AccountRequest {
  name: string;
  plaidId?: string | null;
  userId?: string;
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<AccountResponse, Error, AccountRequest>({
    mutationFn: async data => {
      const response = await client.api.accounts.$post({ json: data });

      if (!response.ok) {
        throw new Error('Failed to create account');
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success('Account created');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: () => {
      toast.error('Failed to create account');
    },
  });

  return mutation;
};
