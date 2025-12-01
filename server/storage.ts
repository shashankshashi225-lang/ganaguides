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

const mockDestinations: Destination[] = [
  {
    id: "varanasi",
    name: "Varanasi",
    shortDescription: "Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.",
    description: "Varanasi, the spiritual capital of India, is one of the world's oldest continuously inhabited cities. Walk along the sacred ghats of the Ganges, witness the mesmerizing Ganga Aarti ceremony, and explore ancient temples that have stood for millennia. The city's narrow alleys hide centuries of spiritual heritage, making every visit a journey through time.",
    mainImage: "/generated_images/varanasi_holy_city_ganga.png",
    image2: "/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png",
    image3: "/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
    image4: "/generated_images/Varanasi_temple_architecture_detail_a35f07ab.png",
    region: "Varanasi",
    featured: true,
    isVisible: true
  },
  {
    id: "ayodhya",
    name: "Ayodhya",
    shortDescription: "Dive into the legends of Lord Ram and experience age-old traditions firsthand.",
    description: "Ayodhya, the birthplace of Lord Rama, is one of Hinduism's seven holiest cities. The recently constructed Ram Mandir stands as a magnificent testament to ancient Indian architecture. Visit Hanuman Garhi, Kanak Bhawan, and numerous other temples that echo with devotional chants and centuries of spiritual tradition.",
    mainImage: "/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png",
    image2: "/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png",
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: true,
    isVisible: true
  },
  {
    id: "sarnath",
    name: "Sarnath",
    shortDescription: "Visit the site where Buddha gave his first sermon, enriched with history and tranquility.",
    description: "Sarnath is where Buddhism began as Buddha gave his first sermon after attaining enlightenment. The Dhamek Stupa, Ashoka Pillar, and ancient monasteries create a serene atmosphere perfect for contemplation. Museums house remarkable Buddhist artifacts, while the peaceful deer park offers a glimpse into the Buddha's teachings.",
    mainImage: "/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: true,
    isVisible: true
  },
  {
    id: "prayagraj",
    name: "Prayagraj",
    shortDescription: "Experience the sacred confluence of three holy rivers at Triveni Sangam.",
    description: "Prayagraj, formerly Allahabad, is home to the legendary Triveni Sangam - the confluence of the Ganges, Yamuna, and the mythical Saraswati rivers. This sacred spot hosts the world's largest religious gathering, the Kumbh Mela. Visit the Allahabad Fort, Anand Bhawan, and experience the spiritual energy of ritual bathing at the sangam.",
    mainImage: "/generated_images/Prayagraj_Triveni_Sangam_confluence_c12597e6.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: true,
    isVisible: true
  },
  {
    id: "durga-temple",
    name: "Durga Temple",
    shortDescription: "The benevolent guardian goddess of Varanasi, protector of the sacred city.",
    description: "The Durga Temple, also known as the Monkey Temple, is one of Varanasi's most revered shrines dedicated to Goddess Durga. This 18th-century temple features striking red walls and is famous for its resident monkeys. The temple was rebuilt by Rani Bhavani of Bengal in 1760 AD and features Nagara-style architecture.",
    mainImage: "/generated_images/durga_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false,
    isVisible: true
  },
  {
    id: "sankat-mochan-temple",
    name: "Sankat Mochan Hanuman Temple",
    shortDescription: "The reliever of troubles - Varanasi's most beloved Hanuman shrine.",
    description: "Nestled in the Lanka area on the bank of the Assi River, the Sankat Mochan Hanuman Temple is one of Varanasi's most beloved shrines. Sankat Mochan means 'one who removes crises, troubles, and pain.' The temple was founded by saint-poet Goswami Tulsidas in the 16th century where he had a vision of Lord Hanuman.",
    mainImage: "/generated_images/sankat_mochan_hanuman_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false,
    isVisible: true
  },
  {
    id: "annapurna-temple",
    name: "Annapurna Temple",
    shortDescription: "Goddess of nourishment and sustenance, located near Kashi Vishwanath.",
    description: "The Annapurna Mandir in Varanasi is located near Visheshwarganj and adjacent to the revered Kashi Vishwanath Temple. Goddess Annapurna is the deity of food and nourishment. The temple was built in 1729 A.D. by the Maratha ruler Peshwa Baji Rao I, in the Nagara architectural style.",
    mainImage: "/generated_images/annapurna_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false,
    isVisible: true
  },
  {
    id: "nageshwar-nath-temple",
    name: "Nageshwar Nath Temple",
    shortDescription: "Ancient Shiva shrine built by Kush, son of Lord Rama, in sacred Ayodhya.",
    description: "The Nageshwar Nath Temple near Ram Ki Paidi is a heritage treasure in Ayodhya. This ancient Shiva temple is woven deeply into Ayodhya's mythology, legends, and royal history. The origins date back to the era of Kush, the son of Lord Rama.",
    mainImage: "/generated_images/nageshwar_nath_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false,
    isVisible: true
  },
  {
    id: "hanuman-garhi",
    name: "Hanuman Garhi",
    shortDescription: "Hilltop fortress temple of Bajrangbali guarding Ayodhya since the 10th century.",
    description: "Standing proudly in the heart of Ayodhya, the Hanuman Garhi Temple is one of the most iconic shrines dedicated to Lord Hanuman. Believed to be built around the 10th century, this sacred fort-like temple features 76 stairs leading up to the shrine with panoramic views of Ayodhya.",
    mainImage: "/generated_images/hanuman_garhi_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false,
    isVisible: true
  },
  {
    id: "treta-ke-thakur",
    name: "Treta Ke Thakur Temple",
    shortDescription: "Sacred seat of Lord Rama's Ashwamedha Yagna on the serene Saryu banks.",
    description: "Located on the serene banks of the Saryu River at Naya Ghat, the Treta Ke Thakur Temple is one of Ayodhya's most revered spiritual landmarks. The temple stands at the very place believed to be the site where Lord Rama performed the Ashwamedha Yagna.",
    mainImage: "/generated_images/treta_ke_thakur_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false,
    isVisible: true
  },
  {
    id: "kanak-bhawan",
    name: "Kanak Bhawan",
    shortDescription: "The golden palace of Sita and Ram, radiating royal charm and devotion.",
    description: "In the spiritual heart of Ayodhya stands Kanak Bhawan, one of the most enchanting temples dedicated to Lord Rama and Goddess Sita. Often called the 'Golden Palace of Ayodhya' for its richly adorned idols and luminous interiors.",
    mainImage: "/generated_images/kanak_bhawan_golden_palace.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false,
    isVisible: true
  },
  {
    id: "kaal-bhairav-temple",
    name: "Kaal Bhairav Temple",
    shortDescription: "The fierce guardian and kotwal (protector) of Kashi, the sacred guardian of Varanasi.",
    description: "The ancient Kaal Bhairav Temple houses the fierce yet compassionate deity whose very presence is believed to dissolve sins. He occupies a unique place in Varanasi's spiritual geography, embodying Shiva's role as destroyer and protector.",
    mainImage: "/generated_images/kaal_bhairav_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false,
    isVisible: true
  },
  {
    id: "kashi-vishwanath-temple",
    name: "Shri Kashi Vishwanath Temple",
    shortDescription: "The most sacred Jyotirlinga of Shiva, one of the 12 holiest shrines in Hindu pilgrimage.",
    description: "Shri Kashi Vishwanath Temple is one of the most venerated shrines in India. It hosts one of the twelve Jyotirlingas, the self-manifested lingams of Lord Shiva. A mere glimpse of this Jyotirlinga is believed to wash away sins and purify the soul.",
    mainImage: "/generated_images/kashi_vishwanath_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: true,
    isVisible: true
  }
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "morning-aarti",
    title: "Morning Aarti Through My Eyes",
    excerpt: "Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.",
    content: "There's something profoundly moving about witnessing the morning aarti on the banks of the Ganges. As the first rays of sunlight paint the sky in hues of orange and pink, the ghats of Varanasi come alive with an ancient ritual that has been performed for thousands of years.\n\nThe ceremony begins with the ringing of bells and the chanting of mantras. Priests in traditional attire perform synchronized movements, offering fire, flowers, and incense to the river goddess. The air fills with the fragrance of camphor and sandalwood, while the rhythmic sound of conch shells echoes across the water.",
    category: "Rituals",
    publishedDate: "Oct 15, 2025",
    readTime: "5 min read",
    mainImage: "/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true,
    isVisible: true
  },
  {
    id: "hidden-temples",
    title: "Top 5 Hidden Temples in Varanasi",
    excerpt: "Beyond the famous shrines lie secret temples with incredible stories. Here are our favorite hidden spiritual gems.",
    content: "While the Kashi Vishwanath Temple attracts millions of visitors, Varanasi is home to countless lesser-known temples, each with its own unique story and spiritual significance.\n\n1. Tulsi Manas Temple - Built in 1964, dedicated to Lord Rama with walls inscribed with verses from the Ramcharitmanas.\n\n2. Nepali Temple - Also known as Kathwala Temple, built by the King of Nepal with unique wooden architecture.\n\n3. Durga Temple - Known locally as the Monkey Temple, this 18th-century shrine is dedicated to Goddess Durga.\n\n4. Sankat Mochan Hanuman Temple - Founded by saint Tulsidas, dedicated to Lord Hanuman.\n\n5. Mrityunjay Mahadev Temple - An ancient Shiva temple located on Manikarnika Ghat.",
    category: "Heritage",
    publishedDate: "Oct 10, 2025",
    readTime: "7 min read",
    mainImage: "/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
    image2: null,
    image3: null,
    image4: null,
    featured: true,
    isVisible: true
  },
  {
    id: "ayodhya-guide",
    title: "Ayodhya Spiritual Trail: What You Need to Know",
    excerpt: "Planning a pilgrimage to Ayodhya? Our comprehensive guide covers everything from temples to local customs.",
    content: "Ayodhya, the birthplace of Lord Rama, has emerged as one of India's most significant pilgrimage destinations.\n\nBest Time to Visit: October to March when the weather is pleasant.\n\nMust-Visit Places:\n- Ram Janmabhoomi Temple\n- Hanuman Garhi\n- Kanak Bhawan\n- Saryu River Ghats\n\nLocal Customs:\n- Dress modestly when visiting temples\n- Remove shoes before entering temple premises\n- Photography may be restricted in certain areas\n\nGetting There: Ayodhya is well-connected by rail and road. The nearest airport is in Lucknow (about 140 km away).",
    category: "Travel Tips",
    publishedDate: "Oct 5, 2025",
    readTime: "10 min read",
    mainImage: "/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png",
    image2: null,
    image3: null,
    image4: null,
    featured: false,
    isVisible: true
  }
];

