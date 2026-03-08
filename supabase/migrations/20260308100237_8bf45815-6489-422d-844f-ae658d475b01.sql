
-- Drop all existing restrictive policies and recreate as permissive

-- bookings
DROP POLICY IF EXISTS "Admins full access bookings" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create booking" ON public.bookings;

CREATE POLICY "Admins full access bookings" ON public.bookings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can create booking" ON public.bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public read bookings" ON public.bookings FOR SELECT TO anon, authenticated USING (true);

-- events
DROP POLICY IF EXISTS "Admins full access events" ON public.events;
DROP POLICY IF EXISTS "Public read published events" ON public.events;

CREATE POLICY "Admins full access events" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Public read published events" ON public.events FOR SELECT TO anon, authenticated USING (status = 'published');

-- speakers
DROP POLICY IF EXISTS "Admins full access speakers" ON public.speakers;
DROP POLICY IF EXISTS "Anyone can register as speaker" ON public.speakers;
DROP POLICY IF EXISTS "Public read approved speakers" ON public.speakers;

CREATE POLICY "Admins full access speakers" ON public.speakers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can register as speaker" ON public.speakers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public read approved speakers" ON public.speakers FOR SELECT TO anon, authenticated USING (approved = true);

-- venues
DROP POLICY IF EXISTS "Admins full access venues" ON public.venues;
DROP POLICY IF EXISTS "Anyone can register venue" ON public.venues;
DROP POLICY IF EXISTS "Public read approved venues" ON public.venues;

CREATE POLICY "Admins full access venues" ON public.venues FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone can register venue" ON public.venues FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public read approved venues" ON public.venues FOR SELECT TO anon, authenticated USING (approved = true);

-- user_roles
DROP POLICY IF EXISTS "Admins manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;

CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Grant admin role to the user
INSERT INTO public.user_roles (user_id, role) VALUES ('10582cf8-0831-41af-93c8-1c9fcdf892b3', 'admin') ON CONFLICT (user_id, role) DO NOTHING;
