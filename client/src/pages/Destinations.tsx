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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

export default function Destinations() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("all");

  const { data: apiDestinations, isLoading } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  const destinations = apiDestinations || [];

  // Filter by region and search
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter(dest => 
        regionFilter === "all" || dest.region === regionFilter
      )
      .filter(dest => 
        searchQuery === "" || 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [destinations, searchQuery, regionFilter]);

  // Separate destinations by city for display
  const varanasi = useMemo(() => {
    return filteredDestinations.filter(dest => dest.region === "Varanasi");
  }, [filteredDestinations]);

  const ayodhya = useMemo(() => {
    return filteredDestinations.filter(dest => dest.region === "Ayodhya");
  }, [filteredDestinations]);

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
                Explore temples and sacred sites in Varanasi and Ayodhya through our curated guides
              </p>
            </div>
          </FadeInSection>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search destinations by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2"
                data-testid="input-search-destinations"
              />
            </div>

            {/* Region Filters */}
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by Region:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge
                  className={`cursor-pointer ${regionFilter === "all" ? "bg-primary" : "bg-muted hover-elevate"}`}
                  onClick={() => setRegionFilter("all")}
                  data-testid="filter-region-all"
                >
                  All Destinations
                </Badge>
                <Badge
                  className={`cursor-pointer ${regionFilter === "Varanasi" ? "bg-primary" : "bg-muted hover-elevate"}`}
                  onClick={() => setRegionFilter("Varanasi")}
                  data-testid="filter-region-varanasi"
                >
                  Varanasi
                </Badge>
                <Badge
                  className={`cursor-pointer ${regionFilter === "Ayodhya" ? "bg-primary" : "bg-muted hover-elevate"}`}
                  onClick={() => setRegionFilter("Ayodhya")}
                  data-testid="filter-region-ayodhya"
                >
                  Ayodhya
                </Badge>
              </div>
            </div>
          </div>

          {/* Varanasi Destinations Section */}
          <div className="mb-20">
            <FadeInSection>
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  Varanasi
                </h2>
                <p className="text-muted-foreground">
                  Explore the sacred temples and spiritual sites of Varanasi along the holy Ganges
                </p>
              </div>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {varanasi.map((destination, index) => (
                <FadeInSection key={destination.id} delay={index * 0.1}>
                  <DestinationGuideCard
                    name={destination.name}
                    shortDescription={destination.shortDescription}
                    imageUrl={destination.mainImage}
                    onClick={() => setLocation(`/destination/${destination.id}`)}
                    data-testid={`card-destination-${destination.id}`}
                  />
                </FadeInSection>
              ))}
            </div>
            {varanasi.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No destinations found in Varanasi</p>
              </div>
            )}
          </div>

          {/* Ayodhya Destinations Section */}
          <div className="mb-20">
            <FadeInSection>
              <div className="mb-8">
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  Ayodhya
                </h2>
                <p className="text-muted-foreground">
                  Discover the sacred temples and pilgrimage sites connected to Lord Rama in Ayodhya
                </p>
              </div>
            </FadeInSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ayodhya.map((destination, index) => (
                <FadeInSection key={destination.id} delay={index * 0.1}>
                  <DestinationGuideCard
                    name={destination.name}
                    shortDescription={destination.shortDescription}
                    imageUrl={destination.mainImage}
                    onClick={() => setLocation(`/destination/${destination.id}`)}
                    data-testid={`card-destination-${destination.id}`}
                  />
                </FadeInSection>
              ))}
            </div>
            {ayodhya.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No destinations found in Ayodhya</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer onBookNowClick={() => setLocation("/booking")} />
      <BottomNav onBookNowClick={() => setLocation("/booking")} />
      <WhatsAppFloat />
    </div>
  );
}
