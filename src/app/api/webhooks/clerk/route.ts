import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { setupDemoData } from '@/lib/demo-setup';

export async function POST(req: Request) {
  // Get the headers
  const headersList = headers();
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id } = evt.data;

    try {
      // Setup demo data for the new user
      await setupDemoData(id);
      return new Response('Demo data created successfully', { status: 200 });
    } catch (error) {
      console.error('Error creating demo data:', error);
      return new Response('Error creating demo data', { status: 500 });
    }
  }

  return new Response('', { status: 200 });
} 