const mockPackages: Package[] = [
  {
    id: "1day-kashi",
    name: "1-Day Kashi Darshan",
    category: "touristic",
    duration: "1 Day",
    destination: "Varanasi",
    shortDescription: "Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.",
    highlights: ["Sunrise boat ride on the Ganges", "Visit to Kashi Vishwanath Temple", "Explore hidden alleys of old Varanasi", "Witness evening Ganga Aarti ceremony"],
    imageUrl: "/generated_images/Kashi_walking_tour_group_d0392eea.png",
    detailedDescription: "Immerse yourself in the spiritual essence of Varanasi with this comprehensive one-day journey through the ancient city of Kashi.",
    price: 2500,
    featured: true,
    isVisible: true
  },
  {
    id: "2day-sarnath",
    name: "2-Day Kashi + Sarnath",
    category: "touristic",
    duration: "2 Days",
    destination: "Varanasi",
    shortDescription: "Combine the spiritual energy of Varanasi with the peaceful Buddhist heritage of Sarnath on this immersive journey.",
    highlights: ["Complete Varanasi tour with boat ride", "Explore Sarnath where Buddha gave first sermon", "Visit Dhamek Stupa and museums", "Morning meditation session by the Ganges"],
    imageUrl: "/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png",
    detailedDescription: "Embark on a profound two-day spiritual expedition that connects the ancient traditions of Hinduism and Buddhism.",
    price: 6500,
    featured: false,
    isVisible: true
  },
  {
    id: "3day-ayodhya",
    name: "3-Day Ayodhya + Kashi Spiritual Trail",
    category: "touristic",
    duration: "3 Days",
    destination: "Ayodhya",
    shortDescription: "A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.",
    highlights: ["Ram Janmabhoomi and major Ayodhya temples", "Hanuman Garhi and Kanak Bhawan", "Complete Varanasi heritage experience", "Sacred rituals participation opportunity"],
    imageUrl: "/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png",
    detailedDescription: "Undertake a transformative three-day pilgrimage that weaves together two of India's most sacred cities.",
    price: 12500,
    featured: true,
    isVisible: true
  },
  {
    id: "ramlila",
    name: "Ramnagar Ramlila Experience",
    category: "popular_event",
    duration: "1 Day",
    destination: "Varanasi",
    shortDescription: "Witness the spectacular month-long Ramlila performances across Ramnagar with traditional staging and authentic cultural immersion.",
    highlights: ["UNESCO-recognized Ramlila spectacle", "Traditional performances without modern lighting", "Heritage locale experience", "Expert guide narration of the epic"],
    imageUrl: "/generated_images/Kashi_walking_tour_group_d0392eea.png",
    detailedDescription: "Experience the majestic month-long open-air Ramlila across Ramnagar.",
    price: 3500,
    featured: true,
    isVisible: true
  },
  {
    id: "dev-deepawali",
    name: "Ganga Mahotsav & Dev Deepawali",
    category: "popular_event",
    duration: "3 Days",
    destination: "Varanasi",
    shortDescription: "Experience vibrant cultural programs during Ganga Mahotsav and the luminous Dev Deepawali with millions of diyas.",
    highlights: ["Ganga Mahotsav cultural programs", "Dev Deepawali diya illumination", "Kartik Purnima full moon celebrations", "Boat ride during festival of lights"],
    imageUrl: "/generated_images/Dev_Deepawali_festival_night_806cde54.png",
    detailedDescription: "From November 1 to 4, Ganga Mahotsav lights up the ghats with vibrant cultural programs.",
    price: 8500,
    featured: true,
    isVisible: true
  },
  {
    id: "ganga-aarti",
    name: "Ganga Aarti Ritual Experience",
    category: "pooja",
    duration: "Half Day",
    destination: "Varanasi",
    shortDescription: "Perform sacred rituals like Ganga Aarti, Rudrabhishek, or special temple offerings with expert priest guidance.",
    highlights: ["Personal Ganga Aarti ceremony", "Priest-guided ritual performance", "Sacred offering at Dashashwamedh Ghat", "Blessing and prasad distribution"],
    imageUrl: "/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png",
    detailedDescription: "Experience the profound spiritual significance of Ganga Aarti with a personalized ceremony.",
    price: 1500,
    featured: true,
    isVisible: true
  },
  {
    id: "temple-pooja",
    name: "Temple Pooja Package",
    category: "pooja",
    duration: "1 Day",
    destination: "Varanasi",
    shortDescription: "Complete temple ritual package including Kashi Vishwanath Darshan and special offerings at major sacred sites.",
    highlights: ["Kashi Vishwanath special darshan", "Rudrabhishek ceremony", "Sankat Mochan Hanuman Temple pooja", "Multiple temple offerings with priests"],
    imageUrl: "/generated_images/kashi_vishwanath_temple.png",
    detailedDescription: "A comprehensive spiritual package designed for devotees seeking blessings from the most sacred temples of Varanasi.",
    price: 5000,
    featured: true,
    isVisible: true
  }
];

