import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, Moon, Sun, Star, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanchangEvent } from "@shared/schema";
import FadeInSection from "./FadeInSection";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface PanchangCalendarProps {
  onWhatsAppClick?: () => void;
}

function FloatingElement({ delay, duration, className, children }: { delay: number; duration: number; className: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [0, -30, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

export default function PanchangCalendar({ onWhatsAppClick }: PanchangCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<PanchangEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { data: events = [] } = useQuery<PanchangEvent[]>({
    queryKey: ['/api/panchang-events'],
  });

  const filteredEvents = useMemo(() => {
    if (!activeFilter) return events;
    return events.filter(e => e.type.toLowerCase() === activeFilter.toLowerCase());
  }, [events, activeFilter]);

  const getEventForDate = (date: Date): PanchangEvent | undefined => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredEvents.find(event => {
      const eventDateStr = new Date(event.date).toISOString().split('T')[0];
      return eventDateStr === dateStr;
    });
  };

  const getEventTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'amavasya':
        return <Moon className="w-3 h-3" />;
      case 'purnima':
        return <Sun className="w-3 h-3" />;
      case 'festival':
        return <Star className="w-3 h-3" />;
      default:
        return <Calendar className="w-3 h-3" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'amavasya':
        return 'bg-slate-800 text-white dark:bg-slate-600';
      case 'purnima':
        return 'bg-amber-500 text-white';
      case 'festival':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getEventGlowColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'amavasya':
        return 'shadow-[0_0_20px_hsl(215_25%_35%/0.5)]';
      case 'purnima':
        return 'shadow-[0_0_20px_hsl(38_92%_50%/0.5)]';
      case 'festival':
        return 'shadow-[0_0_20px_hsl(var(--primary)/0.5)]';
      default:
        return '';
    }
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleEventClick = (event: PanchangEvent) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilter(prev => prev === filter ? null : filter);
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const calendarDays = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const dayVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 10
    },
    show: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section id="panchang" className="py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-rose-50/50 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-rose-950/20" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement 
          delay={0} 
          duration={8} 
          className="absolute top-20 left-[10%] text-amber-400/30 dark:text-amber-500/20"
        >
          <Star className="w-8 h-8" />
        </FloatingElement>
        <FloatingElement 
          delay={2} 
          duration={10} 
          className="absolute top-40 right-[15%] text-slate-600/20 dark:text-slate-400/15"
        >
          <Moon className="w-10 h-10" />
        </FloatingElement>
        <FloatingElement 
          delay={1} 
          duration={7} 
          className="absolute bottom-32 left-[20%] text-orange-400/25 dark:text-orange-500/15"
        >
          <Sun className="w-6 h-6" />
        </FloatingElement>
        <FloatingElement 
          delay={3} 
          duration={9} 
          className="absolute top-1/2 right-[8%] text-primary/20"
        >
          <Sparkles className="w-7 h-7" />
        </FloatingElement>
        <FloatingElement 
          delay={1.5} 
          duration={11} 
          className="absolute bottom-20 right-[25%] text-amber-500/20 dark:text-amber-400/15"
        >
          <Star className="w-5 h-5" />
        </FloatingElement>
        <FloatingElement 
          delay={4} 
          duration={8.5} 
          className="absolute top-1/3 left-[5%] text-rose-400/20 dark:text-rose-500/10"
        >
          <Moon className="w-6 h-6" />
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInSection>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
                Panchang Calendar
              </h2>
            </motion.div>
            <motion.p 
              className="text-muted-foreground text-lg max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Plan your spiritual journey with our Hindu calendar highlighting Amavasya, Purnima, and important festivals
            </motion.p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <Card className="max-w-4xl mx-auto backdrop-blur-sm bg-card/95 border-2 shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevMonth}
                  data-testid="button-prev-month"
                  className="rounded-full"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
              </motion.div>
              
              <div className="relative overflow-hidden h-10 flex items-center justify-center min-w-[200px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`${month}-${year}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute"
                  >
                    <CardTitle className="font-display text-xl md:text-2xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                      {MONTH_NAMES[month]} {year}
                    </CardTitle>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNextMonth}
                  data-testid="button-next-month"
                  className="rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_NAMES.map((day, index) => (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`text-center text-xs md:text-sm font-medium py-2 ${
                      day === 'Sun' ? 'text-rose-500 dark:text-rose-400' : 'text-muted-foreground'
                    }`}
                  >
                    {day}
                  </motion.div>
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${month}-${year}`}
                  className="grid grid-cols-7 gap-1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="h-12 md:h-16" />;
                    }

                    const date = new Date(year, month, day);
                    const event = getEventForDate(date);
                    const isToday = new Date().toDateString() === date.toDateString();
                    const isSunday = date.getDay() === 0;

                    const dayContent = (
                      <motion.button
                        key={day}
                        variants={dayVariants}
                        onClick={() => event && handleEventClick(event)}
                        whileHover={event ? { 
                          scale: 1.08,
                          transition: { type: "spring", stiffness: 400, damping: 17 }
                        } : {}}
                        whileTap={event ? { scale: 0.95 } : {}}
                        className={`relative h-12 md:h-16 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${
                          event 
                            ? `cursor-pointer ${getEventGlowColor(event.type)} hover:shadow-lg` 
                            : 'cursor-default'
                        } ${
                          isToday 
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                            : ''
                        } ${
                          event 
                            ? 'bg-gradient-to-br from-accent/60 to-accent/30 dark:from-accent/40 dark:to-accent/20' 
                            : 'bg-transparent hover:bg-accent/20'
                        }`}
                        disabled={!event}
                        data-testid={`day-${day}`}
                      >
                        {isToday && (
                          <motion.div
                            className="absolute inset-0 rounded-lg bg-primary/10"
                            animate={{ 
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        )}
                        
                        <span className={`text-sm md:text-base relative z-10 ${
                          isToday 
                            ? 'font-bold text-primary' 
                            : isSunday 
                              ? 'text-rose-500 dark:text-rose-400' 
                              : ''
                        }`}>
                          {day}
                        </span>
                        
                        {event && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.1, type: "spring" }}
                            className="absolute -bottom-1 md:bottom-1"
                          >
                            <motion.div
                              animate={{ 
                                scale: [1, 1.05, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <Badge 
                                className={`text-[10px] md:text-xs px-1 py-0 h-4 md:h-5 ${getEventTypeColor(event.type)}`}
                              >
                                <span className="hidden md:inline mr-1">{getEventTypeIcon(event.type)}</span>
                                <span className="hidden md:inline truncate max-w-16">{event.name.split(' ')[0]}</span>
                                <span className="md:hidden">{getEventTypeIcon(event.type)}</span>
                              </Badge>
                            </motion.div>
                          </motion.div>
                        )}
                      </motion.button>
                    );

                    if (event) {
                      return (
                        <Tooltip key={day}>
                          <TooltipTrigger asChild>
                            {dayContent}
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="max-w-xs p-3 bg-popover/95 backdrop-blur-sm"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge className={`${getEventTypeColor(event.type)} text-xs`}>
                                  {getEventTypeIcon(event.type)}
                                  <span className="ml-1">{event.type}</span>
                                </Badge>
                              </div>
                              <p className="font-semibold">{event.name}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {event.description}
                              </p>
                              <p className="text-xs text-primary font-medium">Click to learn more</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return dayContent;
                  })}
                </motion.div>
              </AnimatePresence>

              <motion.div 
                className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFilter('amavasya')}
                  className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  data-testid="filter-amavasya"
                >
                  <Badge 
                    className={`bg-slate-800 text-white dark:bg-slate-600 transition-all duration-300 ${
                      activeFilter === 'amavasya' 
                        ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-slate-600' 
                        : activeFilter && activeFilter !== 'amavasya' 
                          ? 'opacity-50' 
                          : ''
                    }`}
                  >
                    <Moon className="w-3 h-3 mr-1" />
                    Amavasya
                  </Badge>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFilter('purnima')}
                  className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  data-testid="filter-purnima"
                >
                  <Badge 
                    className={`bg-amber-500 text-white transition-all duration-300 ${
                      activeFilter === 'purnima' 
                        ? 'ring-2 ring-offset-2 ring-amber-500' 
                        : activeFilter && activeFilter !== 'purnima' 
                          ? 'opacity-50' 
                          : ''
                    }`}
                  >
                    <Sun className="w-3 h-3 mr-1" />
                    Purnima
                  </Badge>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFilter('festival')}
                  className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  data-testid="filter-festival"
                >
                  <Badge 
                    className={`bg-primary text-primary-foreground transition-all duration-300 ${
                      activeFilter === 'festival' 
                        ? 'ring-2 ring-offset-2 ring-primary' 
                        : activeFilter && activeFilter !== 'festival' 
                          ? 'opacity-50' 
                          : ''
                    }`}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Festival
                  </Badge>
                </motion.button>

                {activeFilter && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(null)}
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    data-testid="filter-clear"
                  >
                    <Badge variant="outline" className="text-muted-foreground">
                      Clear Filter
                    </Badge>
                  </motion.button>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </FadeInSection>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            <AnimatePresence>
              {selectedEvent && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <DialogHeader>
                    <motion.div 
                      className="flex items-center gap-2 mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Badge className={getEventTypeColor(selectedEvent.type)}>
                        {getEventTypeIcon(selectedEvent.type)}
                        <span className="ml-1">{selectedEvent.type}</span>
                      </Badge>
                    </motion.div>
                    <DialogTitle className="font-display text-2xl" data-testid="text-event-name">
                      {selectedEvent.name}
                    </DialogTitle>
                    <DialogDescription className="text-base" data-testid="text-event-date">
                      {new Date(selectedEvent.date).toLocaleDateString('en-IN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </DialogDescription>
                  </DialogHeader>
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div>
                      <h4 className="font-semibold mb-2">Description</h4>
                      <p className="text-muted-foreground" data-testid="text-event-description">
                        {selectedEvent.description}
                      </p>
                    </div>
                    {selectedEvent.significance && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h4 className="font-semibold mb-2">Travel & Puja Relevance</h4>
                        <p className="text-muted-foreground" data-testid="text-event-significance">
                          {selectedEvent.significance}
                        </p>
                      </motion.div>
                    )}
                    {onWhatsAppClick && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          onClick={onWhatsAppClick}
                          className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white border-none"
                          data-testid="button-whatsapp-panchang"
                        >
                          Plan a Trip for This Day
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
