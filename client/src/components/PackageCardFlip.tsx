import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LazyImage from "@/components/LazyImage";

interface PackageCardFlipProps {
  id: number | string;
  name: string;
  duration: string;
  shortDescription: string;
  highlights: string[];
  imageUrl: string;
  onViewDetails?: () => void;
  onEnquireNow?: () => void;
  onBookNow?: () => void;
}

export default function PackageCardFlip({
  name,
  duration,
  shortDescription,
  highlights,
  imageUrl,
  onViewDetails,
  onEnquireNow,
  onBookNow,
}: PackageCardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="min-h-[420px] sm:min-h-[450px] md:min-h-[480px] h-full"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      data-testid={`card-package-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div
        className="relative w-full h-full min-h-[420px] sm:min-h-[450px] md:min-h-[480px] transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of card */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute w-full h-full"
        >
          <Card className="overflow-hidden border-2 border-card-border shadow-lg hover:shadow-2xl transition-shadow flex flex-col">
            <div className="relative flex flex-col">
              <div className="relative h-56 overflow-hidden flex-shrink-0">
                <LazyImage
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  skeletonClassName="w-full h-full bg-muted animate-pulse absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground shadow-lg">
                  <Clock className="w-3 h-3 mr-1" />
                  {duration}
                </Badge>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl font-bold text-white mb-2 drop-shadow-lg" data-testid="text-package-name">
                    {name}
                  </h3>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-2 bg-gradient-to-br from-card to-card/80 flex-grow min-w-0">
                <p className="text-muted-foreground leading-relaxed mb-1 text-xs sm:text-base line-clamp-3">
                  {shortDescription}
                </p>
                
                <div className="flex flex-col gap-1.5 w-full mt-auto">
                  <Button
                    className="w-full bg-primary text-primary-foreground font-semibold text-xs sm:text-base py-2 sm:py-2 h-auto"
                    onClick={onBookNow}
                    data-testid="button-book-now"
                  >
                    Book Now
                  </Button>
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 font-semibold text-xs sm:text-base py-2 sm:py-2 h-auto gap-1 sm:gap-2"
                      onClick={onEnquireNow}
                      data-testid="button-whatsapp-enquire"
                    >
                      <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="hidden sm:inline">Enquire</span>
                      <span className="sm:hidden">WhatsApp</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Back of card */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute w-full h-full"
        >
          <Card className="overflow-hidden border-2 border-primary/50 shadow-2xl bg-gradient-to-br from-primary/5 to-secondary/10 flex flex-col">
            <div className="flex flex-col p-5">
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <h3 className="font-display text-xl font-bold text-primary">{name}</h3>
                <Badge variant="secondary" className="shadow-md text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {duration}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-3 flex-grow overflow-y-auto">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">Tour Highlights:</span>
                </div>
                <ul className="space-y-2">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 group/item">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                      <span className="text-sm text-foreground/90 leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-1.5 mt-4 pt-4 border-t border-border min-w-0 flex-shrink-0">
                <Button
                  className="w-full bg-[#FF6B35] hover:bg-[#FF5722] text-white font-semibold shadow-lg text-sm h-auto py-2"
                  onClick={onViewDetails}
                  data-testid="button-view-details"
                >
                  View Full Details
                </Button>
                <div className="flex gap-2 w-full">
                  <Button
                    className="flex-1 bg-[#D4EDDA] hover:bg-[#C3E6CB] text-[#155724] border border-[#C3E6CB] font-semibold text-sm py-2 h-auto gap-2"
                    onClick={onEnquireNow}
                    data-testid="button-enquire-whatsapp"
                  >
                    <FaWhatsapp className="w-4 h-4 flex-shrink-0" />
                    Enquire
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm h-auto py-2"
                    onClick={onBookNow}
                    data-testid="button-book-now"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
