-- ============================================
-- J# Authentication System Demo Queries
-- Run these in Supabase SQL Editor to demonstrate the system
-- https://supabase.com/dashboard/project/qwbtbsmsgqeujdilqqdl/sql/new
-- ============================================

-- 1. SHOW ALL USERS WITH AUTHENTICATION METHODS
-- This shows all users, their auth method, and key details
SELECT 
  id,
  j_number,
  full_name,
  first_name,
  last_name,
  auth_method,
  password_hash IS NOT NULL as has_password,
  created_at,
  last_login,
  role
FROM public.users
ORDER BY created_at DESC;


-- 2. SHOW ONLY J# AUTHENTICATED USERS
-- This shows users who signed up with J# and password
SELECT 
  id,
  j_number,
  COALESCE(full_name, CONCAT(first_name, ' ', last_name)) as display_name,
  auth_method,
  created_at,
  last_login,
  CASE 
    WHEN last_login IS NULL THEN 'Never logged in'
    WHEN last_login > NOW() - INTERVAL '1 hour' THEN 'Active now'
    WHEN last_login > NOW() - INTERVAL '1 day' THEN 'Recent'
    ELSE 'Inactive'
  END as login_status
FROM public.users
WHERE auth_method = 'jnumber'
ORDER BY last_login DESC NULLS LAST;


-- 3. SHOW ONLY CLERK AUTHENTICATED USERS
-- This shows users who signed up with Clerk (email/social)
SELECT 
  id,
  clerk_id,
  COALESCE(full_name, CONCAT(first_name, ' ', last_name)) as display_name,
  auth_method,
  created_at,
  last_login
FROM public.users
WHERE auth_method = 'clerk'
ORDER BY created_at DESC;


-- 4. AUTHENTICATION METHOD STATISTICS
-- Shows how many users are using each auth method
SELECT 
  auth_method,
  COUNT(*) as user_count,
  COUNT(CASE WHEN last_login IS NOT NULL THEN 1 END) as users_who_logged_in,
  COUNT(CASE WHEN last_login > NOW() - INTERVAL '7 days' THEN 1 END) as active_last_7_days
FROM public.users
GROUP BY auth_method;


-- 5. RECENT SIGN-UPS (Last 7 days)
-- Shows newest users and their authentication method
SELECT 
  j_number,
  COALESCE(full_name, CONCAT(first_name, ' ', last_name)) as display_name,
  auth_method,
  created_at,
  AGE(NOW(), created_at) as account_age
FROM public.users
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;


-- 6. RECENT LOGINS (Last 24 hours)
-- Shows who has logged in recently
SELECT 
  j_number,
  COALESCE(full_name, CONCAT(first_name, ' ', last_name)) as display_name,
  auth_method,
  last_login,
  AGE(NOW(), last_login) as time_since_login
FROM public.users
WHERE last_login > NOW() - INTERVAL '24 hours'
ORDER BY last_login DESC;


-- 7. FIND A SPECIFIC USER BY J#
-- Replace 'J1234567' with the J# you want to look up
SELECT 
  id,
  j_number,
  COALESCE(full_name, CONCAT(first_name, ' ', last_name)) as display_name,
  auth_method,
  password_hash IS NOT NULL as has_password,
  created_at,
  last_login,
  role,
  CASE 
    WHEN last_login IS NULL THEN 'Never logged in'
    ELSE CONCAT('Last login: ', AGE(NOW(), last_login)::text, ' ago')
  END as login_info
FROM public.users
WHERE j_number = 'J1234567';


-- 8. SHOW USERS WHO NEVER LOGGED IN
-- Useful for finding test accounts or abandoned signups
SELECT 
  j_number,
  COALESCE(full_name, CONCAT(first_name, ' ', last_name)) as display_name,
  auth_method,
  created_at,
  AGE(NOW(), created_at) as account_age
FROM public.users
WHERE last_login IS NULL
ORDER BY created_at DESC;


-- 9. MOST ACTIVE USERS (by login frequency)
-- Shows users sorted by most recent login
SELECT 
  j_number,
  COALESCE(full_name, CONCAT(first_name, ' ', last_name)) as display_name,
  auth_method,
  last_login,
  CASE 
    WHEN last_login > NOW() - INTERVAL '1 hour' THEN '🟢 Online'
    WHEN last_login > NOW() - INTERVAL '1 day' THEN '🟡 Today'
    WHEN last_login > NOW() - INTERVAL '7 days' THEN '🟠 This week'
    ELSE '⚫ Inactive'
  END as status
FROM public.users
WHERE last_login IS NOT NULL
ORDER BY last_login DESC
LIMIT 10;


-- 10. SECURITY CHECK - Users with J# but no password
-- This shouldn't return any rows if the system is working correctly
SELECT 
  id,
  j_number,
  auth_method,
  password_hash IS NOT NULL as has_password
FROM public.users
WHERE auth_method = 'jnumber' 
  AND password_hash IS NULL;


-- 11. VERIFY J# FORMAT
-- Shows all J# values to verify they follow the correct format
SELECT 
  j_number,
  CASE 
    WHEN j_number ~ '^J[0-9]+$' THEN '✅ Valid'
    ELSE '❌ Invalid format'
  END as format_check,
  auth_method
FROM public.users
WHERE j_number IS NOT NULL
ORDER BY j_number;


-- 12. FULL USER DETAILS (for debugging)
-- Shows everything for a specific J#
-- Replace 'J1234567' with the J# you want to inspect
SELECT *
FROM public.users
WHERE j_number = 'J1234567';


-- 13. COUNT USERS BY ROLE
-- Shows distribution of user roles
SELECT 
  role,
  COUNT(*) as count
FROM public.users
GROUP BY role
ORDER BY count DESC;


-- 14. DUAL AUTHENTICATION CHECK
-- Shows if any users have both Clerk and J# auth (shouldn't happen)
SELECT 
  id,
  j_number,
  clerk_id IS NOT NULL as has_clerk_id,
  password_hash IS NOT NULL as has_password,
  auth_method
FROM public.users
WHERE clerk_id IS NOT NULL 
  AND password_hash IS NOT NULL;


-- ============================================
-- DEMO: Insert a test user (optional)
-- ============================================
-- Uncomment to create a test J# user
-- Note: This won't have a valid password hash, just for demo

/*
INSERT INTO public.users (
  id,
  j_number,
  full_name,
  auth_method,
  password_hash,
  role,
  created_at
) VALUES (
  gen_random_uuid(),
  'J9999999',
  'Test Demo User',
  'jnumber',
  '$2a$10$demoHashNotRealPassword',
  'user',
  NOW()
);
*/


-- ============================================
-- DEMO: Update last_login for testing
-- ============================================
-- Uncomment to simulate a recent login

/*
UPDATE public.users
SET last_login = NOW()
WHERE j_number = 'J1234567';
*/


-- ============================================
-- CLEANUP: Delete test users (use carefully!)
-- ============================================
-- Uncomment to delete test users

/*
DELETE FROM public.users
WHERE j_number LIKE 'J9999%';
*/

