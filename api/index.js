import { neon } from '@neondatabase/serverless';
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

const mockDestinations = [
  {
    id: "varanasi",
    name: "Varanasi",
    short_description: "Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.",
    description: "Varanasi, the spiritual capital of India, is one of the world's oldest continuously inhabited cities. Walk along the sacred ghats of the Ganges, witness the mesmerizing Ganga Aarti ceremony, and explore ancient temples that have stood for millennia.",
    main_image: "/generated_images/varanasi_holy_city_ganga.png",
    image2: "/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png",
    image3: "/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
    image4: "/generated_images/Varanasi_temple_architecture_detail_a35f07ab.png",
    region: "Varanasi",
    featured: true
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    short_description: "Dive into the legends of Lord Ram and experience age-old traditions firsthand.",
    description: "Ayodhya, the birthplace of Lord Rama, is one of Hinduism's seven holiest cities. The recently constructed Ram Mandir stands as a magnificent testament to ancient Indian architecture.",
    main_image: "/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png",
    image2: "/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png",
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: true
  },
  {
    id: "sarnath",
    name: "Sarnath",
    short_description: "Visit the site where Buddha gave his first sermon, enriched with history and tranquility.",
    description: "Sarnath is where Buddhism began as Buddha gave his first sermon after attaining enlightenment. The Dhamek Stupa, Ashoka Pillar, and ancient monasteries create a serene atmosphere perfect for contemplation.",
    main_image: "/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: true
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    short_description: "Experience the sacred confluence of three holy rivers at Triveni Sangam.",
    description: "Prayagraj, formerly Allahabad, is home to the legendary Triveni Sangam - the confluence of the Ganges, Yamuna, and the mythical Saraswati rivers.",
    main_image: "/generated_images/Prayagraj_Triveni_Sangam_confluence_c12597e6.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: true
  }
];

const mockBlogPosts = [
  {
    id: "morning-aarti",
    title: "Morning Aarti Through My Eyes",
    excerpt: "Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.",
    content: "Every morning, as the first rays of sun touch the waters of the Ganges, something magical happens. The air fills with the sound of bells, the fragrance of incense, and the chanting of ancient mantras.",
    category: "Rituals",
    published_date: "Oct 15, 2025",
    read_time: "5 min read",
    main_image: "/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true
  },
  {
    id: "hidden-temples",
    title: "Top 5 Hidden Temples in Varanasi",
    excerpt: "Beyond the famous shrines lie secret temples with incredible stories. Here are our favorite hidden spiritual gems.",
    content: "While Kashi Vishwanath Temple draws millions, Varanasi hides dozens of lesser-known temples with fascinating histories.",
    category: "Heritage",
    published_date: "Oct 10, 2025",
    read_time: "7 min read",
    main_image: "/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true
  },
  {
    id: "ayodhya-guide",
    title: "Ayodhya Spiritual Trail: What You Need to Know",
    excerpt: "Planning a pilgrimage to Ayodhya? Our comprehensive guide covers everything from temples to local customs.",
    content: "Ayodhya has transformed in recent years, and planning a visit requires updated knowledge. Here's everything you need to know for a meaningful pilgrimage.",
    category: "Travel Tips",
    published_date: "Oct 5, 2025",
    read_time: "10 min read",
    main_image: "/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true
  }
];

const mockPackages = [
  {
    id: "1day-kashi",
    name: "1-Day Kashi Darshan",
    destination: "Varanasi",
    category: "touristic",
    duration: "1 Day",
    short_description: "Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.",
    highlights: ["Sunrise boat ride on the Ganges", "Visit to Kashi Vishwanath Temple", "Explore hidden alleys of old Varanasi", "Witness evening Ganga Aarti ceremony"],
    image_url: "/generated_images/Kashi_walking_tour_group_d0392eea.png",
    detailed_description: "Begin your spiritual journey with a magical sunrise boat ride on the Ganges, watching the city come alive with morning prayers.",
    price: null,
    featured: true
  },
  {
    id: "3day-ayodhya",
    name: "3-Day Ayodhya + Kashi Spiritual Trail",
    destination: "Varanasi",
    category: "touristic",
    duration: "3 Days",
    short_description: "A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.",
    highlights: ["Ram Janmabhoomi and major Ayodhya temples", "Hanuman Garhi and Kanak Bhawan", "Complete Varanasi heritage experience", "Sacred rituals participation opportunity"],
    image_url: "/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png",
    detailed_description: "This comprehensive pilgrimage covers two of Hinduism's holiest cities.",
    price: null,
    featured: true
  },
  {
    id: "kaal-bhairav-madira-seva",
    name: "Kaal Bhairav Madira Seva",
    destination: "Varanasi",
    category: "pooja",
    duration: "Varies",
    short_description: "Sacred tantric-Vedic ritual where alcohol is offered to Lord Kaal Bhairav, invoking divine protection and removing negative energies.",
    highlights: ["Madira (Offerings) Ritual performed as per traditional Kashi tantra-vidhi", "Kaal Bhairav Mantra Jaap for protection", "Tilak & Raksha Sutra", "Return Prasad from the sanctum"],
    image_url: "/generated_images/kaal_bhairav_temple_varanasi.png",
    detailed_description: "Kaal Bhairav Madira Seva is a sacred tantric-Vedic ritual where alcohol is offered to Lord Kaal Bhairav.",
    price: null,
    featured: true
  }
];

