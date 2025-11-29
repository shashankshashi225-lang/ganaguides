import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import logoImage from "@assets/Untitled design (1)_1764387987253.png";

interface WhatsAppFloatProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppFloat({
  phoneNumber,
  message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?",
}: WhatsAppFloatProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const whatsappNumber = phoneNumber || import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-28 right-4 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-transform animate-pulse md:bottom-6 md:right-6"
        aria-label="Chat on WhatsApp"
        data-testid="button-whatsapp-float"
      >
        <FaWhatsapp className="w-7 h-7" />
      </button>

      {/* Chat Popup */}
      {isChatOpen && (
        <div
          className="fixed bottom-40 right-4 z-50 w-80 rounded-lg shadow-2xl overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-300 md:bottom-24 md:right-6"
          data-testid="whatsapp-chat-popup-float"
        >
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <img
                src={logoImage}
                alt="Ganga Guides"
                className="h-10 w-auto object-contain"
              />
              <div>
                <h3 className="font-semibold text-sm">Ganga Guides</h3>
                <p className="text-xs text-green-100">online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-green-700 p-1 rounded transition-all"
              aria-label="Close chat"
              data-testid="button-close-chat-float"
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
              data-testid="button-start-whatsapp-chat-float"
            >
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white mt-3">
                Start chat
              </Button>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
