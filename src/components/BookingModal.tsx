import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Event, formatPrice, getSpeaker, getVenue } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Minus, Plus } from "lucide-react";

interface BookingModalProps {
  event: Event;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingModal({ event, open, onOpenChange }: BookingModalProps) {
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const seatsLeft = event.capacity - event.booked_seats;
  const totalCents = event.price_cents * seats;
  const speaker = getSpeaker(event.speaker_id);
  const venue = getVenue(event.venue_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    toast({
      title: "Redirecting to payment...",
      description: "In production, this would redirect to Stripe Checkout.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Book Your Seat</DialogTitle>
          <DialogDescription>{event.title}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="booking-name">Full Name</Label>
            <Input id="booking-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="booking-email">Email</Label>
            <Input id="booking-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="booking-phone">Phone</Label>
            <Input id="booking-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" required />
          </div>

          <div className="space-y-2">
            <Label>Number of Seats</Label>
            <div className="flex items-center gap-3">
              <Button type="button" variant="outline" size="icon" onClick={() => setSeats(Math.max(1, seats - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold w-8 text-center">{seats}</span>
              <Button type="button" variant="outline" size="icon" onClick={() => setSeats(Math.min(seatsLeft, seats + 1))}>
                <Plus className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">({seatsLeft} available)</span>
            </div>
          </div>

          <div className="rounded-lg bg-secondary p-4 space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatPrice(event.price_cents, event.currency)} × {seats}</span>
              <span>{formatPrice(totalCents, event.currency)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground pt-1 border-t border-border">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalCents, event.currency)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full gap-2" size="lg">
            <CreditCard className="h-4 w-4" />
            {event.price_cents === 0 ? "Register (Free)" : `Pay ${formatPrice(totalCents, event.currency)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
