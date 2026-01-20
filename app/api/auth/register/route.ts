import { NextRequest, NextResponse } from 'next/server';
import { mockClientUsers } from '@/lib/mock-data';

/**
 * POST /api/auth/register
 * Registers a new client user with company profile
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      companyName,
      companyWebsite,
      industry,
      companySize,
      password,
      confirmPassword,
      terms,
    } = body;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !companyName ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    if (!terms) {
      return NextResponse.json(
        { error: 'You must accept the terms and conditions' },
        { status: 400 }
      );
    }

    // Check email uniqueness (against mock data)
    const existingUser = mockClientUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 409 }
      );
    }

    // In production, this would:
    // 1. Hash the password with bcrypt/argon2
    // 2. Create user record in database
    // 3. Create customer_profile record
    // 4. Send verification email
    // 5. Generate verification token

    // For demo, return success
    const newUser = {
      id: `client-${Date.now()}`,
      email,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      companyName,
      industry,
      companySize,
      createdAt: new Date(),
    };

    return NextResponse.json(
      {
        success: true,
        message:
          'Registration successful! Please check your email to verify your account.',
        user: newUser,
        nextStep: 'email_verification',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
