import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ---- Speakers ----
export function useSpeakers(approvedOnly = true) {
  return useQuery({
    queryKey: ["speakers", approvedOnly],
    queryFn: async () => {
      let q = supabase.from("speakers").select("*").order("created_at", { ascending: false });
      if (approvedOnly) q = q.eq("approved", true);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });
}

export function useSpeaker(id: string | undefined) {
  return useQuery({
    queryKey: ["speakers", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("speakers").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
  });
}

// ---- Venues ----
export function useVenues(approvedOnly = true) {
  return useQuery({
    queryKey: ["venues", approvedOnly],
    queryFn: async () => {
      let q = supabase.from("venues").select("*").order("created_at", { ascending: false });
      if (approvedOnly) q = q.eq("approved", true);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });
}

export function useVenue(id: string | undefined) {
  return useQuery({
    queryKey: ["venues", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("venues").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
  });
}

// ---- Events ----
export function useEvents(publishedOnly = true) {
  return useQuery({
    queryKey: ["events", publishedOnly],
    queryFn: async () => {
      let q = supabase.from("events").select("*").order("start_at", { ascending: true });
      if (publishedOnly) q = q.eq("status", "published");
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ["events", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase.from("events").select("*").eq("id", id!).single();
      if (error) throw error;
      return data;
    },
  });
}

// ---- Bookings ----
export function useBookings() {
  return useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

// ---- Mutations ----
export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (booking: { event_id: string; name: string; email: string; phone: string; seats: number }) => {
      const { data, error } = await supabase.from("bookings").insert(booking).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      qc.invalidateQueries({ queryKey: ["events"] });
    },
  });
}

export function useCreateSpeaker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (speaker: { name: string; email: string; phone?: string; bio: string; topics: string[]; headshot_url?: string }) => {
      const { data, error } = await supabase.from("speakers").insert(speaker).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["speakers"] }),
  });
}

export function useCreateVenue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (venue: {
      name: string; address: string; city: string; state?: string; country: string;
      capacity: number; contact_name: string; contact_email: string; contact_phone?: string; images?: string[];
    }) => {
      const { data, error } = await supabase.from("venues").insert(venue).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["venues"] }),
  });
}

export function useUpdateSpeaker() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; approved?: boolean; [key: string]: unknown }) => {
      const { data, error } = await supabase.from("speakers").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["speakers"] }),
  });
}

export function useUpdateVenue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; approved?: boolean; [key: string]: unknown }) => {
      const { data, error } = await supabase.from("venues").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["venues"] }),
  });
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: unknown }) => {
      const { data, error } = await supabase.from("events").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events"] }),
  });
}

// ---- File Upload ----
export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
  return urlData.publicUrl;
}
