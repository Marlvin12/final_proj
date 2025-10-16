# Deploying to Vercel

This guide will walk you through deploying your Entrepreneurial Hub to Vercel.

## Prerequisites

- GitHub account with your repository
- Vercel account (free tier is sufficient)
- All API keys from `ENV_SETUP.md`

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and connect with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Your Project

1. Click "Add New Project" or "Import Project"
2. Select your GitHub repository: `bugbusters---SENIOR-PROJECT`
3. Vercel will auto-detect Next.js configuration

### Step 3: Configure Build Settings

Vercel should auto-detect these, but verify:

- **Framework Preset**: Next.js
- **Root Directory**: `bugbusters-frontend`
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

### Step 4: Add Environment Variables

Click "Environment Variables" and add these (get values from your `.env.local`):

#### Supabase (Required)
```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
```

#### Clerk Authentication (Required)
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = your_clerk_publishable_key
CLERK_SECRET_KEY = your_clerk_secret_key
```

#### OpenAI (Required for AI features)
```
OPENAI_API_KEY = your_openai_api_key
```

#### Eleven Labs (Required for voice features)
```
ELEVEN_LABS_API_KEY = your_eleven_labs_api_key
ELEVEN_LABS_VOICE_ID = EXAVITQu4vr4xnSDxMaL
```

**Important**: 
- Make sure all variables are set for "Production", "Preview", and "Development" environments
- Never commit these values to GitHub
- Clerk keys must be valid production keys (not test keys for production deployment)

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for the build to complete
3. Vercel will provide you with a live URL (e.g., `your-app.vercel.app`)

### Step 6: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to update your DNS settings

### Step 7: Update Clerk Settings

After deployment, update your Clerk application settings:

1. Go to [clerk.com](https://clerk.com) dashboard
2. Select your application
3. Go to "Settings" → "Domains"
4. Add your Vercel domain (e.g., `your-app.vercel.app`)
5. Update redirect URLs if needed

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from Project Directory

```bash
cd /Users/malvin/Desktop/bugbusters---SENIOR-PROJECT/bugbusters-frontend
vercel
```

Follow the prompts:
- Link to existing project or create new one
- Confirm settings
- Add environment variables when prompted

### Step 4: Deploy to Production

```bash
vercel --prod
```

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify authentication works (sign up/sign in)
- [ ] Test assessment flow
- [ ] Verify AI chat functionality
- [ ] Test voice advice feature
- [ ] Check Eleven Labs conversational widget
- [ ] Verify database connections (Supabase)
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Review deployment analytics in Vercel dashboard

## Troubleshooting

### Build Fails

**Issue**: Build fails with dependency errors
**Solution**: 
```bash
cd bugbusters-frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```
If successful locally, redeploy to Vercel.

### Environment Variables Not Working

**Issue**: Features not working after deployment
**Solution**:
1. Go to Vercel dashboard → Your Project → Settings → Environment Variables
2. Verify all variables are set
3. Make sure they're enabled for "Production" environment
4. Redeploy after adding/updating variables

### Clerk Authentication Errors

**Issue**: "Invalid publishable key" or redirect errors
**Solution**:
1. Ensure you're using production keys (not test keys)
2. Add your Vercel domain to Clerk's allowed domains
3. Update `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in Vercel env vars

### Database Connection Issues

**Issue**: Data not saving/loading
**Solution**:
1. Verify Supabase environment variables are correct
2. Check Supabase project is not paused (free tier pauses after inactivity)
3. Verify RLS policies are set up correctly
4. Check Supabase logs for connection errors

### API Rate Limits

**Issue**: OpenAI or Eleven Labs features stop working
**Solution**:
1. Check your API usage in respective dashboards
2. Upgrade plans if needed
3. Implement rate limiting in your application

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

1. **Push to `main` branch** = Production deployment
2. **Push to other branches** = Preview deployment
3. **Pull requests** = Automatic preview deployments

To trigger a new deployment:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will automatically build and deploy within 2-3 minutes.

## Performance Optimization

After deployment, consider:

1. **Enable Analytics**: Vercel Dashboard → Analytics
2. **Set up monitoring**: Check Core Web Vitals
3. **Review logs**: Vercel Dashboard → Functions (for API routes)
4. **Optimize images**: Use Next.js Image component
5. **Enable caching**: Vercel does this automatically for static assets

## Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Community**: https://github.com/vercel/vercel/discussions
- **Your Repository**: https://github.com/Jaylon03/bugbusters---SENIOR-PROJECT

## Production URL

After deployment, your app will be live at:
- **Default**: `https://your-project-name.vercel.app`
- **Custom Domain**: (if configured)

Share this URL with your team and users!

---

**Note**: Keep your API keys secure and never share them publicly. Use Vercel's environment variables for all sensitive data.

