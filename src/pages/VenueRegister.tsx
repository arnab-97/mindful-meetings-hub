import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const VenueRegister = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Venue submitted!", description: "We'll review your venue and get back to you." });
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-24 text-center max-w-md mx-auto">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Venue Submitted!</h1>
          <p className="text-muted-foreground">Thank you for listing your venue. We'll review it and be in touch soon.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 md:py-16 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">List Your Venue</h1>
        <p className="text-muted-foreground mb-8">Have a unique space? Host thought-provoking events at your venue.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="vname">Venue Name *</Label>
            <Input id="vname" required placeholder="The Thinking Room" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Input id="address" required placeholder="42 Church Street" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input id="city" required placeholder="Bangalore" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Karnataka" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country *</Label>
              <Input id="country" required placeholder="India" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity *</Label>
            <Input id="capacity" type="number" required min={10} placeholder="80" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cname">Contact Name *</Label>
              <Input id="cname" required placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cemail">Contact Email *</Label>
              <Input id="cemail" type="email" required placeholder="you@venue.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cphone">Contact Phone</Label>
            <Input id="cphone" type="tel" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photos">Venue Photos</Label>
            <Input id="photos" type="file" accept="image/*" multiple />
          </div>
          <Button type="submit" size="lg" className="w-full">Submit Venue</Button>
        </form>
      </div>
    </Layout>
  );
};

export default VenueRegister;
