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
        // Convert string dates to Date objects
        const formattedJson = json.map(transaction => ({
          ...transaction,
          date: typeof transaction.date === 'string' ? new Date(transaction.date) : transaction.date
        }));

        console.log('Formatted Request Data:', JSON.stringify(formattedJson, null, 2));

        const response = await client.api.transactions['bulk-create']['$post']({
          json: formattedJson,
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
    onSuccess: async data => {
      // Log the success data
      console.log('Mutation success data:', data);

      toast.success('Transactions created');

      // Invalidate and immediately refetch both queries
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['transactions'] }),
        queryClient.invalidateQueries({ queryKey: ['summary'] })
      ]);

      // Force an immediate refetch
      await Promise.all([
        queryClient.refetchQueries({ 
          queryKey: ['transactions'],
          exact: false
        }),
        queryClient.refetchQueries({ 
          queryKey: ['summary'],
          exact: false
        })
      ]);

      // Log the current cache state
      console.log(
        'Current transactions cache after refetch:',
        queryClient.getQueryData(['transactions'])
      );
    },
    onError: error => {
      console.error('Mutation error in handler:', error);
      toast.error(`Failed to create transactions: ${error.message}`);
    },
  });

  return mutation;
};
