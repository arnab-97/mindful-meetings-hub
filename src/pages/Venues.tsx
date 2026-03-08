import { Layout } from "@/components/layout/Layout";
import { VenueCard } from "@/components/VenueCard";
import { Button } from "@/components/ui/button";
import { useVenues } from "@/hooks/useSupabaseData";
import { Link } from "react-router-dom";

const VenuesPage = () => {
  const { data: venues = [], isLoading } = useVenues();

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Venues</h1>
            <p className="text-muted-foreground">Discover the unique spaces hosting our events</p>
          </div>
          <Button asChild>
            <Link to="/venues/register">List Your Venue</Link>
          </Button>
        </div>
        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Loading venues...</p>
        ) : venues.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No venues yet. List yours!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VenuesPage;
