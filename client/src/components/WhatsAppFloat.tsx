import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppFloatProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppFloat({
  phoneNumber,
  message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?",
}: WhatsAppFloatProps) {
  const handleClick = () => {
    const whatsappNumber = phoneNumber || import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-28 right-4 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-transform animate-pulse md:bottom-6 md:right-6"
      aria-label="Chat on WhatsApp"
      data-testid="button-whatsapp-float"
    >
      <FaWhatsapp className="w-7 h-7" />
    </button>
  );
}
