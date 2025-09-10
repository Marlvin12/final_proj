-- database/schema.sql
-- Database schema for Business Assessment App
-- Run this in Supabase SQL editor

-- Enable Row Level Security (RLS) for all tables
-- This ensures users can only access their own data

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  role TEXT DEFAULT 'user'
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Questionnaire responses table
CREATE TABLE IF NOT EXISTS public.questionnaire_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  answers JSONB NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  stage TEXT NOT NULL CHECK (stage IN ('Idea', 'Research', 'Planning', 'Launch', 'Scaling')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on questionnaire_responses table
ALTER TABLE public.questionnaire_responses ENABLE ROW LEVEL SECURITY;

-- Users can only see their own responses
CREATE POLICY "Users can view own responses" ON public.questionnaire_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses" ON public.questionnaire_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own responses" ON public.questionnaire_responses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own responses" ON public.questionnaire_responses
  FOR DELETE USING (auth.uid() = user_id);

-- Recommendations table
CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  response_id UUID REFERENCES public.questionnaire_responses(id) ON DELETE CASCADE NOT NULL,
  recommendation_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on recommendations table
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Users can only see recommendations for their own responses
CREATE POLICY "Users can view own recommendations" ON public.recommendations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.questionnaire_responses
      WHERE questionnaire_responses.id = recommendations.response_id
      AND questionnaire_responses.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert recommendations" ON public.recommendations
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.questionnaire_responses
      WHERE questionnaire_responses.id = recommendations.response_id
      AND questionnaire_responses.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_user_id ON public.questionnaire_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_questionnaire_responses_created_at ON public.questionnaire_responses(created_at);
CREATE INDEX IF NOT EXISTS idx_recommendations_response_id ON public.recommendations(response_id);