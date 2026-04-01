import { Layout } from "@/components/layout/Layout";

const Terms = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">
        Terms &amp; Conditions
      </h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed text-sm">
        <p>
          Welcome to the Society of Intellectuals (SOI). By registering for and
          attending our events, you agree to the following:
        </p>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">
            1. Respectful Participation
          </h2>
          <p>
            We encourage open dialogue and sharing of ideas in a respectful
            manner.
          </p>
          <p>
            Any behavior that disturbs the decorum of the session will not be
            tolerated. Society of Intellectuals reserves the right to ask such
            participants to leave the event immediately.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">
            2. Cancellation &amp; Refunds
          </h2>
          <p>
            Our cancellation and refund policy is outlined at{" "}
            <a
              href="https://societyofintellectuals.org/cancellation-%26-refund"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              societyofintellectuals.org/cancellation-&amp;-refund
            </a>
            . By registering, you agree to this policy.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">
            3. Personal Belongings / Details
          </h2>
          <p>
            Please take care of your personal belongings during the event.
            Society of Intellectuals will not be responsible for any loss or
            misplacement.
          </p>
          <p>
            Sharing of personal information with other participants or members is
            entirely at your own discretion and responsibility.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">
            4. Use of Content
          </h2>
          <p>
            Any presentations, materials, or resources shared during SOI events
            are for personal learning only. Recording or redistribution is not
            permitted without prior consent.
          </p>
          <p>
            By paying for the seat / buying the ticket, you give us consent to
            record the videos, photos during the session for our social media
            usage and promotional purpose.
          </p>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-secondary/50 border border-border">
          <p className="text-foreground font-medium text-sm">
            By registering for an event, you confirm that you have read and
            agreed to these Terms &amp; Conditions.
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export default Terms;
