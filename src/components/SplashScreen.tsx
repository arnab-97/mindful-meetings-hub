import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onDone: () => void;
  duration?: number;
}

const WORD = "Kaffeine";

export function SplashScreen({ onDone, duration = 1800 }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = prefersReducedMotion ? 600 : duration;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / total) * 100);
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);

    const timer = window.setTimeout(onDone, total);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [duration, onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Drifting amber orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl animate-orb-drift" />
        <div
          className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary-glow/15 blur-3xl animate-orb-drift"
          style={{ animationDelay: "-6s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_75%)]" />
      </div>

      <div className="relative flex flex-col items-center gap-8 px-6">
        {/* Logo mark with rotating ring */}
        <div className="relative h-28 w-28">
          {/* Rotating conic gradient ring */}
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, hsl(var(--primary)) 0%, hsl(var(--primary-glow) / 0.6) 25%, transparent 50%, hsl(var(--primary) / 0.3) 75%, hsl(var(--primary)) 100%)",
              maskImage: "radial-gradient(circle, transparent 58%, black 60%)",
              WebkitMaskImage: "radial-gradient(circle, transparent 58%, black 60%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner disc */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-2 rounded-full glass-strong flex items-center justify-center shadow-glow-lg animate-glow-pulse"
          >
            <span className="font-display text-4xl font-bold text-gradient">K</span>
          </motion.div>
        </div>

        {/* Wordmark with staggered letters */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-display text-5xl sm:text-6xl font-semibold tracking-tight">
            {WORD.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-foreground"
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
            className="text-sm sm:text-base text-muted-foreground tracking-[0.25em] uppercase"
          >
            Where minds converge
          </motion.p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-border/40 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary-glow to-primary shadow-glow"
          style={{ width: `${progress}%`, backgroundSize: "200% 100%" }}
          animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
