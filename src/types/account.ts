import { InferResponseType } from 'hono';
import { client } from '@/lib/hono';

export type Account = InferResponseType<
  typeof client.api.accounts.$get,
  200
>['data'][0]; 