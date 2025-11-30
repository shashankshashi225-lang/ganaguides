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
import { db } from "./db";
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
    mainImage: "/generated_images/varanasi_holy_city_ganga.png",
    image2: "/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png",
    image3: "/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
    image4: "/generated_images/Varanasi_temple_architecture_detail_a35f07ab.png",
    region: "Varanasi",
    featured: true
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
    featured: true
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
    featured: true
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
    featured: true
  },
  {
    id: "durga-temple",
    name: "Durga Temple",
    shortDescription: "The benevolent guardian goddess of Varanasi, protector of the sacred city.",
    description: "Varanasi, the eternal city, has for ages been under the benevolent protection of Goddess Durga. As the legends say, she appeared to King Subahu, the ruler of Kashi, and pledged: 'As long as Kashi stands upon the face of the earth, I, in my form as Durga, will reside here.' It was here, in this sacred place, that she defeated the demon Durga-asura (also called Durgamasura), following which she became known as Goddess Durga, protector of Kashi. According to the Devi Bhagavata Purana, centuries ago Prince Sudarshana of Ayodhya came to Kashi's deep forested region called Ananda Vana, where he met and fell in love with Princess Shashikala, daughter of King Subahu. When the time came for her swayamvara (bride's self-choice ceremony), Shashikala had a prophetic dream from Goddess Durga, who revealed that Sudarshana was her destined husband. On the day of swayamvara, Shashikala rejected all suitors, declaring by Durga's blessing that Sudarshana was her choice. Enraged, the other kings attacked Kashi, and as the war turned against King Subahu, both Sudarshana and Shashikala prayed to Durga. A divine host of goddesses riding fearsome beasts appeared, slew the invaders, and bathed the field in the enemy's blood. It is also believed by locals that after slaying demons Sumbha and Nishumbha, Durga rested here, and the central shrine later came to be worshipped in yantra form.\n\nThe present temple complex, including the Durga Kund (a water reservoir), was reconstructed in 1760 AD by Rani Bhavani of Bengal/Natore. The temple's style is Nagara (northern Indian) architecture, painted in crimson-red and ochre, matching the iconography of Goddess Durga. The main idol is worshipped in the yantra form and identified with Kushmanda, the fourth form of Durga, sometimes described as the creator form. Alongside her are idols of Bhadra Kali (Tantric Kali), Chand Bhairava, Rudra Bhairava, Maha Lakshmi, and Maha Saraswati. In the outer courtyard are smaller shrines to deities including Kukkuteshwara Mahadev, Tilparneshwar Mahadev, Surya, Jwarhareshwari, Lakshmi Narayana, and Radha-Krishna.\n\nThe temple is especially vibrant on Tuesdays and Fridays. During the Hindu month of Shravan, the goddess is adorned in various 'shringar' (ornaments and ritual decoration). There is an annual Durga Kund Sangeet Samaroh in Shravan/Bhadrapada (August-September), where classical musicians perform in her honor. The fourth day of Navratri holds special importance here, as it is dedicated to the Kushmanda aspect of Durga. The temple is open daily from 4:00 AM to 1:00 PM, and then from 3:00 PM to 10:30 PM. Located in the Kedar Khand of Varanasi, near Durga Kund and along Sankat Mochan Road, it is close to other well-known temples such as Tulsi Manas Mandir, Senapati Hanuman Temple, Kaudi Mata Temple, and of course Sankat Mochan.\n\nThe Skanda Purana contains a section called Kashi Khand, which narrates the legends of Kashi (Varanasi) including tales of Durga, her dwelling, her battles, and the importance of the goddess in guarding Kashi. Kushmanda is associated with certain mantras, offerings, and symbolisms in Puranic and devotional texts: she is worshipped on the fourth day of Navratri, depicted with eight arms, rides on a lion, and holds weapons, rosary, and jars of elixir.",
    mainImage: "/generated_images/durga_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false
  },
  {
    id: "sankat-mochan-temple",
    name: "Sankat Mochan Hanuman Temple",
    shortDescription: "The reliever of troubles - Varanasi's most beloved Hanuman shrine.",
    description: "Nestled in the Lanka area on the bank of the Assi River (now reduced to a nallah), the Sankat Mochan Hanuman Temple is one of Varanasi's most beloved shrines. Known also among locals as the Monkey Temple for its many resident monkeys, this temple serves not only as a place of worship but as a peaceful refuge amid the bustle of Banaras. Sankat Mochan means 'one who removes crises, troubles, and pain,' and every month, lakhs of devotees visit seeking relief from their problems.\n\nThe temple traces its founding to the 16th century when the saint-poet Goswami Tulsidas, author of the Ramcharitamanas, had a vision of Lord Hanuman at this very spot. The present temple stands where Hanuman is said to have appeared to Tulsidas. An old story tells that Tulsidas, disappointed at not meeting the divine, flung his water pot in frustration; it fell upon a dead tree. That event pleased a thirsty spirit, who appeared, offered him one wish, and upon hearing that Tulsidas wished to meet Lord Rama, suggested Hanuman as the mediator, because Hanuman 'never skips Ram Katha' (the telling of Lord Rama's story). Over time, the temple complex was expanded. Notably, Pt. Madan Mohan Malviya contributed to its enlargement, giving it much of its present layout.\n\nDevotees flock here especially on Tuesdays and Saturdays, believing Hanuman's grace helps relieve planetary afflictions—particularly those involving Shani (Saturn) and Mangal (Mars). It is believed that Tulsidas composed significant portions of the Ramcharitamanas while staying within or near this temple's precincts. The temple also preserves a sacred fig tree under which many verses of Ramcharitamanas are said to have been written. This tree is considered sacred.\n\nHanuman Jayanti is celebrated with processions, special prayers, and Ram Katha recitations. The Sankat Mochan Music Festival is a major cultural event held annually in the temple grounds, featuring classical music artists. The temple is managed by its Mahant; currently Prof. Vishwambhar Nath Mishra is the Mahant. The Sankat Mochan Foundation was established in 1982 by Veer Bhadra Mishra, who was also a Mahant. This foundation works towards cleaning and protecting the Ganga among other social and environmental projects.\n\nThe temple is deeply embedded in the Purāṇic-Bhakti tradition via Tulsidas and the Ramcharitamanas. In Purāṇas recounting the story of Lord Rama and Hanuman, Hanuman is repeatedly characterized as Sankat Mochan—remover of troubles—especially for devotees. The Hanuman Aashtak devoted to Sankat Mochan Hanuman (eight-verse devotional prayer) is widely recited by devotees here.",
    mainImage: "/generated_images/sankat_mochan_hanuman_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false
  },
  {
    id: "annapurna-temple",
    name: "Annapurna Temple",
    shortDescription: "Goddess of nourishment and sustenance, located near Kashi Vishwanath.",
    description: "The Annapurna Mandir in Varanasi, located in the lane near Visheshwarganj and adjacent to the revered Kashi Vishwanath Temple, is dedicated to Goddess Annapurna — the Divine Mother who ensures that her devotees are never deprived of food. With a golden ladle in one hand and a bowl of rice in the other, she is worshipped as the provider of nourishment and sustenance. The name itself holds meaning: Anna means food, while Purna means fullness or completeness. As a form of Goddess Parvati, she plays an essential role in the spiritual and mythological fabric of Kashi (Varanasi).\n\nThe Annapurna Devi Mandir was built in 1729 A.D. by the Maratha ruler Peshwa Baji Rao I, in the Nagara architectural style. Within its large pillared sanctum are two idols of the Goddess: one brass, available for darshan every day, and another gold, shown to devotees only once annually on Annakut (the day after Diwali). The temple design follows the Panchayatana layout, meaning there are subsidiary shrines too — dedicated to deities like Ganesha, Kubera, Surya, Yantreshwar Mahadev, Satyanarayan, and Hanuman among them.\n\nOne popular legend says that Parvati, seeking to restore her fair form (Gauri) after a disagreement with Shiva, was instructed by Shiva to distribute food in Varanasi. Adopting the form of Annapurna, she provided nourishment in the holy city. Another telling is that Shiva once declared that everything, including food, is maya (illusion). Disturbed by this, Parvati made all food vanish, causing suffering. Realizing the importance of sustenance, Shiva eventually begged Parvati at her door. Parvati then relented, feeding the world and setting up her kitchen in Varanasi. It is through this myth that Annapurna is celebrated as essential to life and well-being.\n\nAnnakut (the day after Diwali) is the most important festival for the temple. On this day, the golden idol is unveiled for public worship, and special offerings (Annakut coins) are distributed to devotees. During Navratri (in both October and April), the temple receives large crowds for special pujas. The temple premises are maintained by the Kashi Annapurna Annakshetra Trust, which also runs social service activities: free food (annadaan), elderly care, medical clinics, education, and more. The temple's location is House No. D-9/1, Vishwanath Gali, roughly 15 meters north-west of Kashi Vishwanath Temple. It is about 5 km from Varanasi Junction railway station.\n\nAccording to the Skanda Purāṇa, especially the Kashi Khand section, 'as long as Kashi exists, Lord Vishwanath (Shiva) and Goddess Annapurna have influence throughout the world.' Annapurna is considered one of the forms of Parvati residing in Kashi, and she is called the queen of Kashi — acting as complement (Shakti) to Kashi Vishwanath.",
    mainImage: "/generated_images/annapurna_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false
  },
  {
    id: "nageshwar-nath-temple",
    name: "Nageshwar Nath Temple",
    shortDescription: "Ancient Shiva shrine built by Kush, son of Lord Rama, in sacred Ayodhya.",
    description: "If you're planning a spiritual trip to Ayodhya, the city of Shri Ram, the Nageshwar Nath Temple near Ram Ki Paidi is a heritage treasure you should not miss. This ancient Shiva temple is woven deeply into Ayodhya's mythology, legends, and royal history—making it a serene yet powerful stop for pilgrims.\n\nThe origins of Nageshwar Nath Temple date back to the era of Kush, the son of Lord Rama. According to the legend: While bathing in the Saryu River, Kush lost his armlet. It was discovered by a Nag-Kanya, a serpent maiden, who instantly fell in love with him. She was a devotee of Lord Shiva, and to honor her devotion and affection, Kush established this temple dedicated to Nageshwar Mahadev. Even centuries later, during the reign of King Vikramaditya, the temple continued to flourish.\n\nMany ancient texts refer to Nageshwar as a form of Shiva who grants liberation from karmic bondage, removes fear from serpent-related inauspiciousness, and protects sacred lands (kshetra rakshak). Ayodhya's Nageshwar Nath is often considered one such guardian deity, preserving the sanctity of the land of Rama.\n\nBy the 18th century, the original structure needed restoration. The present-day temple was rebuilt around 1750 CE by Naval Rai, the minister of Safdar Jung, the Nawab of Awadh. The architectural style reflects a graceful blend of traditional Awadhi temple structures, Shiva iconography, ornate domes and arches, and stone courtyards facing the ghats of Saryu. Today, the temple stands as a reminder of Ayodhya's layered past—from the Ikshvaku dynasty to the Nawabs.\n\nThe temple becomes the beating heart of Ayodhya during Mahashivratri. Thousands of devotees line up at dawn for jalabhishek. The famous Shiv Barat procession—a symbolic wedding procession of Lord Shiva—is carried out with great enthusiasm. The temple premises glow with diyas, chants, damru beats, and divine decorations. Locals believe that attending Shiv Barat at this temple brings blessings equivalent to visiting multiple Jyotirlingas.",
    mainImage: "/generated_images/nageshwar_nath_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false
  },
  {
    id: "hanuman-garhi",
    name: "Hanuman Garhi",
    shortDescription: "Hilltop fortress temple of Bajrangbali guarding Ayodhya since the 10th century.",
    description: "Standing proudly in the heart of Ayodhya, the sacred city of Lord Rama, the Hanuman Garhi Temple is one of the most iconic shrines dedicated to Lord Hanuman. Believed to be built around the 10th century, this sacred fort-like temple is a must-visit destination for pilgrims, spiritual seekers, and cultural explorers. Perched atop a small hill, Hanuman Garhi offers not just a darshan of Bal Hanuman cradled in the lap of Mother Anjani, but also a glimpse into Ayodhya's deep devotional heritage.\n\nHanuman Garhi is considered one of the four major temples of Ayodhya (along with Nageshwar Nath, Kanak Bhawan, and Ram Janmabhoomi), and is deeply associated with the spiritual guardianship of the city. The temple houses a beautiful idol of Child Hanuman sitting in the lap of Maa Anjani, a rare depiction. Devotees believe Hanuman ji guards Ayodhya round the clock, ensuring peace and protection. With its massive fort-like walls, arched gateways, and long stairway entrance, the temple feels like a spiritual fort. It is one of the busiest temples, especially during Hanuman Jayanti, Ram Navami, and Diwali.\n\nTradition says that Hanuman lived here in a cave to protect Lord Rama's birthplace. The present structure evolved over centuries, with saints of various Hanuman sects contributing to its expansions. The temple now features a long flight of 76 stairs leading up to the shrine, a panoramic view of Ayodhya from the hilltop, bright saffron flags and bells adding to the divine ambience, and continuous chanting of 'Jai Bajrangbali' by devotees.\n\nStepping into Hanuman Garhi offers a spiritual experience filled with devotion and divine energy. Inside, visitors can witness Child Hanuman with Mother Anjani – a heartwarming murti symbolizing strength and maternal affection, beautifully carved interiors and arches reflecting early medieval North Indian architecture, continuous offerings of laddoos, flowers, and sindoor—the favorite of Bajrangbali, and saints and devotees chanting the Hanuman Chalisa and Ram Naam.",
    mainImage: "/generated_images/hanuman_garhi_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false
  },
  {
    id: "treta-ke-thakur",
    name: "Treta Ke Thakur Temple",
    shortDescription: "Sacred seat of Lord Rama's Ashwamedha Yagna on the serene Saryu banks.",
    description: "Located on the serene banks of the Saryu River at Naya Ghat, the Treta Ke Thakur Temple is one of Ayodhya's most revered spiritual landmarks. Dedicated to Lord Rama in his Treta Yuga form, this ancient shrine attracts pilgrims, historians, and curious travelers alike for its divine aura and powerful legends. The temple stands at the very place believed to be the site where Lord Rama performed the Ashwamedha Yagna, one of the most significant Vedic rituals symbolizing sovereign victory and universal harmony.\n\nThe origins of the temple go back roughly 300 years, when the King of Kullu constructed a shrine here to honor Lord Rama. Several centuries later, the temple underwent major renovation under the great Maratha queen Ahilyabai Holkar in 1784 CE, who revived many ancient temples across India, including Kashi Vishwanath in Varanasi and temples in Gaya, Indore, and Mathura. Her contribution gave the temple its present architectural form—simple, serene, and spiritually rich.\n\nUnlike other Ram temples that celebrate the broader life of Rama, this shrine specifically worships Lord Rama as the deity of the Treta Yuga, the epoch in which the Ramayana unfolds. This makes it one of the very few temples in India dedicated to the Treta incarnation of Vishnu. Here, devotees can feel the aura of ancient Ayodhya as described in the Ramayana—peaceful, prosperous, and filled with the divine presence of Shri Ram.\n\nOne of the most mesmerizing features of Treta Ke Thakur Temple is its set of ancient idols carved from a single block of black sandstone: Lord Rama, Sita Mata, Lakshman, and Hanuman. Legend says they were crafted not by human hands, but by divine beings themselves. Their beauty, symmetry, and ancient charm make them a centerpiece of devotion. The idols are brought out for public viewing mainly on special occasions, such as Kartik Purnima, when thousands gather to witness them. Treta Ke Thakur stands as a sacred reminder of this monumental Vedic event, making it a spiritually charged destination for devotees seeking blessings and peace.\n\nAlthough not heavily ornate, the temple exudes an ancient, peaceful charm with open courtyards facing the Saryu River, quiet sanctum with soft lighting, Vedic chanting during special rituals, and the soothing river breeze adding to the divine ambience.",
    mainImage: "/generated_images/treta_ke_thakur_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false
  },
  {
    id: "kanak-bhawan",
    name: "Kanak Bhawan",
    shortDescription: "The golden palace of Sita and Ram, radiating royal charm and devotion.",
    description: "In the spiritual heart of Ayodhya stands Kanak Bhawan, one of the most enchanting temples dedicated to Lord Rama and Goddess Sita. Radiating beauty, devotion, and royal charm, this shrine is often called the 'Golden Palace of Ayodhya' for its richly adorned idols and luminous interiors. Located near the famous Ram Janmabhoomi complex, Kanak Bhawan remains one of the most visited and cherished temples in the region—both for pilgrims and architecture enthusiasts.\n\nAccording to tradition, Mata Kaikeyi, the mother of Bharata, gifted this palace to Sita after her marriage to Lord Rama. This makes Kanak Bhawan one of the earliest residences of Sita in Ayodhya, symbolizing the affection and royal welcome offered to her. Over centuries, the structure saw multiple renovations. King Vikramaditya is believed to have restored it during ancient times. The present magnificent temple was fully rebuilt in 1891 CE by Vrish Bhanu Kunwari, queen of Tikamgarh (Bundelkhand). Her devotion resulted in a breathtaking architectural gem that stands proudly even today.\n\nThe temple is a prime example of Bundela architectural style, known for ornate arches, beautifully carved pillars, courtyards with symmetrical patterns, and domes with Rajasthani–Bundelkhand influence. The central hall opens through a series of grand arched doorways, creating a sense of royal entry into the divine space. The beauty of Kanak Bhawan lies in its simplicity from the outside and its golden splendor inside, symbolizing that true treasures lie within.\n\nWhat draws devotees most to Kanak Bhawan are the stunningly decorated idols inside the sanctum: Lord Ram and Goddess Sita adorned with gold crowns, exquisite jewellery and royal attire reflecting Ram Rajya's prosperity, and a serene presence that fills the hall with a divine glow. The main pair of idols is the largest and most beautifully adorned, installed by Rani Vrish Bhanu Kunwari herself. These radiant murtis are the primary reason the temple earned the name 'Kanak Bhawan,' meaning 'The House of Gold'. During festivals like Ram Navami, Vivah Panchami, and Diwali, the temple glitters even more brilliantly, drawing thousands of devotees.",
    mainImage: "/generated_images/kanak_bhawan_golden_palace.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false
  },
  {
    id: "kaal-bhairav-temple",
    name: "Kaal Bhairav Temple",
    shortDescription: "The fierce guardian and kotwal (protector) of Kashi, the sacred guardian of Varanasi.",
    description: "The ancient śloka common among the people of Kashi praises Kaal Bhairav — fierce in appearance yet compassionate — whose very presence is believed to dissolve sins. He occupies a unique place in Varanasi's spiritual geography, embodying Shiva's role as destroyer and protector.\n\nA cosmic debate once flared between Brahma (the Creator) and Vishnu (the Preserver) over who was supreme. A blinding pillar of light (Jyotirlinga), the manifestation of Shiva, emerged. Both tried to find its beginning and end. Vishnu humbly admitted defeat; Brahma did not. His arrogance enraged Shiva. From his matted locks, Shiva created a fierce being — Kaal Bhairav — who cut off Brahma's fifth head. Since that act was Brahmahātya (sin of killing a Brahmin), the severed head stuck to Bhairav's hand. He wandered the cosmos seeking atonement. It was only upon reaching Kashi that the sin was finally absolved — where the Brahma's head fell at what became known as Kapal Mochan Tīrtha. In Kashi, Bhairav was freed of Brahmahātya and ordained to remain as the Kotwal of the city — the guardian and keeper of order.\n\nWithin the temple complex are smaller shrines to Navagraha (nine planets), Goddess Durga, Hanuman, and Ganesha. Rituals often include offerings like til (sesame seeds), mustard oil, flowers, sweets. On special occasions, some worshippers also offer alcohol, in line with certain local tantric traditions associated with Bhairava worship.\n\nMajor festivals include Bhairava Ashtami, Mahashivratri, and Annakut. Weekly auspicious days include Tuesday and Sunday. Daily rituals include Mangala Aarti, Sandhya Aarti, Shayan (night) Aarti, etc. The temple opens early morning and closes late in the evening, with midday break in summer and winter.\n\nThe Skanda Purāṇa, especially the Kashi Khand section, is among the primary Purāṇic sources that narrate many stories about Varanasi. The tale of Kaal Bhairav — cutting Brahma's head, wandering with the sin, being freed in Kashi — appears in Kashi Khand. The Kashi Mahatmya (part of Kashi Khand) is said to extol Kashi as the place where Shiva's light shines, where sanctity is supreme, and being a tirtha where sinners are relieved. Bhairav, as the guardian who removes sins, fits this Purāṇic vision of Kashi's role as a place of liberation.",
    mainImage: "/generated_images/kaal_bhairav_temple_varanasi.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false
  },
  {
    id: "kashi-vishwanath-temple",
    name: "Shri Kashi Vishwanath Temple",
    shortDescription: "The most sacred Jyotirlinga of Shiva, one of the 12 holiest shrines in Hindu pilgrimage.",
    description: "Shri Kashi Vishwanath Temple is one of the most venerated shrines in India. It hosts one of the twelve Jyotirlingas, the self-manifested lingams of Lord Shiva. A mere glimpse of this Jyotirlinga is believed to wash away sins and purify the soul.\n\nThe temple has gone through many cycles of destruction and reconstruction over centuries, especially between 1194 AD and 1777 AD. In 1777, Queen Ahilya Bai Holkar of Indore built the current main structure. The temple also features in many traditional legends; one says Lord Brahma performed the Dashashwamedh Yajna (ten-horse sacrifice) at Dashashwamedh Ghat, which lies close to the temple. This gives additional mythic significance to the location.\n\nTo improve the pilgrimage experience, a project called the Kashi Vishwanath Corridor was launched. The corridor covers about 5.5 acres and includes a direct route (a four-lane pathway) connecting the temple premises to the Ganges (the ghats), so devotees can move more easily between the temple and the river. Phase-1 cost was about ₹339 crore. During construction, over 300 properties around the temple were acquired, and more than 1,400 shopkeepers, tenants, and homeowners were relocated/rehabilitated. Approximately 40 ancient temples were rediscovered during the project, and efforts were made to restore them without altering their original structures. The corridor includes modern amenities for pilgrims: better access, wider walking paths, museum/gallery spaces, tourist facilitation centres, viewing galleries and improved connectivity with the river.\n\nThe Skanda Purāṇa contains a section called Kashi Khand (or Kāśī Khaṇḍa), which dedicates many chapters to describing the city of Kashi (Varanasi), its sacred geography, temples, deity-stories, pilgrimages, etc. According to Kashi Khand, there were once 1,099 temples in Kashi, among which 513 were dedicated to Shiva. Some sources note that the original temple was called Moksha Lakshmi Vilas, and that it had five mandapas: Jnana Mandapa (east), Ranga Mandapa (west), Aishwarya Mandapa (north), Mukti Mandapa (south), and the garbhagriha (sanctum) in the center for the lingam.",
    mainImage: "/generated_images/kashi_vishwanath_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false
  },
  {
    id: "kardameshwar-temple",
    name: "Shri Kardameshwar Mahadev Temple",
    shortDescription: "The ancient survivor temple of Varanasi with deep-rooted spiritual significance.",
    description: "Kardameshwar Mahadev Temple, located near Kandwa Pokhra in Varanasi, is one of the few temples that withstood the Mughal destructions of the 17th century. The temple's walls still display beautifully carved figures of dancers, musicians, serpents, and mythical creatures—sculptures dating back to the 6th-7th century. It is recognized as an archaeological monument under the U.P. Ancient and Historical Monuments and Archaeological Sites and Remains Preservation Act, 1956.\n\nThe original structure is believed to have been built in the 6th-7th century, likely during Gupta times. Over time, various dynasties, including the Gahadavalas, made restorations and additions. The temple features Gupta-style sculptures (hair, garment carving, figure-proportions) on its external surfaces. The temple appears to follow a pancharatha layout (five-projection plan), with an ardha mandapa (partial hall) and square garbhagriha (sanctum), crowned by an ornate shikhara over it. A kund or tank known as Kardama Kunda lies beside the temple. Inscriptions suggest a spring / water source in the north-west corner of the sanctum whose water continuously flows over the Shiva lingam.\n\nWhile many temples of Kashi were destroyed during Mughal invasions (especially in the 16th-17th centuries), Kardameshwar remained intact. One reason is its slightly remote location (once thickly wooded) which offered protection. The large pond (Kund) at the site was renovated by Rani Bhavani of Bengal (mid-18th century), who also patronised many temple restorations in Varanasi.\n\nKardameshwar Mahadev is part of the Panchakroshi Yatra, a pilgrimage route around Varanasi. It is one of the night-halt temples (places pilgrims rest during the Yatra). Devotees believe that taking a dip in the Kardama Kunda and performing parikrama (circumambulation) of the temple help in minimizing sins and in spiritual purification.\n\nKardameshwar Temple is explicitly named in Kashi Khanda of the Skanda Purāṇa, showing its antiquity and traditional importance in the sacred geography of Varanasi. One legend says that after killing Ravana, Rama carried the sin of brahmahatya. Sage Vashistha advised him that visiting Kardameshwar Mahadev Temple, dipping in the Kandwa Sarovar (pond), and circumambulating the Shiva Linga along with his family would absolve him of the sin. The name 'Kardameshwar' comes from Rishi Kardam, who is said to have performed severe austerities (tapas) here for thousands of years.",
    mainImage: "/generated_images/kardameshwar_mahadev_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false
  },
  {
    id: "vishalakshi-devi-temple",
    name: "Vishalakshi Devi Temple",
    shortDescription: "The Shakti form of Varanasi, the divine cosmic feminine energy protecting the sacred city.",
    description: "Vishalakshi Devi Temple, also known as Vishalakshi Gauri Temple or Manikarnika Vishalakshi, is one of the ancient and sacred Shakti Peeths located at Mir Ghat, near Manikarnika in Varanasi, Uttar Pradesh. The temple is dedicated to the Shakti form of Goddess Sati. According to the lore, the earring (kundala) from Sati's right ear fell here, which is why the goddess is also called Manikarni Devi. In the main sanctum sanctorum of the temple, the merit and power of Shakti are worshipped in the form of Vishalakshi Devi, while her counterpart Bhairav is worshiped as Kaal Bhairav.\n\nThe temple is situated at Mir Ghat (Kashi Lahori Tola), close to Manikarnika Ghat and fairly near to Kashi Vishwanath Temple. The current building was constructed in 1893 by the Nattukottai Nagarathar community (a mercantile group from Tamil Nadu) in a style that shows some influence of Dravidian architecture, though it blends with local styles. There are typically two idols in the sanctum: a smaller black-stone idol known as Vishalakshi, and alongside it stands a brass murti in Durga/Kali form.\n\n'Vishalakshi' literally means 'the one with large, beautiful eyes,' and represents the divine cosmic feminine energy. According to sacred texts, Goddess Vishalakshi is the Shakti consort of Lord Shiva in Kashi and stands as a protector of the city's spiritual sanctity. The temple is believed to be one of the Shakti Peeths, where the divine feminine energy manifests in its most powerful form. Devotees worship here seeking blessings of prosperity, protection, and spiritual enlightenment. The goddess is depicted in her compassionate yet powerful form, embodying the creative and nurturing aspects of divine energy. The temple attracts especially female devotees seeking blessings for family welfare and spiritual growth. Located in sacred Varanasi, this temple represents the balance of masculine and feminine divine principles.",
    mainImage: "/generated_images/vishalakshi_devi_temple.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Varanasi",
    featured: false
  },
  {
    id: "dashrath-bhavan",
    name: "Dashrath Bhavan",
    shortDescription: "The legendary palace of King Dasharatha, father of Lord Rama, in sacred Ayodhya.",
    description: "Dashrath Bhavan in Ayodhya is a significant historical site associated with King Dasharatha, the father of Lord Rama. This palace holds immense cultural and spiritual importance as the seat of power in ancient Ayodhya during the Ramayana era. According to tradition, this was the royal residence where the great king ruled and where significant events of Rama's early life unfolded. The palace architecture reflects the grandeur and magnificence of ancient Ayodhyan kingdoms. Historical accounts describe Dashrath Bhavan as a symbol of righteous rule and divine governance. The site carries the spiritual essence of the Ramayana, connecting pilgrims to the legendary kingdom of Rama. Visitors to this site feel the presence of ancient Ayodhya's glory and the spiritual legacy of one of Hinduism's greatest kings. The palace represents the ideals of dharma and righteous governance that King Dasharatha exemplified. Today, Dashrath Bhavan stands as a link between ancient history and spiritual tradition, attracting devotees and history enthusiasts alike.",
    mainImage: "/generated_images/dashrath_palace_ayodhya.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false
  },
  {
    id: "ram-katha-sangrahalay",
    name: "Ram Katha Sangrahalay",
    shortDescription: "A museum and repository of Rama's stories, preserving the sacred narrative of the Ramayana.",
    description: "Ram Katha Sangrahalay is a comprehensive museum and cultural center in Ayodhya dedicated to preserving and presenting the sacred stories of Lord Rama through various art forms and displays. The museum serves as a spiritual and educational center showcasing the Ramayana's narratives through paintings, sculptures, manuscripts, and interactive exhibits. It beautifully chronicles the life and teachings of Lord Rama, making the epic accessible to modern pilgrims and scholars. The Ram Katha Sangrahalay features diverse artistic representations of Rama's life - from his birth to his coronation and exile. Traditional art forms, contemporary interpretations, and ancient manuscripts are thoughtfully displayed to tell the complete story of the beloved deity. The museum celebrates the cultural and spiritual significance of Rama in Hindu civilization. Visitors can gain deep insights into the philosophical teachings and moral lessons embedded in the Ramayana. The center creates an immersive experience that connects devotees to the spiritual essence of Rama's divine incarnation. It serves as a bridge between ancient wisdom and contemporary understanding of the epic's eternal truths.",
    mainImage: "/generated_images/ram_katha_museum_ayodhya.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
    featured: false
  },
  {
    id: "tulsi-smarak",
    name: "Tulsi Smarak Bhawan",
    shortDescription: "A memorial dedicated to the great saint-poet Tulsidas and his immortal works.",
    description: "Located at Rajgang Crossing in the sacred city of Ayodhya, the Tulsi Smarak Bhawan stands as a cultural and literary landmark dedicated to the legendary saint-poet Goswami Tulsidas, the author of the Ramcharitmanas. Built in 1969 CE, this institution honors the memory of the poet who reshaped India's spiritual consciousness through his retelling of the Ramayana in the Awadhi language. The Bhawan was established under the guidance of Sri Vishwanath Das, then Governor of Uttar Pradesh, with the aim of preserving and promoting the literary brilliance and philosophical depth of Tulsidas.\n\nToday, Tulsi Smarak Bhawan is not just a memorial—it is a thriving centre of Ramayana studies, cultural research, and devotional activities, attracting thousands of pilgrims, scholars, and tourists every year.\n\nLocal belief holds that Goswami Tulsidas spent time in Ayodhya during the composition of Ramcharitmanas, and this site is closely associated with his presence. To honour his legacy, the memorial was built along with facilities for literary studies, archival preservation, daily recitations of Ramkatha, and public events and spiritual gatherings. Tulsi Smarak Bhawan beautifully bridges the devotional world of Tulsidas with modern cultural institutions.\n\nOne of the main attractions inside the Bhawan is the Ayodhya Research Sansthan, a dedicated centre for research on Ramayana and Tulsi literature, preservation of manuscripts, cultural and historical studies of Ayodhya, and publications, seminars, and academic work. Tulsidas transformed the epic Ramayana into vernacular Hindi, making the sacred stories accessible to common people. His profound devotion and literary genius created a spiritual movement that shaped Hindu religious practice for centuries.\n\nThe memorial showcases Tulsidas's life, his spiritual journey, and his immortal compositions. It celebrates the saint's role in popularizing Rama bhakti (devotion to Rama) across India. Devotees visit to seek inspiration from his devotional path and to understand the spiritual depth of his works. The memorial stands as a testament to the power of devotion and the transformative impact of spiritual literature.",
    mainImage: "/generated_images/tulsi_smarak_bhawan_memorial.png",
    image2: null,
    image3: null,
    image4: null,
    region: "Ayodhya",
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
    mainImage: "/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png",
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
    mainImage: "/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png",
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
    mainImage: "/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png",
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
    destination: "Varanasi",
    category: "touristic",
    duration: "1 Day",
    shortDescription: "Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.",
    highlights: [
      "Sunrise boat ride on the Ganges",
      "Visit to Kashi Vishwanath Temple",
      "Explore hidden alleys of old Varanasi",
      "Witness evening Ganga Aarti ceremony"
    ],
    imageUrl: "/generated_images/Kashi_walking_tour_group_d0392eea.png",
    detailedDescription: "Begin your spiritual journey with a magical sunrise boat ride on the Ganges, watching the city come alive with morning prayers. After breakfast, visit the iconic Kashi Vishwanath Temple, one of the twelve Jyotirlingas. Your local guide will lead you through Varanasi's ancient alleys, revealing hidden temples and sharing stories passed down through generations. Experience authentic local cuisine for lunch. The day culminates with the spectacular Ganga Aarti at Dashashwamedh Ghat, where priests perform synchronized rituals as thousands of diyas float on the sacred river. This is Varanasi at its most magical.",
    price: null,
    featured: true
  },
  {
    id: "2day-kashi-sarnath",
    name: "2 Days Varanasi Tour Package – Kashi Darshan with Sarnath",
    destination: "Varanasi",
    category: "touristic",
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
    imageUrl: "/generated_images/varanasi_ganga_river_sunset.png",
    detailedDescription: "Experience the divine aura of Kashi – the Spiritual Capital of India. This 2-day Varanasi package is specially designed for devotees and travelers who wish to seek blessings at the sacred temples, witness the famous Ganga Aarti at Dashashwamedh Ghat, and explore the peaceful Buddhist site of Sarnath.\n\nDay 1: Arrival in Varanasi – Evening Darshan & Aarti\n• Pick-up from Airport/Railway Station\n• Check-in at hotel & freshen up\n• Evening visit to Shri Kashi Vishwanath Temple (seek blessings at the sacred Jyotirlinga) and Kaal Bhairav Temple (protector of Kashi)\n• Witness the mesmerizing Ganga Shanti Aarti at Dashashwamedh Ghat – a once-in-a-lifetime spiritual experience\n• Return to hotel for dinner & overnight stay\n\nDay 2: Excursion to Sarnath & Temple Tour\n• Early breakfast at hotel\n• Proceed for half-day excursion to Sarnath – Explore Dhamek Stupa, Ashokan Pillar, and Sarnath Museum\n• Visit Sarangnath Temple, Markandeya Mahadev, and Sarnved Mandir\n• Return to hotel for lunch & rest\n• Evening Temple Tour: Durga Mandir (Durga Kund), Sankat Mochan Hanuman Mandir, Tulsi Manas Mandir\n• Return to hotel for dinner & overnight stay\n\nDay 3: Departure\n• Breakfast at hotel\n• Check-out and transfer to Airport/Railway Station with beautiful memories of Kashi\n\nInclusions:\n• Pick-up & drop from Varanasi Airport/Railway Station\n• 2 Nights stay in a deluxe hotel (AC room)\n• Breakfast, lunch, tea, and dinner (as per itinerary)\n• AC vehicle for sightseeing & transfers\n• Driver allowance, tolls, parking & all applicable taxes\n\nExclusions:\n• Personal expenses, shopping, tips, and camera charges\n• Any extra meals or activities not mentioned in the itinerary\n• Travel insurance & flight/train tickets\n\nWhy Book with Us?\n• Handpicked hotels with comfort & hygiene\n• Local expert guides & hassle-free travel\n• 24x7 customer support during your trip\n• Best price guarantee",
    price: null,
    featured: true
  },
  {
    id: "3day-kashi-spiritual",
    name: "3 Days / 2 Nights Varanasi Spiritual Tour Package – Kashi Darshan with Sarnath",
    destination: "Varanasi",
    category: "touristic",
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
    imageUrl: "/generated_images/kashi_vishwanath_temple_night_aarti.png",
    detailedDescription: "Discover the divine charm of Kashi (Varanasi) – the city where spirituality meets eternity. This 3-day spiritual tour package is designed to cover the most sacred temples of Kashi, the holy ghats, and the peaceful Buddhist sites of Sarnath.\n\nDay 1: Arrival in Varanasi – Temple Tour & Evening Ganga Aarti\n• Pick-up from Airport/Railway Station\n• Visit the sacred temples: Shri Kashi Vishwanath Temple (Jyotirlinga Darshan), Kaal Bhairav Temple (Kashi Kotwal), Mangala Gauri Temple, Sankatha Devi Temple, Atma Vireshwar Mahadev Temple\n• After darshan, check-in at hotel & rest\n• In the evening, attend the divine Ganga Aarti at Dashashwamedh Ghat – a spiritual spectacle of lights, chants & devotion\n• Return to hotel for dinner & overnight stay\n\nDay 2: Excursion to Sarnath & Evening Temple Tour\n• Early breakfast at hotel\n• Proceed for half-day excursion to Sarnath – Dhamek Stupa, Ashokan Pillar, Sarnath Museum & Buddhist ruins\n• Visit Markandeya Mahadev Temple and Sarvedha Temple\n• Return to hotel for lunch & relaxation\n• Evening visit to Durga Mandir (Durga Kund), Sankat Mochan Hanuman Mandir, Tulsi Manas Mandir, Assi Ghat – experience the soulful atmosphere with live music & evening prayers\n• Return to hotel, dinner & overnight stay\n\nDay 3: Morning Darshan & Departure\n• Breakfast at hotel\n• Morning visit to Markandeya Mahadev Temple (second darshan for blessings) and Adalpura Seetla Mata Mandir\n• Return to hotel, check-out & transfer to Airport/Railway Station for departure with divine memories of Kashi\n\nInclusions:\n• Pick-up & drop from Airport/Railway Station\n• 2 Nights stay in a deluxe hotel (AC rooms)\n• Breakfast, lunch, tea & dinner (as per itinerary)\n• AC vehicle for sightseeing & transfers\n• Driver allowance, tolls, parking & all applicable taxes\n\nExclusions:\n• Airfare / Train fare\n• Personal expenses (shopping, tips, laundry, etc.)\n• Camera charges & entry fees (if applicable)\n• Anything not mentioned in inclusions\n\nWhy Choose Us?\n• Authentic spiritual itinerary curated by local experts\n• Comfortable stay in hygienic hotels\n• Professional drivers & guided temple visits\n• Hassle-free arrangements for families & groups\n• 24x7 customer support during your trip",
    price: null,
    featured: true
  },
  {
    id: "3day-ayodhya",
    name: "3-Day Ayodhya + Kashi Spiritual Trail",
    destination: "Varanasi",
    category: "touristic",
    duration: "3 Days",
    shortDescription: "A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.",
    highlights: [
      "Ram Janmabhoomi and major Ayodhya temples",
      "Hanuman Garhi and Kanak Bhawan",
      "Complete Varanasi heritage experience",
      "Sacred rituals participation opportunity"
    ],
    imageUrl: "/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png",
    detailedDescription: "This comprehensive pilgrimage covers two of Hinduism's holiest cities. Days 1-2 in Ayodhya include visits to Ram Janmabhoomi, Hanuman Garhi, Kanak Bhawan, and other sacred sites. Experience the evening aarti at Saryu River. Day 3 brings you to Varanasi for the complete Kashi darshan - boat ride, temple visits, heritage walk, and the magnificent Ganga Aarti. Throughout the journey, participate in authentic rituals and pujas, guided by local pandits who ensure the spiritual significance of each experience is fully understood. Comfortable AC transport and quality accommodation included.",
    price: null,
    featured: true
  },
  {
    id: "kaal-bhairav-madira-seva",
    name: "Kaal Bhairav Madira Seva – Exclusive Temple Service",
    destination: "Varanasi",
    category: "pooja",
    duration: "Varies",
    shortDescription: "Sacred tantric-Vedic ritual where alcohol is offered to Lord Kaal Bhairav, invoking divine protection and removing negative energies.",
    highlights: [
      "Madira (Offerings) Ritual performed as per traditional Kashi tantra-vidhi",
      "Kaal Bhairav Mantra Jaap for protection and inner strength",
      "Tilak & Raksha Sutra for personal safeguarding",
      "Special Prarthana for removing obstacles & ensuring success",
      "Return Prasad from the sanctum (bhabhuti, chunari, raksha thread)",
      "Digital Video of Seva (if opted)",
      "Prasad Courier Option (India & International)"
    ],
    imageUrl: "/generated_images/kaal_bhairav_temple_varanasi.png",
    detailedDescription: "Kaal Bhairav Madira Seva is a sacred tantric-Vedic ritual where alcohol is offered to Lord Kaal Bhairav, symbolizing surrender of ego and tamasic energies. Practiced for centuries in Kashi, this seva is known to invoke divine protection, remove negative energies, and bring success and spiritual upliftment.\n\nBenefits:\n• Protection from unseen obstacles & negative energies\n• Boost in career, success, and confidence\n• Removal of fear, anxiety, and inner blockages\n• Divine support for legal matters, business growth & safety\n• Spiritual cleansing & empowerment\n\nSeva Timings: Performed daily during temple ritual hours. Auspicious Days: Ashtami, Kalashtami, Sundays, and special Bhairav Tithis\n\nWhat You Receive: Digital Video of Seva, Prasad Courier Option, Personalized Sankalp with name & gotra, Seva Certificate (optional add-on)",
    price: null,
    featured: true
  },
  {
    id: "kaal-bhairav-abhishek-shringar",
    name: "Kaal Bhairav Abhishek & Shringar Puja – Temple Service",
    destination: "Varanasi",
    category: "pooja",
    duration: "Varies",
    shortDescription: "Ancient Kashi rituals of ritual bathing and adorning Bhagwan Bhairav for purification, protection, and spiritual upliftment.",
    highlights: [
      "Panchamrit Abhishek",
      "Ganga Jal Snan",
      "Bhasm & Chandan Shringar",
      "Floral decoration (Pushpa Shringar)",
      "Vastra offering (cloth)",
      "Special protection prayer for devotee",
      "Bhairav Mantra Jaap",
      "Tilak & Raksha Sutra"
    ],
    imageUrl: "/generated_images/kaal_bhairav_temple_varanasi.png",
    detailedDescription: "Kaal Bhairav Abhishek and Shringar Puja are ancient Kashi rituals known for purifying energy, removing obstacles, and invoking powerful divine protection. Abhishek is ritual bathing of the deity with Panchamrit, Ganga Jal, and sacred herbs. Shringar is adorning Bhagwan Bhairav with flowers, sandalwood, vastra, garlands, and traditional ornaments.\n\nBenefits:\n• Removal of obstacles, fear & negative influences\n• Peace, prosperity & improved mental clarity\n• Strong spiritual protection (Raksha Kavach)\n• Success in work, business & legal matters\n• Aura purification and emotional stability\n\nSeva Timings: Daily during temple puja hours. Highly auspicious on Ashtami, Kalashtami, Sundays, and Bhairav Jayanti\n\nWhat You Receive: Prasad Packet, Digital Photos/Video, Personalized Sankalp, Seva Completion Message, Courier Prasad Option",
    price: null,
    featured: true
  },
  {
    id: "kaal-bhairav-akhand-deepak",
    name: "Kaal Bhairav Akhand Deepak Sewa – Temple Service",
    destination: "Varanasi",
    category: "pooja",
    duration: "Varies",
    shortDescription: "Offering of a continuously burning ghee diya in Kaal Bhairav Temple, symbolizing protection, karma cleansing, and divine guidance.",
    highlights: [
      "Sacred ghee diya setup",
      "Akhand (unbroken) flame maintenance",
      "Daily bhabhuti & chandan application",
      "Kaal Bhairav Mantra Jaap",
      "Special protection prayer for the devotee",
      "Offering of flowers & Bilwa leaves",
      "Tilak & Raksha Sutra",
      "Daily/Weekly photo updates available"
    ],
    imageUrl: "/generated_images/kaal_bhairav_temple_varanasi.png",
    detailedDescription: "Kaal Bhairav Akhand Deepak Sewa is the offering of a continuously burning ghee diya in the sacred temple of Bhagwan Kaal Bhairav. This uninterrupted flame symbolizes protection, karma cleansing, fear removal, and divine guidance. Extremely beneficial for those facing fear or anxiety, legal issues, life transitions or instability, and those seeking spiritual direction and strength.\n\nBenefits:\n• Divine protection from negative energies\n• Removal of fear, unknown obstacles & bad karma\n• Support in legal matters & disputes\n• Stability in career, business & life decisions\n• Mental peace and spiritual clarity\n• Blessings for family safety & wellbeing\n\nWhat You Receive: Daily/Completion Prasad Packet, Sankalp with name & gotra, Daily/Weekly photo updates or final photo, Video option, Courier Prasad available",
    price: null,
    featured: true
  },
  {
    id: "kaal-bhairav-trishul-maha",
    name: "Kaal Bhairav Trishul Maha Abhishek Puja – Temple Service",
    destination: "Varanasi",
    category: "pooja",
    duration: "Varies",
    shortDescription: "Highly energizing ritual to honor and activate the sacred Trishul of Lord Shiva/Kaal Bhairav for spiritual strength and protection.",
    highlights: [
      "Trishul Maha Abhishek with Milk, Honey, Curd, Ganga Jal, Ghee & Panchamrit",
      "Bhasm & Chandan application",
      "Flower & Bilwa leaf offering",
      "Kaal Bhairav Mantra Jaap",
      "Special protection prayer",
      "Raksha Sutra & Tilak",
      "Devotee's personalized Sankalp",
      "Photos/Video of Puja optional"
    ],
    imageUrl: "/generated_images/kaal_bhairav_temple_varanasi.png",
    detailedDescription: "The Trishul Maha Abhishek Puja is a highly energizing ritual performed to honor and activate the sacred Trishul of Lord Shiva/Kaal Bhairav. Priests in Kashi perform the ceremony using milk, honey, curd, Ganga Jal, ghee, and sacred herbs, while chanting powerful mantras. This puja invokes strong divine protection, removal of negativity, courage, clarity & spiritual strength, and prosperity and inner stability.\n\nBenefits:\n• Strong spiritual protection\n• Removal of negative energies & blockages\n• Increase in courage, clarity & determination\n• Support in legal matters & tough life decisions\n• Prosperity & stability in work/business\n• Deep spiritual connection with Kaal Bhairav\n\nPuja Timings: Performed daily by trained priests. Highly auspicious on Ashtami, Kalashtami, Sundays, and Bhairav Jayanti\n\nWhat You Receive: Prasad Packet, Photos/Video of Puja, Sankalp Confirmation Message, Courier Prasad Option, Special Blessing Note from temple",
    price: null,
    featured: true
  },
  {
    id: "maha-mrityunjay-sewa",
    name: "Maha Mrityunjay Temple Sewa Package – Varanasi",
    destination: "Varanasi",
    category: "pooja",
    duration: "Varies",
    shortDescription: "Comprehensive puja packages at Maha Mrityunjay Temple dedicated to Lord Shiva, for healing, protection, and longevity.",
    highlights: [
      "Basic Maha Mrityunjay Sewa with Mantra Recitation & Abhishek",
      "Complete Rudra Abhishek with Panchamrit (Milk, Curd, Ghee, Honey & Sugar)",
      "Maha Mrityunjay Mantra Japa (108 or 11000 Times)",
      "Vibhuti application ritual & Rudraksha thread",
      "Maha Mrityunjay Havan (Homa) with protective family shield prayer",
      "Holy water from ancient temple well for healing",
      "Certificate of completion available",
      "Prasad courier option for India & International"
    ],
    imageUrl: "/generated_images/kashi_vishwanath_temple.png",
    detailedDescription: "The Maha Mrityunjay Temple, dedicated to Lord Shiva, holds immense spiritual importance in Varanasi. Located on the route from Daranagar to Kaal Bhairav Temple, it is especially known for the ancient curative well, whose holy water is believed to heal diseases and negative energies.\n\nSewa Packages Offered:\n1. Basic Maha Mrityunjay Sewa - Sankalp, Mantra Recitation, Abhishek with holy water, Bilva Patra offering\n2. Maha Mrityunjay Abhishek Puja - Complete Rudra Abhishek, Panchamrit Abhishek, Vibhuti & Rudraksha thread\n3. Mantra Japa - 108 or 11000 Times dedicated Brahmin chanting in front of Lord Shiva\n4. Special Healing & Protection Sewa - Maha Mrityunjay Havan, Protective family shield prayer, Health & longevity blessings\n\nBenefits:\n• Overcomes physical, mental, and spiritual problems\n• Removes evil effects and negative energies\n• Supports career growth and professional success\n• Helps heal chronic diseases and energizes body systems\n• Opens blocked chakras/energy points\n• Protects against malefic Maraka planets\n• Creates strong protection for the entire family\n• Enhances inner strength, calmness, and spiritual clarity\n\nTemple Timings: Opens 4:00 AM, Closes 12:00 Midnight. Morning Aarti: 5:30 AM, Evening Aarti: 6:30 PM, Shayan Aarti: 11:30 PM",
    price: null,
    featured: true
  },
  {
    id: "bilva-archana-puja",
    name: "Bilva Archana Puja – Gauri Kedareshwar Temple, Varanasi",
    destination: "Varanasi",
    category: "pooja",
    duration: "Varies",
    shortDescription: "Sacred offering of Belpatra to Lord Shiva for divine grace, purification, purity, and spiritual protection.",
    highlights: [
      "Sankalp taken by the priest in devotee's name",
      "Offering of fresh Bilva leaves",
      "Archana with Shiva Mantras",
      "Flower & Prasad offering",
      "Complete Rudra Abhishek with pure water & Panchamrit",
      "Chanting of Om Namah Shivaya & Shiva Stotram",
      "Vibhuti tilak ritual",
      "Personalized blessings for peace, purity & protection"
    ],
    imageUrl: "/generated_images/kashi_vishwanath_temple.png",
    detailedDescription: "The Bilva Archana Puja is one of the most powerful and spiritually elevating rituals dedicated to Lord Shiva. Offering Bilva (Belpatra) to the Shiva Linga symbolizes devotion, purification, and surrender. Scriptures glorify the Bilva Tree as a divine tirtha, and performing this puja is believed to grant the benefit of countless pilgrimages.\n\nPerformed at the holy Gauri Kedareshwar Temple, Varanasi (Uttar Pradesh), this sewa is especially auspicious during Shravan Maas, Masik Shivratri, and Mondays.\n\nSewa Packages:\n1. Basic Bilva Archana Sewa - Sankalp, Fresh Bilva leaves, Archana with Shiva Mantras, Flower & Prasad offering, Blessings for peace & purity\n2. Bilva Archana with Rudra Abhishek - Complete Rudra Abhishek with water & Panchamrit, Sacred Bilva offering, Om Namah Shivaya chanting, Vibhuti tilak ritual\n\nBenefits:\n• Daily blessings and spiritual purity\n• Removal of negative energies\n• Overcomes obstacles in spiritual path\n• Divine connection with Lord Shiva\n• Mental peace and emotional balance\n• Protection from malefic influences\n• Healing and rejuvenation\n\nBest For: Spiritual seekers during Shravan Maas, Masik Shivratri, and Mondays for enhanced benefits",
    price: null,
    featured: true
  },
  {
    id: "diwali-2026-special",
    name: "Diwali 2026 Special - Celebrate Light in Sacred Varanasi",
    destination: "Varanasi",
    category: "popular_event",
    duration: "3 Days",
    shortDescription: "Experience the most sacred Diwali celebration on the ghats of Varanasi where millions of diyas illuminate the Ganges River. Witness the divine spectacle of lights and spirituality.",
    highlights: [
      "Exclusive front-row seating at Dashashwamedh Ghat for Dev Deepawali",
      "Sunrise boat ride with ceremonial bathing rituals",
      "Special Lakshmi Puja at ancient temples with local priests",
      "Millions of diyas lighting ceremony on Ganga ghats",
      "Authentic Diwali celebrations and rangoli viewing",
      "Traditional sweets and festive meals included",
      "Expert local guides for historical and spiritual insights"
    ],
    imageUrl: "/generated_images/diwali_celebration_in_varanasi.png",
    detailedDescription: "Celebrate Diwali in Varanasi, the city where the festival reaches its most magnificent form. This exclusive 3-day package brings you to witness Dev Deepawali - the divine festival of lights where the entire Ganges ghats glow with countless oil lamps and fireworks light up the sky.\n\nDay 1: Arrival & Temple Visits\n• Pick-up from station/airport\n• Evening prayers at Kashi Vishwanath Temple\n• Witness sunset aarti at Assi Ghat\n• Dinner and cultural program\n\nDay 2: Diwali Celebrations\n• Early morning Ganga Snan with rituals\n• Special Lakshmi Puja at local temple\n• Daytime exploration of Varanasi's spiritual sites\n• Evening: Millions of diyas lighting ceremony\n• Watch Dev Deepawali - the most spectacular display of lights\n• Festive dinner with local sweets\n\nDay 3: Heritage Tour & Departure\n• Morning boat ride through festive ghats\n• Visit Sarnath\n• Depart with blessings and memories\n\nFor exact dates and detailed itinerary, please contact us via WhatsApp or phone.",
    price: null,
    featured: true
  },
  {
    id: "makar-sankranti-2026",
    name: "Makar Sankranti 2026 - Holy Dip at Triveni Sangam",
    destination: "Varanasi",
    category: "popular_event",
    duration: "2 Days",
    shortDescription: "Join the most auspicious bathing ritual of the year at the sacred Ganges during Makar Sankranti, celebrated by millions of pilgrims seeking spiritual cleansing.",
    highlights: [
      "Holy dip at Sangam confluence point",
      "Special early morning rituals and ceremonies",
      "Guided darshan at major Varanasi temples",
      "Participation in Ghat Aarti ceremonies",
      "Traditional Til-Gur sweets distribution",
      "Meet local spiritual masters and pandits",
      "Photography opportunity at sunrise"
    ],
    imageUrl: "/generated_images/makar_sankranti_festival_in_varanasi.png",
    detailedDescription: "Makar Sankranti is the most auspicious day for bathing in the holy Ganges. This festival marks the sun's transition into Capricorn and is celebrated as a day of spiritual purification. Millions of pilgrims gather at the Ganges ghats, especially at Prayagraj and Varanasi, for the sacred ritual.\n\nDay 1: Arrival & Evening Preparations\n• Arrive in Varanasi\n• Attend evening Ganga Aarti\n• Traditional welcome and orientation\n• Early rest for next day's spiritual journey\n\nDay 2: Makar Sankranti Celebrations\n• Pre-dawn wake-up for sacred rituals\n• Holy dip at the Sangam point\n• Special Ghat puja and ceremonies\n• Darshan at Kashi Vishwanath, Annapurna, and other key temples\n• Receive Til-Gur prasad (traditional sweets)\n• Meet spiritual gurus and learn about the significance\n• Return to hotel for rest and meals\n• Evening departure\n\nNote: January 14, 2026 is Makar Sankranti. For specific dates, timings, and customized arrangements, please contact us for more details.",
    price: null,
    featured: true
  },
  {
    id: "ram-navami-2026-ayodhya",
    name: "Ram Navami 2026 - Lord Rama's Birthday in Ayodhya",
    destination: "Ayodhya",
    category: "popular_event",
    duration: "3 Days",
    shortDescription: "Celebrate Lord Rama's birth anniversary in Ayodhya with grand processions, special ceremonies, and the spiritual energy of millions of devotees gathered for this sacred festival.",
    highlights: [
      "Grand Ram Navami procession participation",
      "Exclusive darshan at Ram Mandir",
      "Special Hanuman Garhi temple ceremonies",
      "Kanak Bhawan and Nageshwar Nath visits",
      "Ram Lila theatrical performances",
      "Traditional feasts and temple prasad",
      "Expert guides explaining Ram Navami significance"
    ],
    imageUrl: "/generated_images/ram_navami_celebration_in_ayodhya.png",
    detailedDescription: "Ram Navami celebrates the birth of Lord Rama, the seventh incarnation of Lord Vishnu and the protagonist of the Ramayana. In Ayodhya, this festival is celebrated with unmatched devotion as it is Lord Rama's birthplace. This 3-day experience immerses you in the spiritual fervor and celebrates one of Hinduism's most important festivals.\n\nDay 1: Arrival in Ayodhya\n• Airport/station transfer\n• Check-in and lunch\n• Evening darshan at Ram Janmabhoomi Mandir\n• Temple exploration and orientation walk\n• Dinner with local specialties\n\nDay 2: Ram Navami Main Celebrations\n• Early morning prayers and rituals\n• Grand Ram Navami procession (Barat)\n• Special ceremonies and chanting\n• Darshan at Hanuman Garhi temple\n• Visit Kanak Bhawan and Nageshwar Nath temples\n• Watch Ram Lila (theatrical performance of Ram's life)\n• Participate in traditional feasts\n• Evening aarti at Saryu Ghat\n\nDay 3: Heritage & Spiritual Tours\n• Visit Tulsi Smarak Bhawan\n• Explore Ram Katha Sangrahalay museum\n• Final darshan at major temples\n• Departure with blessings\n\nNote: Ram Navami falls in March 2026. For precise dates, full itinerary, and booking details, please contact us via WhatsApp or phone.",
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
      destination: pkg.destination ?? null,
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

export const storage: IStorage = new DatabaseStorage();
