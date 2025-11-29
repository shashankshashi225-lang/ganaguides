# GangaGuides - Spiritual Travel Website

## Overview

GangaGuides is a spiritual travel website focused on authentic tours in Varanasi, Ayodhya, Sarnath, and Prayagraj. The platform serves as a lead generation tool, guiding visitors to book tours through WhatsApp integration or contact forms. The site emphasizes spiritual serenity, cultural authenticity, and effortless navigation with a design inspired by travel platforms like Airbnb combined with wellness aesthetics.

**Core Purpose**: Connect travelers with local guides for spiritual journeys along the Ganges and sacred destinations in India.

**Primary Goals**:
- Showcase tour packages (1-day, 2-day, 3-day trips)
- Display destination guides with detailed information
- Share spiritual travel stories through blog content
- Drive conversions through WhatsApp and contact form engagement
- Build trust through testimonials and authentic imagery

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript running on Vite
- **Routing**: wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Framework**: Shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion for scroll-triggered and transition effects

**Design System**:
- Custom color palette with spiritual theming (Ganga Blue, Sacred Saffron, Warm Gold)
- Typography hierarchy using Playfair Display (headings), Inter (body), and Crimson Text (quotes)
- Dark/light mode support through CSS variables
- Responsive breakpoints optimized for mobile-first experience

**Component Architecture**:
- Reusable UI components following atomic design principles
- Feature components (HeroSlider, PackageCard, DestinationCard, BlogCard)
- Layout components (Navigation, Footer, BottomNav)
- Dialog/Modal patterns for booking and package details
- Carousel components for testimonials and hero sections

**Key Pages**:
- Home: Hero slider, featured packages, destinations, testimonials, contact form
- Packages Landing: Category selection (Popular Events, Tourist, Pooja)
- Package Category: Filtered package listings by category
- Package Detail: Individual package information with booking CTA
- Destinations: Comprehensive destination guides with search and regional filters
  - Search functionality: Filter by destination name or description
  - Region filters: All Regions / Varanasi/Ayodhya (13 total destinations)
  - All destinations include detailed historical and spiritual information
- Destination Detail: Full destination information with images
- Blog: Categorized blog posts with filtering
- Blog Detail: Full blog post content
- About: Team information and company story
- Booking: Enhanced contact form for tour inquiries

### Backend Architecture

**Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM for type-safe database queries
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast server bundling

**API Structure**:
- RESTful endpoints for CRUD operations
- `/api/destinations` - Destination management
- `/api/packages` - Tour package management
- `/api/blog-posts` - Blog content management
- JSON request/response format
- Error handling with appropriate HTTP status codes

**Data Models**:
- **Destinations** (13 total):
  - Varanasi (6): Durga Temple, Sankat Mochan Hanuman Temple, Annapurna Temple, Kaal Bhairav Temple, Kashi Vishwanath Temple, Kardameshwar Mahadev Temple, Vishalakshi Devi Temple
  - Ayodhya (4): Nageshwar Nath Temple, Hanuman Garhi, Treta Ke Thakur Temple, Kanak Bhawan
  - Historical sites (3): Dashrath Bhavan, Ram Katha Sangrahalay, Tulsi Smarak Bhawan
  - Regional category (4): Varanasi, Ayodhya, Sarnath, Prayagraj
  - Fields: name, descriptions (short/full), multiple images, region, featured flag, search-optimized
- **Packages** (4):
  - 1-Day Kashi Darshan (Day Tours)
  - 2 Days Varanasi Tour Package – Kashi Darshan with Sarnath (Multi-Day Tours)
  - 3 Days/2 Nights Varanasi Spiritual Tour Package – Kashi Darshan with Sarnath (Pilgrimage Tours)
  - 3-Day Ayodhya + Kashi Spiritual Trail (Pilgrimage Tours)
  - Note: ALL prices set to null (user must contact via WhatsApp/phone for rates)
  - Fields: name, category, duration, descriptions, highlights array, price (null), featured flag
- **Blog Posts**: title, excerpt, content, category, publish date, read time, multiple images, featured flag
- **Users**: username, password (for potential admin access)

**Session & Storage**:
- In-memory storage implementation (MemStorage) for development
- Database storage preparation for production via Drizzle
- Session handling with connect-pg-simple for PostgreSQL sessions

### Data Storage

