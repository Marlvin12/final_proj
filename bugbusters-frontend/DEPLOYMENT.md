# Deployment Guide

This guide covers deploying the Bug Busters Entrepreneurial Hub to Vercel.

## Prerequisites

- A GitHub account
- All environment variables configured
- Supabase database set up
- API keys for Clerk, OpenAI, and Eleven Labs

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Configure your project:
   - Framework Preset: Next.js
   - Root Directory: `bugbusters-frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Set Environment Variables

In the Vercel project settings, add all environment variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
OPENAI_API_KEY=sk-...
ELEVEN_LABS_API_KEY=...
ELEVEN_LABS_VOICE_ID=...
```

### 4. Deploy

Click "Deploy" and wait for the build to complete.

### 5. Update Clerk Settings

1. Go to your Clerk dashboard
2. Navigate to Settings > Domains
3. Add your Vercel domain (e.g., `your-app.vercel.app`)

### 6. Verify Deployment

1. Visit your deployed application
2. Test all features:
   - Sign up/login
   - Take assessment
   - View results with charts
   - Generate voice advice
   - Use chat feature

## Production Considerations

### Database

- Ensure Supabase is on a production plan
- Set up proper backup schedules
- Monitor database performance

### API Keys

- Use production API keys
- Set appropriate rate limits
- Monitor API usage and costs

### Security

- Enable HTTPS only
- Configure CORS properly
- Set up CSP headers
- Enable rate limiting
- Monitor for suspicious activity

### Performance

- Enable Next.js Image Optimization
- Configure caching headers
- Use CDN for static assets
- Monitor Core Web Vitals

### Monitoring

- Set up error tracking (e.g., Sentry)
- Configure analytics (e.g., Google Analytics)
- Monitor API response times
- Set up uptime monitoring

## Environment-Specific Configuration

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

### Staging

Consider setting up a staging environment:

1. Create a separate Vercel project
2. Use different API keys (if available)
3. Use a separate Supabase project
4. Test thoroughly before promoting to production

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- `main` branch deploys to production
- Other branches create preview deployments
- Pull requests get automatic preview URLs

## Rollback

If you need to rollback:

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Find the previous stable deployment
4. Click "Promote to Production"

## Custom Domain

To use a custom domain:

1. Go to Vercel project settings
2. Navigate to Domains
3. Add your custom domain
4. Configure DNS records as instructed
5. Wait for SSL certificate to provision

## Cost Estimation

### Vercel
- Hobby plan: Free (recommended for development)
- Pro plan: $20/month (recommended for production)

### Supabase
- Free tier: Good for testing
- Pro plan: $25/month (recommended for production)

### OpenAI
- Pay-as-you-go based on usage
- Estimate: ~$0.002 per chat message (GPT-4)
- Estimate: ~$0.0004 per chat message (GPT-3.5-turbo)

### Eleven Labs
- Free tier: 10,000 characters/month
- Starter: $5/month for 30,000 characters
- Creator: $22/month for 100,000 characters

## Support

For deployment issues:
- Check Vercel deployment logs
- Review Supabase logs
- Monitor API error responses
- Check browser console for client errors

