import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockEvents, getSpeaker, getVenue, formatPrice, formatDate } from "@/data/mockData";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminEvents = () => {
  const { toast } = useToast();

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
              {mockEvents.map((event) => {
                const speaker = getSpeaker(event.speaker_id);
                return (
                  <tr key={event.id} className="border-b border-border last:border-0">
                    <td className="p-3 text-foreground font-medium">{event.title.slice(0, 45)}...</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{speaker?.name}</td>
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
                        <Button variant="ghost" size="icon" onClick={() => toast({ title: "Delete coming soon", variant: "destructive" })}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminEvents;
