import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = createRouteMatcher([
  '/', // Home page
  '/sign-in(.*)', // Sign-in pages
  '/sign-up(.*)', // Sign-up pages
  '/api/(.*)', // Allow all API routes
  '/v1/oauth_callback(.*)', // Allow OAuth callbacks
]);

export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);

  // Skip authentication for API routes, let them handle it
  if (url.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Protect other routes
  if (!publicRoutes(request)) {
    console.log('Middleware enforcing auth');
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
