# J# Authentication Troubleshooting Guide

## Problem: Stuck on "Processing..." when signing in

The error "Invalid J# or password" means the user was not found in the database.

## Step 1: Check if the user exists

Run this query in Supabase SQL Editor:
https://supabase.com/dashboard/project/qwbtbsmsgqeujdilqqdl/sql/new

```sql
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
```

### If NO RESULTS:
The user doesn't exist. You need to **SIGN UP first**.

1. Go to http://localhost:3000/sign-in
2. Click "J# Authentication"
3. Click "Don't have an account? Sign up"
4. Fill in:
   - Full Name (optional): Your Name
   - J#: JO0975960
   - Password: your_password
5. Click "Create Account"

### If RESULTS FOUND but `has_password` is FALSE:
The user exists but doesn't have a password. Run this to add one:

```sql
UPDATE public.users
SET 
  password_hash = '$2a$10$YourHashedPasswordHere',
  auth_method = 'jnumber'
WHERE j_number = 'JO0975960';
```

**Note**: You can't manually set a password hash. Instead:
1. Delete the existing user and sign up again, OR
2. Use Clerk authentication if that's how the user was originally created

### If RESULTS FOUND but `auth_method` is 'clerk':
This user was created with Clerk. You cannot sign in with J# + password.

Options:
- Use Clerk authentication to sign in
- Delete this user and create a new one with J# auth

## Step 2: Check all users to see what's in your database

```sql
SELECT 
  id,
  j_number,
  auth_method,
  password_hash IS NOT NULL as has_password,
  full_name,
  created_at
FROM public.users
ORDER BY created_at DESC;
```

## Step 3: Test with a fresh sign-up

1. Go to http://localhost:3000/sign-in
2. Switch to "J# Authentication"
3. Click "Don't have an account? Sign up"
4. Use a NEW J# (e.g., J123456)
5. Enter a password (at least 6 characters)
6. Click "Create Account"
7. You should be redirected to the dashboard

## Step 4: Check browser console for errors

1. Press F12 to open Developer Tools
2. Go to the "Console" tab
3. Try signing in again
4. Look for any red error messages
5. Share those error messages if you need help

## Step 5: Check network tab

1. Press F12 to open Developer Tools
2. Go to the "Network" tab
3. Try signing in
4. Look for the request to `/api/auth/jnumber/sign-in`
5. Click on it to see:
   - Request payload (what you sent)
   - Response (what the server returned)
   - Status code (should be 200 for success, 401 for invalid credentials)

## Common Issues:

1. **"Invalid J# or password"**: User doesn't exist or password is wrong
2. **"Processing..." forever**: Network timeout or server error
3. **Redirects back to sign-in**: Cookie not being set properly
4. **No error shown**: Check browser console for JavaScript errors

## Next Steps:

1. Run the SQL query above to check if your user exists
2. If not, try signing up with a new account
3. Check browser console for any errors
4. Share the results and I can help further

