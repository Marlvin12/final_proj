# Environment Setup Guide

This guide will help you set up all the required environment variables for the Bug Busters Entrepreneurial Hub application.

## Required Services

You'll need to set up accounts and get API keys from the following services:

1. **Clerk** - Authentication
2. **Supabase** - Database
3. **OpenAI** - AI Chat and Recommendations
4. **Eleven Labs** - Voice Advice

## Step-by-Step Setup

### 1. Clerk (Authentication)

1. Go to [clerk.com](https://clerk.com) and sign up
2. Create a new application
3. Copy your publishable key and secret key
4. Add to `.env.local`:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

### 2. Supabase (Database)

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Once created, go to Settings > API
4. Copy your project URL and anon key
5. Go to Settings > Database and copy the service role key
6. Add to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
   ```
7. Run the schema from `src/database/schema.sql` in the Supabase SQL editor

### 3. OpenAI (AI Features)

1. Go to [platform.openai.com](https://platform.openai.com) and sign up
2. Go to API Keys section
3. Create a new API key
4. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```

### 4. Eleven Labs (Voice Advice & Conversational AI)

1. Go to [elevenlabs.io](https://elevenlabs.io) and sign up
2. Go to your profile and copy your API key
3. Browse voices and copy the Voice ID you want to use (default: EXAVITQu4vr4xnSDxMaL)
4. (Optional) Set up a Conversational AI agent:
   - Go to the Agents Platform
   - Create a new agent or use existing
   - Copy the Agent ID (e.g., agent_4801k5a2j62bek08gqt2wacgx33s)
5. Add to `.env.local`:
   ```
   ELEVEN_LABS_API_KEY=...
   ELEVEN_LABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
   ```

**Note**: The Conversational AI widget is hardcoded with agent ID `agent_4801k5a2j62bek08gqt2wacgx33s`. To use your own agent, update the `AGENT_ID` constant in `src/components/ElevenLabsWidget.tsx`.

## Final `.env.local` File

Your complete `.env.local` file should look like this:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI
OPENAI_API_KEY=sk-your_key_here

# Eleven Labs
ELEVEN_LABS_API_KEY=your_key_here
ELEVEN_LABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
```

## Database Setup

After setting up Supabase, run the following SQL in the Supabase SQL editor:

```sql
-- See src/database/schema.sql for the complete schema
```

The schema will create:
- `users` table for user profiles
- `questionnaire_responses` table for assessment responses
- `recommendations` table for AI-generated recommendations
- Row Level Security policies for data protection

## Installation

1. Copy `.env.example` to `.env.local`
2. Fill in all the environment variables
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`

## Verification

To verify your setup:

1. Start the dev server
2. Navigate to the app in your browser
3. Sign up with a test account
4. Take the business assessment
5. Check that:
   - Results are saved to Supabase
   - Charts display correctly
   - Voice advice generates audio
   - Chat works with AI assistant

## Troubleshooting

### Voice Advice Not Working
- Verify your Eleven Labs API key is valid
- Check that you have credits in your Eleven Labs account
- Try a different voice ID if the default doesn't work

### Database Errors
- Ensure you've run the schema.sql in Supabase
- Check that Row Level Security policies are properly set
- Verify your service role key is correct

### OpenAI Errors
- Check your API key is valid
- Ensure you have credits in your OpenAI account
- Verify you're using a supported model (gpt-4 or gpt-3.5-turbo)

### Authentication Issues
- Verify Clerk keys are correct
- Check that you've properly configured your Clerk application
- Ensure middleware.ts is properly configured

## Security Notes

1. Never commit `.env.local` to version control
2. Keep your service role key secure
3. Use environment variables for all sensitive data
4. Regularly rotate API keys
5. Monitor API usage to prevent unauthorized access

