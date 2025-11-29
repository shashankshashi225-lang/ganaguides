import { FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "wouter";
import logoImage from "@assets/Untitled design (1)_1764387987253.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";

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

          <div>
            <h3 className="font-display text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                aria-label="WhatsApp"
                data-testid="link-footer-whatsapp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
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
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/">
            <img 
              src={logoImage} 
              alt="Ganga Guides" 
              className="h-16 md:h-20 w-auto object-contain max-w-md"
            />
          </Link>
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} Ganga Guides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
