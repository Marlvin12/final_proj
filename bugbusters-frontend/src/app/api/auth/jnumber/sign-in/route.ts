import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { j_number, password } = body;

    if (!j_number || !password) {
      return NextResponse.json(
        { error: 'J# and password are required' },
        { status: 400 }
      );
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database connection not available' },
        { status: 500 }
      );
    }

    const normalizedJNumber = j_number.toUpperCase();

    console.log('Looking up user with J#:', normalizedJNumber);

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, j_number, password_hash, full_name, first_name, last_name, role, auth_method')
      .eq('j_number', normalizedJNumber)
      .eq('auth_method', 'jnumber')
      .single();

    console.log('User lookup result:', { found: !!user, error: error?.message, hasPasswordHash: !!user?.password_hash });

    if (error || !user || !user.password_hash) {
      console.error('User lookup error:', error);
      return NextResponse.json(
        { error: 'Invalid J# or password' },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.password_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid J# or password' },
        { status: 401 }
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    if (updateError) {
      console.error('Failed to update last_login:', updateError);
    }

    const fullName = user.full_name || 
      (user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : 
       user.first_name || user.last_name || null);

    const userData = {
      id: user.id,
      j_number: user.j_number,
      full_name: fullName,
      role: user.role || 'user',
    };

    const token = await generateToken(userData);
    const response = NextResponse.json(
      { success: true, user: { id: userData.id, j_number: userData.j_number, full_name: userData.full_name } },
      { status: 200 }
    );

    response.cookies.set('jnumber_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

