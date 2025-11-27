import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/Untitled design_1764250647974.png";

interface NavigationProps {
  onBookNowClick?: () => void;
}

export default function Navigation({ onBookNowClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent text-white"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <button 
              className="flex items-center hover-elevate active-elevate-2 px-1 py-1 rounded-lg transition-all group"
              data-testid="button-logo"
            >
              <img 
                src={logoImage} 
                alt="Ganga Guides - Spiritual Essence, Guided by Heritage" 
                className="h-12 md:h-16 w-auto object-contain max-w-xs"
              />
            </button>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <Link href="/">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-home"
                >
                  Home
                </button>
              </Link>
              <Link href="/packages">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/packages")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-packages"
                >
                  Packages
                </button>
              </Link>
              <Link href="/destinations">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/destinations")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-destinations"
                >
                  Destinations
                </button>
              </Link>
              <Link href="/blog">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/blog")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-blog"
                >
                  Blog
                </button>
              </Link>
              <Link href="/about">
                <button
                  className={`text-sm font-medium transition-colors hover-elevate px-3 py-2 rounded-md ${
                    isActive("/about")
                      ? "text-primary"
                      : isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"
                  }`}
                  data-testid="nav-about"
                >
                  About
                </button>
              </Link>
            </div>

            <Button
              onClick={onBookNowClick}
              size="lg"
              className="bg-primary text-primary-foreground border border-primary-border font-semibold shadow-lg hover:shadow-xl transition-all"
              data-testid="button-plan-journey"
            >
              Plan Your Journey
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
