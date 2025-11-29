import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Destination } from "@shared/schema";
import DestinationGuideCard from "@/components/DestinationGuideCard";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInSection from "@/components/FadeInSection";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";

export default function Destinations() {
  const [, setLocation] = useLocation();
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: apiDestinations, isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const destinations = apiDestinations || [];

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchesRegion = regionFilter === "all" || dest.region === regionFilter;
      const matchesSearch = searchQuery === "" || 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [destinations, regionFilter, searchQuery]);

  const regions = Array.from(new Set(destinations.map(dest => dest.region).filter(Boolean)));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading destinations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/booking")} />
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Discover Sacred Destinations
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Explore Varanasi, Sarnath, Ayodhya, and other spiritual gems through our curated guides
              </p>
            </div>
          </FadeInSection>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2"
                data-testid="input-search-destinations"
              />
            </div>
          </div>

          {/* Filter Section */}
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Region:</span>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge
                className={`cursor-pointer ${regionFilter === "all" ? "bg-primary" : "bg-muted hover-elevate"}`}
                onClick={() => setRegionFilter("all")}
                data-testid="filter-region-all"
              >
                All Regions
              </Badge>
              {regions.map(region => {
                if (!region) return null;
                // Extract city name from region for better display
                const cityName = region === "Uttar Pradesh" ? "Varanasi/Ayodhya" : region;
                return (
                  <Badge
                    key={region}
                    className={`cursor-pointer ${regionFilter === region ? "bg-primary" : "bg-muted hover-elevate"}`}
                    onClick={() => setRegionFilter(region)}
                    data-testid={`filter-region-${region.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {cityName}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDestinations.map((destination, index) => (
              <FadeInSection key={destination.id} delay={index * 0.1}>
                <DestinationGuideCard
                  name={destination.name}
                  shortDescription={destination.shortDescription}
                  imageUrl={destination.mainImage}
                  onClick={() => setLocation(`/destination/${destination.id}`)}
                />
              </FadeInSection>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                No destinations found in this region.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
