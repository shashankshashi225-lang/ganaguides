import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import logoImage from "@assets/1_1764516458398.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden" data-testid="footer">
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
          <path d="M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z" fill="currentColor" />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-display text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline hover-elevate transition-all" data-testid="link-footer-home">Home</Link></li>
              <li><Link href="/packages" className="hover:underline hover-elevate transition-all" data-testid="link-footer-tours">Tours</Link></li>
              <li><Link href="/destinations" className="hover:underline hover-elevate transition-all" data-testid="link-footer-destinations">Destinations</Link></li>
              <li><Link href="/blog" className="hover:underline hover-elevate transition-all" data-testid="link-footer-blog">Blog</Link></li>
              <li><Link href="/about" className="hover:underline hover-elevate transition-all" data-testid="link-footer-about">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li><Link href="/destination/varanasi" className="hover:underline hover-elevate transition-all">Varanasi</Link></li>
              <li><Link href="/destination/ayodhya" className="hover:underline hover-elevate transition-all">Ayodhya</Link></li>
              <li><Link href="/destination/sarnath" className="hover:underline hover-elevate transition-all">Sarnath</Link></li>
              <li><Link href="/destination/prayagraj" className="hover:underline hover-elevate transition-all">Prayagraj</Link></li>
            </ul>
          </div>

          <div className="relative">
            <h3 className="font-display text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="WhatsApp"
                data-testid="button-footer-whatsapp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button>
              <a
                href="https://www.facebook.com/share/1C4XntevBn/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="Facebook"
                data-testid="link-footer-facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/ganga-guides-network/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="LinkedIn"
                data-testid="link-footer-linkedin"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Experience authentic spiritual journeys with local guides who live the stories of Kashi.
            </p>

            {/* Chat Popup */}
            {isChatOpen && (
              <div
                className="absolute bottom-24 right-0 z-50 w-80 rounded-lg shadow-2xl overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-300"
                data-testid="whatsapp-chat-popup-footer"
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
                    onClick={() => setIsChatOpen(false)}
                    className="hover:bg-green-700 p-1 rounded transition-all"
                    aria-label="Close chat"
                    data-testid="button-close-chat-footer"
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
                    data-testid="button-start-whatsapp-chat-footer"
                  >
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-3">
                      Start chat
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/">
            <img src={logoImage} alt="Ganga Guides Logo" className="h-48 w-auto hover-elevate transition-all rounded-lg" />
          </Link>
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} Ganga Guides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
