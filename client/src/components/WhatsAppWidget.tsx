import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImage from "@assets/Untitled design (1)_1764387987253.png";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div
        className="fixed bottom-6 right-6 z-50"
        data-testid="whatsapp-widget-button"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg flex items-center justify-center hover-elevate active-elevate-2 transition-all"
          aria-label="Open WhatsApp Chat"
          data-testid="button-whatsapp-widget"
        >
          <svg
            className="w-7 h-7"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.67.15-.23.381-.921 1.226-.1.827-.404.738-.627 1.450-1.156 2.032-.397.44-.757.499-1.054.266-.297-.233-1.255-.491-2.393-1.476-.888-.79-1.489-1.769-1.633-2.066-.144-.297-.015-.458.108-.606.11-.145.249-.376.373-.564.118-.188.159-.323.237-.537.098-.271.049-.508-.052-.71-.101-.212-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.783 1.14L.855 2.606l1.643 4.97a9.957 9.957 0 00-1.5 5.05c0 5.476 4.441 9.926 9.926 9.926 2.653 0 5.148-.994 7.07-2.793 1.922-1.799 2.98-4.294 2.98-7.04 0-5.487-4.444-9.926-9.926-9.926z" />
          </svg>
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-96 rounded-lg shadow-2xl overflow-hidden bg-white animate-in fade-in slide-in-from-bottom-4 duration-300"
          data-testid="whatsapp-widget-popup"
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
              onClick={() => setIsOpen(false)}
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
                  Hi! 👋 Welcome to Ganga Guides. How can we help you with your spiritual journey today?
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
    </>
  );
}
