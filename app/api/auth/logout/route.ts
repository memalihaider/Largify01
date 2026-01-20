import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/auth/logout
 * Terminates the current session
 */
export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { status: 200 }
    );

    // Clear session cookie
    response.cookies.delete('largify_session');

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
