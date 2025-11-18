import { NextResponse } from 'next/server';
import { getJNumberUserFromSession } from '@/lib/auth';

export async function GET() {
  try {
    const user = await getJNumberUserFromSession();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        j_number: user.j_number,
        full_name: user.full_name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

