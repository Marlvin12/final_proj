-- Migration script to add J# authentication support to existing users table
-- This works with your existing schema that has first_name and last_name
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/qwbtbsmsgqeujdilqqdl/sql/new

-- Step 1: Add full_name column (we'll use this for J# users, keep first_name/last_name for existing data)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Step 2: Populate full_name from first_name and last_name for existing records (if they exist)
-- This is safe - it won't overwrite existing full_name values
UPDATE public.users 
SET full_name = TRIM(COALESCE(first_name, '') || ' ' || COALESCE(last_name, ''))
WHERE full_name IS NULL 
  AND (first_name IS NOT NULL OR last_name IS NOT NULL)
  AND TRIM(COALESCE(first_name, '') || ' ' || COALESCE(last_name, '')) != '';

-- Step 3: Add J# authentication columns
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS j_number TEXT;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS password_hash TEXT;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS auth_method TEXT DEFAULT 'clerk';

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS clerk_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 4: Add unique constraint on j_number
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'users_j_number_key'
  ) THEN
    ALTER TABLE public.users ADD CONSTRAINT users_j_number_key UNIQUE (j_number);
  END IF;
END $$;

-- Step 5: Add check constraint for auth_method
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

-- Step 6: Create index for J# lookups
CREATE INDEX IF NOT EXISTS idx_users_j_number ON public.users(j_number);

