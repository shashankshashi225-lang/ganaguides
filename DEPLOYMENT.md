# GangaGuides - Vercel Deployment Guide

This guide will help you deploy GangaGuides to Vercel with Neon database integration.

## Before You Start

Your project is already configured for Vercel deployment. The following files are set up:
- `vercel.json` - Vercel configuration
- `api/index.js` - Serverless API function (connects to Neon database)
- `scripts/init-db.sql` - Database schema creation script
- `scripts/seed-db.sql` - Initial data seeding script
- `.gitignore` - Files to exclude from Git

## Step 1: Set Up Your Neon Database

### Create a Neon Account and Database:
1. Go to https://neon.tech and sign up (free tier available)
2. Create a new project (e.g., "gangaguides")
3. Copy your connection string - it looks like:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### Database Setup (Automatic):
**Good news!** The database tables and initial data are created automatically when your app starts for the first time. You don't need to run any SQL manually.

When you deploy to Vercel with the DATABASE_URL set, the app will:
1. Automatically create all required tables (destinations, packages, blog_posts, etc.)
2. Automatically seed initial content (sample destinations, packages, events)

This happens on the first request to your deployed app. Just make sure DATABASE_URL is set correctly in Vercel.

### Manual Setup (Optional):
If you prefer to set up the database manually, you can use these SQL scripts:
- `scripts/init-db.sql` - Creates all tables
- `scripts/seed-db.sql` - Adds initial data

Run them in Neon's SQL Editor if needed.

## Step 2: Download Your Project

1. In Replit, click the three dots menu (⋮) in the Files panel
2. Select "Download as zip"
3. Save the ZIP file to your computer
4. Extract the ZIP file to a folder

## Step 3: Push to GitHub

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

## Step 4: Deploy to Vercel

1. Go to https://vercel.com and sign up/sign in (use "Continue with GitHub")
2. Click "Add New..." → "Project"
3. Find and select your `gangaguides` repository
4. Vercel will auto-detect the settings from `vercel.json`

### Configure Environment Variables:
Before clicking Deploy, expand "Environment Variables" and add:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `VITE_WHATSAPP_NUMBER` | Your WhatsApp number (e.g., 918468003094) |

5. Click "Deploy"
6. Wait 2-3 minutes for deployment to complete

## Step 5: Connect Your Domain

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

## Managing Content via Neon Database

Since there's no admin panel, you can manage all content directly through Neon's SQL Editor:

### Adding a New Destination:
```sql
INSERT INTO destinations (id, name, short_description, description, main_image, region, featured)
VALUES (
  'new-destination-id',
  'Destination Name',
  'Short description here',
  'Full description here',
  '/generated_images/image-name.png',
  'Region Name',
  true
);
```

### Updating a Package:
```sql
UPDATE packages 
SET price = 5000, featured = true 
WHERE id = '1day-kashi';
```

### Adding a New Blog Post:
```sql
INSERT INTO blog_posts (id, title, excerpt, content, category, published_date, read_time, main_image, featured)
VALUES (
  'new-post-id',
  'Post Title',
  'Short excerpt',
  'Full content here',
  'Category',
  'Nov 30, 2025',
  '5 min read',
  '/generated_images/image-name.png',
  true
);
```

### Deleting Content:
```sql
DELETE FROM destinations WHERE id = 'destination-id';
DELETE FROM packages WHERE id = 'package-id';
DELETE FROM blog_posts WHERE id = 'post-id';
```

## Image Paths

When adding content, use these image path formats:
- For images in `client/public/generated_images/`: `/generated_images/filename.png`
- For images in `client/public/assets/`: `/assets/filename.png`

## Troubleshooting

### Images not showing?
Make sure the `client/public/generated_images/` folder is included in your Git repository.

### API returning "Database not configured"?
1. Check that `DATABASE_URL` is set in Vercel Environment Variables
2. Redeploy after adding the environment variable

### API returning empty arrays?
1. The database should auto-seed on first startup. Check the Vercel logs for any errors.
2. In Neon SQL Editor, verify tables exist: `SELECT COUNT(*) FROM destinations;`
3. If tables don't exist, check that DATABASE_URL is correct and redeploy.

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

## Database Schema Reference

### Tables:
- `destinations` - Travel destinations (Varanasi, Ayodhya, etc.)
- `packages` - Tour packages with categories (touristic, pooja, popular_event)
- `blog_posts` - Blog articles
- `panchang_events` - Hindu calendar events
- `video_testimonials` - Instagram testimonial embeds

### Categories for Packages:
- `touristic` - Day tours and multi-day trips
- `pooja` - Religious ceremonies and rituals
- `popular_event` - Festival and event packages

## Need Help?

- Vercel Documentation: https://vercel.com/docs
- Neon Documentation: https://neon.tech/docs
- GitHub Documentation: https://docs.github.com

---

Your GangaGuides website is now ready for the world to see!
