import { supabaseAdmin } from './supabase';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Convert secret to Uint8Array for jose
const getSecretKey = () => new TextEncoder().encode(JWT_SECRET);

export interface JNumberUser {
  id: string;
  j_number: string;
  full_name: string | null;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateToken(user: JNumberUser): Promise<string> {
  const token = await new SignJWT({ 
    id: user.id, 
    j_number: user.j_number, 
    auth_method: 'jnumber' 
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
  
  return token;
}

export async function verifyToken(token: string): Promise<JNumberUser | null> {
  try {
    console.log('[verifyToken] Attempting to verify token with secret length:', JWT_SECRET.length);
    const { payload } = await jwtVerify(token, getSecretKey());
    
    const decoded = payload as {
      id: string;
      j_number: string;
      auth_method: string;
    };
    
    console.log('[verifyToken] Token verified successfully:', { id: decoded.id, j_number: decoded.j_number });
    return {
      id: decoded.id,
      j_number: decoded.j_number,
      full_name: null,
      role: 'user',
    };
  } catch (error) {
    console.error('[verifyToken] Token verification failed:', error instanceof Error ? error.message : error);
    return null;
  }
}

export async function getJNumberUserFromSession(): Promise<JNumberUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('jnumber_session')?.value;
  
  console.log('[getJNumberUserFromSession] Token exists:', !!token);
  
  if (!token) {
    return null;
  }
  
  const user = await verifyToken(token);
  console.log('[getJNumberUserFromSession] Token verified:', !!user, user?.id);
  
  if (!user) {
    return null;
  }
  
  if (!supabaseAdmin) {
    console.log('[getJNumberUserFromSession] No Supabase admin client');
    return null;
  }
  
  console.log('[getJNumberUserFromSession] Querying DB with ID:', user.id);
  
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, j_number, full_name, first_name, last_name, role, auth_method')
    .eq('id', user.id)
    .eq('auth_method', 'jnumber')
    .single();
  
  console.log('[getJNumberUserFromSession] DB lookup:', { 
    found: !!data, 
    error: error?.message,
    errorDetails: error,
    data: data ? { id: data.id, j_number: data.j_number } : null
  });
  
  if (error || !data) {
    return null;
  }
  
  const fullName = data.full_name || 
    (data.first_name && data.last_name ? `${data.first_name} ${data.last_name}` : 
     data.first_name || data.last_name || null);
  
  return {
    id: data.id,
    j_number: data.j_number,
    full_name: fullName,
    role: data.role || 'user',
  };
}

export async function setJNumberSession(user: JNumberUser): Promise<void> {
  const token = await generateToken(user);
  const cookieStore = await cookies();
  cookieStore.set('jnumber_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function clearJNumberSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('jnumber_session');
}

