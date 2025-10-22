import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavigationProps {
  onBookNowClick?: () => void;
}

export default function Navigation({ onBookNowClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Packages", href: "#packages" },
    { label: "Destinations", href: "#destinations" },
    { label: "Blog", href: "#blog" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-transparent text-white"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center text-primary">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M12 2L4 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-8-4z" />
              </svg>
            </div>
            <span className={`font-display text-2xl font-bold ${isScrolled ? "text-foreground" : "text-white"}`}>
              GangaGuides
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-medium hover:text-primary transition-colors ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={onBookNowClick}
              className="bg-primary text-primary-foreground hover-elevate active-elevate-2"
              data-testid="button-book-now"
            >
              Plan Your Journey
            </Button>
          </div>

          <button
            className={`md:hidden p-2 ${isScrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-background rounded-lg shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-foreground hover:bg-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <div className="px-4 py-3">
              <Button
                onClick={() => {
                  onBookNowClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-primary-foreground hover-elevate active-elevate-2"
                data-testid="button-book-now-mobile"
              >
                Plan Your Journey
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
