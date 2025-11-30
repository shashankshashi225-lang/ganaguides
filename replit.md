# Sacred Journey - Pilgrimage Booking Platform

## Project Overview
A full-stack TypeScript application for pilgrimage bookings and spiritual travel to sacred Indian cities like Varanasi and Ayodhya. Users can browse destinations, packages, blog posts, and view panchang (Hindu calendar) events.

## Current State
- **Frontend**: React + TypeScript with Tailwind CSS and Radix UI components
- **Backend**: Express.js with Drizzle ORM
- **Database**: PostgreSQL (Neon) for production data storage
- **Deployment Target**: Vercel

## Key Features
- Destinations showcase (Varanasi, Ayodhya, Sarnath, Prayagraj)
- Pilgrimage packages (touristic, puja ceremonies, popular events)
- Blog posts about spiritual destinations and travel tips
- Panchang events (Hindu calendar events)
- Video testimonials from visitors
- Responsive design with dark mode support

## Database Setup
**Environment Variables Required:**
- `DATABASE_URL`: PostgreSQL connection string from Neon

**Tables:**
- destinations
- packages
- blog_posts
- panchang_events
- video_testimonials
- users

**To set up schema:**
```bash
npm run db:push
```

## Content Management
Users edit data directly in Neon database through its SQL editor. No admin panel is provided. Update any table directly:
- Add/edit/delete destinations in `destinations` table
- Add packages in `packages` table
- Create blog posts in `blog_posts` table
- Add panchang events in `panchang_events` table
- Add video testimonials in `video_testimonials` table

## API Endpoints
- `GET /api/destinations` - List all destinations
- `GET /api/destinations/:id` - Get single destination
- `GET /api/packages` - List all packages
- `GET /api/blog-posts` - List all blog posts
- `GET /api/panchang-events?year=2024&month=11` - Get events by month
- `GET /api/video-testimonials` - List all testimonials

## Development
```bash
npm install
npm run dev
```

App runs on port 5000 with hot reload.

## Build & Deploy
```bash
npm run build
npm run start
```

Built assets are in `dist/public/` for frontend and `dist/index.js` for backend.

## Deployment to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set `DATABASE_URL` environment variable in Vercel project settings
4. Deploy - Vercel will automatically run `npm run build`

## File Structure
- `client/src/` - React frontend
- `server/` - Express backend and database setup
- `shared/schema.ts` - Drizzle ORM schema definitions
- `public/` - Static assets
