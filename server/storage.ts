import { 
  users,
  destinations,
  blogPosts,
  packages,
  panchangEvents,
  videoTestimonials,
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
  type InsertVideoTestimonial
} from "@shared/schema";
import { db, isDatabaseAvailable } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllDestinations(): Promise<Destination[]>;
  getDestination(id: string): Promise<Destination | undefined>;
  createDestination(destination: InsertDestination): Promise<Destination>;
  updateDestination(id: string, destination: Partial<InsertDestination>): Promise<Destination | undefined>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  
  getAllPackages(): Promise<Package[]>;
  getPackage(id: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  updatePackage(id: string, pkg: Partial<InsertPackage>): Promise<Package | undefined>;

  getAllPanchangEvents(): Promise<PanchangEvent[]>;
  getPanchangEvent(id: string): Promise<PanchangEvent | undefined>;
  getPanchangEventsByMonth(year: number, month: number): Promise<PanchangEvent[]>;
  createPanchangEvent(event: InsertPanchangEvent): Promise<PanchangEvent>;
  updatePanchangEvent(id: string, event: Partial<InsertPanchangEvent>): Promise<PanchangEvent | undefined>;
  deletePanchangEvent(id: string): Promise<boolean>;

  getAllVideoTestimonials(): Promise<VideoTestimonial[]>;
  getVideoTestimonial(id: string): Promise<VideoTestimonial | undefined>;
  createVideoTestimonial(testimonial: InsertVideoTestimonial): Promise<VideoTestimonial>;
  updateVideoTestimonial(id: string, testimonial: Partial<InsertVideoTestimonial>): Promise<VideoTestimonial | undefined>;
  deleteVideoTestimonial(id: string): Promise<boolean>;
}

