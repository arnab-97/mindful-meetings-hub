import { MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VenueCardVenue {
  id: string;
  name: string;
  address: string;
  city: string;
  capacity: number;
  images: string[];
}

export function VenueCard({ venue }: { venue: VenueCardVenue }) {
  return (
    <Card className="group relative overflow-hidden glass gradient-border rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={venue.images?.[0] || "/placeholder.svg"}
          alt={venue.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 transition-colors group-hover:text-primary">{venue.name}</h3>
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
