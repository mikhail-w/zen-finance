import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const publicRoutes = createRouteMatcher([
  '/', // Home page
  '/sign-in(.*)', // Sign-in pages
  '/sign-up(.*)', // Sign-up pages
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
    // Skip Next.js internals and static files
    '/((?!_next|.*\\..*).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
