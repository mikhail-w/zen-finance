// hono.ts
import { hc } from 'hono/client';
import { AppType } from '@/app/api/[[...route]]/route';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // In browser, use current origin
    return window.location.origin;
  }
  // Fallback to environment variable or a default
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

// Create the client with proper configuration
export const client = hc<AppType>(getBaseUrl(), {
  headers: {
    'Content-Type': 'application/json',
  },
});
