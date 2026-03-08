export interface Speaker {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  topics: string[];
  headshot_url: string;
  approved: boolean;
  created_at: string;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  capacity: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  images: string[];
  approved: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  speaker_id: string;
  venue_id: string;
  capacity: number;
  booked_seats: number;
  price_cents: number;
  currency: string;
  cover_image: string;
  status: "draft" | "published" | "cancelled";
  created_at: string;
}

export interface Booking {
  id: string;
  event_id: string;
  name: string;
  email: string;
  phone: string;
  seats: number;
  status: "pending" | "paid" | "cancelled" | "refunded";
  stripe_payment_id: string;
  created_at: string;
}

export const mockSpeakers: Speaker[] = [
  {
    id: "s1",
    name: "Dr. Anya Mehta",
    email: "anya@example.com",
    phone: "+91 98765 43210",
    bio: "Neuroscientist and author exploring the intersection of consciousness and artificial intelligence. Former researcher at MIT Brain and Cognitive Sciences.",
    topics: ["Neuroscience", "AI Ethics", "Consciousness"],
    headshot_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    approved: true,
    created_at: "2025-01-15",
  },
  {
    id: "s2",
    name: "Rajan Kapoor",
    email: "rajan@example.com",
    phone: "+91 98765 43211",
    bio: "Philosopher and tech entrepreneur. Founded three startups at the intersection of philosophy and product design. TEDx speaker and published author.",
    topics: ["Philosophy", "Design Thinking", "Startups"],
    headshot_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    approved: true,
    created_at: "2025-02-01",
  },
  {
    id: "s3",
    name: "Prof. Lena Johansson",
    email: "lena@example.com",
    phone: "+46 70 123 4567",
    bio: "Climate scientist and policy advisor. Has contributed to three IPCC reports. Passionate about making complex science accessible to general audiences.",
    topics: ["Climate Science", "Sustainability", "Policy"],
    headshot_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    approved: true,
    created_at: "2025-02-10",
  },
  {
    id: "s4",
    name: "Marcus Chen",
    email: "marcus@example.com",
    phone: "+1 415 555 0199",
    bio: "Investigative journalist covering technology's impact on society. Has broken stories on data privacy and algorithmic bias for major publications.",
    topics: ["Journalism", "Tech & Society", "Privacy"],
    headshot_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    approved: true,
    created_at: "2025-03-01",
  },
  {
    id: "s5",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 98765 43212",
    bio: "Quantum physicist and science communicator. Makes quantum mechanics approachable through storytelling and visual analogies.",
    topics: ["Physics", "Quantum Computing", "Science Communication"],
    headshot_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    approved: true,
    created_at: "2025-03-05",
  },
  {
    id: "s6",
    name: "David Okafor",
    email: "david@example.com",
    phone: "+234 802 345 6789",
    bio: "Economist and author specializing in emerging markets and fintech innovation across Africa and South Asia.",
    topics: ["Economics", "Fintech", "Emerging Markets"],
    headshot_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    approved: true,
    created_at: "2025-03-08",
  },
];

export const mockVenues: Venue[] = [
  {
    id: "v1",
    name: "The Basement Sessions",
    address: "42 Church Street, Basement Level",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    latitude: 12.9716,
    longitude: 77.5946,
    capacity: 80,
    contact_name: "Vikram Desai",
    contact_phone: "+91 98765 00001",
    contact_email: "vikram@basement.in",
    images: ["https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop"],
    approved: true,
    created_at: "2025-01-01",
  },
  {
    id: "v2",
    name: "Rooftop Republic",
    address: "15th Floor, Tower B, MG Road",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    latitude: 19.076,
    longitude: 72.8777,
    capacity: 120,
    contact_name: "Meera Patel",
    contact_phone: "+91 98765 00002",
    contact_email: "meera@rooftop.in",
    images: ["https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=500&fit=crop"],
    approved: true,
    created_at: "2025-01-10",
  },
  {
    id: "v3",
    name: "The Thinking Room",
    address: "7 Connaught Place, 2nd Floor",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    latitude: 28.6139,
    longitude: 77.209,
    capacity: 50,
    contact_name: "Arjun Singh",
    contact_phone: "+91 98765 00003",
    contact_email: "arjun@thinkroom.in",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop"],
    approved: true,
    created_at: "2025-02-01",
  },
  {
    id: "v4",
    name: "Analog Bar & Books",
    address: "23 Park Street",
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    latitude: 22.5726,
    longitude: 88.3639,
    capacity: 60,
    contact_name: "Sanjay Ghosh",
    contact_phone: "+91 98765 00004",
    contact_email: "sanjay@analog.in",
    images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop"],
    approved: true,
    created_at: "2025-02-15",
  },
];

