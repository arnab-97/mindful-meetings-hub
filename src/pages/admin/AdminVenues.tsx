import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useVenues, useUpdateVenue } from "@/hooks/useSupabaseData";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminVenues = () => {
  const { toast } = useToast();
  const { data: venues = [], isLoading } = useVenues(false);
  const updateVenue = useUpdateVenue();

  const handleApprove = async (id: string) => {
    try {
      await updateVenue.mutateAsync({ id, approved: true });
      toast({ title: "Venue approved!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateVenue.mutateAsync({ id, approved: false });
      toast({ title: "Venue rejected" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

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
              {isLoading ? (
                <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Loading...</td></tr>
              ) : venues.length === 0 ? (
                <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No venues yet</td></tr>
              ) : (
                venues.map((venue) => (
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
                        <Button variant="ghost" size="icon" onClick={() => handleApprove(venue.id)} disabled={updateVenue.isPending}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleReject(venue.id)} disabled={updateVenue.isPending}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVenues;
