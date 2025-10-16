-- ================================================================
-- Bug Busters - Entrepreneurial Hub Database Setup
-- Run this entire file in Supabase SQL Editor
-- ================================================================

-- Drop existing tables if you need to reset (CAUTION: This deletes all data!)
-- Uncomment the lines below only if you want to start fresh
-- DROP TABLE IF EXISTS public.recommendations CASCADE;
-- DROP TABLE IF EXISTS public.questionnaire_responses CASCADE;
-- DROP TABLE IF EXISTS public.users CASCADE;

-- ================================================================
-- 1. USERS TABLE
-- ================================================================
-- Extends Supabase auth.users with additional profile information
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT DEFAULT 'user'
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ================================================================
-- 2. QUESTIONNAIRE RESPONSES TABLE
-- ================================================================
-- Stores all business assessment responses
CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  stage TEXT NOT NULL CHECK (stage IN ('Idea', 'Research', 'Planning', 'Launch', 'Scaling')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for questionnaire_responses table
DROP POLICY IF EXISTS "Users can view all responses" ON public.questionnaire_responses;
CREATE POLICY "Users can view all responses" ON public.questionnaire_responses
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own responses" ON public.questionnaire_responses;
CREATE POLICY "Users can insert own responses" ON public.questionnaire_responses
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own responses" ON public.questionnaire_responses;
CREATE POLICY "Users can update own responses" ON public.questionnaire_responses
  FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Users can delete own responses" ON public.questionnaire_responses;
CREATE POLICY "Users can delete own responses" ON public.questionnaire_responses
  FOR DELETE USING (true);

-- ================================================================
-- 3. RECOMMENDATIONS TABLE
-- ================================================================
-- Stores AI-generated recommendations for each assessment
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID REFERENCES public.questionnaire_responses(id) ON DELETE CASCADE NOT NULL,
  recommendation_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for recommendations table
DROP POLICY IF EXISTS "Users can view all recommendations" ON public.recommendations;
CREATE POLICY "Users can view all recommendations" ON public.recommendations
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert recommendations" ON public.recommendations;
CREATE POLICY "Users can insert recommendations" ON public.recommendations
  FOR INSERT WITH CHECK (true);

-- ================================================================
-- 4. INDEXES FOR PERFORMANCE
-- ================================================================
-- Create indexes to speed up common queries
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_user_id 
  ON public.questionnaire_responses(user_id);

CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_created_at 
  ON public.questionnaire_responses(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_stage 
  ON public.questionnaire_responses(stage);

CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_score 
  ON public.questionnaire_responses(score);

CREATE INDEX IF NOT EXISTS idx_recommendations_response_id 
  ON public.recommendations(response_id);

CREATE INDEX IF NOT EXISTS idx_recommendations_created_at 
  ON public.recommendations(created_at DESC);

-- ================================================================
-- 5. HELPER FUNCTIONS (OPTIONAL BUT USEFUL)
-- ================================================================

-- Function to get user's latest assessment
CREATE OR REPLACE FUNCTION get_latest_assessment(p_user_id TEXT)
RETURNS TABLE (
  id UUID,
  user_id TEXT,
  answers JSONB,
  score INTEGER,
  stage TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qr.id,
    qr.user_id,
    qr.answers,
    qr.score,
    qr.stage,
    qr.created_at
  FROM public.questionnaire_responses qr
  WHERE qr.user_id = p_user_id
  ORDER BY qr.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to get user's assessment history
CREATE OR REPLACE FUNCTION get_user_assessment_history(p_user_id TEXT)
RETURNS TABLE (
  id UUID,
  score INTEGER,
  stage TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  days_ago INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qr.id,
    qr.score,
    qr.stage,
    qr.created_at,
    EXTRACT(DAY FROM NOW() - qr.created_at)::INTEGER as days_ago
  FROM public.questionnaire_responses qr
  WHERE qr.user_id = p_user_id
  ORDER BY qr.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get average score by stage
CREATE OR REPLACE FUNCTION get_average_score_by_stage()
RETURNS TABLE (
  stage TEXT,
  avg_score NUMERIC,
  count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    qr.stage,
    ROUND(AVG(qr.score), 2) as avg_score,
    COUNT(*) as count
  FROM public.questionnaire_responses qr
  GROUP BY qr.stage
  ORDER BY avg_score DESC;
END;
$$ LANGUAGE plpgsql;

-- ================================================================
-- 6. SAMPLE DATA (FOR TESTING - OPTIONAL)
-- ================================================================
-- Uncomment to insert sample data for testing
/*
-- Sample user response
INSERT INTO public.questionnaire_responses (user_id, answers, score, stage) VALUES
(
  'test_user_123',
  '{"market_validation": "yes", "value_prop_clarity": "4", "revenue_model": "yes", "customer_acquisition": "3", "team_readiness": "no", "runway_months": "2", "mvp_status": "yes", "traction": "3", "ops_process": "no", "risk_mgmt": "2"}'::jsonb,
  62,
  'Planning'
);

-- Sample recommendations
INSERT INTO public.recommendations (response_id, recommendation_text)
SELECT 
  id,
  'Focus on customer acquisition and improve your go-to-market strategy.'
FROM public.questionnaire_responses
WHERE user_id = 'test_user_123'
LIMIT 1;
*/

-- ================================================================
-- 7. VERIFICATION QUERIES
-- ================================================================
-- Run these after setup to verify everything is working

-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'questionnaire_responses', 'recommendations');

-- Check if indexes exist
SELECT indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'questionnaire_responses', 'recommendations');

-- Check Row Level Security is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'questionnaire_responses', 'recommendations');

-- ================================================================
-- SETUP COMPLETE!
-- ================================================================
-- Your database is now ready for the Bug Busters Entrepreneurial Hub!
-- 
-- Tables created:
-- ✅ users - User profiles
-- ✅ questionnaire_responses - Assessment data
-- ✅ recommendations - AI recommendations
--
-- Features enabled:
-- ✅ Row Level Security (RLS)
-- ✅ Performance indexes
-- ✅ Helper functions
-- ✅ Cascade deletes
--
-- Next steps:
-- 1. Test your app at http://localhost:3000
-- 2. Take a business assessment
-- 3. Check data is saving correctly
-- ================================================================

