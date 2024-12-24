import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define route matchers
const isAuthRoute = createRouteMatcher(['/sign-in', '/sign-up','/']);
const isDashboardRoute = createRouteMatcher(['/dashboard(.*)','/notes(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;

  // If the route is a dashboard route, protect it (require authentication)
  if (isDashboardRoute(req)) {
    try {
      await auth.protect(); // Ensure the user is authenticated
    } catch  {
      // Redirect unauthenticated users to the signin page
      const redirectUrl = new URL('/sign-in', req.url);
      redirectUrl.searchParams.set('callbackUrl', url.pathname); // Add the original URL
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect authenticated users away from auth routes
  if (isAuthRoute(req)) {
    try {
      await auth.protect(); // Check if the user is authenticated
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch {
      // Do nothing if the user is not authenticated (allow access)
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
});

// Middleware config
export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
