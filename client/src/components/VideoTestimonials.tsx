import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiInstagram, SiYoutube } from "react-icons/si";
import type { VideoTestimonial } from "@shared/schema";

interface LegacyTestimonial {
  id: number;
  platform: "instagram" | "youtube";
  url: string;
  embedUrl: string;
  caption: string;
  author: string;
}

interface VideoTestimonialsProps {
  testimonials?: LegacyTestimonial[];
}

export default function VideoTestimonials({ testimonials: propTestimonials }: VideoTestimonialsProps) {
  const [loadedVideos, setLoadedVideos] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: apiTestimonials } = useQuery<VideoTestimonial[]>({
    queryKey: ['/api/video-testimonials'],
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
  }, [apiTestimonials, propTestimonials]);

  const handleVideoLoad = (id: string) => {
    if (!loadedVideos.includes(id)) {
      setLoadedVideos([...loadedVideos, id]);
    }
  };

  const renderApiTestimonial = (testimonial: VideoTestimonial, index: number) => {
    const id = testimonial.id;
    const isLoaded = loadedVideos.includes(id);
    const platform = testimonial.platform as "instagram" | "youtube";

    return (
      <Card 
        key={id}
        className={`overflow-hidden hover-elevate transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ animationDelay: `${index * 150}ms`, opacity: 1, transform: 'translateY(0)' }}
        data-testid={`video-card-${id}`}
      >
        <div className="relative aspect-[9/16] md:aspect-video bg-muted overflow-hidden">
          {platform === "instagram" && testimonial.embedCode ? (
            <div 
              className="w-full h-full flex items-center justify-center instagram-embed-container"
              dangerouslySetInnerHTML={{ __html: testimonial.embedCode }}
            />
          ) : platform === "instagram" ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
              <a 
                href={testimonial.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-white hover:scale-105 transition-transform"
              >
                <SiInstagram className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium">View on Instagram</span>
              </a>
            </div>
          ) : (
            <iframe
              src={testimonial.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Video testimonial from ${testimonial.author || 'Guest'}`}
              loading="lazy"
              onLoad={() => handleVideoLoad(id)}
            />
          )}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-background/90 backdrop-blur-sm border border-border">
              {platform === "instagram" ? (
                <SiInstagram className="w-4 h-4 mr-1 text-[#E4405F]" />
              ) : (
                <SiYoutube className="w-4 h-4 mr-1 text-[#FF0000]" />
              )}
              <span className="capitalize">{platform}</span>
            </Badge>
          </div>
        </div>
        {(testimonial.caption || testimonial.author) && (
          <div className="p-4 bg-card">
            {testimonial.caption && (
              <p className="text-sm text-foreground/90 line-clamp-2 mb-2">
                {testimonial.caption}
              </p>
            )}
            {testimonial.author && (
              <p className="text-xs text-muted-foreground font-medium">
                - {testimonial.author}
              </p>
            )}
          </div>
        )}
      </Card>
    );
  };

  const renderLegacyTestimonial = (testimonial: LegacyTestimonial, index: number) => {
    const id = String(testimonial.id);
    const isLoaded = loadedVideos.includes(id);

    return (
      <Card 
        key={id}
        className={`overflow-hidden hover-elevate transition-all duration-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        style={{ animationDelay: `${index * 150}ms`, opacity: 1, transform: 'translateY(0)' }}
        data-testid={`video-card-${id}`}
      >
        <div className="relative aspect-[9/16] md:aspect-video bg-muted overflow-hidden">
          {testimonial.platform === "instagram" ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
              <a 
                href={testimonial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center text-white hover:scale-105 transition-transform"
              >
                <SiInstagram className="w-12 h-12 mb-2" />
                <span className="text-sm font-medium">View on Instagram</span>
              </a>
            </div>
          ) : (
            <iframe
              src={testimonial.embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={`Video testimonial from ${testimonial.author}`}
              loading="lazy"
              onLoad={() => handleVideoLoad(id)}
            />
          )}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-background/90 backdrop-blur-sm border border-border">
              {testimonial.platform === "instagram" ? (
                <SiInstagram className="w-4 h-4 mr-1 text-[#E4405F]" />
              ) : (
                <SiYoutube className="w-4 h-4 mr-1 text-[#FF0000]" />
              )}
              <span className="capitalize">{testimonial.platform}</span>
            </Badge>
          </div>
        </div>
        <div className="p-4 bg-card">
          <p className="text-sm text-foreground/90 line-clamp-2 mb-2">
            {testimonial.caption}
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            - {testimonial.author}
          </p>
        </div>
      </Card>
    );
  };

  const hasApiTestimonials = apiTestimonials && apiTestimonials.length > 0;
  const testimonialsToRender = hasApiTestimonials ? apiTestimonials : propTestimonials;

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
      data-testid="video-testimonials"
    >
      {hasApiTestimonials 
        ? apiTestimonials.map((t, i) => renderApiTestimonial(t, i))
        : propTestimonials?.map((t, i) => renderLegacyTestimonial(t, i))
      }
    </div>
  );
}