const mockDestinations: Destination[] = [
  {
    id: "varanasi",
    name: "Varanasi",
    shortDescription: "Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.",
    description: "Varanasi, the spiritual capital of India, is one of the world's oldest continuously inhabited cities. Walk along the sacred ghats of the Ganges, witness the mesmerizing Ganga Aarti ceremony, and explore ancient temples that have stood for millennia. The city's narrow alleys hide centuries of spiritual heritage, making every visit a journey through time.",
    mainImage: "/assets/generated_images/Boat_perspective_Ganges_view_e308dae7.png",
    image2: "/assets/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png",
    image3: "/assets/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
    image4: "/assets/generated_images/Varanasi_temple_architecture_detail_a35f07ab.png",
    region: "Uttar Pradesh",
    featured: true
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    shortDescription: "Dive into the legends of Lord Ram and experience age-old traditions firsthand.",
    description: "Ayodhya, the birthplace of Lord Rama, is one of Hinduism's seven holiest cities. The recently constructed Ram Mandir stands as a magnificent testament to ancient Indian architecture. Visit Hanuman Garhi, Kanak Bhawan, and numerous other temples that echo with devotional chants and centuries of spiritual tradition.",
    mainImage: "/assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png",
    image2: "/assets/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png",
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: true
  },
  {
    id: "sarnath",
    name: "Sarnath",
    shortDescription: "Visit the site where Buddha gave his first sermon, enriched with history and tranquility.",
    description: "Sarnath is where Buddhism began as Buddha gave his first sermon after attaining enlightenment. The Dhamek Stupa, Ashoka Pillar, and ancient monasteries create a serene atmosphere perfect for contemplation. Museums house remarkable Buddhist artifacts, while the peaceful deer park offers a glimpse into the Buddha's teachings.",
    mainImage: "/assets/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: true
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    shortDescription: "Experience the sacred confluence of three holy rivers at Triveni Sangam.",
    description: "Prayagraj, formerly Allahabad, is home to the legendary Triveni Sangam - the confluence of the Ganges, Yamuna, and the mythical Saraswati rivers. This sacred spot hosts the world's largest religious gathering, the Kumbh Mela. Visit the Allahabad Fort, Anand Bhawan, and experience the spiritual energy of ritual bathing at the sangam.",
    mainImage: "/assets/generated_images/Prayagraj_Triveni_Sangam_confluence_c12597e6.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: true
  }
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "morning-aarti",
    title: "Morning Aarti Through My Eyes",
    excerpt: "Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.",
    content: "Every morning, as the first rays of sun touch the waters of the Ganges, something magical happens. The air fills with the sound of bells, the fragrance of incense, and the chanting of ancient mantras. As a local guide, I've witnessed countless aartis, yet each one moves me deeply.\n\nThe Ganga Aarti is not just a ritual; it's a living tradition that connects us to our ancestors. The priests, dressed in saffron, move in perfect synchronization, offering fire to Mother Ganga. Thousands of diyas float on the river, creating a constellation of light on the dark waters.\n\nFor visitors, I always recommend arriving early. Find a spot on the ghats, perhaps near Dashashwamedh Ghat, and let the atmosphere wash over you. The energy is palpable - a mix of devotion, history, and the eternal flow of the sacred river.\n\nWhat makes this experience truly special is the community of devotees who gather each day. Families, pilgrims from distant lands, and curious travelers all unite in this moment of spiritual connection. It's a reminder that some traditions have the power to transcend time and touch the soul.",
    category: "Rituals",
    publishedDate: "Oct 15, 2025",
    readTime: "5 min read",
    mainImage: "/assets/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true
  },
  {
    id: "hidden-temples",
    title: "Top 5 Hidden Temples in Varanasi",
    excerpt: "Beyond the famous shrines lie secret temples with incredible stories. Here are our favorite hidden spiritual gems.",
    content: "While Kashi Vishwanath Temple draws millions, Varanasi hides dozens of lesser-known temples with fascinating histories. Here are five gems that most tourists miss:\n\n1. **Sankat Mochan Hanuman Temple** - Set in a peaceful grove, this temple dedicated to Lord Hanuman offers respite from the city's bustle. The evening aarti here is intimate and powerful.\n\n2. **Tridev Temple** - A unique shrine housing Brahma, Vishnu, and Shiva together. The intricate carvings date back centuries and tell stories of cosmic creation.\n\n3. **Sakshi Vinayak Temple** - One of the oldest Ganesha temples in the city, locals believe any wish made here with pure intention comes true.\n\n4. **Pisach Mochan Temple** - This ancient Shiva temple has a mysterious history connected to liberating souls. The atmosphere is unlike anywhere else in Varanasi.\n\n5. **Kedar Ghat's Hidden Shrines** - The ghats near Kedareshwar Temple hide small, ancient shrines in narrow alleys. Each has a local priest who shares tales passed down through generations.\n\nExploring these temples with a local guide reveals stories and traditions that enrich any pilgrimage to Varanasi.",
    category: "Heritage",
    publishedDate: "Oct 10, 2025",
    readTime: "7 min read",
    mainImage: "/assets/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true
  },
  {
    id: "ayodhya-guide",
    title: "Ayodhya Spiritual Trail: What You Need to Know",
    excerpt: "Planning a pilgrimage to Ayodhya? Our comprehensive guide covers everything from temples to local customs.",
    content: "Ayodhya has transformed in recent years, and planning a visit requires updated knowledge. Here's everything you need to know for a meaningful pilgrimage:\n\n**Best Time to Visit**\nOctober to March offers pleasant weather. Avoid major festivals unless you want to experience the crowds - Ram Navami sees millions of devotees.\n\n**Essential Temples**\n- Ram Janmabhoomi Mandir - The magnificent new temple at Lord Rama's birthplace\n- Hanuman Garhi - The fortress-like temple offering panoramic views\n- Kanak Bhawan - Known for its beautiful idols and architecture\n- Nageshwarnath Temple - One of the oldest temples in Ayodhya\n\n**Local Customs**\nDress modestly in traditional attire. Remove footwear before entering temples. Photography restrictions vary by temple - always ask first. Early morning visits (6-9 AM) offer the most peaceful experience.\n\n**Getting There**\nAyodhya is well-connected by rail and road from Lucknow, Varanasi, and other major cities. The new airport makes air travel convenient too.\n\n**Stay and Food**\nNEW dharamshalas and hotels have opened to accommodate pilgrims. Local prasad (holy food) is vegetarian and delicious - don't miss the famous laddoos!\n\nA guided tour from Varanasi combines both cities beautifully, allowing you to experience the complete spiritual heritage of this sacred region.",
    category: "Travel Tips",
    publishedDate: "Oct 5, 2025",
    readTime: "10 min read",
    mainImage: "/assets/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true
  }
];

