import { Layout } from "@/components/layout/Layout";

const Terms = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Terms & Conditions</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
        <p>
          Welcome to Kaffeine. By registering for and attending our events, you agree to the following:
        </p>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">1. Respectful Participation</h2>
          <p>
            We encourage open dialogue and sharing of ideas in a respectful manner.
          </p>
          <p className="mt-2">
            Any behavior that disturbs the decorum of the session will not be tolerated. Kaffeine reserves the right to ask such participants to leave the event immediately.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">2. Cancellation & Refunds</h2>
          <p>
            Our cancellation and refund policy is outlined on our website. By registering, you agree to this policy.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">3. Personal Belongings / Details</h2>
          <p>
            Please take care of your personal belongings during the event. Kaffeine will not be responsible for any loss or misplacement.
          </p>
          <p className="mt-2">
            Sharing of personal information with other participants or members is entirely at your own discretion and responsibility.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold text-foreground mb-2">4. Use of Content</h2>
          <p>
            Any presentations, materials, or resources shared during Kaffeine events are for personal learning only. Recording or redistribution is not permitted without prior consent.
          </p>
          <p className="mt-2">
            By paying for the seat / buying the ticket, you give us consent to record the videos, photos during the session for our social media usage and promotional purpose.
          </p>
        </div>

        <p className="pt-4 text-foreground font-medium">
          By registering for an event, you confirm that you have read and agreed to these Terms & Conditions.
        </p>
      </div>
    </div>
  </Layout>
);

export default Terms;
