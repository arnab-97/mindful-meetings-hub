import { Layout } from "@/components/layout/Layout";

const Terms = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Terms of Service</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
        <p>Last updated: March 2026</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">1. Acceptance of Terms</h2>
        <p>By accessing and using The Gray Matter Club website and services, you accept and agree to be bound by these Terms of Service.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">2. Event Bookings</h2>
        <p>All bookings are subject to availability. Payment is processed securely via Stripe. Confirmation emails will be sent upon successful payment.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">3. Cancellation & Refunds</h2>
        <p>Cancellations made 48 hours before the event are eligible for a full refund. Cancellations within 48 hours may receive a partial refund at our discretion. No-shows are not eligible for refunds.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">4. Code of Conduct</h2>
        <p>All attendees are expected to engage respectfully. Harassment, discrimination, or disruptive behavior will not be tolerated and may result in removal from the event without refund.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">5. Intellectual Property</h2>
        <p>All content, branding, and materials remain the property of The Gray Matter Club unless otherwise stated. Recording of talks is not permitted without explicit permission.</p>
      </div>
    </div>
  </Layout>
);

export default Terms;