const mockPackages: Package[] = [
  {
    id: "1day-kashi",
    name: "1-Day Kashi Darshan",
    category: "Day Tours",
    duration: "1 Day",
    shortDescription: "Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.",
    highlights: [
      "Sunrise boat ride on the Ganges",
      "Visit to Kashi Vishwanath Temple",
      "Explore hidden alleys of old Varanasi",
      "Witness evening Ganga Aarti ceremony"
    ],
    imageUrl: "/assets/generated_images/Kashi_walking_tour_group_d0392eea.png",
    detailedDescription: "Begin your spiritual journey with a magical sunrise boat ride on the Ganges, watching the city come alive with morning prayers. After breakfast, visit the iconic Kashi Vishwanath Temple, one of the twelve Jyotirlingas. Your local guide will lead you through Varanasi's ancient alleys, revealing hidden temples and sharing stories passed down through generations. Experience authentic local cuisine for lunch. The day culminates with the spectacular Ganga Aarti at Dashashwamedh Ghat, where priests perform synchronized rituals as thousands of diyas float on the sacred river. This is Varanasi at its most magical.",
    price: 2500,
    featured: true
  },
  {
    id: "2day-sarnath",
    name: "2-Day Kashi + Sarnath",
    category: "Multi-Day Tours",
    duration: "2 Days",
    shortDescription: "Combine the spiritual energy of Varanasi with the peaceful Buddhist heritage of Sarnath on this immersive journey.",
    highlights: [
      "Complete Varanasi tour with boat ride",
      "Explore Sarnath where Buddha gave first sermon",
      "Visit Dhamek Stupa and museums",
      "Morning meditation session by the Ganges"
    ],
    imageUrl: "/assets/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png",
    detailedDescription: "Day 1 covers the complete Varanasi experience - from the sunrise boat ride to the evening aarti, with temple visits and heritage walks in between. Day 2 takes you to Sarnath, just 10 km from Varanasi, where Buddhism began. Visit the Dhamek Stupa where Buddha gave his first sermon, the archaeological museum housing the famous Lion Capital, and the serene deer park. Start the morning with a guided meditation session by the Ganges, learning techniques that have been practiced here for millennia. This tour perfectly balances Hindu and Buddhist spiritual heritage.",
    price: 4500,
    featured: true
  },
  {
    id: "3day-ayodhya",
    name: "3-Day Ayodhya + Kashi Spiritual Trail",
    category: "Pilgrimage Tours",
    duration: "3 Days",
    shortDescription: "A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.",
    highlights: [
      "Ram Janmabhoomi and major Ayodhya temples",
      "Hanuman Garhi and Kanak Bhawan",
      "Complete Varanasi heritage experience",
      "Sacred rituals participation opportunity"
    ],
    imageUrl: "/assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png",
    detailedDescription: "This comprehensive pilgrimage covers two of Hinduism's holiest cities. Days 1-2 in Ayodhya include visits to Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan, and other sacred sites. Experience the evening aarti at Saryu River. Day 3 brings you to Varanasi for the complete Kashi darshan - boat ride, temple visits, heritage walk, and the magnificent Ganga Aarti. Throughout the journey, participate in authentic rituals and pujas, guided by local pandits who ensure the spiritual significance of each experience is fully understood. Comfortable AC transport and quality accommodation included.",
    price: 7500,
    featured: true
  }
];

const mockPanchangEvents: PanchangEvent[] = [
  {
    id: "1",
    date: "2025-11-15",
    name: "Kartik Purnima",
    description: "Full moon day in Kartik month. Highly auspicious for holy dip in Ganges. Dev Deepawali is celebrated on this day at Varanasi ghats with millions of diyas.",
    type: "Purnima",
    significance: "Best time for Ganga Snan and spiritual ceremonies. Special rituals at all ghats."
  },
  {
    id: "2",
    date: "2025-11-30",
    name: "Kartik Amavasya",
    description: "New moon day in Kartik month. Important day for Pitru Tarpan and ancestral worship.",
    type: "Amavasya",
    significance: "Ideal for Pitru Tarpan ceremonies and seeking blessings for ancestors."
  },
  {
    id: "3",
    date: "2025-12-14",
    name: "Margashirsha Purnima",
    description: "Full moon in the auspicious month of Margashirsha. Lord Krishna considers this month most dear.",
    type: "Purnima",
    significance: "Sacred bathing and Satyanarayan Puja are highly recommended."
  },
  {
    id: "4",
    date: "2025-12-30",
    name: "Margashirsha Amavasya",
    description: "New moon day for Pitru Tarpan and charity.",
    type: "Amavasya",
    significance: "Auspicious for ancestral rites and donations."
  },
  {
    id: "5",
    date: "2025-12-25",
    name: "Gita Jayanti",
    description: "Anniversary of Bhagavad Gita when Lord Krishna delivered the sacred teachings to Arjuna on the battlefield of Kurukshetra.",
    type: "Festival",
    significance: "Special Gita path recitations at temples. Join guided spiritual discussions."
  },
  {
    id: "6",
    date: "2026-01-14",
    name: "Makar Sankranti",
    description: "Sun enters Capricorn zodiac. Major festival marking the end of winter solstice. Holy dip at Triveni Sangam is especially auspicious.",
    type: "Festival",
    significance: "Millions gather at Prayagraj for sacred bath. Kite flying celebrations across North India."
  },
  {
    id: "7",
    date: "2026-01-13",
    name: "Paush Purnima",
    description: "Full moon in Paush month. Beginning of Magh Mela at Prayagraj.",
    type: "Purnima",
    significance: "Start of month-long Magh Mela. Excellent for pilgrimage to Prayagraj."
  },
  {
    id: "8",
    date: "2026-01-29",
    name: "Mauni Amavasya",
    description: "Most sacred Amavasya when devotees observe silence (maun). Royal bath day during Magh Mela.",
    type: "Amavasya",
    significance: "Extremely auspicious for holy bath and spiritual practices. Main bathing day of Magh Mela."
  }
];

