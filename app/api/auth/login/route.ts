import { NextRequest, NextResponse } from 'next/server';
import { mockClientUsers } from '@/lib/mock-data';

/**
 * POST /api/auth/login
 * Authenticates a client user and returns session token
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Mock credential verification
    // For demo: any valid client email with password "demo123" works
    const client = mockClientUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!client) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Password verification (demo: hardcoded for testing)
    if (password !== 'demo123') {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session token (simple JWT-like format for demo)
    const token = Buffer.from(
      JSON.stringify({
        clientId: client.id,
        email: client.email,
        name: client.name,
        iat: Date.now(),
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    ).toString('base64');

    // Return response with session
    const response = NextResponse.json(
      {
        success: true,
        clientId: client.id,
        name: client.name,
        email: client.email,
        message: 'Authentication successful',
      },
      { status: 200 }
    );

    // Set secure cookie
    response.cookies.set('largify_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
