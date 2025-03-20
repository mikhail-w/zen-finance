import { toast } from 'sonner';
import { InferRequestType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';

// Define explicit response type structures
type SuccessResponse = {
  data: { id: string }[];
};

type RequestType = InferRequestType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>['json'];

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<SuccessResponse, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.accounts['bulk-delete']['$post']({
        json,
      });

      const result = await response.json();

      // Simple validation without type guard
      if (!result || !('data' in result)) {
        throw new Error('Failed to delete accounts');
      }

      return result as SuccessResponse;
    },
    onSuccess: () => {
      toast.success('Account(s) deleted');
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
    onError: () => {
      toast.error('Failed to delete accounts');
    },
  });

  return mutation;
};
