import { Layout } from "@/components/layout/Layout";

const Privacy = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
        <p>
          At Kaffeine, we value your privacy.
        </p>
        <p>
          We collect basic details like your name, email, and phone number only to process registrations and keep you updated about our events.
        </p>
        <p>
          By using our website and registering for events, you agree to this policy.
        </p>
        <p>
          If you have any questions, feel free to contact us at{" "}
          <a href="mailto:infokaffeine@gmail.com" className="text-primary underline underline-offset-4 hover:text-primary/80">
            infokaffeine@gmail.com
          </a>
        </p>
      </div>
    </div>
  </Layout>
);

export default Privacy;