const mockPanchangEvents: PanchangEvent[] = [
  {
    id: "kartik-purnima",
    date: "2025-11-15",
    name: "Kartik Purnima",
    description: "Full moon day in Kartik month. Highly auspicious for holy dip in Ganges. Dev Deepawali is celebrated on this day at Varanasi ghats with millions of diyas.",
    type: "Purnima",
    significance: "Best time for Ganga Snan and spiritual ceremonies. Special rituals at all ghats.",
    featured: true,
    isVisible: true
  },
  {
    id: "kartik-amavasya",
    date: "2025-11-30",
    name: "Kartik Amavasya",
    description: "New moon day in Kartik month. Important day for Pitru Tarpan and ancestral worship.",
    type: "Amavasya",
    significance: "Ideal for Pitru Tarpan ceremonies and seeking blessings for ancestors.",
    featured: false,
    isVisible: true
  },
  {
    id: "margashirsha-purnima",
    date: "2025-12-14",
    name: "Margashirsha Purnima",
    description: "Full moon in the auspicious month of Margashirsha. Lord Krishna considers this month most dear.",
    type: "Purnima",
    significance: "Sacred bathing and Satyanarayan Puja are highly recommended.",
    featured: false,
    isVisible: true
  },
  {
    id: "gita-jayanti",
    date: "2025-12-25",
    name: "Gita Jayanti",
    description: "Anniversary of Bhagavad Gita when Lord Krishna delivered the sacred teachings to Arjuna on the battlefield of Kurukshetra.",
    type: "Festival",
    significance: "Special Gita path recitations at temples. Join guided spiritual discussions.",
    featured: true,
    isVisible: true
  },
  {
    id: "makar-sankranti",
    date: "2026-01-14",
    name: "Makar Sankranti",
    description: "Sun enters Capricorn zodiac. Major festival marking the end of winter solstice. Holy dip at Triveni Sangam is especially auspicious.",
    type: "Festival",
    significance: "Millions gather at Prayagraj for sacred bath. Kite flying celebrations across North India.",
    featured: true,
    isVisible: true
  },
  {
    id: "paush-purnima",
    date: "2026-01-13",
    name: "Paush Purnima",
    description: "Full moon in Paush month. Beginning of Magh Mela at Prayagraj.",
    type: "Purnima",
    significance: "Start of month-long Magh Mela. Excellent for pilgrimage to Prayagraj.",
    featured: false,
    isVisible: true
  },
  {
    id: "mauni-amavasya",
    date: "2026-01-29",
    name: "Mauni Amavasya",
    description: "Most sacred Amavasya when devotees observe silence (maun). Royal bath day during Magh Mela.",
    type: "Amavasya",
    significance: "Extremely auspicious for holy bath and spiritual practices.",
    featured: true,
    isVisible: true
  },
  {
    id: "basant-panchami",
    date: "2026-02-02",
    name: "Basant Panchami",
    description: "Festival celebrating Goddess Saraswati and the arrival of spring. Yellow is the traditional color of the day.",
    type: "Festival",
    significance: "Worship Goddess Saraswati for knowledge and wisdom. Auspicious for starting new ventures.",
    featured: true,
    isVisible: true
  },
  {
    id: "maha-shivaratri",
    date: "2026-02-26",
    name: "Maha Shivaratri",
    description: "The great night of Lord Shiva. One of the most important festivals for Shiva devotees.",
    type: "Festival",
    significance: "Night-long vigil at Shiva temples. Special abhishek and pujas at Kashi Vishwanath.",
    featured: true,
    isVisible: true
  },
  {
    id: "holi",
    date: "2026-03-14",
    name: "Holi",
    description: "Festival of colors celebrating the victory of good over evil and the arrival of spring.",
    type: "Festival",
    significance: "Holika Dahan on the eve, followed by color play celebrations across the city.",
    featured: true,
    isVisible: true
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
    featured: true,
    isVisible: true
  },
  {
    id: "2",
    platform: "instagram",
    videoUrl: "https://www.instagram.com/gangaguide/reel/example2/",
    embedCode: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/example2/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/example2/">View this post on Instagram</a></blockquote>',
    caption: "Spiritual journey of a lifetime! The guides were incredibly knowledgeable about every temple.",
    author: "Spiritual Seeker",
    featured: true,
    isVisible: true
  },
  {
    id: "3",
    platform: "instagram",
    videoUrl: "https://www.instagram.com/gangaguide/reel/example3/",
    embedCode: '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/example3/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/example3/">View this post on Instagram</a></blockquote>',
    caption: "The evening Ganga Aarti was beyond words. Thank you GangaGuides!",
    author: "Devotee from Mumbai",
    featured: true,
    isVisible: true
  }
];

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
    if (!db) return mockDestinations;
    try {
      const dbDestinations = await db.select().from(destinations);
      return dbDestinations.length > 0 ? dbDestinations : mockDestinations;
    } catch (error) {
      console.warn("Database error fetching destinations, using mock data:", error);
      return mockDestinations;
    }
  }

  async getVisibleDestinations(): Promise<Destination[]> {
    if (!db) return mockDestinations.filter(d => d.isVisible);
    try {
      const dbDestinations = await db.select().from(destinations).where(eq(destinations.isVisible, true));
      return dbDestinations.length > 0 ? dbDestinations : mockDestinations.filter(d => d.isVisible);
    } catch (error) {
      console.warn("Database error fetching visible destinations, using mock data:", error);
      return mockDestinations.filter(d => d.isVisible);
    }
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    if (!db) return mockDestinations.filter(d => d.featured && d.isVisible);
    try {
      const dbDestinations = await db.select().from(destinations).where(and(eq(destinations.featured, true), eq(destinations.isVisible, true)));
      return dbDestinations.length > 0 ? dbDestinations : mockDestinations.filter(d => d.featured && d.isVisible);
    } catch (error) {
      console.warn("Database error fetching featured destinations, using mock data:", error);
      return mockDestinations.filter(d => d.featured && d.isVisible);
    }
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    if (!db) return mockDestinations.find(d => d.id === id);
    try {
      const [destination] = await db.select().from(destinations).where(eq(destinations.id, id));
      return destination || mockDestinations.find(d => d.id === id);
    } catch (error) {
      console.warn("Database error fetching destination, using mock data:", error);
      return mockDestinations.find(d => d.id === id);
    }
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
    if (!db) return mockBlogPosts;
    try {
      const dbPosts = await db.select().from(blogPosts);
      return dbPosts.length > 0 ? dbPosts : mockBlogPosts;
    } catch (error) {
      console.warn("Database error fetching blog posts, using mock data:", error);
      return mockBlogPosts;
    }
  }

  async getVisibleBlogPosts(): Promise<BlogPost[]> {
    if (!db) return mockBlogPosts.filter(p => p.isVisible);
    try {
      const dbPosts = await db.select().from(blogPosts).where(eq(blogPosts.isVisible, true));
      return dbPosts.length > 0 ? dbPosts : mockBlogPosts.filter(p => p.isVisible);
    } catch (error) {
      console.warn("Database error fetching visible blog posts, using mock data:", error);
      return mockBlogPosts.filter(p => p.isVisible);
    }
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    if (!db) return mockBlogPosts.filter(p => p.featured && p.isVisible);
    try {
      const dbPosts = await db.select().from(blogPosts).where(and(eq(blogPosts.featured, true), eq(blogPosts.isVisible, true)));
      return dbPosts.length > 0 ? dbPosts : mockBlogPosts.filter(p => p.featured && p.isVisible);
    } catch (error) {
      console.warn("Database error fetching featured blog posts, using mock data:", error);
      return mockBlogPosts.filter(p => p.featured && p.isVisible);
    }
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    if (!db) return mockBlogPosts.find(p => p.id === id);
    try {
      const [blogPost] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
      return blogPost || mockBlogPosts.find(p => p.id === id);
    } catch (error) {
      console.warn("Database error fetching blog post, using mock data:", error);
      return mockBlogPosts.find(p => p.id === id);
    }
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
    if (!db) return mockPackages;
    try {
      const dbPackages = await db.select().from(packages);
      return dbPackages.length > 0 ? dbPackages : mockPackages;
    } catch (error) {
      console.warn("Database error fetching packages, using mock data:", error);
      return mockPackages;
    }
  }

  async getVisiblePackages(): Promise<Package[]> {
    if (!db) return mockPackages.filter(p => p.isVisible);
    try {
      const dbPackages = await db.select().from(packages).where(eq(packages.isVisible, true));
      return dbPackages.length > 0 ? dbPackages : mockPackages.filter(p => p.isVisible);
    } catch (error) {
      console.warn("Database error fetching visible packages, using mock data:", error);
      return mockPackages.filter(p => p.isVisible);
    }
  }

  async getFeaturedPackages(): Promise<Package[]> {
    if (!db) return mockPackages.filter(p => p.featured && p.isVisible);
    try {
      const dbPackages = await db.select().from(packages).where(and(eq(packages.featured, true), eq(packages.isVisible, true)));
      return dbPackages.length > 0 ? dbPackages : mockPackages.filter(p => p.featured && p.isVisible);
    } catch (error) {
      console.warn("Database error fetching featured packages, using mock data:", error);
      return mockPackages.filter(p => p.featured && p.isVisible);
    }
  }

  async getPackage(id: string): Promise<Package | undefined> {
    if (!db) return mockPackages.find(p => p.id === id);
    try {
      const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
      return pkg || mockPackages.find(p => p.id === id);
    } catch (error) {
      console.warn("Database error fetching package, using mock data:", error);
      return mockPackages.find(p => p.id === id);
    }
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
    if (!db) return mockPanchangEvents;
    try {
      const dbEvents = await db.select().from(panchangEvents);
      return dbEvents.length > 0 ? dbEvents : mockPanchangEvents;
    } catch (error) {
      console.warn("Database error fetching panchang events, using mock data:", error);
      return mockPanchangEvents;
    }
  }

  async getVisiblePanchangEvents(): Promise<PanchangEvent[]> {
    if (!db) return mockPanchangEvents.filter(e => e.isVisible);
    try {
      const dbEvents = await db.select().from(panchangEvents).where(eq(panchangEvents.isVisible, true));
      return dbEvents.length > 0 ? dbEvents : mockPanchangEvents.filter(e => e.isVisible);
    } catch (error) {
      console.warn("Database error fetching visible panchang events, using mock data:", error);
      return mockPanchangEvents.filter(e => e.isVisible);
    }
  }

  async getFeaturedPanchangEvents(): Promise<PanchangEvent[]> {
    if (!db) return mockPanchangEvents.filter(e => e.featured && e.isVisible);
    try {
      const dbEvents = await db.select().from(panchangEvents).where(and(eq(panchangEvents.featured, true), eq(panchangEvents.isVisible, true)));
      return dbEvents.length > 0 ? dbEvents : mockPanchangEvents.filter(e => e.featured && e.isVisible);
    } catch (error) {
      console.warn("Database error fetching featured panchang events, using mock data:", error);
      return mockPanchangEvents.filter(e => e.featured && e.isVisible);
    }
  }

  async getPanchangEvent(id: string): Promise<PanchangEvent | undefined> {
    if (!db) return mockPanchangEvents.find(e => e.id === id);
    try {
      const [event] = await db.select().from(panchangEvents).where(eq(panchangEvents.id, id));
      return event || mockPanchangEvents.find(e => e.id === id);
    } catch (error) {
      console.warn("Database error fetching panchang event, using mock data:", error);
      return mockPanchangEvents.find(e => e.id === id);
    }
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
    if (!db) return mockVideoTestimonials;
    try {
      const dbTestimonials = await db.select().from(videoTestimonials);
      return dbTestimonials.length > 0 ? dbTestimonials : mockVideoTestimonials;
    } catch (error) {
      console.warn("Database error fetching video testimonials, using mock data:", error);
      return mockVideoTestimonials;
    }
  }

  async getVisibleVideoTestimonials(): Promise<VideoTestimonial[]> {
    if (!db) return mockVideoTestimonials.filter(t => t.isVisible);
    try {
      const dbTestimonials = await db.select().from(videoTestimonials).where(eq(videoTestimonials.isVisible, true));
      return dbTestimonials.length > 0 ? dbTestimonials : mockVideoTestimonials.filter(t => t.isVisible);
    } catch (error) {
      console.warn("Database error fetching visible video testimonials, using mock data:", error);
      return mockVideoTestimonials.filter(t => t.isVisible);
    }
  }

  async getFeaturedVideoTestimonials(): Promise<VideoTestimonial[]> {
    if (!db) return mockVideoTestimonials.filter(t => t.featured && t.isVisible);
    try {
      const dbTestimonials = await db.select().from(videoTestimonials).where(and(eq(videoTestimonials.featured, true), eq(videoTestimonials.isVisible, true)));
      return dbTestimonials.length > 0 ? dbTestimonials : mockVideoTestimonials.filter(t => t.featured && t.isVisible);
    } catch (error) {
      console.warn("Database error fetching featured video testimonials, using mock data:", error);
      return mockVideoTestimonials.filter(t => t.featured && t.isVisible);
    }
  }

  async getVideoTestimonial(id: string): Promise<VideoTestimonial | undefined> {
    if (!db) return mockVideoTestimonials.find(t => t.id === id);
    try {
      const [testimonial] = await db.select().from(videoTestimonials).where(eq(videoTestimonials.id, id));
      return testimonial || mockVideoTestimonials.find(t => t.id === id);
    } catch (error) {
      console.warn("Database error fetching video testimonial, using mock data:", error);
      return mockVideoTestimonials.find(t => t.id === id);
    }
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
    try {
      const dbBookings = await db.select().from(bookings);
      return dbBookings;
    } catch (error) {
      console.warn("Database error fetching bookings:", error);
      return [];
    }
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    if (!db) return undefined;
    try {
      const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
      return booking || undefined;
    } catch (error) {
      console.warn("Database error fetching booking:", error);
      return undefined;
    }
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    if (!db) throw new Error("Database not available");
    try {
      const [booking] = await db.insert(bookings).values(insertBooking).returning();
      return booking;
    } catch (error: any) {
      console.error("Error creating booking:", error);
      throw new Error(`Failed to create booking: ${error.message}`);
    }
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

export const storage: IStorage = new DatabaseStorage();
