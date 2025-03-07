import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';

type ApiResponseType = InferResponseType<
  (typeof client.api.accounts)['bulk-delete']['$post']
>;

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

      // Extract the JSON data from the response
      const data = await response.json();
      return data;
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
