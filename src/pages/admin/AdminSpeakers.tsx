import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSpeakers } from "@/data/mockData";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSpeakers = () => {
  const { toast } = useToast();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Speakers</h1>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-muted-foreground font-medium">Speaker</th>
                <th className="text-left p-3 text-muted-foreground font-medium hidden md:table-cell">Topics</th>
                <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                <th className="text-right p-3 text-muted-foreground font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockSpeakers.map((speaker) => (
                <tr key={speaker.id} className="border-b border-border last:border-0">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <img src={speaker.headshot_url} alt={speaker.name} className="h-8 w-8 rounded-full object-cover" />
                      <div>
                        <p className="text-foreground font-medium">{speaker.name}</p>
                        <p className="text-xs text-muted-foreground">{speaker.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {speaker.topics.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <Badge variant={speaker.approved ? "default" : "secondary"}>
                      {speaker.approved ? "Approved" : "Pending"}
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

export default AdminSpeakers;