const mockPanchangEvents = [
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
    significance: "Excellent for Pitru Tarpan at Varanasi and Prayagraj."
  },
  {
    id: "3",
    date: "2025-12-14",
    name: "Margashirsha Purnima",
    description: "Full moon in the month of Margashirsha. Sacred bathing day.",
    type: "Purnima",
    significance: "Auspicious for spiritual practices and holy dip."
  }
];

const mockVideoTestimonials = [
  {
    id: "1",
    platform: "instagram",
    video_url: "https://www.instagram.com/gangaguide/p/DPiuY01E1EE/",
    embed_code: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DPiuY01E1EE/"><a href="https://www.instagram.com/reel/DPiuY01E1EE/">View this post on Instagram</a></blockquote>',
    caption: "Amazing experience with GangaGuides! The sunrise boat ride was magical.",
    author: "Travel Explorer",
    featured: true
  },
  {
    id: "2",
    platform: "instagram",
    video_url: "https://www.instagram.com/gangaguide/reel/example2/",
    embed_code: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/example2/"><a href="https://www.instagram.com/reel/example2/">View this post on Instagram</a></blockquote>',
    caption: "Spiritual journey of a lifetime! The guides were incredibly knowledgeable.",
    author: "Spiritual Seeker",
    featured: true
  }
];

function transformDestination(row) {
  return {
    id: row.id,
    name: row.name,
    shortDescription: row.short_description,
    description: row.description,
    mainImage: row.main_image,
    image2: row.image2,
    image3: row.image3,
    image4: row.image4,
    region: row.region,
    featured: row.featured
  };
}

function transformBlogPost(row) {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    publishedDate: row.published_date,
    readTime: row.read_time,
    mainImage: row.main_image,
    image2: row.image2,
    image3: row.image3,
    image4: row.image4,
    featured: row.featured
  };
}

function transformPackage(row) {
  return {
    id: row.id,
    name: row.name,
    destination: row.destination,
    category: row.category,
    duration: row.duration,
    shortDescription: row.short_description,
    highlights: row.highlights,
    imageUrl: row.image_url,
    detailedDescription: row.detailed_description,
    price: row.price,
    featured: row.featured
  };
}

function transformPanchangEvent(row) {
  return {
    id: row.id,
    date: row.date,
    name: row.name,
    description: row.description,
    type: row.type,
    significance: row.significance
  };
}

function transformVideoTestimonial(row) {
  return {
    id: row.id,
    platform: row.platform,
    videoUrl: row.video_url,
    embedCode: row.embed_code,
    caption: row.caption,
    author: row.author,
    featured: row.featured
  };
}

app.get("/api/destinations", async (req, res) => {
  try {
    if (!sql) {
      return res.json(mockDestinations.map(transformDestination));
    }
    const destinations = await sql`SELECT * FROM destinations ORDER BY featured DESC, name ASC`;
    if (destinations.length === 0) {
      return res.json(mockDestinations.map(transformDestination));
    }
    res.json(destinations.map(transformDestination));
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.json(mockDestinations.map(transformDestination));
  }
});

