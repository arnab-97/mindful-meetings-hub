import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingModal } from "@/components/BookingModal";
import { useEvent, useSpeaker, useVenue } from "@/hooks/useSupabaseData";
import { formatPrice, formatDate, formatTime } from "@/data/mockData";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Ticket } from "lucide-react";

const EventDetail = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id);
  const { data: speaker } = useSpeaker(event?.speaker_id ?? undefined);
  const { data: venue } = useVenue(event?.venue_id ?? undefined);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-24 text-center text-muted-foreground">Loading event...</div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="container py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Event Not Found</h1>
          <Button asChild variant="outline">
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const seatsLeft = event.capacity - event.booked_seats;

  return (
    <Layout>
      {/* Cover */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={event.cover_image || "/placeholder.svg"} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute top-4 left-4">
          <Button asChild variant="ghost" size="sm" className="bg-background/50 backdrop-blur-sm">
            <Link to="/events"><ArrowLeft className="h-4 w-4 mr-1" /> Back</Link>
          </Button>
        </div>
      </div>

      <div className="container -mt-20 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Badge className="mb-3 bg-primary text-primary-foreground">
                {formatPrice(event.price_cents, event.currency)}
              </Badge>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" />{formatDate(event.start_at)}</span>
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />{formatTime(event.start_at)} – {formatTime(event.end_at)}</span>
                <span className="flex items-center gap-1.5"><Ticket className="h-4 w-4 text-primary" />{seatsLeft} seats left</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {event.description.split("\n").map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>

            {speaker && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-lg font-semibold text-foreground mb-4">About the Speaker</h3>
                <div className="flex gap-4">
                  <img src={speaker.headshot_url || "/placeholder.svg"} alt={speaker.name} className="h-16 w-16 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-foreground">{speaker.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{speaker.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {speaker.topics.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 sticky top-20">
              <div className="text-center mb-4">
                <p className="font-display text-3xl font-bold text-primary">{formatPrice(event.price_cents, event.currency)}</p>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>
              <Button className="w-full mb-4" size="lg" onClick={() => setBookingOpen(true)} disabled={seatsLeft === 0}>
                {seatsLeft === 0 ? "Sold Out" : "Book Now"}
              </Button>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{seatsLeft} of {event.capacity} seats available</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${(event.booked_seats / event.capacity) * 100}%` }} />
                </div>
              </div>

              {venue && (
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Venue
                  </h4>
                  <p className="text-sm text-foreground">{venue.name}</p>
                  <p className="text-sm text-muted-foreground">{venue.address}, {venue.city}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BookingModal event={event} open={bookingOpen} onOpenChange={setBookingOpen} />
    </Layout>
  );
};

export default EventDetail;
