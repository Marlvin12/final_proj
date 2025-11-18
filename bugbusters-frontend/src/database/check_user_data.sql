-- Run this query in Supabase SQL Editor to check your users table
-- https://supabase.com/dashboard/project/qwbtbsmsgqeujdilqqdl/sql/new

-- Check if the user with J# exists
SELECT 
  id,
  j_number,
  auth_method,
  password_hash IS NOT NULL as has_password,
  full_name,
  first_name,
  last_name,
  created_at
FROM public.users
WHERE j_number = 'JO0975960';

-- If no results, check all users with J# authentication
SELECT 
  id,
  j_number,
  auth_method,
  password_hash IS NOT NULL as has_password,
  full_name,
  created_at
FROM public.users
WHERE auth_method = 'jnumber';

-- Check ALL users in the table
SELECT 
  id,
  j_number,
  auth_method,
  password_hash IS NOT NULL as has_password,
  created_at
FROM public.users
ORDER BY created_at DESC;

