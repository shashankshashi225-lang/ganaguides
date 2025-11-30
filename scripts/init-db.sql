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
  featured BOOLEAN NOT NULL DEFAULT false
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
  featured BOOLEAN NOT NULL DEFAULT false
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
  featured BOOLEAN NOT NULL DEFAULT false
);

-- Panchang events table
CREATE TABLE IF NOT EXISTS panchang_events (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  significance TEXT
);

-- Video testimonials table
CREATE TABLE IF NOT EXISTS video_testimonials (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  video_url TEXT NOT NULL,
  embed_code TEXT,
  caption TEXT,
  author TEXT,
  featured BOOLEAN NOT NULL DEFAULT false
);
