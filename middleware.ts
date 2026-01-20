import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to protect client portal routes
 * Checks for valid session before allowing access to /client/* routes
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect client portal routes
  if (pathname.startsWith('/client/')) {
    const session = request.cookies.get('largify_session');

    // No session found - redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verify session is valid (not corrupted or expired)
      const decoded = JSON.parse(
        Buffer.from(session.value, 'base64').toString('utf-8')
      );

      // Check expiration
      if (decoded.exp < Date.now()) {
        // Session expired - clear cookie and redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('largify_session');
        return response;
      }

      // Extract clientId from path and verify it matches session
      const pathSegments = pathname.split('/');
      const pathClientId = pathSegments[2]; // /client/{clientId}

      if (pathClientId && decoded.clientId !== pathClientId) {
        // Client ID mismatch - potential security issue
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      // Invalid session format - redirect to login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('largify_session');
      return response;
    }
  }

  // Allow other routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.gif|.*\\.svg).*)',
  ],
};
