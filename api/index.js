import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mockDestinations = [
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

const mockBlogPosts = [
  {
    id: "morning-aarti",
    title: "Morning Aarti Through My Eyes",
    excerpt: "Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.",
    content: "Every morning, as the first rays of sun touch the waters of the Ganges, something magical happens...",
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
    content: "While Kashi Vishwanath Temple draws millions, Varanasi hides dozens of lesser-known temples...",
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
    content: "Ayodhya has transformed in recent years, and planning a visit requires updated knowledge...",
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

const mockPackages = [
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
    detailedDescription: "Begin your spiritual journey with a magical sunrise boat ride on the Ganges...",
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
    detailedDescription: "Day 1 covers the complete Varanasi experience...",
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
    detailedDescription: "This comprehensive pilgrimage covers two of Hinduism's holiest cities...",
    price: 7500,
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

const mockVideoTestimonials = [
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

app.get("/api/destinations", (req, res) => {
  res.json(mockDestinations);
});

app.get("/api/destinations/:id", (req, res) => {
  const destination = mockDestinations.find(d => d.id === req.params.id);
  if (!destination) {
    return res.status(404).json({ message: "Destination not found" });
  }
  res.json(destination);
});

app.get("/api/blog-posts", (req, res) => {
  res.json(mockBlogPosts);
});

app.get("/api/blog-posts/:id", (req, res) => {
  const post = mockBlogPosts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Blog post not found" });
  }
  res.json(post);
});

app.get("/api/packages", (req, res) => {
  res.json(mockPackages);
});

app.get("/api/packages/:id", (req, res) => {
  const pkg = mockPackages.find(p => p.id === req.params.id);
  if (!pkg) {
    return res.status(404).json({ message: "Package not found" });
  }
  res.json(pkg);
});

app.get("/api/panchang-events", (req, res) => {
  res.json(mockPanchangEvents);
});

app.get("/api/video-testimonials", (req, res) => {
  res.json(mockVideoTestimonials);
});

export default app;
