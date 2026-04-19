import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/40 blur-md animate-glow-pulse" aria-hidden />
                <div className="relative h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-primary-foreground">K</span>
                </div>
              </div>
              <span className="font-display text-lg font-semibold text-foreground">
                Kaffeine
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Where curious minds converge. Talks, lectures, and conversations that challenge the way you think.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Explore</h4>
            <div className="flex flex-col gap-2">
              <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link w-fit">Events</Link>
              <Link to="/speakers" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link w-fit">Speakers</Link>
              <Link to="/venues" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link w-fit">Venues</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-4">Info</h4>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link w-fit">About</Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link w-fit">Contact</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link w-fit">Terms</Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors story-link w-fit">Privacy</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Kaffeine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
