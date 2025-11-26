# GangaGuides - Vercel Deployment Guide

This guide will help you deploy GangaGuides to Vercel step by step.

## Before You Start

Your project is already configured for Vercel deployment. The following files are set up:
- `vercel.json` - Vercel configuration
- `api/index.js` - Serverless API function
- `.gitignore` - Files to exclude from Git

## Step 1: Download Your Project

1. In Replit, click the three dots menu (⋮) in the Files panel
2. Select "Download as zip"
3. Save the ZIP file to your computer
4. Extract the ZIP file to a folder

## Step 2: Push to GitHub

### If you don't have Git installed:
1. Download and install Git from https://git-scm.com/downloads
2. Open your terminal or command prompt

### Create a GitHub Repository:
1. Go to https://github.com and sign in
2. Click the "+" icon → "New repository"
3. Name it `gangaguides` (or any name you prefer)
4. Keep it Public or Private (your choice)
5. Do NOT initialize with README (we already have files)
6. Click "Create repository"

### Push your code:
Open terminal/command prompt in your extracted project folder:

```bash
# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - GangaGuides website"

# Connect to your GitHub repository (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/gangaguides.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com and sign up/sign in (use "Continue with GitHub")
2. Click "Add New..." → "Project"
3. Find and select your `gangaguides` repository
4. Vercel will auto-detect the settings from `vercel.json`
5. Click "Deploy"
6. Wait 2-3 minutes for deployment to complete

## Step 4: Connect Your Domain

After deployment:
1. Go to your project dashboard on Vercel
2. Click "Settings" → "Domains"
3. Click "Add"
4. Enter your domain name (e.g., `gangaguides.com`)
5. Vercel will show you DNS records to add
6. Go to your domain registrar and add these records:
   - For root domain: Add an A record pointing to Vercel's IP
   - For www: Add a CNAME record pointing to `cname.vercel-dns.com`
7. Wait for DNS propagation (can take up to 48 hours, usually faster)

## Troubleshooting

### Images not showing?
Make sure the `client/public/assets/generated_images/` folder is included in your Git repository.

### API not working?
Check that the `api/index.js` file is present in your repository.

### Build failing?
1. Go to Vercel dashboard → Your project → "Deployments"
2. Click on the failed deployment
3. Check the build logs for errors
4. Common fixes:
   - Make sure all files are committed to Git
   - Ensure `node_modules` is in `.gitignore`

### Page showing 404?
The `vercel.json` rewrites should handle this. Make sure the file exists and is pushed to GitHub.

## Updating Your Site

After initial deployment, updates are automatic:
1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel automatically deploys the new version!

## Environment Variables (Optional)

If you need to add environment variables later:
1. Go to Vercel dashboard → Your project → "Settings" → "Environment Variables"
2. Add your variables (e.g., `WHATSAPP_NUMBER`)
3. Redeploy for changes to take effect

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- GitHub Documentation: https://docs.github.com

---

Your GangaGuides website is now ready for the world to see! 🙏
