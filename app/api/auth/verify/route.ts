import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/auth/verify
 * Verifies current session and returns user info
 */
export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('largify_session');

    if (!session) {
      return NextResponse.json(
        { authenticated: false, error: 'No session found' },
        { status: 401 }
      );
    }

    try {
      const decoded = JSON.parse(
        Buffer.from(session.value, 'base64').toString('utf-8')
      );

      // Check expiration
      if (decoded.exp < Date.now()) {
        return NextResponse.json(
          { authenticated: false, error: 'Session expired' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          authenticated: true,
          clientId: decoded.clientId,
          email: decoded.email,
          name: decoded.name,
        },
        { status: 200 }
      );
    } catch (parseError) {
      return NextResponse.json(
        { authenticated: false, error: 'Invalid session' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
