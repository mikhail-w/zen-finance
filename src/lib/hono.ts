// hono.ts
import { hc } from 'hono/client';
import { AppType } from '@/app/api/[[...route]]/route';
import { useAuth } from "@clerk/nextjs";

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
};

export const client = hc<AppType>(getBaseUrl(), {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a new function to get authenticated client
export const getAuthenticatedClient = (token: string) => {
  return hc<AppType>(getBaseUrl(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
};