export const mockEvents: Event[] = [
  {
    id: "e1",
    title: "The Conscious Machine: Where AI Meets Awareness",
    description: "Dr. Anya Mehta explores the frontier where artificial intelligence intersects with theories of consciousness. Can machines truly think? What does it mean for the future of humanity? A deep dive into neuroscience, philosophy, and cutting-edge AI research.\n\nThis talk will cover:\n- Current theories of consciousness\n- The hard problem of consciousness in AI\n- Ethical implications of sentient machines\n- Interactive Q&A with the audience",
    start_at: "2026-04-15T19:00:00",
    end_at: "2026-04-15T21:00:00",
    speaker_id: "s1",
    venue_id: "v1",
    capacity: 80,
    booked_seats: 52,
    price_cents: 49900,
    currency: "INR",
    cover_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=600&fit=crop",
    status: "published",
    created_at: "2026-03-01",
  },
  {
    id: "e2",
    title: "Design Your Destiny: Philosophy in Product",
    description: "Rajan Kapoor draws from Stoic, Buddhist, and existentialist traditions to reimagine how we design products and build companies. An evening of provocative ideas and practical frameworks.\n\nKey takeaways:\n- Ancient wisdom applied to modern product design\n- The philosophy of user experience\n- Building meaningful startups\n- Finding purpose in creation",
    start_at: "2026-04-22T18:30:00",
    end_at: "2026-04-22T20:30:00",
    speaker_id: "s2",
    venue_id: "v2",
    capacity: 120,
    booked_seats: 78,
    price_cents: 39900,
    currency: "INR",
    cover_image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop",
    status: "published",
    created_at: "2026-03-05",
  },
  {
    id: "e3",
    title: "Climate Reality: What Science Actually Says",
    description: "Prof. Lena Johansson cuts through the noise to present what climate science actually tells us — and what it doesn't. A data-driven, myth-busting evening for curious minds.\n\nTopics include:\n- Latest IPCC findings demystified\n- Separating fact from alarmism\n- Actionable steps for individuals and businesses\n- The role of policy and technology",
    start_at: "2026-05-03T19:00:00",
    end_at: "2026-05-03T21:00:00",
    speaker_id: "s3",
    venue_id: "v3",
    capacity: 50,
    booked_seats: 12,
    price_cents: 29900,
    currency: "INR",
    cover_image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=600&fit=crop",
    status: "published",
    created_at: "2026-03-08",
  },
  {
    id: "e4",
    title: "Surveillance Capitalism & You",
    description: "Marcus Chen investigates the invisible economy built on your personal data. Who's watching, what they know, and what you can do about it.\n\nThis investigative talk covers:\n- How your data is collected and sold\n- Algorithmic manipulation in daily life\n- Case studies from major tech companies\n- Practical privacy protection strategies",
    start_at: "2026-05-10T19:00:00",
    end_at: "2026-05-10T21:00:00",
    speaker_id: "s4",
    venue_id: "v4",
    capacity: 60,
    booked_seats: 35,
    price_cents: 34900,
    currency: "INR",
    cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    status: "published",
    created_at: "2026-03-08",
  },
  {
    id: "e5",
    title: "Quantum Leaps: Understanding the Unthinkable",
    description: "Priya Sharma makes quantum mechanics not just understandable but exciting. Through vivid analogies and interactive demonstrations, explore the bizarre world beneath reality.\n\nWhat you'll experience:\n- Quantum concepts without equations\n- The double-slit experiment re-imagined\n- Quantum computing's real potential\n- How quantum physics shapes your everyday life",
    start_at: "2026-05-18T18:00:00",
    end_at: "2026-05-18T20:30:00",
    speaker_id: "s5",
    venue_id: "v1",
    capacity: 80,
    booked_seats: 0,
    price_cents: 44900,
    currency: "INR",
    cover_image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop",
    status: "published",
    created_at: "2026-03-08",
  },
  {
    id: "e6",
    title: "The Future of Money in Emerging Markets",
    description: "David Okafor charts the fintech revolution transforming how billions of people interact with money — from mobile payments to DeFi and beyond.",
    start_at: "2026-06-01T19:00:00",
    end_at: "2026-06-01T21:00:00",
    speaker_id: "s6",
    venue_id: "v2",
    capacity: 120,
    booked_seats: 5,
    price_cents: 0,
    currency: "INR",
    cover_image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=600&fit=crop",
    status: "published",
    created_at: "2026-03-08",
  },
];

export const mockBookings: Booking[] = [
  { id: "b1", event_id: "e1", name: "Aisha Khan", email: "aisha@mail.com", phone: "+91 99887 76655", seats: 2, status: "paid", stripe_payment_id: "pi_3abc123", created_at: "2026-03-10" },
  { id: "b2", event_id: "e1", name: "Rohan Gupta", email: "rohan@mail.com", phone: "+91 99887 76656", seats: 1, status: "paid", stripe_payment_id: "pi_3abc124", created_at: "2026-03-11" },
  { id: "b3", event_id: "e2", name: "Sneha Iyer", email: "sneha@mail.com", phone: "+91 99887 76657", seats: 3, status: "paid", stripe_payment_id: "pi_3abc125", created_at: "2026-03-12" },
  { id: "b4", event_id: "e2", name: "Amit Verma", email: "amit@mail.com", phone: "+91 99887 76658", seats: 1, status: "pending", stripe_payment_id: "", created_at: "2026-03-13" },
  { id: "b5", event_id: "e3", name: "Fatima Ali", email: "fatima@mail.com", phone: "+91 99887 76659", seats: 2, status: "paid", stripe_payment_id: "pi_3abc126", created_at: "2026-03-14" },
  { id: "b6", event_id: "e4", name: "Chen Wei", email: "chen@mail.com", phone: "+86 138 0013 8000", seats: 1, status: "cancelled", stripe_payment_id: "pi_3abc127", created_at: "2026-03-15" },
  { id: "b7", event_id: "e1", name: "Nandini Rao", email: "nandini@mail.com", phone: "+91 99887 76660", seats: 4, status: "paid", stripe_payment_id: "pi_3abc128", created_at: "2026-03-16" },
];

export function getSpeaker(id: string): Speaker | undefined {
  return mockSpeakers.find((s) => s.id === id);
}

export function getVenue(id: string): Venue | undefined {
  return mockVenues.find((v) => v.id === id);
}

export function getEvent(id: string): Event | undefined {
  return mockEvents.find((e) => e.id === id);
}

export function formatPrice(cents: number, currency: string): string {
  if (cents === 0) return "Free";
  const amount = cents / 100;
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
