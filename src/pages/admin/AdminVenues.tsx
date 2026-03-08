import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockVenues } from "@/data/mockData";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminVenues = () => {
  const { toast } = useToast();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Venues</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Venue</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">Location</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Capacity</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                <th className="text-right p-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockVenues.map((venue) => (
                <tr key={venue.id} className="border-b border-border last:border-0">
                  <td className="p-3 text-foreground font-medium">{venue.name}</td>
                  <td className="p-3 text-muted-foreground hidden md:table-cell">{venue.city}, {venue.state}</td>
                  <td className="p-3 text-foreground">{venue.capacity}</td>
                  <td className="p-3">
                    <Badge variant={venue.approved ? "default" : "secondary"}>
                      {venue.approved ? "Approved" : "Pending"}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" onClick={() => toast({ title: "Approved!" })}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => toast({ title: "Rejected", variant: "destructive" })}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVenues;
