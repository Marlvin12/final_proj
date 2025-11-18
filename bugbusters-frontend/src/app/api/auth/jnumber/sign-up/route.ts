import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { hashPassword, generateToken } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { j_number, password, full_name } = body;

    if (!j_number || !password) {
      return NextResponse.json(
        { error: 'J# and password are required' },
        { status: 400 }
      );
    }

    if (!j_number.match(/^[Jj]\d+$/)) {
      return NextResponse.json(
        { error: 'Invalid J# format. Must start with J followed by numbers' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
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

    const { data: existingUsers, error: checkError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('j_number', normalizedJNumber)
      .limit(1);

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing user:', checkError);
      return NextResponse.json(
        { error: 'Failed to check existing user' },
        { status: 500 }
      );
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'J# already registered' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const userId = uuidv4();

    const nameParts = full_name ? full_name.trim().split(/\s+/) : [];
    const firstName = nameParts.length > 0 ? nameParts[0] : null;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : null;

    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        id: userId,
        j_number: normalizedJNumber,
        password_hash: passwordHash,
        full_name: full_name || null,
        first_name: firstName,
        last_name: lastName,
        auth_method: 'jnumber',
        role: 'user',
        created_at: new Date().toISOString(),
      })
      .select('id, j_number, full_name, first_name, last_name, role')
      .single();

    if (insertError || !newUser) {
      console.error('Database error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      );
    }

    const user = {
      id: newUser.id,
      j_number: newUser.j_number,
      full_name: newUser.full_name,
      role: newUser.role || 'user',
    };

    const token = await generateToken(user);
    const response = NextResponse.json(
      { success: true, user: { id: user.id, j_number: user.j_number, full_name: user.full_name } },
      { status: 201 }
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
    console.error('Sign-up error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

