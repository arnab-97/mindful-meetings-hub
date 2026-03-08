import { Layout } from "@/components/layout/Layout";
import { SpeakerCard } from "@/components/SpeakerCard";
import { Button } from "@/components/ui/button";
import { useSpeakers } from "@/hooks/useSupabaseData";
import { Link } from "react-router-dom";

const SpeakersPage = () => {
  const { data: speakers = [], isLoading } = useSpeakers();

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Speakers</h1>
            <p className="text-muted-foreground">Meet the brilliant minds behind our events</p>
          </div>
          <Button asChild>
            <Link to="/speakers/register">Become a Speaker</Link>
          </Button>
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Loading speakers...</p>
        ) : speakers.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No speakers yet. Be the first to apply!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SpeakersPage;
