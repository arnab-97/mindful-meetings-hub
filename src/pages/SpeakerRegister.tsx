import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCreateSpeaker, uploadFile } from "@/hooks/useSupabaseData";
import { CheckCircle } from "lucide-react";

const SpeakerRegister = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const createSpeaker = useCreateSpeaker();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      let headshot_url: string | undefined;
      const headshotFile = (form.querySelector('#headshot') as HTMLInputElement)?.files?.[0];
      if (headshotFile) {
        const path = `${Date.now()}-${headshotFile.name}`;
        headshot_url = await uploadFile("speaker-photos", path, headshotFile);
      }

      await createSpeaker.mutateAsync({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: (formData.get("phone") as string) || undefined,
        bio: formData.get("bio") as string,
        topics: (formData.get("topics") as string).split(",").map((t) => t.trim()).filter(Boolean),
        headshot_url,
      });

      setSubmitted(true);
      toast({ title: "Application submitted!", description: "We'll review your application and get back to you." });
    } catch (err: any) {
      toast({ title: "Error submitting", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="container py-24 text-center max-w-md mx-auto">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Application Submitted!</h1>
          <p className="text-muted-foreground">Thank you for your interest. We'll review your application and be in touch soon.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12 md:py-16 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Become a Speaker</h1>
        <p className="text-muted-foreground mb-8">Share your expertise with curious minds. Fill out the form below to apply.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" required placeholder="Dr. Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required placeholder="jane@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea id="bio" name="bio" required rows={4} placeholder="Tell us about your background, expertise, and what makes your perspective unique..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="topics">Topics (comma-separated) *</Label>
            <Input id="topics" name="topics" required placeholder="AI, Philosophy, Neuroscience" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headshot">Headshot</Label>
            <Input id="headshot" type="file" accept="image/*" />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default SpeakerRegister;
