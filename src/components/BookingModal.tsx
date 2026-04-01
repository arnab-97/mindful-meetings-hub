import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Minus, Plus, Loader2 } from "lucide-react";

interface BookingEvent {
  id: string;
  title: string;
  price: number;
  currency: string;
  capacity: number;
  booked_seats: number;
  speaker_id: string | null;
  venue_id: string | null;
}

interface BookingModalProps {
  event: BookingEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function BookingModal({ event, open, onOpenChange }: BookingModalProps) {
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const seatsLeft = event.capacity - event.booked_seats;
  const total = event.price * seats;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      // Call edge function to create order
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: { event_id: event.id, name, email, phone, seats },
      });

      if (error) throw new Error(error.message);
      if (data.error) throw new Error(data.error);

      // Free event — booking created directly
      if (data.free) {
        toast({
          title: "Registration successful!",
          description: "You're registered for this free event.",
        });
        resetAndClose();
        return;
      }

      // Load Razorpay checkout
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        throw new Error("Failed to load payment gateway. Please try again.");
      }

      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Kaffeine",
        description: data.event_title,
        order_id: data.order_id,
        prefill: { name, email, contact: phone },
        theme: { color: "#D4AF37" },
        handler: async (response: any) => {
          try {
            const { data: verifyData, error: verifyError } =
              await supabase.functions.invoke("verify-razorpay-payment", {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  booking_id: data.booking_id,
                },
              });

            if (verifyError || verifyData?.error) {
              throw new Error(verifyData?.error || verifyError?.message);
            }

            toast({
              title: "Payment successful!",
              description: "Your booking is confirmed. Check your email for details.",
            });
            resetAndClose();
          } catch (err: any) {
            toast({
              title: "Payment verification failed",
              description: err.message,
              variant: "destructive",
            });
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast({
              title: "Payment cancelled",
              description: "Your booking was not completed.",
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      return; // Don't setLoading(false) — Razorpay modal handles it
    } catch (err: any) {
      toast({
        title: "Booking failed",
        description: err.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const resetAndClose = () => {
    onOpenChange(false);
    setName("");
    setEmail("");
    setPhone("");
    setSeats(1);
    setLoading(false);
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
              <span>{formatPrice(event.price, event.currency)} × {seats}</span>
              <span>{formatPrice(total, event.currency)}</span>
            </div>
            <div className="flex justify-between font-semibold text-foreground pt-1 border-t border-border">
              <span>Total</span>
              <span className="text-primary">{formatPrice(total, event.currency)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full gap-2" size="lg" disabled={loading}>
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
            ) : event.price === 0 ? (
              "Register (Free)"
            ) : (
              <><CreditCard className="h-4 w-4" /> Pay {formatPrice(total, event.currency)}</>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
