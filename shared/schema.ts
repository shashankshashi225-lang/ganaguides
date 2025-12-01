import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const destinations = pgTable("destinations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  mainImage: text("main_image").notNull(),
  image2: text("image_2"),
  image3: text("image_3"),
  image4: text("image_4"),
  region: text("region"),
  featured: boolean("featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  publishedDate: text("published_date").notNull(),
  readTime: text("read_time").notNull(),
  mainImage: text("main_image").notNull(),
  image2: text("image_2"),
  image3: text("image_3"),
  image4: text("image_4"),
  featured: boolean("featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(),
  duration: text("duration").notNull(),
  destination: text("destination"),
  shortDescription: text("short_description").notNull(),
  highlights: text("highlights").array().notNull(),
  imageUrl: text("image_url").notNull(),
  detailedDescription: text("detailed_description").notNull(),
  price: integer("price"),
  featured: boolean("featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const panchangEvents = pgTable("panchang_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: date("date").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  significance: text("significance"),
  featured: boolean("featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const videoTestimonials = pgTable("video_testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull(),
  videoUrl: text("video_url").notNull(),
  embedCode: text("embed_code"),
  caption: text("caption"),
  author: text("author"),
  featured: boolean("featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  packageId: varchar("package_id"),
  packageName: text("package_name"),
  preferredDate: text("preferred_date"),
  numberOfPeople: integer("number_of_people"),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertDestinationSchema = createInsertSchema(destinations).omit({
  id: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
});

export const insertPanchangEventSchema = createInsertSchema(panchangEvents).omit({
  id: true,
});

export const insertVideoTestimonialSchema = createInsertSchema(videoTestimonials).omit({
  id: true,
});

export const insertBookingSchema = createInsertSchema(bookings, {
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  packageName: z.string().optional(),
  preferredDate: z.string().optional(),
  numberOfPeople: z.number().int().optional(),
  message: z.string().optional(),
  status: z.string().default("pending"),
}).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDestination = z.infer<typeof insertDestinationSchema>;
export type Destination = typeof destinations.$inferSelect;

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Package = typeof packages.$inferSelect;

export type InsertPanchangEvent = z.infer<typeof insertPanchangEventSchema>;
export type PanchangEvent = typeof panchangEvents.$inferSelect;

export type InsertVideoTestimonial = z.infer<typeof insertVideoTestimonialSchema>;
export type VideoTestimonial = typeof videoTestimonials.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
