-- Quick migration to add J# authentication columns
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/qwbtbsmsgqeujdilqqdl/sql/new

-- Step 1: Add new columns one by one
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name TEXT;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS j_number TEXT;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS auth_method TEXT DEFAULT 'clerk';

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS clerk_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';

-- Step 2: Add unique constraint on j_number
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_j_number_key'
  ) THEN
    ALTER TABLE public.users ADD CONSTRAINT users_j_number_key UNIQUE (j_number);
  END IF;
END $$;

-- Step 3: Add check constraint for auth_method
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_auth_method_check'
  ) THEN
    ALTER TABLE public.users 
    ADD CONSTRAINT users_auth_method_check 
    CHECK (auth_method IN ('clerk', 'jnumber'));
  END IF;
END $$;

-- Step 4: Migrate existing Clerk users (if any)
-- Skip this step if you don't have existing Clerk users, or run it separately after checking your data
-- This step is optional and can be skipped if you're starting fresh
/*
UPDATE public.users 
SET clerk_id = id::UUID
WHERE clerk_id IS NULL 
  AND EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = public.users.id::UUID)
  AND (auth_method = 'clerk' OR auth_method IS NULL);
*/

-- Step 5: Create index for J# lookups
CREATE INDEX IF NOT EXISTS idx_users_j_number ON public.users(j_number);

-- Step 6: Add data integrity constraint (optional, can be added later)
-- This constraint ensures either clerk_id exists for clerk users OR j_number/password_hash exist for jnumber users
-- Note: This might fail if you have existing data that doesn't meet the constraint
-- Uncomment only if you want strict validation:
/*
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_auth_check'
  ) THEN
    ALTER TABLE public.users
    ADD CONSTRAINT users_auth_check CHECK (
      (auth_method = 'clerk' AND clerk_id IS NOT NULL) OR
      (auth_method = 'jnumber' AND j_number IS NOT NULL AND password_hash IS NOT NULL)
    );
  END IF;
END $$;
*/

