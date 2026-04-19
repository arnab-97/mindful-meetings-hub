import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/motion/Reveal";

const Divider = () => (
  <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
);

const About = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-2">
          About <span className="text-gradient-animated">Kaffeine</span>
        </h1>
      </Reveal>
      <div className="space-y-6 text-muted-foreground leading-relaxed mt-6">
        <Reveal delay={0.05}>
          <p>
            Kaffeine was born from a simple belief: that the most transformative experiences happen when curious minds gather in intimate settings to explore ideas that matter.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            We curate talks, lectures, and conversations featuring brilliant thinkers from science, philosophy, technology, art, and beyond. Our events take place in carefully selected venues — basement bars, rooftop terraces, bookshops, and hidden spaces — that foster genuine connection and intellectual exploration.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p>
            Unlike massive conferences or impersonal webinars, every Kaffeine event is designed for depth. Small audiences. Generous Q&A. Post-talk conversations over drinks. We believe that understanding begins where PowerPoint slides end.
          </p>
        </Reveal>

        <Divider />

        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-foreground">Our Mission</h2>
          <p className="mt-3">
            To create spaces where complex ideas become accessible, where experts and enthusiasts meet as equals, and where an evening of intellectual exploration feels like the best night out you've had in months.
          </p>
        </Reveal>

        <Divider />

        <Reveal>
          <h2 className="font-display text-2xl font-semibold text-foreground">Who We Are</h2>
          <p className="mt-3">
            We're a small team of lifelong learners, event designers, and community builders based across India. We partner with speakers, venues, and organizations that share our passion for making knowledge social.
          </p>
        </Reveal>
      </div>
    </div>
  </Layout>
);

export default About;