app.get("/api/destinations/:id", async (req, res) => {
  try {
    if (!sql) {
      const destination = mockDestinations.find(d => d.id === req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }
      return res.json(transformDestination(destination));
    }
    const destinations = await sql`SELECT * FROM destinations WHERE id = ${req.params.id}`;
    if (destinations.length === 0) {
      const mockDest = mockDestinations.find(d => d.id === req.params.id);
      if (mockDest) {
        return res.json(transformDestination(mockDest));
      }
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json(transformDestination(destinations[0]));
  } catch (error) {
    console.error("Error fetching destination:", error);
    const mockDest = mockDestinations.find(d => d.id === req.params.id);
    if (mockDest) {
      return res.json(transformDestination(mockDest));
    }
    res.status(500).json({ message: "Failed to fetch destination" });
  }
});

app.get("/api/blog-posts", async (req, res) => {
  try {
    if (!sql) {
      return res.json(mockBlogPosts.map(transformBlogPost));
    }
    const posts = await sql`SELECT * FROM blog_posts ORDER BY featured DESC, published_date DESC`;
    if (posts.length === 0) {
      return res.json(mockBlogPosts.map(transformBlogPost));
    }
    res.json(posts.map(transformBlogPost));
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.json(mockBlogPosts.map(transformBlogPost));
  }
});

app.get("/api/blog-posts/:id", async (req, res) => {
  try {
    if (!sql) {
      const post = mockBlogPosts.find(p => p.id === req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      return res.json(transformBlogPost(post));
    }
    const posts = await sql`SELECT * FROM blog_posts WHERE id = ${req.params.id}`;
    if (posts.length === 0) {
      const mockPost = mockBlogPosts.find(p => p.id === req.params.id);
      if (mockPost) {
        return res.json(transformBlogPost(mockPost));
      }
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(transformBlogPost(posts[0]));
  } catch (error) {
    console.error("Error fetching blog post:", error);
    const mockPost = mockBlogPosts.find(p => p.id === req.params.id);
    if (mockPost) {
      return res.json(transformBlogPost(mockPost));
    }
    res.status(500).json({ message: "Failed to fetch blog post" });
  }
});

app.get("/api/packages", async (req, res) => {
  try {
    if (!sql) {
      return res.json(mockPackages.map(transformPackage));
    }
    const packages = await sql`SELECT * FROM packages ORDER BY featured DESC, name ASC`;
    if (packages.length === 0) {
      return res.json(mockPackages.map(transformPackage));
    }
    res.json(packages.map(transformPackage));
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.json(mockPackages.map(transformPackage));
  }
});

app.get("/api/packages/:id", async (req, res) => {
  try {
    if (!sql) {
      const pkg = mockPackages.find(p => p.id === req.params.id);
      if (!pkg) {
        return res.status(404).json({ message: "Package not found" });
      }
      return res.json(transformPackage(pkg));
    }
    const packages = await sql`SELECT * FROM packages WHERE id = ${req.params.id}`;
    if (packages.length === 0) {
      const mockPkg = mockPackages.find(p => p.id === req.params.id);
      if (mockPkg) {
        return res.json(transformPackage(mockPkg));
      }
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(transformPackage(packages[0]));
  } catch (error) {
    console.error("Error fetching package:", error);
    const mockPkg = mockPackages.find(p => p.id === req.params.id);
    if (mockPkg) {
      return res.json(transformPackage(mockPkg));
    }
    res.status(500).json({ message: "Failed to fetch package" });
  }
});

app.get("/api/panchang-events", async (req, res) => {
  try {
    if (!sql) {
      return res.json(mockPanchangEvents.map(transformPanchangEvent));
    }
    const { year, month } = req.query;
    let events;
    if (year && month) {
      events = await sql`
        SELECT * FROM panchang_events 
        WHERE EXTRACT(YEAR FROM date) = ${parseInt(year)} 
        AND EXTRACT(MONTH FROM date) = ${parseInt(month)}
        ORDER BY date ASC
      `;
    } else {
      events = await sql`SELECT * FROM panchang_events ORDER BY date ASC`;
    }
    if (events.length === 0) {
      return res.json(mockPanchangEvents.map(transformPanchangEvent));
    }
    res.json(events.map(transformPanchangEvent));
  } catch (error) {
    console.error("Error fetching panchang events:", error);
    res.json(mockPanchangEvents.map(transformPanchangEvent));
  }
});

app.get("/api/video-testimonials", async (req, res) => {
  try {
    if (!sql) {
      return res.json(mockVideoTestimonials.map(transformVideoTestimonial));
    }
    const testimonials = await sql`SELECT * FROM video_testimonials ORDER BY featured DESC`;
    if (testimonials.length === 0) {
      return res.json(mockVideoTestimonials.map(transformVideoTestimonial));
    }
    res.json(testimonials.map(transformVideoTestimonial));
  } catch (error) {
    console.error("Error fetching video testimonials:", error);
    res.json(mockVideoTestimonials.map(transformVideoTestimonial));
  }
});

export default app;
