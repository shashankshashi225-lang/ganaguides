import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LazyImage from "@/components/LazyImage";
import type { Package } from "@shared/schema";

interface FeaturedPackagesCarouselProps {
  packages: Package[];
  onViewDetails?: (pkgId: string | number) => void;
  onEnquireNow?: (packageName: string) => void;
  onBookNow?: (packageName: string) => void;
}

export default function FeaturedPackagesCarousel({
  packages,
  onViewDetails,
  onEnquireNow,
  onBookNow,
}: FeaturedPackagesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!packages || packages.length === 0) {
    return null;
  }

  // Create infinite loop by duplicating packages
  const infinitePackages = [...packages, ...packages, ...packages];
  const cardWidth = 320 + 24; // 320px card + 24px gap

  // Auto-scroll every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current && !isDragging) {
        const container = scrollContainerRef.current;
        let newScrollLeft = container.scrollLeft + cardWidth;
        
        // Reset to beginning when reaching the end of first duplicate set
        if (newScrollLeft >= cardWidth * packages.length * 2) {
          newScrollLeft = cardWidth * packages.length;
        }
        
        container.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [packages.length, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const toggleFlip = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Infinite Auto-Scrolling Carousel Container */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-4 cursor-grab active:cursor-grabbing"
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {/* Hide scrollbar */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {infinitePackages.map((pkg, index) => {
            const pkgId = 'id' in pkg && typeof pkg.id === 'string' 
              ? pkg.id 
              : ('id' in pkg ? pkg.id : index);
            const isFlipped = flipped[index] || false;

            return (
              <div
                key={index}
                className="flex-shrink-0 w-80"
                data-testid={`card-featured-package-${index}`}
              >
                <div
                  className="w-full relative"
                  style={{
                    height: "auto",
                    transformStyle: "preserve-3d",
                    perspective: "1200px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => toggleFlip(index, e)}
                >
                  {/* Flip Wrapper */}
                  <div
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                      transition: "transform 600ms ease-in-out",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {/* Front of Card */}
                    <div
                      style={{ 
                        backfaceVisibility: "hidden",
                        width: "100%",
                      }}
                    >
                      <style>{`
                        @keyframes cardGlow {
                          0%, 100% {
                            box-shadow: 0 20px 40px rgba(255, 107, 53, 0.15), 0 0 20px rgba(255, 107, 53, 0.1);
                          }
                          50% {
                            box-shadow: 0 20px 50px rgba(255, 107, 53, 0.3), 0 0 30px rgba(255, 107, 53, 0.25);
                          }
                        }
                        
                        .carousel-glow {
                          animation: cardGlow 3s ease-in-out infinite;
                        }
                      `}</style>
                      <Card className="overflow-hidden border-2 border-card-border shadow-2xl flex flex-col bg-background hover:shadow-3xl transition-shadow carousel-glow">
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <LazyImage
                            src={pkg.imageUrl}
                            alt={pkg.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            skeletonClassName="w-full h-full bg-muted animate-pulse"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg">
                            <Clock className="w-3 h-3 mr-1" />
                            {pkg.duration}
                          </Badge>
                        </div>

                        <div className="p-5 flex flex-col gap-3">
                          <h3 
                            className="font-display text-lg font-bold text-foreground line-clamp-2"
                            data-testid="text-featured-package-name"
                          >
                            {pkg.name}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
                            {pkg.shortDescription}
                          </p>

                          <div className="flex flex-col gap-2 pt-2">
                            <Button
                              className="w-full bg-primary text-primary-foreground font-semibold text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onBookNow?.(pkg.name);
                              }}
                              data-testid="button-featured-book-now"
                            >
                              Book Now
                            </Button>
                            <Button
                              variant="outline"
                              className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-semibold gap-2 text-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEnquireNow?.(pkg.name);
                              }}
                              data-testid="button-featured-whatsapp"
                            >
                              <FaWhatsapp className="w-4 h-4" />
                              WhatsApp
                            </Button>
                            <p className="text-center text-xs text-muted-foreground">
                              Click to flip →
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Back of Card (Flipped) */}
                    <div
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Card className="overflow-hidden border-2 border-primary/50 shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex flex-col p-5 cursor-pointer carousel-glow">
                        <div className="flex items-start justify-between mb-3 flex-shrink-0 gap-2">
                          <h3 className="font-display text-lg font-bold text-primary line-clamp-2">
                            {pkg.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {pkg.duration}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                            <span className="font-semibold text-foreground">Highlights:</span>
                          </div>
                          <ul className="space-y-1.5">
                            {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                                <span className="text-xs text-foreground/90 leading-snug">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col gap-2 pt-3 border-t border-border flex-shrink-0 mt-auto">
                          <Button
                            className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white font-semibold text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFlip(index, e);
                              onViewDetails?.(pkgId);
                            }}
                            data-testid="button-featured-view-details"
                          >
                            View Details
                          </Button>
                          
                          <Button
                            className="w-full bg-primary text-primary-foreground font-semibold text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookNow?.(pkg.name);
                            }}
                            data-testid="button-featured-back-book-now"
                          >
                            Book Now
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-semibold gap-2 text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEnquireNow?.(pkg.name);
                            }}
                            data-testid="button-featured-back-whatsapp"
                          >
                            <FaWhatsapp className="w-3 h-3" />
                            WhatsApp
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
