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
    <Card className="overflow-hidden border-border/50 bg-card hover:border-primary/30 transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={speaker.headshot_url || "/placeholder.svg"}
          alt={speaker.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <CardContent className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1">{speaker.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{speaker.bio}</p>
        <div className="flex flex-wrap gap-1.5">
          {speaker.topics.map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs font-body">{topic}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
