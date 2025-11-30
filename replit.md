# GangaGuides - Pilgrimage Booking Platform

## Project Overview
A full-stack TypeScript application for pilgrimage bookings and spiritual travel to sacred Indian cities like Varanasi, Ayodhya, Sarnath, and Prayagraj. Users can browse destinations, packages, blog posts, and view panchang (Hindu calendar) events.

## Current State
- **Frontend**: React + TypeScript with Tailwind CSS and Radix UI components
- **Backend**: Express.js with Drizzle ORM
- **Database**: PostgreSQL (Neon) for production data storage
- **Deployment Target**: Vercel

## Key Features
- Destinations showcase (Varanasi, Ayodhya, Sarnath, Prayagraj + temples)
- Pilgrimage packages (touristic, puja ceremonies, popular events)
- Blog posts about spiritual destinations and travel tips
- Panchang events (Hindu calendar events)
- Video testimonials from visitors
- Booking inquiry system
- Responsive design with dark mode support

## Database Content Visibility Controls
Each content table supports two visibility flags:
- `is_visible` (boolean): Controls whether item appears on listing pages
- `featured` (boolean): Controls whether item appears on homepage

**Example SQL to feature an item:**
```sql
UPDATE destinations SET featured = true WHERE id = 'varanasi';
```

**Example SQL to hide an item:**
```sql
UPDATE destinations SET is_visible = false WHERE id = 'some-destination';
```

## Database Tables
- `destinations` - Sacred places to visit
- `packages` - Tour packages and offerings
- `blog_posts` - Travel blog content
- `panchang_events` - Hindu calendar events
- `video_testimonials` - Customer video reviews
- `bookings` - Customer booking inquiries
- `users` - Admin users (if needed)

## API Endpoints
### Public Listing (visible items only)
- `GET /api/destinations` - List visible destinations
- `GET /api/packages` - List visible packages
- `GET /api/blog-posts` - List visible blog posts
- `GET /api/panchang-events` - List visible events
- `GET /api/video-testimonials` - List visible testimonials

### Featured (for homepage)
- `GET /api/destinations/featured` - Featured destinations
- `GET /api/packages/featured` - Featured packages
- `GET /api/blog-posts/featured` - Featured blog posts
- `GET /api/panchang-events/featured` - Featured events
- `GET /api/video-testimonials/featured` - Featured testimonials

### Single Item (by ID)
- `GET /api/destinations/:id` - Get single destination
- `GET /api/packages/:id` - Get single package
- `GET /api/blog-posts/:id` - Get single blog post
- `GET /api/panchang-events/:id` - Get single event

### Bookings
- `GET /api/bookings` - List all booking inquiries
- `POST /api/bookings` - Create new booking inquiry
- `PATCH /api/bookings/:id` - Update booking status

## Content Management
Edit data directly in Neon database SQL editor. Changes reflect immediately on the website.

### Adding New Content
See `scripts/seed-db.sql` for example INSERT statements.

### Common Operations
```sql
-- Make an item visible on homepage
UPDATE destinations SET featured = true WHERE name = 'Varanasi';

-- Hide an item from the website
UPDATE packages SET is_visible = false WHERE id = 'some-package';

-- Add a new panchang event
INSERT INTO panchang_events (id, date, name, description, type, significance, featured, is_visible)
VALUES ('new-event', '2026-04-01', 'Event Name', 'Description', 'Festival', 'Significance text', true, true);

-- View all bookings
SELECT * FROM bookings ORDER BY created_at DESC;

-- Update booking status
UPDATE bookings SET status = 'confirmed' WHERE id = 'booking-id';
```

## Development
```bash
npm install
npm run dev
```
App runs on port 5000 with hot reload.

## Database Setup
1. Create a Neon PostgreSQL database
2. Set `DATABASE_URL` environment variable
3. Run schema creation: `scripts/init-db.sql`
4. Seed data: `scripts/seed-db.sql`

## Build & Deploy
```bash
npm run build
npm run start
```

## Deployment to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables:
   - `DATABASE_URL` - Neon PostgreSQL connection string
   - `VITE_WHATSAPP_NUMBER` - WhatsApp contact number
4. Deploy

## File Structure
- `client/src/` - React frontend
- `server/` - Express backend and database setup
- `shared/schema.ts` - Drizzle ORM schema definitions
- `scripts/` - Database initialization and seed scripts
- `public/` - Static assets

## Recent Changes
- Added `is_visible` and `featured` columns to all content tables
- Created `/api/*/featured` endpoints for homepage content
- Added `bookings` table for customer inquiries
- Homepage now displays only featured items
- Listing pages show only visible items
