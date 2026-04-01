import { Layout } from "@/components/layout/Layout";

const Privacy = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Privacy Policy</h1>
      <div className="space-y-4 text-muted-foreground leading-relaxed text-sm">
        <p>Last updated: March 2026</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">1. Information We Collect</h2>
        <p>We collect personal information you provide when booking events (name, email, phone), submitting speaker or venue applications, or contacting us.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">2. How We Use Your Information</h2>
        <p>Your data is used to process bookings, send event confirmations, communicate about upcoming events, and improve our services.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">3. Data Security</h2>
        <p>We use industry-standard security measures. Payment processing is handled by Stripe and we never store your card details directly.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">4. Third-Party Services</h2>
        <p>We use Stripe for payments, Supabase for data storage, and may use email services for transactional emails. Each service has its own privacy policy.</p>
        <h2 className="font-display text-xl font-semibold text-foreground pt-4">5. Your Rights</h2>
        <p>You may request access to, correction of, or deletion of your personal data by contacting us at hello@graymatterclub.com.</p>
      </div>
    </div>
  </Layout>
);

export default Privacy;
