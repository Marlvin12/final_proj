# Quick Start Guide

Get your Entrepreneurial Hub up and running in minutes!

## ✅ Current Status

Your app is already running with:
- ✅ **Supabase Database** - Connected and ready
- ✅ **Clerk Authentication** - Keyless mode (claim your keys below)
- ✅ **UI & Charts** - Fully functional
- ⏳ **AI Features** - Need API keys (optional)
- ⏳ **Voice Features** - Need API keys (optional)

## 🚀 Running the App

```bash
cd /Users/malvin/Desktop/bugbusters---SENIOR-PROJECT/bugbusters-frontend
npm run dev
```

Visit: **http://localhost:3000**

## 🔑 Claim Your Clerk Keys (Required)

Clerk is running in keyless development mode. To claim your free keys:

1. Visit the link shown in your terminal:
   ```
   https://dashboard.clerk.com/apps/claim?token=u2r7w2pikg039pe8povt2yvuylwkjlqw7p2xqu5c&return_url=http%3A%2F%2Flocalhost%3A3000%2F
   ```

2. Or manually set up:
   - Go to https://clerk.com
   - Sign up for free
   - Create a new application
   - Copy the keys and add to `.env.local`:
     ```env
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
     CLERK_SECRET_KEY=sk_test_...
     ```

## 🗄️ Set Up Database (Required for saving data)

1. Go to your Supabase dashboard:
   **https://qwbtbsmsgqeujdilqqdl.supabase.co**

2. Navigate to: **SQL Editor**

3. Copy the SQL from: `src/database/schema.sql`

4. Paste and click **Run**

This creates all the tables and security policies needed to save:
- User assessments
- AI recommendations
- Progress tracking

## 🤖 Optional: Enable AI Features

### OpenAI (For Chat & Recommendations)

1. Go to https://platform.openai.com
2. Sign up and create an API key
3. Add to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-...
   ```

**Cost:** ~$0.002 per chat message with GPT-4

### Eleven Labs (For Voice Advice)

1. Go to https://elevenlabs.io
2. Sign up (free tier available)
3. Get your API key
4. Add to `.env.local`:
   ```env
   ELEVEN_LABS_API_KEY=...
   ELEVEN_LABS_VOICE_ID=EXAVITQu4vr4xnSDxMaL
   ```

**Free Tier:** 10,000 characters/month

## 🎯 What Works Right Now

Without any additional setup:
- ✅ Sign up and login
- ✅ Take business assessment
- ✅ View results with charts
- ✅ See recommendations
- ✅ Download PDF reports

With AI keys added:
- ✅ AI-powered chat assistant
- ✅ Dynamic AI recommendations
- ✅ Voice-narrated advice

## 📝 Testing the App

1. **Create an account** at http://localhost:3000
2. **Go to Business Questions** (in sidebar)
3. **Answer the 10 questions**
4. **View your results** with:
   - Overall readiness score
   - Interactive charts (bar, radar, doughnut)
   - Personalized roadmap
   - Curated resources
   - Voice advice (if Eleven Labs configured)
5. **Try the chat** to ask business questions

## 🔧 Troubleshooting

### "Voice Feature Unavailable"
- This is normal without Eleven Labs API key
- The app works fine, this feature is optional
- Charts and all other features work perfectly

### "AI chat not responding properly"
- This is normal without OpenAI API key
- You'll get a message directing you to get an API key
- All other features work fine

### Database not saving results
- Run the SQL schema in Supabase SQL Editor
- Check your Supabase URL and keys in `.env.local`
- Restart the dev server

### Build errors
- Use `npm run dev` for development
- Only build for production deployment
- Make sure all required env vars are set

## 📚 Documentation

- **Full Setup**: `ENV_SETUP.md`
- **Features**: `FEATURES.md`
- **Deployment**: `DEPLOYMENT.md`
- **Project Info**: `README.md`

## 🎓 Demo Accounts

For testing, you can create multiple accounts with different business scenarios:
- Early stage startup (low scores)
- Growing business (medium scores)
- Established company (high scores)

Each will get different recommendations and roadmaps!

## 🚢 Deployment

When ready to deploy:

1. Push to GitHub
2. Deploy to Vercel (see `DEPLOYMENT.md`)
3. Add all environment variables in Vercel
4. Use production API keys

## 💡 Tips

- **Charts work offline** - No API keys needed
- **Database is optional** - App works without saving (for quick testing)
- **Voice is a nice-to-have** - Not required for core functionality
- **Start simple** - Get basic flow working first, add AI features later

## ❓ Need Help?

Check the terminal output for:
- Server status
- Any errors
- API call responses
- Compilation issues

Your app is running at: **http://localhost:3000**

Happy coding! 🎉

