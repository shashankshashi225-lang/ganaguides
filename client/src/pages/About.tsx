import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";

export default function About() {
  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => scrollToSection("contact")} />
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Meet GangaGuides
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
                Local insight, authentic experiences, and a passion for sharing the soul of Kashi
              </p>
            </div>
          </FadeInSection>
          
          <div className="max-w-4xl mx-auto mb-16">
            <FadeInSection>
              <p className="text-center text-lg leading-relaxed text-foreground/90 mb-8">
                GangaGuides was born to connect travelers with the living heritage of Varanasi and nearby sacred cities. 
                Our guides are locals who have walked these streets, participated in rituals, and understand the stories 
                behind every temple, ghat, and festival. We believe in small groups, authentic experiences, and creating 
                memories that stay with you forever.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="bg-accent/30 rounded-lg p-8 mb-8">
                <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-foreground/90 leading-relaxed">
                  To preserve and share the authentic spiritual and cultural heritage of Kashi through meaningful, 
                  personalized experiences that connect travelers with the soul of this ancient city.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="bg-accent/30 rounded-lg p-8">
                <h2 className="font-display text-2xl font-bold mb-4">What Sets Us Apart</h2>
                <ul className="space-y-3 text-foreground/90">
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Local guides born and raised in Varanasi</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Small group tours for personalized attention</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Access to hidden gems and authentic experiences</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Deep understanding of rituals and traditions</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Flexible itineraries tailored to your interests</span>
                  </li>
                </ul>
              </div>
            </FadeInSection>
          </div>

          <div className="mt-16 md:mt-24">
            <FadeInSection>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4">Our Special Services</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Welcome to Ganga Guides, your trusted partner for unforgettable spiritual, cultural, and adventure experiences along the Gange. Whether you're seeking inner peace, cultural exploration, or thrilling adventures, our tailored services ensure a unique and meaningful journey.
              </p>
            </FadeInSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeInSection delay={0.1}>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-lg p-6 border-2 border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center flex-shrink-0 text-lg">🏛️</div>
                    <h3 className="font-display text-xl font-bold">Temple Tours</h3>
                  </div>
                  <p className="text-foreground/80">Discover the Sacred Temples along the Gange. Immerse yourself in ancient spirituality with expert guides who will walk you through the sacred temples along the Ganga. Learn about the historical significance and the spiritual practices that make temples extraordinary.</p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.2}>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-6 border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center flex-shrink-0 text-lg">🪔</div>
                    <h3 className="font-display text-xl font-bold">Ganga Aarti Experience</h3>
                  </div>
                  <p className="text-foreground/80">Witness the Divine Aarti of the Gange. Experience the mesmerizing Ganga Aarti ceremony at sunset with us, where the holy river is honored in a divine ceremony. Our expert guides will explain the rituals and significance, making your experience more meaningful.</p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.3}>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg p-6 border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 text-lg">🧘</div>
                    <h3 className="font-display text-xl font-bold">Spiritual Retreats</h3>
                  </div>
                  <p className="text-foreground/80">Rejuvenate Spirit with Retreat by the Gange. Seek peace for an immersive spiritual retreat by the Ganges. Engage in meditation, yoga, and spiritual teachings with the calming sounds of the river surrounding you.</p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.4}>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 rounded-lg p-6 border-2 border-pink-200 dark:border-pink-800">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0 text-lg">🏞️</div>
                    <h3 className="font-display text-xl font-bold">Adventure Activities</h3>
                  </div>
                  <p className="text-foreground/80">Explore the Thrills of the Gange. For those seeking excitement, we offer a range of adventure activities, including white-water rafting, trekking, and more. Explore the breathtaking landscapes along the Ganga with the support of expert guides.</p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.5}>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg p-6 border-2 border-orange-200 dark:border-orange-800">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 text-lg">🏛️</div>
                    <h3 className="font-display text-xl font-bold">Cultural Heritage Walks</h3>
                  </div>
                  <p className="text-foreground/80">Walk Through the Rich Culture of the Gange. Take a step back in time and explore the rich history and culture of the Gange region. Our heritage walks are led by knowledgeable guides.</p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.6}>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-lg">🕉️</div>
                    <h3 className="font-display text-xl font-bold">Personalized Spiritual Guidance</h3>
                  </div>
                  <p className="text-foreground/80">Connect with Local Spiritual Leaders. Gain deeper spiritual insight through one-on-one consultations with local spiritual leaders. Whether it's a private ritual or spiritual guidance, we offer personalized sessions to help you connect with the divine.</p>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
