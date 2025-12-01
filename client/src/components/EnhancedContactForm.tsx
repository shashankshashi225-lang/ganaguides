import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { FaWhatsapp } from "react-icons/fa";
import { Send, User, Mail, Phone, Calendar, Users, MessageSquare, Package, CheckCircle } from "lucide-react";

interface EnhancedContactFormProps {
  onSubmit?: (data: FormData) => void;
  onWhatsAppClick?: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  package: string;
  travelDate: string;
  numTravelers: string;
  specialRequests: string;
}

export default function EnhancedContactForm({ onSubmit, onWhatsAppClick }: EnhancedContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    package: "",
    travelDate: "",
    numTravelers: "1",
    specialRequests: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const bookingData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        packageName: data.package,
        preferredDate: data.travelDate,
        numberOfPeople: parseInt(data.numTravelers),
        message: data.specialRequests,
        status: "pending",
      };
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error("Failed to submit booking");
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        package: "",
        travelDate: "",
        numTravelers: "1",
        specialRequests: "",
      });
      setTimeout(() => setShowSuccess(false), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden" data-testid="form-contact">
        {/* Animated background orbs */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <CardHeader className="text-center relative z-10 pb-8">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
              variants={itemVariants}
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Package className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                Plan Your Spiritual Journey
              </CardTitle>
            </motion.div>
            <motion.p
              className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Share your travel details and we'll craft a personalized itinerary for your sacred experience
            </motion.p>
          </CardHeader>
        </motion.div>
      
      <CardContent className="relative z-10">
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="name" className="text-base font-semibold flex items-center gap-2">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 3, repeat: Infinity }}>
                    <User className="w-4 h-4 text-primary" />
                  </motion.div>
                  Full Name *
                </Label>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="h-12 border-2 focus:border-primary transition-all"
                  data-testid="input-name"
                />
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="email" className="text-base font-semibold flex items-center gap-2">
                  <motion.div animate={{ rotate: [-360, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    <Mail className="w-4 h-4 text-primary" />
                  </motion.div>
                  Email *
                </Label>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="h-12 border-2 focus:border-primary transition-all"
                  data-testid="input-email"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Row 2: Phone & Package */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Phone className="w-4 h-4 text-primary" />
                  </motion.div>
                  Phone Number *
                </Label>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  required
                  className="h-12 border-2 focus:border-primary transition-all"
                  data-testid="input-phone"
                />
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="package" className="text-base font-semibold flex items-center gap-2">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Package className="w-4 h-4 text-primary" />
                  </motion.div>
                  Select Package
                </Label>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Select value={formData.package} onValueChange={(value) => handleChange("package", value)}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary transition-all" data-testid="select-package">
                    <SelectValue placeholder="Choose a tour package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-day-kashi">1-Day Kashi Darshan</SelectItem>
                    <SelectItem value="2-day-sarnath">2-Day Kashi + Sarnath</SelectItem>
                    <SelectItem value="3-day-ayodhya">3-Day Ayodhya + Kashi</SelectItem>
                    <SelectItem value="custom">Custom Package</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>
          </div>

          {/* Row 3: Date & Travelers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="travelDate" className="text-base font-semibold flex items-center gap-2">
                  <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                    <Calendar className="w-4 h-4 text-primary" />
                  </motion.div>
                  Preferred Travel Date
                </Label>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Input
                  id="travelDate"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => handleChange("travelDate", e.target.value)}
                  className="h-12 border-2 focus:border-primary transition-all"
                  data-testid="input-date"
                />
              </motion.div>
            </motion.div>

            <motion.div className="space-y-2" variants={itemVariants}>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="numTravelers" className="text-base font-semibold flex items-center gap-2">
                  <motion.div animate={{ rotate: [-360, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                    <Users className="w-4 h-4 text-primary" />
                  </motion.div>
                  Number of Travelers
                </Label>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Select value={formData.numTravelers} onValueChange={(value) => handleChange("numTravelers", value)}>
                  <SelectTrigger className="h-12 border-2 focus:border-primary transition-all" data-testid="select-travelers">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </SelectItem>
                    ))}
                    <SelectItem value="10+">10+ People</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            </motion.div>
          </div>

          {/* Special Requests */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor="specialRequests" className="text-base font-semibold flex items-center gap-2">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <MessageSquare className="w-4 h-4 text-primary" />
                </motion.div>
                Special Requests or Questions
              </Label>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleChange("specialRequests", e.target.value)}
                placeholder="Tell us about dietary preferences, accessibility needs, or any questions you have..."
                rows={4}
                className="border-2 focus:border-primary transition-all resize-none"
                data-testid="textarea-requests"
              />
            </motion.div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 pt-4"
            variants={itemVariants}
          >
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="w-full h-14 bg-primary text-primary-foreground text-lg font-semibold shadow-lg hover:shadow-xl transition-all gap-2 disabled:opacity-50"
                data-testid="button-submit"
              >
                <motion.div animate={{ rotate: mutation.isPending ? [0, 360] : [0, 20, -20, 0] }} transition={{ duration: mutation.isPending ? 1 : 0.6, repeat: Infinity, repeatDelay: mutation.isPending ? 0 : 2 }}>
                  <Send className="w-5 h-5" />
                </motion.div>
                {mutation.isPending ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </motion.div>
            <motion.div
              className="flex-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="button"
                onClick={onWhatsAppClick}
                className="w-full h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white border-none text-lg font-semibold shadow-lg hover:shadow-xl transition-all gap-2"
                data-testid="button-whatsapp-direct"
              >
                <motion.div animate={{ rotate: [0, -20, 20, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>
                  <FaWhatsapp className="w-5 h-5" />
                </motion.div>
                Chat on WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </CardContent>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 0.6, repeat: 1 }}
              >
                <CheckCircle className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h2
                className="text-2xl font-bold text-center text-foreground mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Thank You for Filling the Form!
              </motion.h2>
              <motion.p
                className="text-center text-muted-foreground mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your inquiry has been successfully saved. Our team will contact you soon with personalized recommendations for your spiritual journey.
              </motion.p>
              <motion.div
                className="flex gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  className="flex-1 bg-primary text-primary-foreground"
                  onClick={() => setShowSuccess(false)}
                >
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
    </motion.div>
  );
}
