import { useState, useEffect } from "react";
import { Home, Package, Map, BookOpen, Users, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface BottomNavProps {
  onWhatsAppClick?: () => void;
}

export default function BottomNav({ onWhatsAppClick }: BottomNavProps) {
  const [location, setLocation] = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Auto-close chat popup when user navigates to a different page
  useEffect(() => {
    if (isChatOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsChatOpen(false);
        setIsClosing(false);
      }, 300);
    }
  }, [location]);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
  const message = "Hi! I'm interested in booking a GangaGuides tour. Can you share available packages and pricing?";
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Packages", icon: Package, href: "/packages" },
    { label: "Destination", icon: Map, href: "/destinations" },
    { label: "Blog", icon: BookOpen, href: "/blog" },
    { label: "About", icon: Users, href: "/about" },
  ];

  const handleCloseChat = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsChatOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-card-border shadow-2xl"
      data-testid="bottom-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-around gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => setLocation(item.href)}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg hover-elevate active-elevate-2 transition-all group"
                data-testid={`link-bottom-nav-${item.label.toLowerCase()}`}
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  {item.label}
                </span>
              </button>
            );
          })}
          <Button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="bg-[#25D366] hover:bg-[#20BD5A] text-white border-none flex flex-col items-center gap-1 px-3 py-2 h-auto min-h-0 relative"
            data-testid="button-whatsapp-nav"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs font-medium">Book Now</span>
          </Button>
        </div>
      </div>

      {/* Click-away Overlay */}
      {isChatOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ pointerEvents: 'auto' }}
          onClick={handleCloseChat}
          data-testid="whatsapp-overlay"
        />
      )}

      {/* Chat Popup */}
      {isChatOpen && (
        <div
          className={`fixed bottom-20 right-4 z-50 w-80 rounded-lg shadow-2xl overflow-hidden bg-white md:bottom-24 md:right-6 transition-all duration-300 ${
            isClosing 
              ? 'animate-out fade-out slide-out-to-bottom-4 duration-300' 
              : 'animate-in fade-in slide-in-from-bottom-4 duration-300'
          }`}
          data-testid="whatsapp-chat-popup"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">GG</span>
              </div>
              <div>
                <h3 className="font-semibold text-sm">Ganga Guides</h3>
                <p className="text-xs text-green-100">online</p>
              </div>
            </div>
            <button
              onClick={handleCloseChat}
              className="hover:bg-green-700 p-1 rounded transition-all"
              aria-label="Close chat"
              data-testid="button-close-chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Content */}
          <div className="p-4 bg-gray-50 min-h-32 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  Ganga Guides
                </p>
                <p className="text-gray-700 text-sm">
                  Hi! Welcome to Ganga Guides. How can we help you with your spiritual journey today?
                </p>
              </div>
              <p className="text-xs text-gray-500 text-center mt-3">
                Typically replies instantly
              </p>
            </div>

            {/* Start Chat Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              data-testid="button-start-whatsapp-chat"
            >
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-3">
                Start chat
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
