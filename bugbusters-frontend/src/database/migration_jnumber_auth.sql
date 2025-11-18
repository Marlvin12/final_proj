-- Migration script to add J# authentication support
-- Run this AFTER the base schema.sql if you already have existing data

-- Step 1: Add new columns if they don't exist
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS j_number TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS password_hash TEXT,
ADD COLUMN IF NOT EXISTS auth_method TEXT DEFAULT 'clerk' CHECK (auth_method IN ('clerk', 'jnumber'));

-- Step 2: Add clerk_id column for Clerk users (nullable)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS clerk_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Step 3: Migrate existing Clerk users to have clerk_id = id
UPDATE public.users 
SET clerk_id = id 
WHERE clerk_id IS NULL AND id IN (SELECT id FROM auth.users);

-- Step 4: Create index for J# lookups
CREATE INDEX IF NOT EXISTS idx_users_j_number ON public.users(j_number);

-- Step 5: Update RLS policies to allow J# users (they use service role, so RLS is bypassed)
-- Note: J# users will be authenticated via JWT tokens, not Supabase auth
-- The existing RLS policies will continue to work for Clerk users

-- Step 6: Add constraint to ensure data integrity
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