const mockVideoTestimonials: VideoTestimonial[] = [
  {
    id: "1",
    platform: "instagram",
    videoUrl: "https://www.instagram.com/gangaguide/p/DPiuY01E1EE/",
    embedCode: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DPiuY01E1EE/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/DPiuY01E1EE/">View this post on Instagram</a></blockquote><script async src="//www.instagram.com/embed.js"></script>',
    caption: "Amazing experience with GangaGuides! The sunrise boat ride was magical.",
    author: "Travel Explorer",
    featured: true
  },
  {
    id: "2",
    platform: "instagram",
    videoUrl: "https://www.instagram.com/gangaguide/reel/example2/",
    embedCode: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/example2/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/example2/">View this post on Instagram</a></blockquote>',
    caption: "Spiritual journey of a lifetime! The guides were incredibly knowledgeable about every temple.",
    author: "Spiritual Seeker",
    featured: true
  },
  {
    id: "3",
    platform: "instagram",
    videoUrl: "https://www.instagram.com/gangaguide/reel/example3/",
    embedCode: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/example3/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/example3/">View this post on Instagram</a></blockquote>',
    caption: "The evening Ganga Aarti was beyond words. Thank you GangaGuides!",
    author: "Devotee from Mumbai",
    featured: true
  }
];

class MemStorage implements IStorage {
  private usersData: User[] = [];
  private destinationsData: Destination[] = mockDestinations;
  private blogPostsData: BlogPost[] = mockBlogPosts;
  private packagesData: Package[] = mockPackages;
  private panchangEventsData: PanchangEvent[] = mockPanchangEvents;
  private videoTestimonialsData: VideoTestimonial[] = mockVideoTestimonials;

