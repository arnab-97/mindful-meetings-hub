import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEvents, useSpeakers, useDeleteEvent } from "@/hooks/useSupabaseData";
import { formatPrice, formatDate } from "@/data/mockData";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminEvents = () => {
  const { toast } = useToast();
  const { data: events = [], isLoading } = useEvents(false);
  const { data: speakers = [] } = useSpeakers(false);
  const deleteEvent = useDeleteEvent();

  const getSpeakerName = (id: string | null) => {
    if (!id) return "—";
    return speakers.find((s) => s.id === id)?.name ?? "Unknown";
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: "Event deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Events</h1>
        <Button className="gap-2" onClick={() => toast({ title: "Event editor coming soon" })}>
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Title</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">Speaker</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">Date</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Price</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                <th className="text-right p-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Loading...</td></tr>
              ) : events.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No events yet</td></tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="border-b border-border last:border-0">
                    <td className="p-3 text-foreground font-medium">{event.title.slice(0, 45)}...</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{getSpeakerName(event.speaker_id)}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{formatDate(event.start_at)}</td>
                    <td className="p-3 text-foreground">{formatPrice(event.price_cents, event.currency)}</td>
                    <td className="p-3">
                      <Badge variant={event.status === "published" ? "default" : "secondary"}>
                        {event.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" onClick={() => toast({ title: "Edit coming soon" })}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)} disabled={deleteEvent.isPending}>
                          <Trash2 className="h-4 w-4" />
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

export default AdminEvents;
