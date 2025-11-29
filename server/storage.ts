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
    mainImage: "/assets/generated_images/varanasi_ganga_river_sunset.png",
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
  },
  {
    id: "durga-temple",
    name: "Durga Temple",
    shortDescription: "The benevolent guardian goddess of Varanasi, protector of the sacred city.",
    description: "The Durga Temple in Varanasi is one of the city's most iconic shrines, dedicated to Goddess Durga, the protector of Kashi. According to legend, Goddess Durga pledged to reside in Varanasi as long as the city exists. The temple features distinctive crimson-red walls and ornate architecture in the Nagara style. Reconstructed in 1760 by Rani Bhavani of Bengal, this sacred sanctuary is especially vibrant on Tuesdays and Fridays. The main idol is worshipped in yantra form, identified with Kushmanda, the fourth form of Durga. During Navratri, the goddess is adorned in various 'shringar' (ritual decorations). The temple's annual Durga Kund Sangeet Samaroh in August-September features classical musicians performing in her honor.",
    mainImage: "@assets/generated_images/durga_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "sankat-mochan-temple",
    name: "Sankat Mochan Hanuman Temple",
    shortDescription: "The reliever of troubles - Varanasi's most beloved Hanuman shrine.",
    description: "Nestled on the banks of the Assi River, the Sankat Mochan Hanuman Temple is one of Varanasi's most beloved shrines. The temple traces its founding to the 16th century when saint-poet Goswami Tulsidas had a vision of Lord Hanuman at this very spot. Sankat Mochan means 'one who removes crises, troubles, and pain,' and every month lakhs of devotees visit seeking relief from their problems. The temple is believed to be where Tulsidas composed significant portions of the Ramcharitamanas. Devotees flock here especially on Tuesdays and Saturdays, believing Hanuman's grace helps relieve planetary afflictions. The temple also preserves a sacred fig tree under which many verses of Ramcharitamanas are said to have been written. The Sankat Mochan Music Festival is a major cultural event held annually, featuring classical music artists. Currently managed by Prof. Vishwambhar Nath Mishra, the Sankat Mochan Foundation established in 1982 works towards cleaning and protecting the Ganga.",
    mainImage: "@assets/generated_images/sankat_mochan_hanuman_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "annapurna-temple",
    name: "Annapurna Temple",
    shortDescription: "Goddess of nourishment and sustenance, located near Kashi Vishwanath.",
    description: "The Annapurna Temple in Varanasi is dedicated to Goddess Annapurna, the Divine Mother who ensures her devotees are never deprived of food. With a golden ladle in one hand and a bowl of rice in the other, she is worshipped as the provider of nourishment and sustenance. The temple was built in 1729 by Maratha ruler Peshwa Baji Rao I in the Nagara architectural style. Within its large pillared sanctum are two idols of the Goddess: one brass, available for darshan every day, and another gold, shown to devotees only once annually on Annakut (the day after Diwali). The temple follows the Panchayatana layout with subsidiary shrines dedicated to Ganesha, Kubera, Surya, and Hanuman. Legend says that Parvati adopted the form of Annapurna to distribute food in Varanasi, emphasizing the importance of sustenance. During Navratri, the temple receives large crowds for special pujas. The temple trust runs extensive social service activities including free food distribution (annadaan), elderly care, medical clinics, and education.",
    mainImage: "@assets/generated_images/annapurna_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "nageshwar-nath-temple",
    name: "Nageshwar Nath Temple",
    shortDescription: "Ancient Shiva shrine built by Kush, son of Lord Rama, in sacred Ayodhya.",
    description: "The Nageshwar Nath Temple near Ram Ki Paidi in Ayodhya is a heritage treasure with origins tracing back to the era of Kush, the son of Lord Rama. According to legend, while bathing in the Saryu River, Kush lost his armlet, which was discovered by a Nag-Kanya (serpent maiden) who instantly fell in love with him. To honor her devotion, Kush established this temple dedicated to Nageshwar Mahadev. The present-day temple was rebuilt around 1750 CE by Naval Rai, minister of Safdar Jung. It features a graceful blend of traditional Awadhi temple structures, Shiva iconography, ornate domes and arches, and stone courtyards facing the Saryu ghats. Nageshwar Mahadev is believed to grant liberation from karmic bondage and remove fear from serpent-related inauspiciousness. The temple becomes the beating heart of Ayodhya during Mahashivratri when thousands of devotees line up for jalabhishek and the famous Shiv Barat procession is carried out with great enthusiasm. Locals believe attending Shiv Barat here brings blessings equivalent to visiting multiple Jyotirlingas.",
    mainImage: "@assets/generated_images/nageshwar_nath_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "hanuman-garhi",
    name: "Hanuman Garhi",
    shortDescription: "Hilltop fortress temple of Bajrangbali guarding Ayodhya since the 10th century.",
    description: "Standing proudly in the heart of Ayodhya, the Hanuman Garhi Temple is one of the most iconic shrines dedicated to Lord Hanuman. Believed to be built around the 10th century, this sacred fort-like temple is a must-visit destination for pilgrims and spiritual seekers. Perched atop a small hill, the temple houses a beautiful idol of Child Hanuman sitting in the lap of Maa Anjani, a rare and heartwarming depiction. Devotees believe Hanuman ji guards Ayodhya round the clock, ensuring peace and protection. The temple features a long flight of 76 steep stairs leading up to the shrine, massive fort-like walls, arched gateways, bright saffron flags, and bells adding to the divine ambience. Inside, visitors witness beautifully carved interiors and arches reflecting early medieval North Indian architecture. Tradition says Hanuman lived here in a cave to protect Lord Rama's birthplace. The temple is one of Ayodhya's four major temples and is especially busy during Hanuman Jayanti, Ram Navami, and Diwali. From the hilltop, visitors enjoy panoramic views of the entire Ayodhya city.",
    mainImage: "@assets/generated_images/hanuman_garhi_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "treta-ke-thakur",
    name: "Treta Ke Thakur Temple",
    shortDescription: "Sacred seat of Lord Rama's Ashwamedha Yagna on the serene Saryu banks.",
    description: "Located on the serene banks of the Saryu River at Naya Ghat, the Treta Ke Thakur Temple is one of Ayodhya's most revered spiritual landmarks. Dedicated to Lord Rama in his Treta Yuga form, this ancient shrine attracts pilgrims and travelers alike for its divine aura and powerful legends. The temple stands at the very place believed to be the site where Lord Rama performed the Ashwamedha Yagna, one of the most significant Vedic rituals symbolizing sovereign victory and universal harmony. The origins of the temple go back roughly 300 years, when the King of Kullu constructed a shrine here. Major renovation occurred under great Maratha queen Ahilyabai Holkar in 1784 CE. One of the most mesmerizing features is its set of ancient idols carved from a single block of black sandstone: Lord Rama, Sita Mata, Lakshman, and Hanuman. Legend says they were crafted not by human hands, but by divine beings themselves. The idols are brought out for public viewing mainly during Kartik Purnima, when thousands gather to witness them. The temple exudes an ancient, peaceful charm with open courtyards facing the Saryu River.",
    mainImage: "@assets/generated_images/treta_ke_thakur_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "kanak-bhawan",
    name: "Kanak Bhawan",
    shortDescription: "The golden palace of Sita and Ram, radiating royal charm and devotion.",
    description: "In the spiritual heart of Ayodhya stands Kanak Bhawan, one of the most enchanting temples dedicated to Lord Rama and Goddess Sita. Radiating beauty, devotion, and royal charm, this shrine is often called the 'Golden Palace of Ayodhya' for its richly adorned idols and luminous interiors. Located near the famous Ram Janmabhoomi complex, it remains one of the most visited and cherished temples in the region. According to tradition, Mata Kaikeyi, the mother of Bharata, gifted this palace to Sita after her marriage to Lord Rama, making it one of the earliest residences of Sita in Ayodhya. King Vikramaditya is believed to have restored it during ancient times. The present magnificent temple was fully rebuilt in 1891 CE by Vrish Bhanu Kunwari, queen of Tikamgarh, whose devotion resulted in a breathtaking architectural gem. The temple is a prime example of Bundela architectural style, known for ornate arches, beautifully carved pillars, courtyards with symmetrical patterns, and domes with Rajasthani-Bundelkhand influence. The idols of Rama and Sita are richly adorned with gold and jewels, symbolizing their royal status and divine nature.",
    mainImage: "@assets/generated_images/kanak_bhawan_golden_palace.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "kaal-bhairav-temple",
    name: "Kaal Bhairav Temple",
    shortDescription: "The fierce guardian and kotwal (protector) of Kashi, the sacred guardian of Varanasi.",
    description: "The Kaal Bhairav Temple in Varanasi is dedicated to Kaal Bhairav, the fierce manifestation of Lord Shiva who serves as the kotwal (guardian/protector) of Kashi. According to legend, Kaal Bhairav was created to protect the holy city and enforce divine law. The temple stands as a symbol of cosmic justice and divine protection over Varanasi. Kaal Bhairav represents the destructive aspect of creation - the power that removes ignorance and illusion. Devotees believe that visiting this temple brings protection from negative energies and ensures spiritual growth. The temple is particularly powerful during Mahashivratri, when thousands of devotees gather for rituals. Kaal Bhairav is often depicted in a fierce yet protective form, and his worship is believed to grant courage, strength, and liberation from fear. The temple has rich iconography and ancient spiritual significance in Varanasi's sacred geography.",
    mainImage: "@assets/generated_images/kaal_bhairav_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "kashi-vishwanath-temple",
    name: "Shri Kashi Vishwanath Temple",
    shortDescription: "The most sacred Jyotirlinga of Shiva, one of the 12 holiest shrines in Hindu pilgrimage.",
    description: "The Shri Kashi Vishwanath Temple in Varanasi is one of the twelve Jyotirlingas, the holiest shrines dedicated to Lord Shiva. Known as 'Vishwanath' - the Lord of the Universe - this temple represents the cosmic form of Shiva himself. The temple stands on the western bank of the Ganges River and has been a major pilgrimage site for thousands of years. According to scripture, among all Jyotirlingas, Kashi Vishwanath is considered the most significant for attaining liberation (moksha). The temple reflects architectural splendor with its golden spire visible from across the Ganga. Inside the sanctum lies the Jyotirlinga, symbolizing the infinite cosmic energy of Shiva. The temple is always filled with devotees performing rituals, offerings, and circumambulations. The evening prayers and aarti here are particularly profound. The temple's spiritual power is believed to be unmatched, and devotees from across the world seek blessings for spiritual enlightenment and liberation from the cycle of birth and death.",
    mainImage: "@assets/generated_images/kashi_vishwanath_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "kardameshwar-temple",
    name: "Shri Kardameshwar Mahadev Temple",
    shortDescription: "The ancient survivor temple of Varanasi with deep-rooted spiritual significance.",
    description: "The Shri Kardameshwar Mahadev Temple is one of the most ancient surviving temples in Varanasi with profound spiritual significance. Dedicated to Lord Shiva, this temple has witnessed centuries of devotion and remains a testament to the enduring spirituality of Kashi. The name 'Kardameshwar' carries deep meaning - associated with the cosmic creation and primal existence. This temple stands as an ancient pillar of Hindu spiritual tradition, having survived centuries of historical changes and transformations. The temple's architecture reflects the ancient Nagara style, showcasing the craftsmanship of bygone eras. Local tradition holds that this temple has been a continuous place of worship for millennia. Devotees believe visiting this temple connects them to the primal cosmic energy and ancient wisdom preserved in Varanasi. The sacred atmosphere and spiritual vibrations make it a favored destination for serious spiritual seekers. The temple represents continuity of faith and the unbroken spiritual lineage of Varanasi throughout history.",
    mainImage: "@assets/generated_images/kardameshwar_mahadev_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "vishalakshi-devi-temple",
    name: "Vishalakshi Devi Temple",
    shortDescription: "The Shakti form of Varanasi, the divine cosmic feminine energy protecting the sacred city.",
    description: "The Vishalakshi Devi Temple in Varanasi is dedicated to Goddess Vishalakshi, one of the Shakti forms residing in the eternal city. 'Vishalakshi' literally means 'the one with large, beautiful eyes,' and represents the divine cosmic feminine energy. According to sacred texts, Goddess Vishalakshi is the Shakti consort of Lord Shiva in Kashi and stands as a protector of the city's spiritual sanctity. The temple is believed to be one of the Shakti Peeths, where the divine feminine energy manifests in its most powerful form. Devotees worship here seeking blessings of prosperity, protection, and spiritual enlightenment. The goddess is depicted in her compassionate yet powerful form, embodying the creative and nurturing aspects of divine energy. The temple attracts especially female devotees seeking blessings for family welfare and spiritual growth. The spiritual power of Vishalakshi Devi is considered particularly potent for women's empowerment and divine grace. Located in sacred Varanasi, this temple represents the balance of masculine and feminine divine principles.",
    mainImage: "@assets/generated_images/vishalakshi_devi_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "dashrath-bhavan",
    name: "Dashrath Bhavan",
    shortDescription: "The legendary palace of King Dasharatha, father of Lord Rama, in sacred Ayodhya.",
    description: "Dashrath Bhavan in Ayodhya is a significant historical site associated with King Dasharatha, the father of Lord Rama. This palace holds immense cultural and spiritual importance as the seat of power in ancient Ayodhya during the Ramayana era. According to tradition, this was the royal residence where the great king ruled and where significant events of Rama's early life unfolded. The palace architecture reflects the grandeur and magnificence of ancient Ayodhyan kingdoms. Historical accounts describe Dashrath Bhavan as a symbol of righteous rule and divine governance. The site carries the spiritual essence of the Ramayana, connecting pilgrims to the legendary kingdom of Rama. Visitors to this site feel the presence of ancient Ayodhya's glory and the spiritual legacy of one of Hinduism's greatest kings. The palace represents the ideals of dharma and righteous governance that King Dasharatha exemplified. Today, Dashrath Bhavan stands as a link between ancient history and spiritual tradition, attracting devotees and history enthusiasts alike.",
    mainImage: "@assets/generated_images/dashrath_bhavan_palace.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "ram-katha-sangrahalay",
    name: "Ram Katha Sangrahalay",
    shortDescription: "A museum and repository of Rama's stories, preserving the sacred narrative of the Ramayana.",
    description: "Ram Katha Sangrahalay is a comprehensive museum and cultural center in Ayodhya dedicated to preserving and presenting the sacred stories of Lord Rama through various art forms and displays. The museum serves as a spiritual and educational center showcasing the Ramayana's narratives through paintings, sculptures, manuscripts, and interactive exhibits. It beautifully chronicles the life and teachings of Lord Rama, making the epic accessible to modern pilgrims and scholars. The Ram Katha Sangrahalay features diverse artistic representations of Rama's life - from his birth to his coronation and exile. Traditional art forms, contemporary interpretations, and ancient manuscripts are thoughtfully displayed to tell the complete story of the beloved deity. The museum celebrates the cultural and spiritual significance of Rama in Hindu civilization. Visitors can gain deep insights into the philosophical teachings and moral lessons embedded in the Ramayana. The center creates an immersive experience that connects devotees to the spiritual essence of Rama's divine incarnation. It serves as a bridge between ancient wisdom and contemporary understanding of the epic's eternal truths.",
    mainImage: "@assets/generated_images/ram_katha_sangrahalay_museum.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
  },
  {
    id: "tulsi-smarak",
    name: "Tulsi Smarak Bhawan",
    shortDescription: "A memorial dedicated to the great saint-poet Tulsidas and his immortal works.",
    description: "Tulsi Smarak Bhawan in Ayodhya is a memorial dedicated to the legendary saint-poet Goswami Tulsidas, author of the Ramcharitamanas - one of the most revered Hindu scriptures. This sacred site honors Tulsidas's immense contribution to spiritual literature and Rama devotion. Tulsidas transformed the epic Ramayana into vernacular Hindi, making the sacred stories accessible to common people. His profound devotion and literary genius created a spiritual movement that shaped Hindu religious practice for centuries. The memorial showcases Tulsidas's life, his spiritual journey, and his immortal compositions. It celebrates the saint's role in popularizing Rama bhakti (devotion to Rama) across India. The Tulsi Smarak preserves manuscripts, displays depicting his life, and spaces for studying his teachings. Devotees visit to seek inspiration from his devotional path and to understand the spiritual depth of his works. The memorial stands as a testament to the power of devotion and the transformative impact of spiritual literature. For those interested in Hindu spirituality and the Ramayana, Tulsi Smarak Bhawan is an essential pilgrimage site.",
    mainImage: "@assets/generated_images/tulsi_smarak_bhawan_memorial.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Uttar Pradesh",
    featured: false
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
    price: null,
    featured: true
  },
  {
    id: "2day-kashi-sarnath",
    name: "2 Days Varanasi Tour Package – Kashi Darshan with Sarnath",
    category: "Multi-Day Tours",
    duration: "2 Days",
    shortDescription: "Experience the divine aura of Kashi – the Spiritual Capital of India. Seek blessings at sacred temples, witness the famous Ganga Aarti at Dashashwamedh Ghat, and explore the peaceful Buddhist site of Sarnath.",
    highlights: [
      "Darshan at Shri Kashi Vishwanath Temple, one of the 12 Jyotirlingas",
      "Visit Kaal Bhairav Temple, the guardian deity of Kashi",
      "Evening Ganga Shanti Aarti at Dashashwamedh Ghat",
      "Half-day trip to Sarnath, where Lord Buddha gave his first sermon",
      "Visit to Sarangnath Temple, Markandeya Mahadev & Sarnved Mandir",
      "Explore famous temples – Durga Mandir, Sankat Mochan Hanuman Temple, and Tulsi Manas Mandir",
      "Comfortable stay in a well-rated hotel with meals"
    ],
    imageUrl: "/assets/generated_images/varanasi_ganga_river_sunset.png",
    detailedDescription: "Experience the divine aura of Kashi – the Spiritual Capital of India. This 2-day Varanasi package is specially designed for devotees and travelers who wish to seek blessings at the sacred temples, witness the famous Ganga Aarti at Dashashwamedh Ghat, and explore the peaceful Buddhist site of Sarnath.\n\nDay 1: Arrival in Varanasi – Evening Darshan & Aarti\n• Pick-up from Airport/Railway Station\n• Check-in at hotel & freshen up\n• Evening visit to Shri Kashi Vishwanath Temple (seek blessings at the sacred Jyotirlinga) and Kaal Bhairav Temple (protector of Kashi)\n• Witness the mesmerizing Ganga Shanti Aarti at Dashashwamedh Ghat – a once-in-a-lifetime spiritual experience\n• Return to hotel for dinner & overnight stay\n\nDay 2: Excursion to Sarnath & Temple Tour\n• Early breakfast at hotel\n• Proceed for half-day excursion to Sarnath – Explore Dhamek Stupa, Ashokan Pillar, and Sarnath Museum\n• Visit Sarangnath Temple, Markandeya Mahadev, and Sarnved Mandir\n• Return to hotel for lunch & rest\n• Evening Temple Tour: Durga Mandir (Durga Kund), Sankat Mochan Hanuman Mandir, Tulsi Manas Mandir\n• Return to hotel for dinner & overnight stay\n\nDay 3: Departure\n• Breakfast at hotel\n• Check-out and transfer to Airport/Railway Station with beautiful memories of Kashi\n\nInclusions:\n• Pick-up & drop from Varanasi Airport/Railway Station\n• 2 Nights stay in a deluxe hotel (AC room)\n• Breakfast, lunch, tea, and dinner (as per itinerary)\n• AC vehicle for sightseeing & transfers\n• Driver allowance, tolls, parking & all applicable taxes\n\nExclusions:\n• Personal expenses, shopping, tips, and camera charges\n• Any extra meals or activities not mentioned in the itinerary\n• Travel insurance & flight/train tickets\n\nWhy Book with Us?\n• Handpicked hotels with comfort & hygiene\n• Local expert guides & hassle-free travel\n• 24x7 customer support during your trip\n• Best price guarantee",
    price: null,
    featured: true
  },
  {
    id: "3day-kashi-spiritual",
    name: "3 Days / 2 Nights Varanasi Spiritual Tour Package – Kashi Darshan with Sarnath",
    category: "Pilgrimage Tours",
    duration: "3 Days",
    shortDescription: "Discover the divine charm of Kashi (Varanasi) – the city where spirituality meets eternity. Cover the most sacred temples of Kashi, the holy ghats, and the peaceful Buddhist sites of Sarnath.",
    highlights: [
      "Sacred darshan at Shri Kashi Vishwanath Temple – one of the 12 Jyotirlingas",
      "Visit to Kaal Bhairav (Kashi Kotwal), Mangala Gauri, Sankatha Devi & Atma Vireshwar Mahadev Temples",
      "Mesmerizing Ganga Aarti at Dashashwamedh Ghat",
      "Full-day excursion to Sarnath – the place where Lord Buddha gave his first sermon",
      "Temple visits – Markandeya Mahadev & Sarvedha Temple",
      "Evening darshan at Durga Mandir, Sankat Mochan Hanuman Mandir, Tulsi Manas Mandir & Assi Ghat",
      "Special visit to Adalpura Seetla Mata Mandir before departure",
      "Comfortable AC transfers, local assistance & guided tours"
    ],
    imageUrl: "/assets/generated_images/kashi_vishwanath_temple_night_aarti.png",
    detailedDescription: "Discover the divine charm of Kashi (Varanasi) – the city where spirituality meets eternity. This 3-day spiritual tour package is designed to cover the most sacred temples of Kashi, the holy ghats, and the peaceful Buddhist sites of Sarnath.\n\nDay 1: Arrival in Varanasi – Temple Tour & Evening Ganga Aarti\n• Pick-up from Airport/Railway Station\n• Visit the sacred temples: Shri Kashi Vishwanath Temple (Jyotirlinga Darshan), Kaal Bhairav Temple (Kashi Kotwal), Mangala Gauri Temple, Sankatha Devi Temple, Atma Vireshwar Mahadev Temple\n• After darshan, check-in at hotel & rest\n• In the evening, attend the divine Ganga Aarti at Dashashwamedh Ghat – a spiritual spectacle of lights, chants & devotion\n• Return to hotel for dinner & overnight stay\n\nDay 2: Excursion to Sarnath & Evening Temple Tour\n• Early breakfast at hotel\n• Proceed for half-day excursion to Sarnath – Dhamek Stupa, Ashokan Pillar, Sarnath Museum & Buddhist ruins\n• Visit Markandeya Mahadev Temple and Sarvedha Temple\n• Return to hotel for lunch & relaxation\n• Evening visit to Durga Mandir (Durga Kund), Sankat Mochan Hanuman Mandir, Tulsi Manas Mandir, Assi Ghat – experience the soulful atmosphere with live music & evening prayers\n• Return to hotel, dinner & overnight stay\n\nDay 3: Morning Darshan & Departure\n• Breakfast at hotel\n• Morning visit to Markandeya Mahadev Temple (second darshan for blessings) and Adalpura Seetla Mata Mandir\n• Return to hotel, check-out & transfer to Airport/Railway Station for departure with divine memories of Kashi\n\nInclusions:\n• Pick-up & drop from Airport/Railway Station\n• 2 Nights stay in a deluxe hotel (AC rooms)\n• Breakfast, lunch, tea & dinner (as per itinerary)\n• AC vehicle for sightseeing & transfers\n• Driver allowance, tolls, parking & all applicable taxes\n\nExclusions:\n• Airfare / Train fare\n• Personal expenses (shopping, tips, laundry, etc.)\n• Camera charges & entry fees (if applicable)\n• Anything not mentioned in inclusions\n\nWhy Choose Us?\n• Authentic spiritual itinerary curated by local experts\n• Comfortable stay in hygienic hotels\n• Professional drivers & guided temple visits\n• Hassle-free arrangements for families & groups\n• 24x7 customer support during your trip",
    price: null,
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
    price: null,
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
