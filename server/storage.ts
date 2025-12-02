import { 
  users,
  destinations,
  blogPosts,
  packages,
  panchangEvents,
  videoTestimonials,
  bookings,
  type User, 
  type InsertUser,
  type Destination,
  type InsertDestination,
  type BlogPost,
  type InsertBlogPost,
  type Package,
  type InsertPackage,
  type PanchangEvent,
  type InsertPanchangEvent,
  type VideoTestimonial,
  type InsertVideoTestimonial,
  type Booking,
  type InsertBooking
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import { MemoryStorage } from "./memoryStorage";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllDestinations(): Promise<Destination[]>;
  getVisibleDestinations(): Promise<Destination[]>;
  getFeaturedDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  updateDestination(id: string, destination: Partial<InsertDestination>): Promise<Destination | undefined>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getVisibleBlogPosts(): Promise<BlogPost[]>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  
  getAllPackages(): Promise<Package[]>;
  getVisiblePackages(): Promise<Package[]>;
  getFeaturedPackages(): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package | undefined>;

  getAllPanchangEvents(): Promise<PanchangEvent[]>;
  getVisiblePanchangEvents(): Promise<PanchangEvent[]>;
  getFeaturedPanchangEvents(): Promise<PanchangEvent[]>;
  getPanchangEvent(id: string): Promise<PanchangEvent | undefined>;
  getPanchangEventsByMonth(year: number, month: number): Promise<PanchangEvent[]>;
  createPanchangEvent(event: InsertPanchangEvent): Promise<PanchangEvent>;
  updatePanchangEvent(id: string, event: Partial<InsertPanchangEvent>): Promise<PanchangEvent | undefined>;
  deletePanchangEvent(id: string): Promise<boolean>;

  getAllVideoTestimonials(): Promise<VideoTestimonial[]>;
  getVisibleVideoTestimonials(): Promise<VideoTestimonial[]>;
  getFeaturedVideoTestimonials(): Promise<VideoTestimonial[]>;
  getVideoTestimonial(id: string): Promise<VideoTestimonial | undefined>;
  createVideoTestimonial(testimonial: InsertVideoTestimonial): Promise<VideoTestimonial>;
  updateVideoTestimonial(id: string, testimonial: Partial<InsertVideoTestimonial>): Promise<VideoTestimonial | undefined>;
  deleteVideoTestimonial(id: string): Promise<boolean>;

  getAllBookings(): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  deleteBooking(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    if (!db) return undefined;
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    if (!db) throw new Error("Database not available");
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllDestinations(): Promise<Destination[]> {
    if (!db) return [];
    const dbDestinations = await db.select().from(destinations);
    return dbDestinations;
  }

  async getVisibleDestinations(): Promise<Destination[]> {
    if (!db) return [];
    const dbDestinations = await db.select().from(destinations).where(eq(destinations.isVisible, true));
    return dbDestinations;
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    if (!db) return [];
    const dbDestinations = await db.select().from(destinations).where(and(eq(destinations.featured, true), eq(destinations.isVisible, true)));
    return dbDestinations;
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    if (!db) return undefined;
    const [destination] = await db.select().from(destinations).where(eq(destinations.id, id));
    return destination || undefined;
  }

  async createDestination(insertDestination: InsertDestination): Promise<Destination> {
    if (!db) throw new Error("Database not available");
    const [destination] = await db.insert(destinations).values(insertDestination).returning();
    return destination;
  }

  async updateDestination(id: string, updates: Partial<InsertDestination>): Promise<Destination | undefined> {
    if (!db) return undefined;
    const [destination] = await db.update(destinations).set(updates).where(eq(destinations.id, id)).returning();
    return destination || undefined;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    if (!db) return [];
    const dbPosts = await db.select().from(blogPosts);
    return dbPosts;
  }

  async getVisibleBlogPosts(): Promise<BlogPost[]> {
    if (!db) return [];
    const dbPosts = await db.select().from(blogPosts).where(eq(blogPosts.isVisible, true));
    return dbPosts;
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    if (!db) return [];
    const dbPosts = await db.select().from(blogPosts).where(and(eq(blogPosts.featured, true), eq(blogPosts.isVisible, true)));
    return dbPosts;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    if (!db) return undefined;
    const [blogPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return blogPost || undefined;
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    if (!db) throw new Error("Database not available");
    const [blogPost] = await db.insert(blogPosts).values(insertBlogPost).returning();
    return blogPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    if (!db) return undefined;
    const [blogPost] = await db.update(blogPosts).set(updates).where(eq(blogPosts.id, id)).returning();
    return blogPost || undefined;
  }

  async getAllPackages(): Promise<Package[]> {
    if (!db) return [];
    const dbPackages = await db.select().from(packages);
    return dbPackages;
  }

  async getVisiblePackages(): Promise<Package[]> {
    if (!db) return [];
    const dbPackages = await db.select().from(packages).where(eq(packages.isVisible, true));
    return dbPackages;
  }

  async getFeaturedPackages(): Promise<Package[]> {
    if (!db) return [];
    const dbPackages = await db.select().from(packages).where(and(eq(packages.featured, true), eq(packages.isVisible, true)));
    return dbPackages;
  }

  async getPackage(id: string): Promise<Package | undefined> {
    if (!db) return undefined;
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg || undefined;
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    if (!db) throw new Error("Database not available");
    const [pkg] = await db.insert(packages).values(insertPackage).returning();
    return pkg;
  }

  async updatePackage(id: string, updates: Partial<InsertPackage>): Promise<Package | undefined> {
    if (!db) return undefined;
    const [pkg] = await db.update(packages).set(updates).where(eq(packages.id, id)).returning();
    return pkg || undefined;
  }

  async getAllPanchangEvents(): Promise<PanchangEvent[]> {
    if (!db) return [];
    const dbEvents = await db.select().from(panchangEvents);
    return dbEvents;
  }

  async getVisiblePanchangEvents(): Promise<PanchangEvent[]> {
    if (!db) return [];
    const dbEvents = await db.select().from(panchangEvents).where(eq(panchangEvents.isVisible, true));
    return dbEvents;
  }

  async getFeaturedPanchangEvents(): Promise<PanchangEvent[]> {
    if (!db) return [];
    const dbEvents = await db.select().from(panchangEvents).where(and(eq(panchangEvents.featured, true), eq(panchangEvents.isVisible, true)));
    return dbEvents;
  }

  async getPanchangEvent(id: string): Promise<PanchangEvent | undefined> {
    if (!db) return undefined;
    const [event] = await db.select().from(panchangEvents).where(eq(panchangEvents.id, id));
    return event || undefined;
  }

  async getPanchangEventsByMonth(year: number, month: number): Promise<PanchangEvent[]> {
    const allEvents = await this.getVisiblePanchangEvents();
    return allEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }

  async createPanchangEvent(insertEvent: InsertPanchangEvent): Promise<PanchangEvent> {
    if (!db) throw new Error("Database not available");
    const [event] = await db.insert(panchangEvents).values(insertEvent).returning();
    return event;
  }

  async updatePanchangEvent(id: string, updates: Partial<InsertPanchangEvent>): Promise<PanchangEvent | undefined> {
    if (!db) return undefined;
    const [event] = await db.update(panchangEvents).set(updates).where(eq(panchangEvents.id, id)).returning();
    return event || undefined;
  }

  async deletePanchangEvent(id: string): Promise<boolean> {
    if (!db) return false;
    const result = await db.delete(panchangEvents).where(eq(panchangEvents.id, id)).returning();
    return result.length > 0;
  }

  async getAllVideoTestimonials(): Promise<VideoTestimonial[]> {
    if (!db) return [];
    const dbTestimonials = await db.select().from(videoTestimonials);
    return dbTestimonials;
  }

  async getVisibleVideoTestimonials(): Promise<VideoTestimonial[]> {
    if (!db) return [];
    const dbTestimonials = await db.select().from(videoTestimonials).where(eq(videoTestimonials.isVisible, true));
    return dbTestimonials;
  }

  async getFeaturedVideoTestimonials(): Promise<VideoTestimonial[]> {
    if (!db) return [];
    const dbTestimonials = await db.select().from(videoTestimonials).where(and(eq(videoTestimonials.featured, true), eq(videoTestimonials.isVisible, true)));
    return dbTestimonials;
  }

  async getVideoTestimonial(id: string): Promise<VideoTestimonial | undefined> {
    if (!db) return undefined;
    const [testimonial] = await db.select().from(videoTestimonials).where(eq(videoTestimonials.id, id));
    return testimonial || undefined;
  }

  async createVideoTestimonial(insertTestimonial: InsertVideoTestimonial): Promise<VideoTestimonial> {
    if (!db) throw new Error("Database not available");
    const [testimonial] = await db.insert(videoTestimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  async updateVideoTestimonial(id: string, updates: Partial<InsertVideoTestimonial>): Promise<VideoTestimonial | undefined> {
    if (!db) return undefined;
    const [testimonial] = await db.update(videoTestimonials).set(updates).where(eq(videoTestimonials.id, id)).returning();
    return testimonial || undefined;
  }

  async deleteVideoTestimonial(id: string): Promise<boolean> {
    if (!db) return false;
    const result = await db.delete(videoTestimonials).where(eq(videoTestimonials.id, id)).returning();
    return result.length > 0;
  }

  async getAllBookings(): Promise<Booking[]> {
    if (!db) return [];
    const dbBookings = await db.select().from(bookings);
    return dbBookings;
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    if (!db) return undefined;
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    if (!db) throw new Error("Database not available");
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    if (!db) return undefined;
    const [booking] = await db.update(bookings).set(updates).where(eq(bookings.id, id)).returning();
    return booking || undefined;
  }

  async deleteBooking(id: string): Promise<boolean> {
    if (!db) return false;
    const result = await db.delete(bookings).where(eq(bookings.id, id)).returning();
    return result.length > 0;
  }
}

export const storage: IStorage = db ? new DatabaseStorage() : new MemoryStorage();
