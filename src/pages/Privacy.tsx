import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/motion/Reveal";

const Privacy = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Privacy Policy</h1>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="glass rounded-xl p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed text-sm">
          <p>At Kaffeine, we value your privacy.</p>
          <p>
            We collect basic details like your name, email, and phone number only to process registrations and keep you updated about our events.
          </p>
          <p>By using our website and registering for events, you agree to this policy.</p>
          <p>
            If you have any questions, feel free to contact us at{" "}
            <a href="mailto:infokaffeine@gmail.com" className="text-primary underline underline-offset-4 hover:text-primary/80">
              infokaffeine@gmail.com
            </a>
          </p>
        </div>
      </Reveal>
    </div>
  </Layout>
);

export default Privacy;
