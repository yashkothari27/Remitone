# Remitone Website - Deployment Guide

This guide provides step-by-step instructions for deploying the Remitone fintech website to production.

## Prerequisites

Before deploying, ensure you have:

- Node.js 20+ installed
- npm or yarn package manager
- Git repository access
- Domain name configured
- Hosting platform account (Vercel recommended)

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

```bash
# Remitone Platform URL
NEXT_PUBLIC_REMITONE_PLATFORM_URL=https://app.remitone.com

# Email Configuration (for contact form)
EMAIL_FROM=noreply@remitone.com
EMAIL_TO=support@remitone.com
EMAIL_API_KEY=your_email_service_api_key

# reCAPTCHA (Google reCAPTCHA v3)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# Remitone FX API (for live calculator)
REMITONE_API_KEY=your_api_key
REMITONE_API_URL=https://api.remitone.com

# Analytics (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform as it's optimized for Next.js applications.

#### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository (GitHub, GitLab, or Bitbucket)

3. **Configure Project**:
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Add Environment Variables**:
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Ensure you add them for all environments (Production, Preview, Development)

5. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your site
   - You'll receive a `.vercel.app` domain

6. **Custom Domain**:
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `www.remitone.com`)
   - Follow DNS configuration instructions
   - SSL is automatically configured

#### Vercel CLI Deployment:

```bash
# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# The CLI will guide you through the process
```

### Option 2: Netlify

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (leave empty)

3. **Environment Variables**:
   - Go to Site settings → Build & deploy → Environment
   - Add all environment variables

4. **Deploy**:
   - Click "Deploy site"
   - Configure custom domain under Domain settings

### Option 3: AWS S3 + CloudFront

For static hosting on AWS:

1. **Export Static Site**:
   ```bash
   npm run build
   npx next export
   ```
   Note: Some features (API routes, SSR) won't work with static export.

2. **Create S3 Bucket**:
   ```bash
   aws s3 mb s3://remitone-website
   aws s3 website s3://remitone-website --index-document index.html --error-document 404.html
   ```

3. **Upload Files**:
   ```bash
   aws s3 sync out/ s3://remitone-website --delete
   ```

4. **Configure CloudFront**:
   - Create CloudFront distribution
   - Set S3 bucket as origin
   - Configure SSL certificate
   - Set up custom domain

5. **DNS Configuration**:
   - Point your domain to CloudFront distribution
   - Configure SSL/TLS certificate in AWS Certificate Manager

## DNS Configuration

### For Vercel/Netlify:

1. Add CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: [your-site].vercel.app (or netlify.app)
   ```

2. Add A record for apex domain:
   ```
   Type: A
   Name: @
   Value: [Platform's IP - provided by Vercel/Netlify]
   ```

### For AWS CloudFront:

1. Add CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: [cloudfront-distribution-id].cloudfront.net
   ```

## Post-Deployment Checklist

### 1. Verify Pages Load Correctly
- [ ] Home page
- [ ] Pricing page
- [ ] Countries page
- [ ] How It Works page
- [ ] Mobile App page
- [ ] About Us page
- [ ] Contact page
- [ ] FAQ page
- [ ] Partners page
- [ ] AIMSFX page
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Cookie Policy
- [ ] Complaints Procedure

### 2. Test Functionality
- [ ] Navigation menu (desktop and mobile)
- [ ] Contact form submission
- [ ] FAQ accordion expand/collapse
- [ ] All CTA buttons redirect to Remitone platform
- [ ] Currency converter (if API is integrated)
- [ ] Mobile responsiveness on various devices

### 3. Performance & SEO
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Verify meta tags and OG images
- [ ] Test page load speed
- [ ] Check Core Web Vitals
- [ ] Verify SSL certificate is active
- [ ] Test on multiple browsers (Chrome, Safari, Firefox, Edge)

### 4. Security
- [ ] HTTPS is enforced
- [ ] Security headers are configured
- [ ] CAPTCHA is working (when integrated)
- [ ] Environment variables are not exposed
- [ ] API keys are properly secured

## Continuous Deployment

Both Vercel and Netlify support automatic deployments:

1. **Automatic Production Deploys**:
   - Push to `main` or `master` branch triggers production deployment

2. **Preview Deployments**:
   - Pull requests automatically get preview URLs
   - Test changes before merging

3. **Environment Branches**:
   - Configure different environments (staging, production)
   - Use branch-specific environment variables

## Monitoring & Analytics

### Google Analytics Setup:

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Add measurement ID to environment variables
3. Analytics is automatically tracked via `layout.tsx`

### Error Tracking (Optional):

Consider integrating error tracking:
- Sentry
- LogRocket
- Datadog

## Rolling Back Deployments

### Vercel:
- Go to Deployments tab
- Find previous successful deployment
- Click "Promote to Production"

### Netlify:
- Go to Deploys tab
- Find previous deploy
- Click "Publish deploy"

## Support & Troubleshooting

### Common Issues:

**Build Failures:**
- Check Node.js version (should be 20+)
- Verify all dependencies are installed
- Check build logs for specific errors

**Environment Variables Not Working:**
- Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Rebuild after adding environment variables

**API Route Issues:**
- Verify serverless function limits on your platform
- Check API endpoint configurations

**Slow Page Loads:**
- Enable caching headers
- Optimize images
- Check CDN configuration

## Updates & Maintenance

### Updating Content:
1. Make changes in your local environment
2. Test locally with `npm run dev`
3. Commit and push to repository
4. Automatic deployment triggers

### Updating Dependencies:
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update Next.js specifically
npm install next@latest react@latest react-dom@latest
```

## Security Best Practices

1. **Regular Updates**: Keep dependencies updated
2. **Environment Variables**: Never commit `.env.local` to Git
3. **Rate Limiting**: Implement rate limiting for contact form
4. **CAPTCHA**: Enable and test reCAPTCHA
5. **HTTPS Only**: Ensure all traffic uses HTTPS
6. **CSP Headers**: Configure Content Security Policy

## Performance Optimization

1. **Image Optimization**: Next.js automatically optimizes images
2. **Code Splitting**: Automatic with Next.js
3. **Caching**: Configure CDN caching rules
4. **Compression**: Enable Gzip/Brotli compression

## Contact & Support

For deployment assistance:
- Email: devops@remitone.com
- Documentation: [Internal wiki link]

---

**Last Updated:** February 13, 2026  
**Maintained by:** Remitone Development Team
