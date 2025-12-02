import { useLocation } from "wouter";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import FadeInSection from "@/components/FadeInSection";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  phone: string;
  package: string;
  travelDate: string;
  numTravelers: string;
  specialRequests: string;
}

export default function Booking() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formRef, setFormRef] = useState<any>(null);

  const bookingMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          packageName: data.package,
          preferredDate: data.travelDate,
          numberOfPeople: parseInt(data.numTravelers),
          message: data.specialRequests,
        }),
      });
      if (!response.ok) throw new Error("Failed to submit booking");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for submitting your inquiry. We'll be in touch soon!",
        duration: 5000,
      });
      // Reset form by reloading or resetting form data
      if (formRef) {
        formRef.reset();
      }
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    },
  });

  const handleWhatsApp = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = "Hi, I'm interested in booking a GangaGuides tour. Can you share details?";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFormSubmit = async (data: FormData) => {
    bookingMutation.mutate(data);
  };

  return (
    <div className="min-h-screen pb-20">
      <Navigation onBookNowClick={() => setLocation("/booking")} />
      
      <section className="py-16 md:py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-12">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Plan Your Journey
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Let us help you create an unforgettable spiritual experience
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <EnhancedContactForm
              onSubmit={handleFormSubmit}
            />
          </FadeInSection>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
      <BottomNav onWhatsAppClick={handleWhatsApp} />
    </div>
  );
}
