import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface SpeakerCardSpeaker {
  id: string;
  name: string;
  bio: string;
  topics: string[];
  headshot_url: string | null;
}

export function SpeakerCard({ speaker }: { speaker: SpeakerCardSpeaker }) {
  return (
    <Card className="group relative overflow-hidden glass gradient-border rounded-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-glow">
      <div className="aspect-square overflow-hidden">
        <img
          src={speaker.headshot_url || "/placeholder.svg"}
          alt={speaker.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 transition-colors group-hover:text-primary">{speaker.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{speaker.bio}</p>
        <div className="flex flex-wrap gap-1.5">
          {speaker.topics.map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs font-body border border-primary/20">{topic}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
