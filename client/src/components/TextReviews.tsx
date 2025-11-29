import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { SiGoogle, SiTripadvisor } from "react-icons/si";

interface TextReview {
  id: number;
  name: string;
  platform: "google" | "tripadvisor" | "google_maps";
  text: string;
  rating: number;
  date: string;
}

interface TextReviewsProps {
  reviews: TextReview[];
}

export default function TextReviews({ reviews }: TextReviewsProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const timer = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setFeaturedIndex((prev) => (prev + 1) % reviews.length);
        setFadeState('in');
      }, 500);
    }, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "google":
      case "google_maps":
        return <SiGoogle className="w-3.5 h-3.5 text-[#4285F4]" />;
      case "tripadvisor":
        return <SiTripadvisor className="w-3.5 h-3.5 text-[#00AF87]" />;
      default:
        return null;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case "google":
        return "Google Reviews";
      case "google_maps":
        return "Google Maps";
      case "tripadvisor":
        return "TripAdvisor";
      default:
        return platform;
    }
  };

  const featuredReview = reviews[featuredIndex];
  const otherReviews = reviews.filter((_, index) => index !== featuredIndex);

  return (
    <div className="space-y-8" data-testid="text-reviews">
      {/* Featured Review - Premium Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={featuredIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          data-testid="featured-review"
        >
          <Card className="border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg overflow-hidden">
            <CardContent className="p-6 md:p-8 relative">
              {/* Animated background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 pointer-events-none"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="flex flex-col gap-4 relative z-10">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <Badge variant="outline" className="gap-2 bg-primary/10 border-primary/30">
                    {getPlatformIcon(featuredReview.platform)}
                    <span className="text-xs">{getPlatformName(featuredReview.platform)}</span>
                  </Badge>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            i < featuredReview.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted stroke-muted-foreground"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.blockquote
                  className="text-base md:text-lg font-medium text-foreground leading-relaxed italic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  "{featuredReview.text}"
                </motion.blockquote>

                <motion.div
                  className="flex items-center justify-between pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {featuredReview.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {featuredReview.date}
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Grid of Other Reviews - Staggered Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {otherReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -8 }}
              data-testid={`review-card-${review.id}`}
            >
              <Card className="hover-elevate transition-all duration-300 group cursor-pointer border border-card-border bg-gradient-to-br from-card to-primary/3 h-full">
                <CardContent className="p-4">
                  <motion.div
                    className="flex items-center gap-2 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <Badge variant="outline" className="gap-1.5 bg-primary/10 border-primary/20">
                      {getPlatformIcon(review.platform)}
                      <span className="text-xs">{getPlatformName(review.platform)}</span>
                    </Badge>
                  </motion.div>

                  <motion.div
                    className="flex gap-0.5 mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: i < review.rating ? [0, 10, 0] : 0,
                        }}
                        transition={{
                          delay: 0.2 + i * 0.08,
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                        }}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted stroke-muted-foreground"
                          }`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.p
                    className="text-sm text-foreground/90 line-clamp-3 mb-3 leading-relaxed"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    "{review.text}"
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                  >
                    <p className="font-semibold text-sm text-foreground">
                      {review.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Progress Indicators - Enhanced Animation */}
      <motion.div
        className="flex justify-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        {reviews.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setFadeState('out');
              setTimeout(() => {
                setFeaturedIndex(index);
                setFadeState('in');
              }, 300);
            }}
            className={`rounded-full transition-all duration-300 ${
              index === featuredIndex
                ? "bg-gradient-to-r from-primary to-primary/80"
                : "bg-gradient-to-r from-muted to-muted/70 hover:from-primary/40 hover:to-primary/30"
            }`}
            animate={{
              width: index === featuredIndex ? 24 : 8,
              height: 8,
              boxShadow: index === featuredIndex
                ? "0 0 12px rgba(var(--primary), 0.4)"
                : "none",
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Go to review ${index + 1}`}
            data-testid={`dot-review-${index}`}
          />
        ))}
      </motion.div>
    </div>
  );
}
