
# The Gray Matter Club — Event Listing & Booking Platform

## Phase 1: Frontend (All Pages with Mock Data)

### 1. Design System & Layout
- Dark, sophisticated color palette fitting "The Gray Matter Club" brand
- Shared layout with Header (logo, nav links: Home, Events, Speakers, Venues, About, Contact) and Footer
- Mobile-first responsive design throughout

### 2. Public Pages
- **Home**: Hero section with tagline, featured events carousel, upcoming events grid, CTA for speakers/venues
- **Events List**: Filterable grid (by topic, date, venue, speaker) with search bar, event cards showing image, title, date, venue, price
- **Event Detail**: Cover image, description, speaker bio card, venue info with map embed, capacity/seats remaining, booking CTA button
- **Speaker Directory**: Grid of approved speakers with photos, bios, topics
- **Venue Directory**: Grid of approved venues with photos, location, capacity
- **Speaker Registration Form**: Name, email, phone, bio, topics, headshot upload
- **Venue Registration Form**: Name, address, capacity, contact info, photos upload
- **Static Pages**: About, Contact form, Terms & Privacy

### 3. Booking Flow (UI Only)
- Booking modal/page: name, email, phone, number of seats
- Summary with total price calculation
- "Pay with Stripe" button (placeholder)
- Confirmation page after payment

### 4. Admin Dashboard (UI Only, at `/admin`)
- Admin login page
- Dashboard with stats (total events, bookings, revenue)
- Events management: list, create/edit form (title, description, datetime, speaker, venue, capacity, price, cover image, status)
- Speakers management: list, approve/reject, edit
- Venues management: list, approve/reject, edit
- Bookings list with filters and CSV export button
- Not linked from public navigation

## Phase 2: Supabase Backend (wired up after frontend)
- Connect external Supabase project
- Create tables: speakers, venues, events, bookings with the schema you specified
- User roles table for admin auth (secure, no client-side role checks)
- RLS policies for public read access and admin write access
- Supabase Storage buckets for speaker photos, venue photos, event images
- Edge Functions for protected admin operations

## Phase 3: Stripe Integration
- Enable Stripe via Lovable's built-in integration
- Create Checkout sessions from Edge Function
- Stripe webhook to update booking status, decrement seats
- Payment metadata linking back to booking records

## Phase 4: Email (SendGrid/Resend)
- Edge Function to send booking confirmation emails
- Include booking details, event info, booking ID

## Phase 5: Polish & Security
- Server-side form validation (zod schemas)
- Rate limiting on public forms
- Accessible forms with proper labels/aria attributes
- Loading states, error toasts, friendly validation messages
- SEO meta tags for event pages

---

**Starting now with Phase 1**: Building all frontend pages and components with realistic mock data so you can see and refine the entire UI before connecting the backend.
