import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import { sql } from 'drizzle-orm';
import ws from 'ws';
import * as schema from '../shared/schema';

neonConfig.webSocketConstructor = ws;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

async function pushSchema() {
  console.log('Connecting to database...');
  const pool = new Pool({ connectionString: databaseUrl });
  const db = drizzle({ client: pool, schema });

  try {
    console.log('Creating tables...');
    
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `);
    console.log('Created users table');

    await db.execute(sql`
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
      )
    `);
    console.log('Created destinations table');

    await db.execute(sql`
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
      )
    `);
    console.log('Created blog_posts table');

    await db.execute(sql`
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
      )
    `);
    console.log('Created packages table');

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS panchang_events (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        date DATE NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL,
        significance TEXT,
        featured BOOLEAN NOT NULL DEFAULT false
      )
    `);
    console.log('Created panchang_events table');

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS video_testimonials (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        video_url TEXT NOT NULL,
        thumbnail_url TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        is_visible BOOLEAN NOT NULL DEFAULT true
      )
    `);
    console.log('Created video_testimonials table');

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        package_id VARCHAR,
        travel_date TEXT NOT NULL,
        number_of_travelers INTEGER NOT NULL,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('Created bookings table');

    console.log('All tables created successfully!');

  } catch (error) {
    console.error('Error creating tables:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

pushSchema();
