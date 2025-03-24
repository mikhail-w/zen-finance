import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from '@/lib/hono';

type ResponseType = InferResponseType<
  (typeof client.api.transactions)['bulk-create']['$post']
>;

type RequestType = InferRequestType<
  (typeof client.api.transactions)['bulk-create']['$post']
>['json'];

export const useBulkCreateTransactions = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      // Debug log the request data
      console.log('Bulk Create Request Data:', JSON.stringify(json, null, 2));

      try {
        const response = await client.api.transactions['bulk-create']['$post']({
          json,
        });

        // Log the raw response
        console.log('API Response Status:', response.status);

        // Check if response is ok
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          throw new Error(`API Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data);
        return data;
      } catch (error) {
        console.error('Mutation error:', error);
        throw error;
      }
    },
    onSuccess: data => {
      // Log the success data
      console.log('Mutation success data:', data);

      toast.success('Transactions created');

      // Force refetch transactions
      queryClient.invalidateQueries({ queryKey: ['transactions'] });

      // Wait for the query to be refetched
      setTimeout(() => {
        // Force a refetch if necessary
        queryClient.refetchQueries({ queryKey: ['transactions'] });

        // Log the current cache state
        console.log(
          'Current transactions cache after refetch:',
          queryClient.getQueryData(['transactions'])
        );
      }, 500);
    },
    onError: error => {
      console.error('Mutation error in handler:', error);
      toast.error(`Failed to create transactions: ${error.message}`);
    },
  });

  return mutation;
};
