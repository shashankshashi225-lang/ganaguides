import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import LazyImage from "@/components/LazyImage";

interface BlogCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  publishedDate: string;
  readTime: string;
  onClick?: () => void;
}

export default function BlogCard({
  title,
  excerpt,
  imageUrl,
  category,
  publishedDate,
  readTime,
  onClick,
}: BlogCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 transition-all group cursor-pointer"
      onClick={onClick}
      data-testid={`card-blog-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <LazyImage
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          skeletonClassName="w-full h-full bg-muted animate-pulse absolute inset-0"
        />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {category}
        </Badge>
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors" data-testid="text-blog-title">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{publishedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </CardContent>
    </Card>
  );
}
