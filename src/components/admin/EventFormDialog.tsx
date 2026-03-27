import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateEvent, useUpdateEvent, useSpeakers, useVenues, uploadFile } from "@/hooks/useSupabaseData";
import { useToast } from "@/hooks/use-toast";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editEvent?: {
    id: string;
    title: string;
    description: string;
    start_at: string;
    end_at: string;
    speaker_id: string | null;
    venue_id: string | null;
    capacity: number;
    price: number;
    currency: string;
    cover_image: string | null;
    status: string;
  } | null;
}

export function EventFormDialog({ open, onOpenChange, editEvent }: EventFormDialogProps) {
  const { toast } = useToast();
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const { data: speakers = [] } = useSpeakers(false);
  const { data: venues = [] } = useVenues(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [speakerId, setSpeakerId] = useState<string>("none");
  const [venueId, setVenueId] = useState<string>("none");
  const [capacity, setCapacity] = useState("50");
  const [priceCents, setPriceCents] = useState("0");
  const [currency] = useState("INR");
  const [status, setStatus] = useState("draft");
  const [coverFile, setCoverFile] = useState<File | null>(null);

  useEffect(() => {
    if (editEvent) {
      setTitle(editEvent.title);
      setDescription(editEvent.description);
      setStartAt(editEvent.start_at.slice(0, 16));
      setEndAt(editEvent.end_at.slice(0, 16));
      setSpeakerId(editEvent.speaker_id || "none");
      setVenueId(editEvent.venue_id || "none");
      setCapacity(String(editEvent.capacity));
      setPriceCents(String(editEvent.price));
      setStatus(editEvent.status);
    } else {
      setTitle(""); setDescription(""); setStartAt(""); setEndAt("");
      setSpeakerId("none"); setVenueId("none"); setCapacity("50");
      setPriceCents("0"); setStatus("draft"); setCoverFile(null);
    }
  }, [editEvent, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let cover_image = editEvent?.cover_image || null;
      if (coverFile) {
        const path = `${Date.now()}-${coverFile.name}`;
        cover_image = await uploadFile("event-images", path, coverFile);
      }

      const payload = {
        title,
        description,
        start_at: new Date(startAt).toISOString(),
        end_at: new Date(endAt).toISOString(),
        speaker_id: speakerId === "none" ? null : speakerId,
        venue_id: venueId === "none" ? null : venueId,
        capacity: Number(capacity),
        price: Number(priceCents),
        currency,
        cover_image,
        status,
      };

      if (editEvent) {
        await updateEvent.mutateAsync({ id: editEvent.id, ...payload });
        toast({ title: "Event updated!" });
      } else {
        await createEvent.mutateAsync(payload);
        toast({ title: "Event created!" });
      }
      onOpenChange(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const isPending = createEvent.isPending || updateEvent.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">{editEvent ? "Edit Event" : "Create Event"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="evt-title">Title *</Label>
            <Input id="evt-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="evt-desc">Description</Label>
            <Textarea id="evt-desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="evt-start">Start *</Label>
              <Input id="evt-start" type="datetime-local" value={startAt} onChange={(e) => setStartAt(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evt-end">End *</Label>
              <Input id="evt-end" type="datetime-local" value={endAt} onChange={(e) => setEndAt(e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Speaker</Label>
              <Select value={speakerId} onValueChange={setSpeakerId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {speakers.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Venue</Label>
              <Select value={venueId} onValueChange={setVenueId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {venues.map((v) => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="evt-cap">Capacity</Label>
              <Input id="evt-cap" type="number" min="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evt-price">Price (paise/cents)</Label>
              <Input id="evt-price" type="number" min="0" value={priceCents} onChange={(e) => setPriceCents(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="evt-cover">Cover Image</Label>
            <Input id="evt-cover" type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : editEvent ? "Update Event" : "Create Event"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
