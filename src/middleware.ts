import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const pageUrl = req.nextUrl.pathname.toLowerCase();
    const isAuthPage = pageUrl === '/login' || pageUrl === '/register';
    const isLoggedIn = !!req.nextauth.token;

    // If user is logged in and tries to access login or register, redirect to home
    if (isLoggedIn && isAuthPage) {
      return NextResponse.redirect(new URL('/', req.url));
    }

  },
  {
    callbacks: {
      authorized: () => true, // Allow all, custom logic above
    },
  }
);

export const config = {
  matcher: ["/login", "/register"],
};
