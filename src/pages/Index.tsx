import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { useEvents, useSpeakers, useVenues } from "@/hooks/useSupabaseData";
import { ArrowRight, Mic, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  const { data: events = [] } = useEvents();
  const { data: speakers = [] } = useSpeakers();
  const { data: venues = [] } = useVenues();

  const upcomingEvents = events.slice(0, 6);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Where Curious Minds{" "}
              <span className="text-gradient">Converge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Talks, lectures, and conversations that challenge the way you think.
              Join us in intimate venues for evenings of intellectual exploration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link to="/events">
                  Browse Events <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/speakers/register">Become a Speaker</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/50">
        <div className="container py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{events.length}+</p>
              <p className="text-sm text-muted-foreground mt-1">Upcoming Events</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{speakers.length}+</p>
              <p className="text-sm text-muted-foreground mt-1">Expert Speakers</p>
            </div>
            <div>
              <p className="font-display text-3xl md:text-4xl font-bold text-primary">{venues.length}</p>
              <p className="text-sm text-muted-foreground mt-1">Unique Venues</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-center mb-10">
            Everything you need to know before attending
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="ticket-price">
              <AccordionTrigger>What is included in the ticket price for sessions hosted by The Gray Matter Club?</AccordionTrigger>
              <AccordionContent>
                Your ticket includes entry to the full session, a curated Q&A with the speaker, light refreshments (non-alcoholic beverages and snacks), and access to our post-event networking mixer. Some premium events may also include exclusive reading materials or digital resources from the speaker.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="duration">
              <AccordionTrigger>How long is each session?</AccordionTrigger>
              <AccordionContent>
                Most sessions run for approximately 2 to 2.5 hours. This typically includes a 60–75 minute talk, a 20–30 minute Q&A, and 30 minutes of informal networking afterward. Exact timings are listed on each event's detail page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="speaker-register">
              <AccordionTrigger>How do I register as a speaker?</AccordionTrigger>
              <AccordionContent>
                Head over to our <a href="/speakers/register" className="text-primary underline underline-offset-4 hover:text-primary/80">Speaker Registration</a> page and fill out the application form with your bio, topics of expertise, and a brief description of your proposed talk. Our curation team reviews applications on a rolling basis and will get back to you within 7–10 business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="age-bar">
              <AccordionTrigger>Is there an age restriction to attend?</AccordionTrigger>
              <AccordionContent>
                Our events are open to attendees aged 16 and above. Attendees under 18 must be accompanied by a parent or guardian. We believe intellectual curiosity has no age limit, and we welcome young minds eager to learn.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="alcohol">
              <AccordionTrigger>Are alcoholic drinks provided at the events?</AccordionTrigger>
              <AccordionContent>
                Complimentary beverages are non-alcoholic (tea, coffee, juices, and water). However, some of our venue partners have a bar on-site where you can purchase alcoholic beverages separately at your own discretion. Availability varies by venue.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Upcoming Events</h2>
              <p className="text-muted-foreground mt-2">Don't miss these thought-provoking evenings</p>
            </div>
            <Button asChild variant="ghost" className="hidden sm:flex gap-1 text-primary">
              <Link to="/events">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No events yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
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
      <section className="py-16 border-t border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-border bg-card p-8 md:p-10">
              <Mic className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Share Your Ideas</h3>
              <p className="text-muted-foreground mb-6">
                Have expertise to share? Apply to become a speaker at The Gray Matter Club.
              </p>
              <Button asChild>
                <Link to="/speakers/register">Apply as Speaker</Link>
              </Button>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 md:p-10">
              <MapPin className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Host an Event</h3>
              <p className="text-muted-foreground mb-6">
                Own a unique space? List your venue and host intellectually stimulating evenings.
              </p>
              <Button asChild>
                <Link to="/venues/register">List Your Venue</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
