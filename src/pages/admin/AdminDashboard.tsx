import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEvents, useBookings, useSpeakers, useVenues } from "@/hooks/useSupabaseData";
import { Calendar, Ticket, Users, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const AdminDashboard = () => {
  const { data: events = [] } = useEvents(false);
  const { data: bookings = [] } = useBookings();
  const { data: speakers = [] } = useSpeakers(false);
  const { data: venues = [] } = useVenues(false);

  const totalRevenue = bookings
    .filter((b) => b.status === "paid")
    .reduce((sum, b) => {
      const event = events.find((e) => e.id === b.event_id);
      return sum + (event ? event.price_cents * b.seats : 0);
    }, 0);

  const stats = [
    { label: "Published Events", value: events.filter((e) => e.status === "published").length, icon: Calendar, color: "text-primary" },
    { label: "Total Bookings", value: bookings.length, icon: Ticket, color: "text-blue-400" },
    { label: "Speakers", value: speakers.length, icon: Users, color: "text-green-400" },
    { label: "Revenue", value: `₹${(totalRevenue / 100).toLocaleString()}`, icon: DollarSign, color: "text-amber-400" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
              <Icon className={cn("h-4 w-4", color)} />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Recent Bookings</h2>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Event</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Seats</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No bookings yet</td></tr>
              ) : (
                bookings.slice(0, 5).map((b) => {
                  const event = events.find((e) => e.id === b.event_id);
                  return (
                    <tr key={b.id} className="border-b border-border last:border-0">
                      <td className="p-3 text-foreground">{b.name}</td>
                      <td className="p-3 text-muted-foreground">{event?.title?.slice(0, 40) ?? "Unknown"}...</td>
                      <td className="p-3 text-foreground">{b.seats}</td>
                      <td className="p-3">
                        <Badge variant={b.status === "paid" ? "default" : b.status === "pending" ? "secondary" : "destructive"}>
                          {b.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
