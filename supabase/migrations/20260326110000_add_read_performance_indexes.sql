-- Improve read performance for the most common public listing queries
CREATE INDEX IF NOT EXISTS idx_events_status_start_at ON public.events (status, start_at);
CREATE INDEX IF NOT EXISTS idx_speakers_approved_created_at ON public.speakers (approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_venues_approved_created_at ON public.venues (approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings (created_at DESC);
