
-- Enums
CREATE TYPE public.event_status AS ENUM ('draft', 'published', 'cancelled');
CREATE TYPE public.booking_status AS ENUM ('pending', 'paid', 'cancelled', 'refunded');
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Speakers
CREATE TABLE public.speakers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  bio TEXT NOT NULL DEFAULT '',
  topics TEXT[] NOT NULL DEFAULT '{}',
  headshot_url TEXT,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Venues
CREATE TABLE public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT NOT NULL DEFAULT 'India',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  capacity INTEGER NOT NULL DEFAULT 50,
  contact_name TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  start_at TIMESTAMPTZ NOT NULL,
  end_at TIMESTAMPTZ NOT NULL,
  speaker_id UUID REFERENCES public.speakers(id) ON DELETE SET NULL,
  venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL,
  capacity INTEGER NOT NULL DEFAULT 50,
  booked_seats INTEGER NOT NULL DEFAULT 0,
  price_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'INR',
  cover_image TEXT,
  status event_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Bookings
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  seats INTEGER NOT NULL DEFAULT 1,
  status booking_status NOT NULL DEFAULT 'pending',
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Enable RLS on all tables
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Speakers: public read approved, anyone can insert (registration), admin full access
CREATE POLICY "Public read approved speakers" ON public.speakers
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can register as speaker" ON public.speakers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins full access speakers" ON public.speakers
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Venues: public read approved, anyone can insert (registration), admin full access
CREATE POLICY "Public read approved venues" ON public.venues
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can register venue" ON public.venues
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins full access venues" ON public.venues
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Events: public read published, admin full access
CREATE POLICY "Public read published events" ON public.events
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins full access events" ON public.events
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Bookings: users read own, anyone can insert, admin full access
CREATE POLICY "Anyone can create booking" ON public.bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins full access bookings" ON public.bookings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- User roles: admin can manage, users can read own
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('speaker-photos', 'speaker-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('venue-photos', 'venue-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true);

-- Storage policies: public read, authenticated upload
CREATE POLICY "Public read speaker photos" ON storage.objects FOR SELECT USING (bucket_id = 'speaker-photos');
CREATE POLICY "Anyone upload speaker photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'speaker-photos');
CREATE POLICY "Public read venue photos" ON storage.objects FOR SELECT USING (bucket_id = 'venue-photos');
CREATE POLICY "Anyone upload venue photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'venue-photos');
CREATE POLICY "Public read event images" ON storage.objects FOR SELECT USING (bucket_id = 'event-images');
CREATE POLICY "Admins upload event images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'event-images' AND public.has_role(auth.uid(), 'admin'));
