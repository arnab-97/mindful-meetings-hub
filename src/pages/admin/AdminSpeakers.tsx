import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSpeakers, useUpdateSpeaker } from "@/hooks/useSupabaseData";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminSpeakers = () => {
  const { toast } = useToast();
  const { data: speakers = [], isLoading } = useSpeakers(false);
  const updateSpeaker = useUpdateSpeaker();

  const handleApprove = async (id: string) => {
    try {
      await updateSpeaker.mutateAsync({ id, approved: true });
      toast({ title: "Speaker approved!" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateSpeaker.mutateAsync({ id, approved: false });
      toast({ title: "Speaker rejected" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

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
              {isLoading ? (
                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading...</td></tr>
              ) : speakers.length === 0 ? (
                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No speakers yet</td></tr>
              ) : (
                speakers.map((speaker) => (
                  <tr key={speaker.id} className="border-b border-border last:border-0">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={speaker.headshot_url || "/placeholder.svg"} alt={speaker.name} className="h-8 w-8 rounded-full object-cover" />
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
                        <Button variant="ghost" size="icon" onClick={() => handleApprove(speaker.id)} disabled={updateSpeaker.isPending}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleReject(speaker.id)} disabled={updateSpeaker.isPending}>
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

export default AdminSpeakers;
