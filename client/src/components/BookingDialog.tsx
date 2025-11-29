import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, User, Mail, Phone, Users, MessageSquare, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName?: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  numTravelers: string;
  specialRequests: string;
}

export default function BookingDialog({ 
  open, 
  onOpenChange,
  packageName = ""
}: BookingDialogProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    numTravelers: "1",
    specialRequests: "",
  });

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppBooking = () => {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "918468003094";
    const message = `Hi! I want to book ${packageName || 'a tour package'}.\n\nMy details:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nTravel Date: ${formData.travelDate}\nNumber of Travelers: ${formData.numTravelers}\nSpecial Requests: ${formData.specialRequests || 'None'}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    onOpenChange(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:w-full max-w-lg md:max-w-2xl max-h-[95vh] overflow-y-auto p-4 sm:p-6 rounded-lg">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <DialogHeader className="pb-4">
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
              variants={itemVariants}
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <DialogTitle className="font-display text-2xl sm:text-3xl text-center">
                Quick Booking
              </DialogTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <DialogDescription className="text-center text-sm sm:text-base">
                {packageName ? `Book your ${packageName} experience` : 'Book your spiritual journey with us'}
              </DialogDescription>
            </motion.div>
          </DialogHeader>

          <motion.div
            className="space-y-4 sm:space-y-6 mt-4 sm:mt-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="booking-name" className="text-sm sm:text-base flex items-center gap-2">
                  <User className="w-4 h-4 text-primary flex-shrink-0" />
                  Full Name *
                </Label>
                <Input
                  id="booking-name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your name"
                  required
                  className="text-sm"
                  data-testid="input-booking-name"
                />
              </motion.div>
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="booking-email" className="text-sm sm:text-base flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  Email *
                </Label>
                <Input
                  id="booking-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="text-sm"
                  data-testid="input-booking-email"
                />
              </motion.div>
            </div>

            {/* Row 2: Phone & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="booking-phone" className="text-sm sm:text-base flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  Phone Number *
                </Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="text-sm"
                  data-testid="input-booking-phone"
                />
              </motion.div>
              <motion.div className="space-y-2" variants={itemVariants}>
                <Label htmlFor="booking-date" className="text-sm sm:text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  Preferred Date *
                </Label>
                <Input
                  id="booking-date"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => handleChange("travelDate", e.target.value)}
                  required
                  className="text-sm"
                  data-testid="input-booking-date"
                />
              </motion.div>
            </div>

            {/* Travelers */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="booking-travelers" className="text-sm sm:text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-primary flex-shrink-0" />
                Number of Travelers *
              </Label>
              <Select
                value={formData.numTravelers}
                onValueChange={(value) => handleChange("numTravelers", value)}
              >
                <SelectTrigger id="booking-travelers" className="text-sm" data-testid="select-booking-travelers">
                  <SelectValue placeholder="Select number of travelers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Person</SelectItem>
                  <SelectItem value="2">2 People</SelectItem>
                  <SelectItem value="3">3 People</SelectItem>
                  <SelectItem value="4">4 People</SelectItem>
                  <SelectItem value="5">5 People</SelectItem>
                  <SelectItem value="6+">6+ People</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Special Requests */}
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="booking-requests" className="text-sm sm:text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary flex-shrink-0" />
                Special Requests
              </Label>
              <Textarea
                id="booking-requests"
                value={formData.specialRequests}
                onChange={(e) => handleChange("specialRequests", e.target.value)}
                placeholder="Any dietary restrictions, accessibility needs, or special preferences..."
                className="resize-none min-h-20 sm:min-h-24 text-sm"
                data-testid="textarea-booking-requests"
              />
            </motion.div>

            {/* Buttons & Footer */}
            <motion.div className="flex flex-col gap-2 sm:gap-3 pt-2 sm:pt-4" variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={handleWhatsAppBooking}
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold gap-2 py-5 sm:py-6 text-base sm:text-lg"
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.travelDate}
                  data-testid="button-booking-whatsapp"
                >
                  <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
                  Complete Booking via WhatsApp
                </Button>
              </motion.div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
                We'll connect with you on WhatsApp to finalize your booking
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
