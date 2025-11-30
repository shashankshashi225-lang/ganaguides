import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { sql } from 'drizzle-orm';
import ws from 'ws';
import * as schema from '@shared/schema';
import { log } from './vite';
import { setDatabase } from './db';

neonConfig.webSocketConstructor = ws;

export async function runMigrations(): Promise<boolean> {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    log("DATABASE_URL not set - skipping migrations");
    return false;
  }

  log("Running database migrations...");
  
  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle({ client: pool, schema });

  try {
    await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`);
    log("✓ pgcrypto extension ready");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);
    log("✓ users table ready");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS destinations (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
      )
    `);
    log("✓ destinations table ready");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
      )
    `);
    log("✓ blog_posts table ready");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS packages (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
      )
    `);
    log("✓ packages table ready");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS panchang_events (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        date DATE NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL,
        significance TEXT,
        featured BOOLEAN NOT NULL DEFAULT false,
        is_visible BOOLEAN NOT NULL DEFAULT true
      )
    `);
    log("✓ panchang_events table ready");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS video_testimonials (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
        platform TEXT NOT NULL,
        video_url TEXT NOT NULL,
        embed_code TEXT,
        caption TEXT,
        author TEXT,
        featured BOOLEAN NOT NULL DEFAULT false,
        is_visible BOOLEAN NOT NULL DEFAULT true
      )
    `);
    log("✓ video_testimonials table ready");

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
      )
    `);
    log("✓ bookings table ready");

    log("Database migrations completed successfully!");
    
    setDatabase(db);
    return true;
  } catch (error) {
    log("Error running migrations: " + error);
    return false;
  }
}
