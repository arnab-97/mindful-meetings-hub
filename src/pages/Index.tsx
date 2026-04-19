import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useEvents, useSpeakers, useVenues } from "@/hooks/useSupabaseData";
import { ArrowRight, Mic, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AnimatedBackground } from "@/components/motion/AnimatedBackground";
import { Spotlight } from "@/components/motion/Spotlight";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";

const headline = ["Where", "Curious", "Minds"];

const Index = () => {
  const { data: events = [] } = useEvents();
  const { data: speakers = [] } = useSpeakers();
  const { data: venues = [] } = useVenues();

  const upcomingEvents = events.slice(0, 6);

  return (
    <Layout>
      {/* Hero */}
      <Spotlight className="relative py-24 md:py-36">
        <AnimatedBackground />
        <div className="container relative">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass text-xs font-medium text-primary"
            >
              <Sparkles className="h-3.5 w-3.5 animate-glow-pulse" />
              Intimate evenings of intellectual exploration
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]">
              {headline.map((word, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block text-gradient-animated"
              >
                Converge
              </motion.span>
            </h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Talks, lectures, and conversations that challenge the way you think.
              Join us in intimate venues for evenings of intellectual exploration.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton>
                <Button asChild size="lg" className="gap-2 shadow-glow hover:shadow-glow-lg transition-shadow">
                  <Link to="/events">
                    Browse Events <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button asChild variant="outline" size="lg" className="border-primary/30 hover:border-primary/60 hover:bg-primary/5">
                  <Link to="/speakers/register">Become a Speaker</Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </Spotlight>

      {/* Stats */}
      <section className="relative border-y border-border/60 bg-card/40 backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="container py-12">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: events.length, label: "Upcoming Events" },
              { value: speakers.length, label: "Expert Speakers" },
              { value: venues.length, label: "Unique Venues" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <p className="font-display text-3xl md:text-5xl font-bold text-gradient">
                  {stat.value}+
                </p>
                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-center mb-10">
              Everything you need to know before attending
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="ticket-price" className="glass rounded-lg mb-3 px-4 border-0 data-[state=open]:shadow-glow transition-shadow">
                <AccordionTrigger className="hover:text-primary">What is included in the ticket price for sessions hosted by Kaffeine?</AccordionTrigger>
                <AccordionContent>
                  Your ticket includes entry to the full session, a curated Q&A with the speaker, light refreshments (non-alcoholic beverages and snacks), and access to our post-event networking mixer. Some premium events may also include exclusive reading materials or digital resources from the speaker.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="duration" className="glass rounded-lg mb-3 px-4 border-0 data-[state=open]:shadow-glow transition-shadow">
                <AccordionTrigger className="hover:text-primary">How long is each session?</AccordionTrigger>
                <AccordionContent>
                  Most sessions run for approximately 2 to 2.5 hours. This typically includes a 60–75 minute talk, a 20–30 minute Q&A, and 30 minutes of informal networking afterward. Exact timings are listed on each event's detail page.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="speaker-register" className="glass rounded-lg mb-3 px-4 border-0 data-[state=open]:shadow-glow transition-shadow">
                <AccordionTrigger className="hover:text-primary">How do I register as a speaker?</AccordionTrigger>
                <AccordionContent>
                  Head over to our <a href="/speakers/register" className="text-primary underline underline-offset-4 hover:text-primary/80">Speaker Registration</a> page and fill out the application form with your bio, topics of expertise, and a brief description of your proposed talk. Our curation team reviews applications on a rolling basis and will get back to you within 7–10 business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="age-bar" className="glass rounded-lg mb-3 px-4 border-0 data-[state=open]:shadow-glow transition-shadow">
                <AccordionTrigger className="hover:text-primary">Is there an age restriction to attend?</AccordionTrigger>
                <AccordionContent>
                  Our events are open to attendees aged 16 and above. Attendees under 18 must be accompanied by a parent or guardian. We believe intellectual curiosity has no age limit, and we welcome young minds eager to learn.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="alcohol" className="glass rounded-lg mb-3 px-4 border-0 data-[state=open]:shadow-glow transition-shadow">
                <AccordionTrigger className="hover:text-primary">Are alcoholic drinks provided at the events?</AccordionTrigger>
                <AccordionContent>
                  Complimentary beverages are non-alcoholic (tea, coffee, juices, and water). However, some of our venue partners have a bar on-site where you can purchase alcoholic beverages separately at your own discretion. Availability varies by venue.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Reveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Upcoming Events</h2>
                <p className="text-muted-foreground mt-2">Don't miss these thought-provoking evenings</p>
              </div>
              <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-primary hover:bg-primary/10">
                <Link to="/events">View all <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </Reveal>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No events yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => (
                <Reveal key={event.id} delay={i * 0.08}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          )}
          <div className="sm:hidden mt-6 text-center">
            <Button asChild variant="outline">
              <Link to="/events">View all events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-16 border-t border-border/60">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Mic,
                title: "Share Your Ideas",
                desc: "Have expertise to share? Apply to become a speaker at Kaffeine.",
                cta: "Apply as Speaker",
                to: "/speakers/register",
              },
              {
                icon: MapPin,
                title: "Host an Event",
                desc: "Own a unique space? List your venue and host intellectually stimulating evenings.",
                cta: "List Your Venue",
                to: "/venues/register",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group relative rounded-xl glass gradient-border p-8 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow h-full">
                  <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/20">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-6">{item.desc}</p>
                  <Button asChild className="shadow-glow hover:shadow-glow-lg transition-shadow">
                    <Link to={item.to}>{item.cta}</Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
