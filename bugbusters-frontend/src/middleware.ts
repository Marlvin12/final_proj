import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getJNumberUserFromSession } from "./lib/auth";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/contact",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/auth/jnumber(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    const { userId } = await auth();
    
    console.log('[Middleware] Checking auth for dashboard:', { 
      pathname, 
      hasClerkUser: !!userId,
      cookies: req.cookies.getAll().map(c => c.name)
    });
    
    if (userId) {
      console.log('[Middleware] Clerk user authenticated');
      return NextResponse.next();
    }

    const jNumberUser = await getJNumberUserFromSession();
    
    console.log('[Middleware] J# auth check:', { 
      hasJNumberUser: !!jNumberUser,
      jNumber: jNumberUser?.j_number 
    });
    
    if (jNumberUser) {
      console.log('[Middleware] J# user authenticated');
      return NextResponse.next();
    }

    console.log('[Middleware] No authentication found, redirecting to sign-in');
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};


