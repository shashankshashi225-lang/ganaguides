-- GangaGuides Seed Data
-- Run this SQL in your Neon database console after creating the tables

-- Clear existing data (optional - remove if you want to preserve existing data)
-- DELETE FROM video_testimonials;
-- DELETE FROM panchang_events;
-- DELETE FROM packages;
-- DELETE FROM blog_posts;
-- DELETE FROM destinations;

-- Seed Destinations
INSERT INTO destinations (id, name, short_description, description, main_image, image_2, image_3, image_4, region, featured) VALUES
('varanasi', 'Varanasi', 'Walk along the holy Ganga, witness morning aarti, and explore hidden alleys of the eternal city.', 'Varanasi, the spiritual capital of India, is one of the world''s oldest continuously inhabited cities. Walk along the sacred ghats of the Ganges, witness the mesmerizing Ganga Aarti ceremony, and explore ancient temples that have stood for millennia. The city''s narrow alleys hide centuries of spiritual heritage, making every visit a journey through time.', '/generated_images/varanasi_holy_city_ganga.png', '/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png', '/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png', '/generated_images/Varanasi_temple_architecture_detail_a35f07ab.png', 'Varanasi', true),
('ayodhya', 'Ayodhya', 'Dive into the legends of Lord Ram and experience age-old traditions firsthand.', 'Ayodhya, the birthplace of Lord Rama, is one of Hinduism''s seven holiest cities. The recently constructed Ram Mandir stands as a magnificent testament to ancient Indian architecture. Visit Hanuman Garhi, Kanak Bhawan, and numerous other temples that echo with devotional chants and centuries of spiritual tradition.', '/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png', '/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png', NULL, NULL, 'Ayodhya', true),
('sarnath', 'Sarnath', 'Visit the site where Buddha gave his first sermon, enriched with history and tranquility.', 'Sarnath is where Buddhism began as Buddha gave his first sermon after attaining enlightenment. The Dhamek Stupa, Ashoka Pillar, and ancient monasteries create a serene atmosphere perfect for contemplation. Museums house remarkable Buddhist artifacts, while the peaceful deer park offers a glimpse into the Buddha''s teachings.', '/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png', NULL, NULL, NULL, 'Uttar Pradesh', true),
('prayagraj', 'Prayagraj', 'Experience the sacred confluence of three holy rivers at Triveni Sangam.', 'Prayagraj, formerly Allahabad, is home to the legendary Triveni Sangam - the confluence of the Ganges, Yamuna, and the mythical Saraswati rivers. This sacred spot hosts the world''s largest religious gathering, the Kumbh Mela. Visit the Allahabad Fort, Anand Bhawan, and experience the spiritual energy of ritual bathing at the sangam.', '/generated_images/Prayagraj_Triveni_Sangam_confluence_c12597e6.png', NULL, NULL, NULL, 'Uttar Pradesh', true),
('durga-temple', 'Durga Temple', 'The benevolent guardian goddess of Varanasi, protector of the sacred city.', 'The Durga Temple, also known as the Monkey Temple, is one of Varanasi''s most revered shrines dedicated to Goddess Durga. This 18th-century temple features striking red walls and is famous for its resident monkeys. The temple was rebuilt by Rani Bhavani of Bengal in 1760 AD and features Nagara-style architecture.', '/generated_images/durga_temple_varanasi.png', NULL, NULL, NULL, 'Varanasi', false),
('sankat-mochan-temple', 'Sankat Mochan Hanuman Temple', 'The reliever of troubles - Varanasi''s most beloved Hanuman shrine.', 'Nestled in the Lanka area on the bank of the Assi River, the Sankat Mochan Hanuman Temple is one of Varanasi''s most beloved shrines. Sankat Mochan means ''one who removes crises, troubles, and pain.'' The temple was founded by saint-poet Goswami Tulsidas in the 16th century where he had a vision of Lord Hanuman.', '/generated_images/sankat_mochan_hanuman_temple.png', NULL, NULL, NULL, 'Varanasi', false),
('kashi-vishwanath', 'Kashi Vishwanath Temple', 'The holiest of all Shiva temples, the spiritual heart of Varanasi.', 'The Kashi Vishwanath Temple is one of the most famous Hindu temples dedicated to Lord Shiva. It is located in Vishwanath Gali of Varanasi and is one of the twelve Jyotirlingas. The temple has been destroyed and re-constructed multiple times in history, with the current structure built in 1780 by Ahilyabai Holkar.', '/generated_images/kashi_vishwanath_temple.png', '/generated_images/kashi_vishwanath_temple_night_aarti.png', NULL, NULL, 'Varanasi', true),
('annapurna-temple', 'Annapurna Temple', 'Temple of the goddess of food and nourishment, adjacent to Kashi Vishwanath.', 'The Annapurna Mandir in Varanasi is located near Visheshwarganj and adjacent to the revered Kashi Vishwanath Temple. Goddess Annapurna is the deity of food and nourishment. The temple features beautiful architecture and is visited by thousands of devotees seeking blessings for prosperity and sustenance.', '/generated_images/annapurna_temple_varanasi.png', NULL, NULL, NULL, 'Varanasi', false),
('hanuman-garhi', 'Hanuman Garhi Temple', 'The fortress temple of Lord Hanuman overlooking Ayodhya.', 'Hanuman Garhi is a 10th-century temple dedicated to Lord Hanuman in Ayodhya. The temple is located on a hill and has 76 steps leading to it. It is believed that Hanuman lived here in a cave and guarded the city of Ayodhya. The temple offers panoramic views of the sacred city.', '/generated_images/hanuman_garhi_temple_ayodhya.png', NULL, NULL, NULL, 'Ayodhya', true),
('kanak-bhawan', 'Kanak Bhawan', 'The golden palace gifted to Sita by Queen Kaikeyi.', 'Kanak Bhawan is one of the most important temples in Ayodhya, also known as Sone-ka-Ghar (House of Gold). According to legend, Queen Kaikeyi gifted this palace to Sita after her marriage to Lord Rama. The temple houses beautiful golden idols of Lord Rama and Goddess Sita.', '/generated_images/kanak_bhawan_golden_palace.png', NULL, NULL, NULL, 'Ayodhya', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Blog Posts
INSERT INTO blog_posts (id, title, excerpt, content, category, published_date, read_time, main_image, image_2, image_3, image_4, featured) VALUES
('morning-aarti', 'Morning Aarti Through My Eyes', 'Experience the magic of dawn on the Ganges as ancient rituals come alive. Discover what makes this ceremony unforgettable.', 'There''s something profoundly moving about witnessing the morning aarti on the banks of the Ganges. As the first rays of sunlight paint the sky in hues of orange and pink, the ghats of Varanasi come alive with an ancient ritual that has been performed for thousands of years.

The ceremony begins with the ringing of bells and the chanting of mantras. Priests in traditional attire perform synchronized movements, offering fire, flowers, and incense to the river goddess. The air fills with the fragrance of camphor and sandalwood, while the rhythmic sound of conch shells echoes across the water.

What makes the morning aarti truly special is not just the ritual itself, but the devotion of the people who gather here. From elderly sadhus who have performed this ritual every day for decades to young children experiencing it for the first time, everyone is united in reverence.', 'Rituals', 'Oct 15, 2025', '5 min read', '/generated_images/Morning_meditation_Ganges_sunrise_001c3280.png', NULL, NULL, NULL, true),
('hidden-temples', 'Top 5 Hidden Temples in Varanasi', 'Beyond the famous shrines lie secret temples with incredible stories. Here are our favorite hidden spiritual gems.', 'While the Kashi Vishwanath Temple attracts millions of visitors, Varanasi is home to countless lesser-known temples, each with its own unique story and spiritual significance. Here are five hidden gems that offer a more intimate spiritual experience:

1. Tulsi Manas Temple - Built in 1964, this temple is dedicated to Lord Rama and features walls inscribed with verses from the Ramcharitmanas.

2. Nepali Temple - Also known as Kathwala Temple, this stunning shrine was built by the King of Nepal with unique wooden architecture.

3. Durga Temple - Known locally as the Monkey Temple, this 18th-century shrine is dedicated to Goddess Durga.

4. Sankat Mochan Hanuman Temple - Founded by saint Tulsidas, this temple is dedicated to Lord Hanuman.

5. Mrityunjay Mahadev Temple - An ancient Shiva temple located on Manikarnika Ghat.', 'Heritage', 'Oct 10, 2025', '7 min read', '/generated_images/Hidden_temple_courtyard_Varanasi_c1f0199e.png', NULL, NULL, NULL, true),
('ayodhya-guide', 'Ayodhya Spiritual Trail: What You Need to Know', 'Planning a pilgrimage to Ayodhya? Our comprehensive guide covers everything from temples to local customs.', 'Ayodhya, the birthplace of Lord Rama, has emerged as one of India''s most significant pilgrimage destinations.

Best Time to Visit: October to March when the weather is pleasant. Special occasions like Ram Navami offer unique cultural experiences.

Must-Visit Places:
- Ram Janmabhoomi Temple
- Hanuman Garhi
- Kanak Bhawan
- Saryu River Ghats

Local Customs:
- Dress modestly when visiting temples
- Remove shoes before entering temple premises
- Photography may be restricted in certain areas

Getting There: Ayodhya is well-connected by rail and road. The nearest airport is in Lucknow (about 140 km away).', 'Travel Tips', 'Oct 5, 2025', '10 min read', '/generated_images/Ayodhya_spiritual_trail_dusk_b641daa9.png', NULL, NULL, NULL, false)
ON CONFLICT (id) DO NOTHING;

-- Seed Packages
INSERT INTO packages (id, name, category, duration, destination, short_description, highlights, image_url, detailed_description, price, featured) VALUES
('1day-kashi', '1-Day Kashi Darshan', 'touristic', '1 Day', 'Varanasi', 'Experience the essence of Varanasi in a single day with our expertly curated tour through sacred ghats and ancient temples.', ARRAY['Sunrise boat ride on the Ganges', 'Visit to Kashi Vishwanath Temple', 'Explore hidden alleys of old Varanasi', 'Witness evening Ganga Aarti ceremony'], '/generated_images/Kashi_walking_tour_group_d0392eea.png', 'Immerse yourself in the spiritual essence of Varanasi with this comprehensive one-day journey through the ancient city of Kashi. Experience the magic of sunrise on the Ganges, visit the most sacred temples, explore the winding lanes of the old city, and witness the mesmerizing evening aarti ceremony.', 2500, true),
('2day-sarnath', '2-Day Kashi + Sarnath', 'touristic', '2 Days', 'Varanasi', 'Combine the spiritual energy of Varanasi with the peaceful Buddhist heritage of Sarnath on this immersive journey.', ARRAY['Complete Varanasi tour with boat ride', 'Explore Sarnath where Buddha gave first sermon', 'Visit Dhamek Stupa and museums', 'Morning meditation session by the Ganges'], '/generated_images/Sarnath_Buddhist_stupa_sunset_888b3275.png', 'Embark on a profound two-day spiritual expedition that connects the ancient traditions of Hinduism and Buddhism. This immersive experience combines the sacred ghats and temples of Varanasi with the historic Buddhist sites of Sarnath.', 6500, false),
('3day-ayodhya', '3-Day Ayodhya + Kashi Spiritual Trail', 'touristic', '3 Days', 'Ayodhya', 'A comprehensive spiritual journey connecting the sacred cities of Ayodhya and Varanasi with expert local guidance.', ARRAY['Ram Janmabhoomi and major Ayodhya temples', 'Hanuman Garhi and Kanak Bhawan', 'Complete Varanasi heritage experience', 'Sacred rituals participation opportunity'], '/generated_images/Ayodhya_Ram_Mandir_temple_baae3de1.png', 'Undertake a transformative three-day pilgrimage that weaves together two of India''s most sacred cities. Journey from the birthplace of Lord Rama in Ayodhya to the eternal city of Kashi.', 12500, true),
('ramlila', 'Ramnagar Ramlila Experience', 'popular_event', '1 Day', 'Varanasi', 'Witness the spectacular month-long Ramlila performances across Ramnagar with traditional staging and authentic cultural immersion.', ARRAY['UNESCO-recognized Ramlila spectacle', 'Traditional performances without modern lighting', 'Heritage locale experience', 'Expert guide narration of the epic'], '/generated_images/Kashi_walking_tour_group_d0392eea.png', 'Experience the majestic month-long open-air Ramlila across Ramnagar. This UNESCO-recognized spectacle brings the Ramcharitmanas to life with traditional performances.', 3500, true),
('dev-deepawali', 'Ganga Mahotsav & Dev Deepawali', 'popular_event', '3 Days', 'Varanasi', 'Experience vibrant cultural programs during Ganga Mahotsav and the luminous Dev Deepawali with millions of diyas.', ARRAY['Ganga Mahotsav cultural programs', 'Dev Deepawali diya illumination', 'Kartik Purnima full moon celebrations', 'Boat ride during festival of lights'], '/generated_images/Dev_Deepawali_festival_night_806cde54.png', 'From November 1 to 4, Ganga Mahotsav lights up the ghats with vibrant cultural programs. Right after, Dev Deepawali transforms the riverfront into a luminous wonderland with millions of diyas.', 8500, true),
('ganga-aarti', 'Ganga Aarti Ritual Experience', 'pooja', 'Half Day', 'Varanasi', 'Perform sacred rituals like Ganga Aarti, Rudrabhishek, or special temple offerings with expert priest guidance.', ARRAY['Personal Ganga Aarti ceremony', 'Priest-guided ritual performance', 'Sacred offering at Dashashwamedh Ghat', 'Blessing and prasad distribution'], '/generated_images/Evening_aarti_ceremony_Varanasi_fdd358a3.png', 'Experience the profound spiritual significance of Ganga Aarti with a personalized ceremony. Our expert priests will guide you through the sacred rituals.', 1500, true),
('temple-pooja', 'Temple Pooja Package', 'pooja', '1 Day', 'Varanasi', 'Complete temple ritual package including Kashi Vishwanath Darshan and special offerings at major sacred sites.', ARRAY['Kashi Vishwanath special darshan', 'Rudrabhishek ceremony', 'Sankat Mochan Hanuman Temple pooja', 'Multiple temple offerings with priests'], '/generated_images/kashi_vishwanath_temple.png', 'A comprehensive spiritual package designed for devotees seeking blessings from the most sacred temples of Varanasi.', 5000, true)
ON CONFLICT (id) DO NOTHING;

-- Seed Panchang Events
INSERT INTO panchang_events (id, date, name, description, type, significance) VALUES
('kartik-purnima', '2025-11-15', 'Kartik Purnima', 'Full moon day in Kartik month. Highly auspicious for holy dip in Ganges. Dev Deepawali is celebrated on this day at Varanasi ghats with millions of diyas.', 'Purnima', 'Best time for Ganga Snan and spiritual ceremonies. Special rituals at all ghats.'),
('kartik-amavasya', '2025-11-30', 'Kartik Amavasya', 'New moon day in Kartik month. Important day for Pitru Tarpan and ancestral worship.', 'Amavasya', 'Ideal for Pitru Tarpan ceremonies and seeking blessings for ancestors.'),
('margashirsha-purnima', '2025-12-14', 'Margashirsha Purnima', 'Full moon in the auspicious month of Margashirsha. Lord Krishna considers this month most dear.', 'Purnima', 'Sacred bathing and Satyanarayan Puja are highly recommended.'),
('gita-jayanti', '2025-12-25', 'Gita Jayanti', 'Anniversary of Bhagavad Gita when Lord Krishna delivered the sacred teachings to Arjuna on the battlefield of Kurukshetra.', 'Festival', 'Special Gita path recitations at temples. Join guided spiritual discussions.'),
('makar-sankranti', '2026-01-14', 'Makar Sankranti', 'Sun enters Capricorn zodiac. Major festival marking the end of winter solstice. Holy dip at Triveni Sangam is especially auspicious.', 'Festival', 'Millions gather at Prayagraj for sacred bath. Kite flying celebrations across North India.'),
('paush-purnima', '2026-01-13', 'Paush Purnima', 'Full moon in Paush month. Beginning of Magh Mela at Prayagraj.', 'Purnima', 'Start of month-long Magh Mela. Excellent for pilgrimage to Prayagraj.'),
('mauni-amavasya', '2026-01-29', 'Mauni Amavasya', 'Most sacred Amavasya when devotees observe silence (maun). Royal bath day during Magh Mela.', 'Amavasya', 'Extremely auspicious for holy bath and spiritual practices.'),
('basant-panchami', '2026-02-02', 'Basant Panchami', 'Festival celebrating Goddess Saraswati and the arrival of spring. Yellow is the traditional color of the day.', 'Festival', 'Worship Goddess Saraswati for knowledge and wisdom. Auspicious for starting new ventures.'),
('maha-shivaratri', '2026-02-26', 'Maha Shivaratri', 'The great night of Lord Shiva. One of the most important festivals for Shiva devotees.', 'Festival', 'Night-long vigil at Shiva temples. Special abhishek and pujas at Kashi Vishwanath.'),
('holi', '2026-03-14', 'Holi', 'Festival of colors celebrating the victory of good over evil and the arrival of spring.', 'Festival', 'Holika Dahan on the eve, followed by color play celebrations across the city.')
ON CONFLICT (id) DO NOTHING;

-- Seed Video Testimonials
INSERT INTO video_testimonials (id, platform, video_url, embed_code, caption, author, featured) VALUES
('testimonial-1', 'instagram', 'https://www.instagram.com/gangaguide/p/DPiuY01E1EE/', '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/DPiuY01E1EE/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/DPiuY01E1EE/">View this post on Instagram</a></blockquote><script async src="//www.instagram.com/embed.js"></script>', 'Amazing experience with GangaGuides! The sunrise boat ride was magical.', 'Travel Explorer', true),
('testimonial-2', 'instagram', 'https://www.instagram.com/gangaguide/reel/example2/', '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/example2/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/example2/">View this post on Instagram</a></blockquote>', 'Spiritual journey of a lifetime! The guides were incredibly knowledgeable about every temple.', 'Spiritual Seeker', true),
('testimonial-3', 'instagram', 'https://www.instagram.com/gangaguide/reel/example3/', '<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/example3/" data-instgrm-version="14"><a href="https://www.instagram.com/reel/example3/">View this post on Instagram</a></blockquote>', 'The evening Ganga Aarti was beyond words. Thank you GangaGuides!', 'Devotee from Mumbai', true)
ON CONFLICT (id) DO NOTHING;

-- Verify data was inserted
SELECT 'Destinations' as table_name, COUNT(*) as count FROM destinations
UNION ALL
SELECT 'Blog Posts', COUNT(*) FROM blog_posts
UNION ALL
SELECT 'Packages', COUNT(*) FROM packages
UNION ALL
SELECT 'Panchang Events', COUNT(*) FROM panchang_events
UNION ALL
SELECT 'Video Testimonials', COUNT(*) FROM video_testimonials;
