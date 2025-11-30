-- GangaGuides Database Schema
-- Run this SQL in your Neon database console to create all required tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

-- Destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  main_image TEXT NOT NULL,
  image_2 TEXT,
  image_3 TEXT,
  image_4 TEXT,
  region TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  published_date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  main_image TEXT NOT NULL,
  image_2 TEXT,
  image_3 TEXT,
  image_4 TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true
);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  destination TEXT,
  short_description TEXT NOT NULL,
  highlights TEXT[] NOT NULL,
  image_url TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  price INTEGER,
  featured BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true
);

-- Panchang events table
CREATE TABLE IF NOT EXISTS panchang_events (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  significance TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true
);

-- Video testimonials table
CREATE TABLE IF NOT EXISTS video_testimonials (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  video_url TEXT NOT NULL,
  embed_code TEXT,
  caption TEXT,
  author TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  package_id VARCHAR,
  package_name TEXT,
  preferred_date TEXT,
  number_of_people INTEGER,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- Add new columns to existing tables if they don't exist (for existing databases)
-- Run these ALTER statements if you already have the tables created

-- ALTER TABLE destinations ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;
-- ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;
-- ALTER TABLE packages ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;
-- ALTER TABLE panchang_events ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT false;
-- ALTER TABLE panchang_events ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;
-- ALTER TABLE video_testimonials ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;
