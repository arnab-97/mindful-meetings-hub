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
  price: number;
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
    <Link to={`/events/${event.id}`} className="block">
      <Card className="group relative overflow-hidden glass gradient-border rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={event.cover_image || "/placeholder.svg"}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
          <div className="absolute top-3 right-3">
            <Badge className="bg-primary/90 text-primary-foreground font-body text-xs backdrop-blur-md shadow-glow">
              {formatPrice(event.price, event.currency)}
            </Badge>
          </div>
          {seatsLeft < 15 && seatsLeft > 0 && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="destructive" className="font-body text-xs backdrop-blur-md">
                {seatsLeft} seats left
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="relative p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 transition-colors group-hover:text-primary">
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
