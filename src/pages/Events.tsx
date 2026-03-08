import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents, useSpeakers, useVenues } from "@/hooks/useSupabaseData";
import { Search } from "lucide-react";

const EventsPage = () => {
  const [search, setSearch] = useState("");
  const [speakerFilter, setSpeakerFilter] = useState("all");
  const [venueFilter, setVenueFilter] = useState("all");

  const { data: events = [], isLoading } = useEvents();
  const { data: speakers = [] } = useSpeakers();
  const { data: venues = [] } = useVenues();

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchSpeaker = speakerFilter === "all" || e.speaker_id === speakerFilter;
      const matchVenue = venueFilter === "all" || e.venue_id === venueFilter;
      return matchSearch && matchSpeaker && matchVenue;
    });
  }, [events, search, speakerFilter, venueFilter]);

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Events</h1>
        <p className="text-muted-foreground mb-8">Discover talks and lectures that expand your mind</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={speakerFilter} onValueChange={setSpeakerFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Speaker" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Speakers</SelectItem>
              {speakers.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={venueFilter} onValueChange={setVenueFilter}>
            <SelectTrigger className="w-full sm:w-48"><SelectValue placeholder="Venue" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Venues</SelectItem>
              {venues.map((v) => (
                <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-16 text-muted-foreground">Loading events...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No events found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EventsPage;