**Database**: PostgreSQL (configured via Neon serverless)
- Connection pooling through @neondatabase/serverless
- WebSocket-based connection for serverless environments
- Schema migrations managed by Drizzle Kit

**Schema Design**:
- UUID primary keys with auto-generation
- Text fields for content and descriptions
- Array fields for multi-value data (highlights, images)
- Boolean flags for featured content
- Nullable fields for optional content (secondary images)

**Content Management**:
- Seed data populates initial content (destinations, packages, blogs)
- Featured content system for homepage display
- Image paths reference attached_assets folder
- Categorization system for filtering (packages by category, blogs by category, destinations by region)

### Authentication & Authorization

**Current Implementation**: Basic user schema prepared
- Username/password fields in database
- No active authentication flow implemented
- Designed for future admin panel integration

**Security Considerations**:
- Environment variables for sensitive data (DATABASE_URL, WHATSAPP_NUMBER)
- CORS and credentials handling configured
- Request body size limits and JSON parsing

### User Interaction Patterns

**Conversion Flows**:
1. **WhatsApp Direct**: Floating button + bottom nav + inline CTAs
2. **Contact Form**: Enhanced form with package pre-selection
3. **Booking Dialog**: Modal overlay for quick package inquiries

**Navigation Patterns**:
- Fixed top navigation (becomes opaque on scroll)
- Fixed bottom navigation bar (mobile-optimized)
- Smooth scroll to sections
- Breadcrumb-style back navigation on detail pages

**Content Discovery**:
- Homepage features curated content (featured flag)
- "View All" buttons redirect to dedicated category pages
- "Read More" on destinations redirects to detail pages
- Hover interactions reveal package details (flip cards)
- **Destination Discovery**: 
  - Search bar for real-time destination filtering by name or description
  - Region filter badges: All Regions / Varanasi/Ayodhya
  - 13 comprehensive destination guides with deep historical and spiritual context
  - Each destination includes short summary and full detailed description

## External Dependencies

### Third-Party Services

**WhatsApp Business Integration**:
- Deep linking to WhatsApp with pre-filled messages
- Phone number configured via environment variable
- Context-aware messaging (package-specific, destination-specific)

**Database Service**:
- Neon PostgreSQL serverless database
- WebSocket connections for edge compatibility
- Connection string via DATABASE_URL environment variable

### UI Component Libraries

**Radix UI Primitives** (20+ components):
- Accordion, Alert Dialog, Aspect Ratio, Avatar
- Checkbox, Collapsible, Context Menu, Dialog
- Dropdown Menu, Hover Card, Label, Menubar
- Navigation Menu, Popover, Progress, Radio Group
- Scroll Area, Select, Separator, Slider, Slot
- Switch, Tabs, Toast, Toggle, Toggle Group, Tooltip

**Shadcn/ui Configuration**:
- New York style preset
- Tailwind CSS integration
- Component aliases via path mapping
- TypeScript support with strict typing

### Build & Development Tools

**Vite Plugins**:
- @vitejs/plugin-react for JSX transformation
- @replit/vite-plugin-runtime-error-modal for error overlay
- @replit/vite-plugin-cartographer (development only)
- @replit/vite-plugin-dev-banner (development only)

**Development Dependencies**:
- TypeScript with strict mode enabled
- ESLint/Prettier for code quality
- PostCSS with Tailwind and Autoprefixer
- Path aliases for clean imports (@/, @shared/, @assets/)

### Font & Icon Libraries

**Google Fonts**:
- Playfair Display (display/headings)
- Inter (body text)
- Crimson Text (quotes/testimonials)

**Icon Libraries**:
- Lucide React for general icons
- React Icons (fa for WhatsApp, si for social platforms)

### Animation & Interaction

**Framer Motion**:
- Scroll-triggered fade-in animations
- Carousel transitions
- Card flip effects
- Perspective transforms for 3D effects

**Embla Carousel**:
- Touch-friendly carousel implementation
- Auto-play with configurable delays
- Responsive breakpoint handling

### Utility Libraries

**Date & Time**: date-fns for date formatting
**Styling Utilities**: clsx, class-variance-authority, tailwind-merge
**Validation**: Zod for schema validation with drizzle-zod integration
**Command Menu**: cmdk for potential search functionality
**Form Handling**: @hookform/resolvers for form validation