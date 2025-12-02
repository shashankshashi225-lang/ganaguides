import { 
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
import type { IStorage } from "./storage";

const varanasi = "/attached_assets/generated_images/Boat_perspective_Ganges_view_e308dae7.png";
const ayodhya = "/attached_assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png";
const ujjain = "/attached_assets/generated_images/mahakaleshwar_temple_ujjain_exterior.png";

const varanasiTemple = "/attached_assets/generated_images/kashi_vishwanath_temple.png";
const ayodhyaTemple = "/attached_assets/generated_images/hanuman_garhi_temple_ayodhya.png";
const ujjainGhat = "/attached_assets/generated_images/ram_ghat_ujjain_evening_aarti.png";

const blog1 = "/attached_assets/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png";
const blog2 = "/attached_assets/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png";
const blog3 = "/attached_assets/generated_images/bade_ganeshji_temple_ujjain.png";

const package1 = "/attached_assets/generated_images/Kashi_walking_tour_group_d0392eea.png";
const package2 = "/attached_assets/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png";
const package3 = "/attached_assets/generated_images/mahakaleshwar_temple_ujjain_exterior.png";

export class MemoryStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private destinations: Map<string, Destination> = new Map();
  private blogPosts: Map<string, BlogPost> = new Map();
  private packages: Map<string, Package> = new Map();
  private panchangEvents: Map<string, PanchangEvent> = new Map();
  private videoTestimonials: Map<string, VideoTestimonial> = new Map();
  private bookings: Map<string, Booking> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const destinationsData: Destination[] = [
      {
        id: "varanasi",
        name: "Varanasi",
        shortDescription: "Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.",
        description: "Varanasi, also known as Kashi or Benares, is one of the world's oldest continuously inhabited cities. Situated on the banks of the sacred River Ganges, this spiritual capital of India offers an unparalleled blend of ancient traditions, vibrant culture, and profound spirituality.\n\nFrom the mesmerizing Ganga Aarti at Dashashwamedh Ghat to the narrow winding lanes filled with temples, from the famous Kashi Vishwanath Temple to the peaceful morning boat rides, Varanasi is a city that touches the soul of every visitor.\n\nExperience the magic of sunrise on the Ganges, witness cremation rituals at Manikarnika Ghat, explore over 2000 temples, and taste the famous Banarasi paan and lassi. Whether you seek spiritual enlightenment or cultural immersion, Varanasi offers an unforgettable journey through India's living heritage.",
        mainImage: varanasi,
        image2: varanasiTemple,
        image3: blog1,
        image4: null,
        region: "Varanasi",
        featured: true,
        isVisible: true,
      },
      {
        id: "ayodhya",
        name: "Ayodhya",
        shortDescription: "Dive into the legends of Lord Ram and experience age-old traditions firsthand.",
        description: "Ayodhya, the birthplace of Lord Rama, is one of the most sacred pilgrimage sites in Hinduism. This ancient city, mentioned in the great epic Ramayana, stands as a testament to India's rich spiritual and cultural heritage.\n\nVisit the magnificent Ram Janmabhoomi temple, explore Hanuman Garhi, walk through Kanak Bhawan, and experience the serene Saryu Aarti. Ayodhya offers a journey through time, connecting you with thousands of years of devotion and tradition.\n\nThe newly constructed Ram Mandir stands as a symbol of faith and architectural brilliance. Walk along the beautifully lit Ram Ki Paidi, witness the spectacular Saryu Aarti, and feel the divine energy that pervades every corner of this sacred city.",
        mainImage: ayodhya,
        image2: ayodhyaTemple,
        image3: blog2,
        image4: null,
        region: "Ayodhya",
        featured: true,
        isVisible: true,
      },
      {
        id: "ujjain",
        name: "Ujjain",
        shortDescription: "Experience the sacred Mahakaleshwar Jyotirlinga and ancient temples of this holy city.",
        description: "Ujjain, one of the seven sacred cities of India, is home to the revered Mahakaleshwar Jyotirlinga - one of the twelve sacred shrines of Lord Shiva. This ancient city on the banks of the Shipra River has been a center of learning and spirituality for millennia.\n\nWitness the famous Bhasma Aarti at Mahakaleshwar Temple, explore the ancient Kal Bhairav Temple, visit the historic Ram Ghat, and experience the spiritual energy of the Kumbh Mela city. Ujjain is where astronomy and spirituality merge, home to the ancient Jantar Mantar observatory.\n\nThe city's temples, ghats, and sacred sites offer a profound spiritual experience. From the mystical Bhasma Aarti performed with sacred ash to the peaceful boat rides on the Shipra, Ujjain captivates every pilgrim's heart.",
        mainImage: ujjain,
        image2: ujjainGhat,
        image3: blog3,
        image4: null,
        region: "Ujjain",
        featured: true,
        isVisible: true,
      },
    ];

    const blogPostsData: BlogPost[] = [
      {
        id: "morning-aarti-varanasi",
        title: "Morning Aarti Through My Eyes: A Varanasi Experience",
        excerpt: "Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.",
        content: "There's something profoundly moving about witnessing the morning aarti on the banks of the Ganges. As the first rays of sunlight paint the sky in hues of orange and pink, the ghats of Varanasi come alive with an ancient ritual that has been performed for thousands of years.\n\nThe ceremony begins with the ringing of bells and the chanting of mantras. Priests in traditional attire perform synchronized movements, offering fire, flowers, and incense to the river goddess. The air fills with the fragrance of camphor and sandalwood, while the rhythmic sound of conch shells echoes across the water.\n\nWhat makes the morning aarti truly special is not just the ritual itself, but the devotion of the people who gather here. From elderly sadhus who have performed this ritual every day for decades to young children experiencing it for the first time, everyone is united in reverence.\n\nAs you sit on the ghats, watching the sun rise over the holy river, you can't help but feel a connection to something greater than yourself. This is the magic of Varanasi - a city where the spiritual and temporal worlds seamlessly blend, where every sunrise brings renewal, and where ancient traditions continue to thrive in the modern world.\n\nPractical Tips:\n- Arrive by 5 AM to get a good spot\n- Wear comfortable, modest clothing\n- Carry a small cushion for sitting on the stone steps\n- Consider taking a boat ride for a unique perspective",
        category: "Rituals",
        publishedDate: "Nov 15, 2025",
        readTime: "6 min read",
        mainImage: blog1,
        image2: null,
        image3: null,
        image4: null,
        featured: true,
        isVisible: true,
      },
      {
        id: "ayodhya-pilgrim-guide",
        title: "Ayodhya Spiritual Trail: Complete Pilgrim's Guide",
        excerpt: "Planning a pilgrimage to Ayodhya? Our comprehensive guide covers everything from temples to local customs.",
        content: "Ayodhya, the birthplace of Lord Rama, has emerged as one of India's most significant pilgrimage destinations. Whether you're planning your first visit or returning to this sacred city, here's everything you need to know:\n\nBest Time to Visit:\nThe ideal time to visit Ayodhya is between October and March when the weather is pleasant. However, special occasions like Ram Navami (March-April) offer a unique cultural experience with grand celebrations.\n\nMust-Visit Places:\n- Ram Janmabhoomi Temple: The newly constructed temple complex at the birthplace of Lord Rama is a architectural marvel\n- Hanuman Garhi: A fortress-like temple dedicated to Lord Hanuman with stunning views of the city\n- Kanak Bhawan: A beautiful golden temple gifted to Sita by Kaikeyi\n- Saryu River Ghats: Perfect for morning prayers and spectacular evening aarti\n- Dashrath Bhavan: The palace where King Dashrath once lived\n\nLocal Customs:\n- Dress modestly when visiting temples (avoid shorts and sleeveless tops)\n- Remove shoes before entering temple premises\n- Photography may be restricted in certain areas\n- Participate respectfully in rituals and ceremonies\n- Consider hiring a local guide for deeper insights\n\nGetting There:\nAyodhya is well-connected by rail and road. The Ayodhya Dham railway station and new airport make access easier than ever. We offer comfortable transportation from Varanasi to Ayodhya as part of our spiritual trail packages.\n\nLocal Cuisine:\nDon't miss trying the local prasad, pedas, and traditional vegetarian meals served at temple complexes. The city is known for its sattvic food.",
        category: "Travel Tips",
        publishedDate: "Nov 10, 2025",
        readTime: "8 min read",
        mainImage: blog2,
        image2: null,
        image3: null,
        image4: null,
        featured: true,
        isVisible: true,
      },
      {
        id: "ujjain-mahakal-journey",
        title: "Ujjain: The City of Mahakal - A Sacred Journey",
        excerpt: "Discover the mystical charm of Ujjain, home to the famous Mahakaleshwar Jyotirlinga and centuries of spiritual heritage.",
        content: "Ujjain, one of the holiest cities in Hinduism, sits majestically on the banks of the sacred Shipra River. Known as the city of Mahakal (Lord of Time), Ujjain has been a center of spiritual and astronomical learning for over 3000 years.\n\nThe Bhasma Aarti Experience:\nThe most unique ritual in all of India takes place at the Mahakaleshwar Temple. The Bhasma Aarti, performed before dawn, uses sacred ash from funeral pyres to anoint the lingam. This ancient ceremony, believed to date back thousands of years, is a profound spiritual experience. Booking in advance is essential as only limited devotees are allowed entry.\n\nMust-Visit Temples:\n- Mahakaleshwar Temple: One of the 12 Jyotirlingas, this temple houses a south-facing lingam\n- Kal Bhairav Temple: Dedicated to the fierce form of Lord Shiva\n- Harsiddhi Temple: One of the 51 Shakti Peethas\n- Gadkalika Temple: Ancient temple with unique architectural features\n- Bade Ganeshji Temple: Famous for its large Ganesh idol\n\nSacred Ghats:\n- Ram Ghat: The main ghat where Kumbh Mela rituals take place\n- Mangalnath Temple: Believed to be the birthplace of Mars (Mangal)\n\nKumbh Mela Connection:\nUjjain hosts the Simhastha Kumbh Mela every 12 years, when millions gather for a holy dip in the Shipra. This is one of the largest religious gatherings on Earth.\n\nBest Time to Visit:\nOctober to March offers pleasant weather. Maha Shivaratri (February-March) is celebrated with great fervor here.",
        category: "Heritage",
        publishedDate: "Nov 5, 2025",
        readTime: "7 min read",
        mainImage: blog3,
        image2: null,
        image3: null,
        image4: null,
        featured: true,
        isVisible: true,
      },
    ];

    const packagesData: Package[] = [
      {
        id: "ramnagar-ramlila",
        name: "Ramnagar Ramlila Experience",
        category: "popular_event",
        duration: "1 Day",
        destination: "Varanasi",
        shortDescription: "Witness the spectacular month-long Ramlila performances across Ramnagar with traditional staging and authentic cultural immersion.",
        highlights: [
          "UNESCO-recognized Ramlila spectacle",
          "Traditional performances without modern lighting",
          "Heritage locale experience",
          "Expert guide narration of the epic",
        ],
        imageUrl: package1,
        detailedDescription: "Kicking off on September 6—coinciding with Anant Chaturdashi—the majestic month-long open-air Ramlila unfolds across Ramnagar. This UNESCO-recognized spectacle brings the Ramcharitmanas to life with traditional performances across heritage locales—no modern lighting or sound, just pure cultural immersion.\n\nExperience the epic journey of Lord Rama as it has been performed for generations. Our expert guides will narrate the story, explain the significance of each scene, and ensure you get the best viewing spots. This is not just a performance—it's a living tradition that connects you to centuries of cultural heritage.\n\nIncludes: Transportation, guide services, refreshments, and premium viewing positions.",
        price: 3500,
        featured: true,
        isVisible: true,
      },
      {
        id: "ganga-mahotsav-dev-deepawali",
        name: "Ganga Mahotsav & Dev Deepawali",
        category: "popular_event",
        duration: "3 Days",
        destination: "Varanasi",
        shortDescription: "Experience vibrant cultural programs during Ganga Mahotsav and the luminous Dev Deepawali with millions of diyas.",
        highlights: [
          "Ganga Mahotsav cultural programs",
          "Dev Deepawali diya illumination",
          "Kartik Purnima full moon celebrations",
          "Boat ride during festival of lights",
        ],
        imageUrl: "/attached_assets/generated_images/Dev_Deepawali_festival_night_806cde54.png",
        detailedDescription: "From November 1 to 4, Ganga Mahotsav lights up the ghats with vibrant cultural programs near Rajghat. Right after, on November 5, Dev Deepawali transforms the riverfront into a luminous wonderland as over a million diyas cast reflections across the Ganges during the full moon night of Kartik Purnima.\n\nWitness this spectacular festival of lights that illuminates the sacred city. The ghats come alive with music, dance, and devotion as thousands gather to celebrate. Take a boat ride to see the illuminated ghats from the water—an unforgettable spectacle.\n\nIncludes: 3-star accommodation, all meals, boat rides, cultural program access, guide services, and airport/station transfers.",
        price: 15000,
        featured: true,
        isVisible: true,
      },
      {
        id: "maha-shivaratri-kashi",
        name: "Maha Shivaratri at Kashi",
        category: "popular_event",
        duration: "2 Days",
        destination: "Varanasi",
        shortDescription: "Experience the grandest Maha Shivaratri celebrations at the spiritual capital of Lord Shiva.",
        highlights: [
          "All-night vigil at Kashi Vishwanath",
          "Special darshan arrangements",
          "Traditional fasting and prayers",
          "Ghat-side celebrations and rituals",
        ],
        imageUrl: varanasiTemple,
        detailedDescription: "Celebrate Maha Shivaratri in the most sacred city of Lord Shiva. This two-day package takes you through the grand celebrations that transform Varanasi into a spiritual powerhouse.\n\nParticipate in the all-night vigil at Kashi Vishwanath Temple, witness special abhishek ceremonies, join thousands of devotees in chanting 'Om Namah Shivaya', and experience the electrifying atmosphere as the city stays awake through the night in devotion.\n\nOur special darshan arrangements ensure you have a meaningful experience without the long waits. Traditional sattvic meals and comfortable accommodation included.\n\nIncludes: Premium accommodation, special temple darshan, guide services, all vegetarian meals, and transportation.",
        price: 8500,
        featured: true,
        isVisible: true,
      },
      {
        id: "1-day-kashi-darshan",
        name: "1-Day Kashi Darshan",
        category: "touristic",
        duration: "1 Day",
        destination: "Varanasi",
        shortDescription: "Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.",
        highlights: [
          "Sunrise boat ride on the Ganges",
          "Visit to Kashi Vishwanath Temple",
          "Explore hidden alleys of old Varanasi",
          "Witness evening Ganga Aarti ceremony",
        ],
        imageUrl: package1,
        detailedDescription: "Immerse yourself in the spiritual essence of Varanasi with this comprehensive one-day journey through the ancient city of Kashi. Experience the magic of sunrise on the Ganges, visit the most sacred temples, explore the winding lanes of the old city, and witness the mesmerizing evening aarti ceremony.\n\nYour day begins before dawn with a boat ride as the sun rises over the Ganges, painting the ghats in golden hues. After breakfast, explore the famous Kashi Vishwanath Temple and other sacred sites. Walk through centuries-old lanes filled with silk shops, sweet vendors, and hidden temples.\n\nThe evening brings you to Dashashwamedh Ghat for the spectacular Ganga Aarti—a synchronized ritual of fire, prayer, and devotion that has been performed for generations.\n\nIncludes: Boat ride, temple visits, lunch, guide services, and all local transportation.",
        price: 2500,
        featured: true,
        isVisible: true,
      },
      {
        id: "2-day-ayodhya-experience",
        name: "2-Day Complete Ayodhya Experience",
        category: "touristic",
        duration: "2 Days",
        destination: "Ayodhya",
        shortDescription: "A comprehensive spiritual journey through the birthplace of Lord Rama with expert local guidance.",
        highlights: [
          "Ram Janmabhoomi Temple darshan",
          "Hanuman Garhi and Kanak Bhawan",
          "Saryu River aarti and holy dip",
          "All major temple visits with guide",
        ],
        imageUrl: package2,
        detailedDescription: "Undertake a transformative pilgrimage to Ayodhya, the sacred birthplace of Lord Rama. This two-day package covers all the major spiritual sites with comfortable accommodation and expert guidance.\n\nDay 1: Arrive and visit the magnificent Ram Janmabhoomi Temple, the architectural marvel that has captured hearts worldwide. Explore Hanuman Garhi with its fortress-like structure offering panoramic city views. Evening Saryu Aarti at Ram Ki Paidi.\n\nDay 2: Early morning holy dip in the Saryu River, followed by visits to Kanak Bhawan, Dashrath Bhavan, and other sacred sites. Conclude with a peaceful boat ride on the Saryu.\n\nOur local guides share stories from the Ramayana, bringing the ancient epic to life as you walk the same paths described in sacred texts.\n\nIncludes: 3-star accommodation, all meals, temple darshan, guide services, and local transportation.",
        price: 7500,
        featured: true,
        isVisible: true,
      },
      {
        id: "3-day-ujjain-retreat",
        name: "3-Day Ujjain Spiritual Retreat",
        category: "touristic",
        duration: "3 Days",
        destination: "Ujjain",
        shortDescription: "Experience the sacred Mahakaleshwar Jyotirlinga, Bhasma Aarti, and all major temples of Ujjain.",
        highlights: [
          "Exclusive Bhasma Aarti experience",
          "Mahakaleshwar Temple darshan",
          "Shipra River ghat rituals",
          "All 7 sacred temples visit",
        ],
        imageUrl: package3,
        detailedDescription: "Discover the ancient spiritual heritage of Ujjain, one of the seven Moksha-giving cities of India. This comprehensive three-day package includes the rare Bhasma Aarti experience and visits to all major sacred sites.\n\nDay 1: Arrive and check in. Evening visit to Ram Ghat for Shipra Aarti. Explore local markets and temples.\n\nDay 2: Wake up at 3 AM for the legendary Bhasma Aarti at Mahakaleshwar Temple (pre-booked pass included). This unique ritual, performed with sacred ash, is found nowhere else in India. Later, visit Kal Bhairav Temple, Harsiddhi Temple, and other sacred sites.\n\nDay 3: Morning visit to Gadkalika Temple and Bade Ganeshji Temple. Explore the ancient Jantar Mantar observatory. Afternoon at leisure before departure.\n\nIncludes: Premium accommodation, Bhasma Aarti pass, all meals, complete temple tour, guide services, and transfers.",
        price: 12000,
        featured: true,
        isVisible: true,
      },
      {
        id: "ganga-aarti-temple-pooja",
        name: "Ganga Aarti & Temple Pooja - Varanasi",
        category: "pooja",
        duration: "Half Day",
        destination: "Varanasi",
        shortDescription: "Perform sacred rituals with expert priest guidance at the most revered ghats and temples of Varanasi.",
        highlights: [
          "Personal Ganga Aarti ceremony",
          "Priest-guided ritual performance",
          "Sacred offering at Dashashwamedh Ghat",
          "Blessing and prasad distribution",
        ],
        imageUrl: varanasiTemple,
        detailedDescription: "Experience the profound spiritual significance of Ganga Aarti with a personalized ceremony. Our expert priests will guide you through the sacred rituals, explaining the meaning behind each gesture and mantra.\n\nBegin with a ritual bath (snan) at the ghat, followed by sankalp (sacred resolution). Participate in offering prayers to the holy river with flowers, diyas, and incense. Receive blessings for peace, prosperity, and spiritual growth.\n\nThe ceremony concludes with prasad distribution and a personal blessing from the temple priest. This is an intimate spiritual experience that connects you directly with ancient Vedic traditions.\n\nIncludes: All pooja materials, priest services, prasad, and photography assistance.",
        price: 2500,
        featured: true,
        isVisible: true,
      },
      {
        id: "ram-janmabhoomi-special-pooja",
        name: "Ram Janmabhoomi Special Pooja - Ayodhya",
        category: "pooja",
        duration: "1 Day",
        destination: "Ayodhya",
        shortDescription: "Complete pooja package at Ram Janmabhoomi with special darshan and sacred rituals.",
        highlights: [
          "VIP darshan at Ram Mandir",
          "Personal archana in sanctum",
          "Saryu River ritual bath",
          "Multiple temple poojas",
        ],
        imageUrl: ayodhyaTemple,
        detailedDescription: "A comprehensive pooja package designed for devotees seeking special blessings at the birthplace of Lord Rama. This full-day spiritual experience includes VIP darshan arrangements and personal rituals.\n\nStart with a sacred bath in the Saryu River, followed by sankalp at Ram Ki Paidi. Visit Ram Janmabhoomi Temple for special archana in the sanctum sanctorum (subject to temple guidelines). Our priest will perform personalized rituals on your behalf.\n\nContinue to Hanuman Garhi for Hanuman Chalisa recitation and special pooja. End the day at Kanak Bhawan with offerings to Sita-Ram.\n\nAll pooja materials provided. Receive special prasad from each temple and blessings certificate.\n\nIncludes: VIP darshan, all pooja materials, priest services, prasad, meals, and local transport.",
        price: 5500,
        featured: true,
        isVisible: true,
      },
      {
        id: "mahakaleshwar-bhasma-aarti-pooja",
        name: "Mahakaleshwar Bhasma Aarti & Pooja - Ujjain",
        category: "pooja",
        duration: "1 Day",
        destination: "Ujjain",
        shortDescription: "Experience the legendary Bhasma Aarti and perform sacred rituals at the Mahakaleshwar Jyotirlinga.",
        highlights: [
          "Pre-booked Bhasma Aarti pass",
          "Rudrabhishek at Mahakaleshwar",
          "Kal Bhairav Temple ritual",
          "Shipra River sacred bath",
        ],
        imageUrl: ujjainGhat,
        detailedDescription: "The most unique spiritual experience in India awaits you at Mahakaleshwar Temple. This package includes the rare Bhasma Aarti—a pre-dawn ritual where the lingam is anointed with sacred ash—and comprehensive pooja services.\n\nAwaken at 3 AM for the legendary Bhasma Aarti (pre-booked pass ensures entry). Witness this ancient ritual that uses ash from cremation grounds, symbolizing the transcendence of life and death. Following the aarti, participate in Rudrabhishek—the sacred bathing of the Jyotirlinga.\n\nAfter breakfast and rest, visit Kal Bhairav Temple for special pooja. The fierce guardian deity of Ujjain requires unique offerings. Evening ritual bath at Ram Ghat completes your spiritual day.\n\nIncludes: Bhasma Aarti pass, all pooja materials, priest services, meals, and local transport.",
        price: 4500,
        featured: true,
        isVisible: true,
      },
    ];

    const panchangEventsData: PanchangEvent[] = [
      {
        id: "kartik-purnima-2025",
        date: "2025-12-15",
        name: "Kartik Purnima",
        type: "festival",
        description: "One of the most auspicious full moon nights, perfect for holy dips and lighting diyas.",
        significance: "Sacred bathing, lamp lighting, and temple visits",
        featured: true,
        isVisible: true,
      },
      {
        id: "mokshada-ekadashi-2025",
        date: "2025-12-25",
        name: "Mokshada Ekadashi",
        type: "religious",
        description: "A highly significant fasting day dedicated to Lord Vishnu for liberation.",
        significance: "Fasting, prayer, and spiritual liberation",
        featured: true,
        isVisible: true,
      },
      {
        id: "makar-sankranti-2026",
        date: "2026-01-14",
        name: "Makar Sankranti",
        type: "festival",
        description: "The festival marking the sun's transition into Capricorn, celebrated with holy dips.",
        significance: "Holy bath at Sangam, kite flying, and sesame sweets",
        featured: true,
        isVisible: true,
      },
      {
        id: "maha-shivaratri-2026",
        date: "2026-02-12",
        name: "Maha Shivaratri",
        type: "religious",
        description: "The great night of Lord Shiva, celebrated with fasting and night-long prayers.",
        significance: "All-night vigil, fasting, and Shiva worship at temples",
        featured: true,
        isVisible: true,
      },
      {
        id: "holi-2026",
        date: "2026-03-14",
        name: "Holi",
        type: "festival",
        description: "The vibrant festival of colors celebrating the triumph of good over evil.",
        significance: "Color play, bonfires, and community celebrations",
        featured: true,
        isVisible: true,
      },
    ];

    const videoTestimonialsData: VideoTestimonial[] = [
      {
        id: "testimonial-1",
        platform: "instagram",
        videoUrl: "https://www.instagram.com/reel/example1/",
        embedCode: null,
        author: "Spiritual Traveler",
        caption: "The morning aarti at Dashashwamedh Ghat changed my perspective on life. Truly magical!",
        featured: true,
        isVisible: true,
      },
      {
        id: "testimonial-2",
        platform: "youtube",
        videoUrl: "https://www.youtube.com/watch?v=example2",
        embedCode: null,
        author: "Temple Explorer",
        caption: "GangaGuides made our Ayodhya pilgrimage seamless. Highly recommended!",
        featured: true,
        isVisible: true,
      },
    ];

    destinationsData.forEach(d => this.destinations.set(d.id, d));
    blogPostsData.forEach(b => this.blogPosts.set(b.id, b));
    packagesData.forEach(p => this.packages.set(p.id, p));
    panchangEventsData.forEach(e => this.panchangEvents.set(e.id, e));
    videoTestimonialsData.forEach(v => this.videoTestimonials.set(v.id, v));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.generateId();
    const newUser: User = { id, ...user };
    this.users.set(id, newUser);
    return newUser;
  }

  async getAllDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values());
  }

  async getVisibleDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(d => d.isVisible);
  }

  async getFeaturedDestinations(): Promise<Destination[]> {
    return Array.from(this.destinations.values()).filter(d => d.featured && d.isVisible);
  }

  async getDestination(id: string): Promise<Destination | undefined> {
    return this.destinations.get(id);
  }

  async createDestination(destination: InsertDestination): Promise<Destination> {
    const id = this.generateId();
    const newDestination: Destination = { 
      id, 
      isVisible: true, 
      featured: false, 
      image2: destination.image2 ?? null,
      image3: destination.image3 ?? null,
      image4: destination.image4 ?? null,
      region: destination.region ?? null,
      ...destination 
    };
    this.destinations.set(id, newDestination);
    return newDestination;
  }

  async updateDestination(id: string, updates: Partial<InsertDestination>): Promise<Destination | undefined> {
    const existing = this.destinations.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.destinations.set(id, updated);
    return updated;
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getVisibleBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(b => b.isVisible);
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(b => b.featured && b.isVisible);
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.generateId();
    const newBlogPost: BlogPost = { 
      id, 
      isVisible: true, 
      featured: false, 
      image2: blogPost.image2 ?? null,
      image3: blogPost.image3 ?? null,
      image4: blogPost.image4 ?? null,
      ...blogPost 
    };
    this.blogPosts.set(id, newBlogPost);
    return newBlogPost;
  }

  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }

  async getVisiblePackages(): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(p => p.isVisible);
  }

  async getFeaturedPackages(): Promise<Package[]> {
    return Array.from(this.packages.values()).filter(p => p.featured && p.isVisible);
  }

  async getPackage(id: string): Promise<Package | undefined> {
    return this.packages.get(id);
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const id = this.generateId();
    const newPackage: Package = { 
      id, 
      isVisible: true, 
      featured: false, 
      destination: pkg.destination ?? null,
      price: pkg.price ?? null,
      ...pkg 
    };
    this.packages.set(id, newPackage);
    return newPackage;
  }

  async updatePackage(id: string, updates: Partial<InsertPackage>): Promise<Package | undefined> {
    const existing = this.packages.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.packages.set(id, updated);
    return updated;
  }

  async getAllPanchangEvents(): Promise<PanchangEvent[]> {
    return Array.from(this.panchangEvents.values());
  }

  async getVisiblePanchangEvents(): Promise<PanchangEvent[]> {
    return Array.from(this.panchangEvents.values()).filter(e => e.isVisible);
  }

  async getFeaturedPanchangEvents(): Promise<PanchangEvent[]> {
    return Array.from(this.panchangEvents.values()).filter(e => e.featured && e.isVisible);
  }

  async getPanchangEvent(id: string): Promise<PanchangEvent | undefined> {
    return this.panchangEvents.get(id);
  }

  async getPanchangEventsByMonth(year: number, month: number): Promise<PanchangEvent[]> {
    return Array.from(this.panchangEvents.values()).filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month && event.isVisible;
    });
  }

  async createPanchangEvent(event: InsertPanchangEvent): Promise<PanchangEvent> {
    const id = this.generateId();
    const newEvent: PanchangEvent = { 
      id, 
      isVisible: true, 
      featured: false, 
      significance: event.significance ?? null,
      ...event 
    };
    this.panchangEvents.set(id, newEvent);
    return newEvent;
  }

  async updatePanchangEvent(id: string, updates: Partial<InsertPanchangEvent>): Promise<PanchangEvent | undefined> {
    const existing = this.panchangEvents.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.panchangEvents.set(id, updated);
    return updated;
  }

  async deletePanchangEvent(id: string): Promise<boolean> {
    return this.panchangEvents.delete(id);
  }

  async getAllVideoTestimonials(): Promise<VideoTestimonial[]> {
    return Array.from(this.videoTestimonials.values());
  }

  async getVisibleVideoTestimonials(): Promise<VideoTestimonial[]> {
    return Array.from(this.videoTestimonials.values()).filter(v => v.isVisible);
  }

  async getFeaturedVideoTestimonials(): Promise<VideoTestimonial[]> {
    return Array.from(this.videoTestimonials.values()).filter(v => v.featured && v.isVisible);
  }

  async getVideoTestimonial(id: string): Promise<VideoTestimonial | undefined> {
    return this.videoTestimonials.get(id);
  }

  async createVideoTestimonial(testimonial: InsertVideoTestimonial): Promise<VideoTestimonial> {
    const id = this.generateId();
    const newTestimonial: VideoTestimonial = { 
      id, 
      isVisible: true, 
      featured: false, 
      embedCode: testimonial.embedCode ?? null,
      caption: testimonial.caption ?? null,
      author: testimonial.author ?? null,
      ...testimonial 
    };
    this.videoTestimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async updateVideoTestimonial(id: string, updates: Partial<InsertVideoTestimonial>): Promise<VideoTestimonial | undefined> {
    const existing = this.videoTestimonials.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.videoTestimonials.set(id, updated);
    return updated;
  }

  async deleteVideoTestimonial(id: string): Promise<boolean> {
    return this.videoTestimonials.delete(id);
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.generateId();
    const newBooking: Booking = { 
      id, 
      createdAt: new Date(),
      packageId: booking.packageId || null,
      packageName: booking.packageName || null,
      preferredDate: booking.preferredDate || null,
      numberOfPeople: booking.numberOfPeople || null,
      message: booking.message || null,
      ...booking 
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    const existing = this.bookings.get(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    this.bookings.set(id, updated);
    return updated;
  }

  async deleteBooking(id: string): Promise<boolean> {
    return this.bookings.delete(id);
  }
}
