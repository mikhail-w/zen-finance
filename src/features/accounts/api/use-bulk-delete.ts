import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';

// Define explicit response type structures
type SuccessResponse = {
  data: { id: string }[];
};

type ErrorResponse = {
  error: string;
};

// Use a type guard to differentiate between success and error responses
function isSuccessResponse(response: any): response is SuccessResponse {
  return response && 'data' in response;
}

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

      // Use the type guard to narrow the type
      if (!isSuccessResponse(result)) {
        throw new Error('Failed to delete accounts');
      }

      return result;
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
