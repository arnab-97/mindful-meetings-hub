import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RAZORPAY_KEY_ID = Deno.env.get("RAZORPAY_KEY_ID");
    const RAZORPAY_KEY_SECRET = Deno.env.get("RAZORPAY_KEY_SECRET");
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }

    const { event_id, name, email, phone, seats } = await req.json();

    if (!event_id || !name || !email || !seats) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch event to get price
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("price, currency, capacity, booked_seats, title")
      .eq("id", event_id)
      .single();

    if (eventError || !event) {
      return new Response(JSON.stringify({ error: "Event not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const seatsLeft = event.capacity - event.booked_seats;
    if (seats > seatsLeft) {
      return new Response(JSON.stringify({ error: `Only ${seatsLeft} seats available` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const totalAmountRupees = event.price * seats;

    // Free event — create booking directly
    if (totalAmountRupees === 0) {
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({ event_id, name, email, phone, seats, status: "paid" })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Update booked_seats
      await supabase
        .from("events")
        .update({ booked_seats: event.booked_seats + seats })
        .eq("id", event_id);

      return new Response(
        JSON.stringify({ free: true, booking_id: booking.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Razorpay expects amount in paisa (smallest currency unit)
    const amountInPaisa = totalAmountRupees * 100;

    // Create Razorpay order
    const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`);
    const rzpRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaisa,
        currency: event.currency || "INR",
        receipt: `r_${event_id.slice(0, 8)}_${Date.now()}`,
        notes: { event_id, name, email, seats: String(seats) },
      }),
    });

    const rzpOrder = await rzpRes.json();
    if (!rzpRes.ok) {
      console.error("Razorpay order error:", rzpOrder);
      throw new Error(`Razorpay error: ${rzpOrder.error?.description || "Unknown"}`);
    }

    // Create pending booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        event_id,
        name,
        email,
        phone,
        seats,
        status: "pending",
        stripe_payment_id: rzpOrder.id, // reusing this column for razorpay order id
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    return new Response(
      JSON.stringify({
        order_id: rzpOrder.id,
        amount: amountInPaisa,
        currency: rzpOrder.currency,
        booking_id: booking.id,
        key_id: RAZORPAY_KEY_ID,
        event_title: event.title,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
