export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl animate-orb-drift" />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-primary-glow/10 blur-3xl animate-orb-drift"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[450px] w-[450px] rounded-full bg-primary/10 blur-3xl animate-orb-drift"
        style={{ animationDelay: "-12s" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_75%)]" />
    </div>
  );
}
