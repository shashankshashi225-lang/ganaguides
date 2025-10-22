import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppFloatProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppFloat({
  phoneNumber = "919876543210",
  message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?",
}: WhatsAppFloatProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    console.log("WhatsApp clicked");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-transform animate-pulse"
      aria-label="Chat on WhatsApp"
      data-testid="button-whatsapp-float"
    >
      <FaWhatsapp className="w-7 h-7" />
    </button>
  );
}
