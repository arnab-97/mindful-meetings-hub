import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/motion/Reveal";

const sections = [
  {
    title: "1. Respectful Participation",
    body: [
      "We encourage open dialogue and sharing of ideas in a respectful manner.",
      "Any behavior that disturbs the decorum of the session will not be tolerated. Kaffeine reserves the right to ask such participants to leave the event immediately.",
    ],
  },
  {
    title: "2. Cancellation & Refunds",
    body: [
      "Our cancellation and refund policy is outlined on our website. By registering, you agree to this policy.",
    ],
  },
  {
    title: "3. Personal Belongings / Details",
    body: [
      "Please take care of your personal belongings during the event. Kaffeine will not be responsible for any loss or misplacement.",
      "Sharing of personal information with other participants or members is entirely at your own discretion and responsibility.",
    ],
  },
  {
    title: "4. Use of Content",
    body: [
      "Any presentations, materials, or resources shared during Kaffeine events are for personal learning only. Recording or redistribution is not permitted without prior consent.",
      "By paying for the seat / buying the ticket, you give us consent to record the videos, photos during the session for our social media usage and promotional purpose.",
    ],
  },
];

const Terms = () => (
  <Layout>
    <div className="container py-12 md:py-16 max-w-3xl mx-auto">
      <Reveal>
        <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">Terms & Conditions</h1>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="text-muted-foreground leading-relaxed text-sm mb-8">
          Welcome to Kaffeine. By registering for and attending our events, you agree to the following:
        </p>
      </Reveal>

      <div className="space-y-4">
        {sections.map((s, i) => (
          <Reveal key={s.title} delay={0.05 + i * 0.05}>
            <div className="glass rounded-xl p-6 transition-shadow hover:shadow-glow">
              <h2 className="font-display text-xl font-semibold text-foreground mb-2">{s.title}</h2>
              {s.body.map((p, j) => (
                <p key={j} className={`text-sm text-muted-foreground leading-relaxed ${j > 0 ? "mt-2" : ""}`}>{p}</p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="pt-8 text-foreground font-medium text-sm">
          By registering for an event, you confirm that you have read and agreed to these Terms & Conditions.
        </p>
      </Reveal>
    </div>
  </Layout>
);

export default Terms;