  async getUser(id: string): Promise<User | undefined> {
    return this.usersData.find(u => u.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.usersData.find(u => u.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const newUser: User = { ...user, id: crypto.randomUUID() };
    this.usersData.push(newUser);
    return newUser;
  }

  async getAllDestinations(): Promise<Destination[]> {
    return this.destinationsData;
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinationsData.find(d => d.id === id);
  }

  async createDestination(dest: InsertDestination): Promise<Destination> {
    const newDest: Destination = { 
      id: crypto.randomUUID(),
      name: dest.name,
      shortDescription: dest.shortDescription,
      description: dest.description,
      mainImage: dest.mainImage,
      image2: dest.image2 ?? null,
      image3: dest.image3 ?? null,
      image4: dest.image4 ?? null,
      region: dest.region ?? null,
      featured: dest.featured ?? false
    };
    this.destinationsData.push(newDest);
    return newDest;
  }

  async updateDestination(id: string, updates: Partial<InsertDestination>): Promise<Destination | undefined> {
    const idx = this.destinationsData.findIndex(d => d.id === id);
    if (idx === -1) return undefined;
    this.destinationsData[idx] = { ...this.destinationsData[idx], ...updates };
    return this.destinationsData[idx];
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPostsData;
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPostsData.find(p => p.id === id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const newPost: BlogPost = { 
      id: crypto.randomUUID(),
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      publishedDate: post.publishedDate,
      readTime: post.readTime,
      mainImage: post.mainImage,
      image2: post.image2 ?? null,
      image3: post.image3 ?? null,
      image4: post.image4 ?? null,
      featured: post.featured ?? false
    };
    this.blogPostsData.push(newPost);
    return newPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const idx = this.blogPostsData.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    this.blogPostsData[idx] = { ...this.blogPostsData[idx], ...updates };
    return this.blogPostsData[idx];
  }

  async getAllPackages(): Promise<Package[]> {
    return this.packagesData;
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.packagesData.find(p => p.id === id);
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const newPkg: Package = { 
      id: crypto.randomUUID(),
      name: pkg.name,
      category: pkg.category,
      duration: pkg.duration,
      shortDescription: pkg.shortDescription,
      highlights: pkg.highlights,
      imageUrl: pkg.imageUrl,
      detailedDescription: pkg.detailedDescription,
      price: pkg.price ?? null,
      featured: pkg.featured ?? false
    };
    this.packagesData.push(newPkg);
    return newPkg;
  }

  async updatePackage(id: string, updates: Partial<InsertPackage>): Promise<Package | undefined> {
    const idx = this.packagesData.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    this.packagesData[idx] = { ...this.packagesData[idx], ...updates };
    return this.packagesData[idx];
  }

  async getAllPanchangEvents(): Promise<PanchangEvent[]> {
    return this.panchangEventsData;
  }

  async getPanchangEvent(id: string): Promise<PanchangEvent | undefined> {
    return this.panchangEventsData.find(e => e.id === id);
  }

  async getPanchangEventsByMonth(year: number, month: number): Promise<PanchangEvent[]> {
    return this.panchangEventsData.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  }

  async createPanchangEvent(event: InsertPanchangEvent): Promise<PanchangEvent> {
    const newEvent: PanchangEvent = { 
      id: crypto.randomUUID(),
      date: event.date,
      name: event.name,
      description: event.description,
      type: event.type,
      significance: event.significance ?? null
    };
    this.panchangEventsData.push(newEvent);
    return newEvent;
  }

  async updatePanchangEvent(id: string, updates: Partial<InsertPanchangEvent>): Promise<PanchangEvent | undefined> {
    const idx = this.panchangEventsData.findIndex(e => e.id === id);
    if (idx === -1) return undefined;
    this.panchangEventsData[idx] = { ...this.panchangEventsData[idx], ...updates };
    return this.panchangEventsData[idx];
  }

  async deletePanchangEvent(id: string): Promise<boolean> {
    const idx = this.panchangEventsData.findIndex(e => e.id === id);
    if (idx === -1) return false;
    this.panchangEventsData.splice(idx, 1);
    return true;
  }

  async getAllVideoTestimonials(): Promise<VideoTestimonial[]> {
    return this.videoTestimonialsData;
  }

  async getVideoTestimonial(id: string): Promise<VideoTestimonial | undefined> {
    return this.videoTestimonialsData.find(t => t.id === id);
  }

  async createVideoTestimonial(testimonial: InsertVideoTestimonial): Promise<VideoTestimonial> {
    const newTestimonial: VideoTestimonial = { 
      id: crypto.randomUUID(),
      platform: testimonial.platform,
      videoUrl: testimonial.videoUrl,
      embedCode: testimonial.embedCode ?? null,
      caption: testimonial.caption ?? null,
      author: testimonial.author ?? null,
      featured: testimonial.featured ?? false
    };
    this.videoTestimonialsData.push(newTestimonial);
    return newTestimonial;
  }

  async updateVideoTestimonial(id: string, updates: Partial<InsertVideoTestimonial>): Promise<VideoTestimonial | undefined> {
    const idx = this.videoTestimonialsData.findIndex(t => t.id === id);
    if (idx === -1) return undefined;
    this.videoTestimonialsData[idx] = { ...this.videoTestimonialsData[idx], ...updates };
    return this.videoTestimonialsData[idx];
  }

  async deleteVideoTestimonial(id: string): Promise<boolean> {
    const idx = this.videoTestimonialsData.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.videoTestimonialsData.splice(idx, 1);
    return true;
  }
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
    return await db.select().from(destinations);
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
    return await db.select().from(blogPosts);
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
    return await db.select().from(packages);
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
    return await db.select().from(panchangEvents);
  }

  async getPanchangEvent(id: string): Promise<PanchangEvent | undefined> {
    if (!db) return undefined;
    const [event] = await db.select().from(panchangEvents).where(eq(panchangEvents.id, id));
    return event || undefined;
  }

  async getPanchangEventsByMonth(year: number, month: number): Promise<PanchangEvent[]> {
    if (!db) return [];
    const allEvents = await db.select().from(panchangEvents);
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
    return await db.select().from(videoTestimonials);
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
}

export const storage: IStorage = isDatabaseAvailable ? new DatabaseStorage() : new MemStorage();
