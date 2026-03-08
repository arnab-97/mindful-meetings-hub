import { MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Venue } from "@/data/mockData";

export function VenueCard({ venue }: { venue: Venue }) {
  return (
    <Card className="overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={venue.images[0]}
          alt={venue.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          {venue.name}
        </h3>
        <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{venue.address}, {venue.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-primary" />
            <span>Capacity: {venue.capacity}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
