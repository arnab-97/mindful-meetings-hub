import { Link } from "react-router-dom";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSpeaker, useVenue } from "@/hooks/useSupabaseData";
import { formatPrice, formatDate } from "@/data/mockData";

interface EventCardEvent {
  id: string;
  title: string;
  start_at: string;
  cover_image: string | null;
  price_cents: number;
  currency: string;
  capacity: number;
  booked_seats: number;
  speaker_id: string | null;
  venue_id: string | null;
}

export function EventCard({ event }: { event: EventCardEvent }) {
  const { data: speaker } = useSpeaker(event.speaker_id ?? undefined);
  const { data: venue } = useVenue(event.venue_id ?? undefined);
  const seatsLeft = event.capacity - event.booked_seats;

  return (
    <Link to={`/events/${event.id}`}>
      <Card className="group overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={event.cover_image || "/placeholder.svg"}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary text-primary-foreground font-body text-xs">
              {formatPrice(event.price_cents, event.currency)}
            </Badge>
          </div>
          {seatsLeft < 15 && seatsLeft > 0 && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="destructive" className="font-body text-xs">
                {seatsLeft} seats left
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>{formatDate(event.start_at)}</span>
            </div>
            {venue && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span>{venue.name}, {venue.city}</span>
              </div>
            )}
            {speaker && (
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-primary" />
                <span>{speaker.name}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
