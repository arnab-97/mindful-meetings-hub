import { Layout } from "@/components/layout/Layout";
import { SpeakerCard } from "@/components/SpeakerCard";
import { Button } from "@/components/ui/button";
import { useSpeakers } from "@/hooks/useSupabaseData";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/motion/Reveal";

const SpeakersPage = () => {
  const { data: speakers = [], isLoading } = useSpeakers();

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">Speakers</h1>
              <p className="text-muted-foreground">Meet the brilliant minds behind our events</p>
            </div>
            <Button asChild className="shadow-glow hover:shadow-glow-lg transition-shadow">
              <Link to="/speakers/register">Become a Speaker</Link>
            </Button>
          </div>
        </Reveal>
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Loading speakers...</p>
        ) : speakers.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No speakers yet. Be the first to apply!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {speakers.map((speaker, i) => (
              <Reveal key={speaker.id} delay={Math.min(i * 0.06, 0.4)}>
                <SpeakerCard speaker={speaker} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SpeakersPage;
