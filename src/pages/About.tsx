import { Layout } from "@/components/layout/Layout";

const About = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">About The Gray Matter Club</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          The Gray Matter Club was born from a simple belief: that the most transformative experiences happen when curious minds gather in intimate settings to explore ideas that matter.
        </p>
        <p>
          We curate talks, lectures, and conversations featuring brilliant thinkers from science, philosophy, technology, art, and beyond. Our events take place in carefully selected venues — basement bars, rooftop terraces, bookshops, and hidden spaces — that foster genuine connection and intellectual exploration.
        </p>
        <p>
          Unlike massive conferences or impersonal webinars, every Gray Matter event is designed for depth. Small audiences. Generous Q&A. Post-talk conversations over drinks. We believe that understanding begins where PowerPoint slides end.
        </p>
        <h2 className="font-display text-2xl font-semibold text-foreground pt-4">Our Mission</h2>
        <p>
          To create spaces where complex ideas become accessible, where experts and enthusiasts meet as equals, and where an evening of intellectual exploration feels like the best night out you've had in months.
        </p>
        <h2 className="font-display text-2xl font-semibold text-foreground pt-4">Who We Are</h2>
        <p>
          We're a small team of lifelong learners, event designers, and community builders based across India. We partner with speakers, venues, and organizations that share our passion for making knowledge social.
        </p>
      </div>
    </div>
  </Layout>
);

export default About;
