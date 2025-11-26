import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Moon, Sun, Star, Calendar } from "lucide-react";
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

export default function PanchangCalendar({ onWhatsAppClick }: PanchangCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<PanchangEvent | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const { data: events = [] } = useQuery<PanchangEvent[]>({
    queryKey: ['/api/panchang-events'],
  });

  const getEventForDate = (date: Date): PanchangEvent | undefined => {
    const dateStr = date.toISOString().split('T')[0];
    return events.find(event => {
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

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleEventClick = (event: PanchangEvent) => {
    setSelectedEvent(event);
    setDialogOpen(true);
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

  return (
    <section id="panchang" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Panchang Calendar
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Plan your spiritual journey with our Hindu calendar highlighting Amavasya, Purnima, and important festivals
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevMonth}
                data-testid="button-prev-month"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="font-display text-xl md:text-2xl">
                {MONTH_NAMES[month]} {year}
              </CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextMonth}
                data-testid="button-next-month"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_NAMES.map(day => (
                  <div
                    key={day}
                    className="text-center text-xs md:text-sm font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="h-12 md:h-16" />;
                  }

                  const date = new Date(year, month, day);
                  const event = getEventForDate(date);
                  const isToday = new Date().toDateString() === date.toDateString();

                  return (
                    <button
                      key={day}
                      onClick={() => event && handleEventClick(event)}
                      className={`relative h-12 md:h-16 rounded-md flex flex-col items-center justify-center transition-all ${
                        event 
                          ? 'cursor-pointer hover-elevate active-elevate-2' 
                          : 'cursor-default'
                      } ${
                        isToday 
                          ? 'ring-2 ring-primary' 
                          : ''
                      } ${
                        event 
                          ? 'bg-accent/50' 
                          : 'bg-transparent'
                      }`}
                      disabled={!event}
                      data-testid={`day-${day}`}
                    >
                      <span className={`text-sm md:text-base ${isToday ? 'font-bold text-primary' : ''}`}>
                        {day}
                      </span>
                      {event && (
                        <Badge 
                          className={`absolute -bottom-1 md:bottom-1 text-[10px] md:text-xs px-1 py-0 h-4 md:h-5 ${getEventTypeColor(event.type)}`}
                        >
                          <span className="hidden md:inline mr-1">{getEventTypeIcon(event.type)}</span>
                          <span className="hidden md:inline truncate max-w-16">{event.name.split(' ')[0]}</span>
                          <span className="md:hidden">{getEventTypeIcon(event.type)}</span>
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border justify-center">
                <div className="flex items-center gap-2">
                  <Badge className="bg-slate-800 text-white dark:bg-slate-600">
                    <Moon className="w-3 h-3 mr-1" />
                    Amavasya
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500 text-white">
                    <Sun className="w-3 h-3 mr-1" />
                    Purnima
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Festival
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-lg">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getEventTypeColor(selectedEvent.type)}>
                      {getEventTypeIcon(selectedEvent.type)}
                      <span className="ml-1">{selectedEvent.type}</span>
                    </Badge>
                  </div>
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
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground" data-testid="text-event-description">
                      {selectedEvent.description}
                    </p>
                  </div>
                  {selectedEvent.significance && (
                    <div>
                      <h4 className="font-semibold mb-2">Travel & Puja Relevance</h4>
                      <p className="text-muted-foreground" data-testid="text-event-significance">
                        {selectedEvent.significance}
                      </p>
                    </div>
                  )}
                  {onWhatsAppClick && (
                    <Button
                      onClick={onWhatsAppClick}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white border-none"
                      data-testid="button-whatsapp-panchang"
                    >
                      Plan a Trip for This Day
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
