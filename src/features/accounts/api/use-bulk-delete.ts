import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';

// Define explicit response type structure
type ResponseType = {
  data: { id: string }[];
};

type RequestType = InferRequestType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>['json'];

export const useBulkDeleteAccounts = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.accounts['bulk-delete']['$post']({
        json,
      });

      const result = await response.json();

      // Check if the response has the expected structure
      if (!response.ok || !result.data) {
        throw new Error('Failed to delete accounts');
      }

      return result as ResponseType;
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
