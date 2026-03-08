import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-display text-sm font-bold text-primary-foreground">G</span>
              </div>
              <span className="font-display text-lg font-semibold text-foreground">
                The Gray Matter Club
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Where curious minds converge. Talks, lectures, and conversations that challenge the way you think.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">Events</Link>
              <Link to="/speakers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Speakers</Link>
              <Link to="/venues" className="text-sm text-muted-foreground hover:text-primary transition-colors">Venues</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Info</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} The Gray Matter Club. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
