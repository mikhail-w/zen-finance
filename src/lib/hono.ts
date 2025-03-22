// hono.ts
import { hc } from 'hono/client';
import { AppType } from '@/app/api/[[...route]]/route';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // In browser, use current origin
    return window.location.origin;
  }
  // Fallback to environment variable or a default
  return process.env.NEXT_PUBLIC_APP_URL || '';
};

export const client = hc<AppType>(getBaseUrl());
