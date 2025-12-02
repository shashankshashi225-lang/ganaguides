import { useLocation } from "wouter";
import { MapPin, Flame, Ship, Building2, Waves, PersonStanding, Building, Castle, Sparkles, Anchor } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";

export default function PackagesLanding() {
  const [, setLocation] = useLocation();

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const categories = [
    {
      id: "popular-events",
      title: "Popular Events",
      description: "Experience festivals like Dev Diwali, Holi, Dussehra, and Navratri in their spiritual glory",
      icon: Flame,
      route: "/packages/popular-events"
    },
    {
      id: "tourist",
      title: "Tourist Packages",
      description: "Explore the spiritual and cultural routes of Varanasi and nearby destinations",
      icon: MapPin,
      route: "/packages/tourist"
    },
    {
      id: "pooja",
      title: "Pooja Packages",
      description: "Perform sacred rituals like Ganga Aarti, Rudrabhishek, or special temple offerings",
      icon: Flame,
      route: "/packages/pooja"
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/booking")} />
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto w-full">
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Ganga Guides
              </h1>
              <p className="text-muted-foreground text-lg">
                Choose your spiritual journey
              </p>
            </div>
          </FadeInSection>

          {/* Activities Section */}
          <FadeInSection delay={0.1}>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-12 border-2 border-primary/20">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Activities in Varanasi, Ayodhya & Ujjain</h2>
              <p className="text-muted-foreground mb-8">Experience the soul of Kashi through sacred rituals, cultural walks, and river adventures.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-primary/20">
                  <h3 className="font-bold text-lg mb-4 text-primary">Varanasi</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><Ship className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Boat Ride / Cruise Ride</strong> - Sail on the Ganga at sunrise or during evening with amazing views of ghats and temples.</span></li>
                    <li className="flex gap-2"><Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Temple Visits</strong> - Visit Kashi Vishwanath and other sacred temples with intricate architecture.</span></li>
                    <li className="flex gap-2"><Waves className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Ganga Snan</strong> - Take a holy dip in the sacred river at the ghats.</span></li>
                    <li className="flex gap-2"><PersonStanding className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Ghat Walk</strong> - Walk across the ghats, each with its own legends and histories.</span></li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-primary/20">
                  <h3 className="font-bold text-lg mb-4 text-primary">Ayodhya</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><Building className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Ram Mandir Visit</strong> - Seek blessings at the grand Ram Mandir, a symbol of cultural pride.</span></li>
                    <li className="flex gap-2"><Waves className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Saryu Aarti</strong> - Witness the beautiful evening aarti on the Saryu River.</span></li>
                    <li className="flex gap-2"><Castle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Ram Ki Paidi Walk</strong> - Enjoy peaceful walks along the beautifully lit walkways.</span></li>
                    <li className="flex gap-2"><Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Ram Leela Experience</strong> - Witness grand reenactments of the Ramayana.</span></li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-primary/20">
                  <h3 className="font-bold text-lg mb-4 text-primary">Ujjain</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><Anchor className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Shipra Snan</strong> - Immerse in the holy Shipra River, believed to purify the soul.</span></li>
                    <li className="flex gap-2"><PersonStanding className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Ghat Walk</strong> - Walk along Ram Ghat and witness the serene Aarti by the river.</span></li>
                    <li className="flex gap-2"><Building2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" /> <span><strong>Temple Visits</strong> - Visit Mahakaleshwar Jyotirlinga and other sacred temples.</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeInSection>

          <div className="space-y-6 max-w-4xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <FadeInSection key={category.id} delay={index * 0.1}>
                  <Card
                    className="group cursor-pointer hover-elevate active-elevate-2 transition-all border-2 border-card-border hover:border-primary/30"
                    onClick={() => setLocation(category.route)}
                    data-testid={`card-category-${category.id}`}
                  >
                    <CardContent className="p-8 flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </FadeInSection>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
