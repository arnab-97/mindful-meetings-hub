import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookings, useEvents } from "@/hooks/useSupabaseData";
import { formatPrice } from "@/data/mockData";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminBookings = () => {
  const { toast } = useToast();
  const { data: bookings = [], isLoading } = useBookings();
  const { data: events = [] } = useEvents(false);

  const handleExportCSV = () => {
    const headers = "ID,Name,Email,Phone,Event,Seats,Status,Date\n";
    const rows = bookings.map((b) => {
      const event = events.find((e) => e.id === b.event_id);
      return `${b.id},${b.name},${b.email},${b.phone},"${event?.title}",${b.seats},${b.status},${b.created_at}`;
    }).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "CSV exported!" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Bookings</h1>
        <Button variant="outline" className="gap-2" onClick={handleExportCSV} disabled={bookings.length === 0}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Name</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">Email</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Event</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Seats</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Amount</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Loading...</td></tr>
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">No bookings yet</td></tr>
              ) : (
                bookings.map((b) => {
                  const event = events.find((e) => e.id === b.event_id);
                  const amount = event ? event.price_cents * b.seats : 0;
                  return (
                    <tr key={b.id} className="border-b border-border last:border-0">
                      <td className="p-3 text-foreground font-medium">{b.name}</td>
                      <td className="p-3 text-muted-foreground hidden md:table-cell">{b.email}</td>
                      <td className="p-3 text-muted-foreground">{event?.title?.slice(0, 30) ?? "Unknown"}...</td>
                      <td className="p-3 text-foreground">{b.seats}</td>
                      <td className="p-3 text-foreground">{formatPrice(amount, event?.currency || "INR")}</td>
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

export default AdminBookings;
