import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { apiRateLimit } from "@/lib/redis/index";

const querySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  radius_miles: z.coerce.number().min(1).max(100).optional().default(25),
  genre: z.string().optional(),
  max_price: z.coerce.number().min(0).optional(),
});

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await apiRateLimit.limit(ip);
  if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const { searchParams } = new URL(req.url);
  const parsed = querySchema.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });

  const { lat, lng, radius_miles, genre, max_price } = parsed.data;
  const today = new Date().toISOString().slice(0, 10);

  const supabase = await createClient();

  // PostGIS distance query (requires postgis extension)
  let query = supabase
    .from("events")
    .select("*, organizer:users(id, username, display_name, avatar_url)")
    .eq("status", "published")
    .eq("event_date", today)
    .not("lat", "is", null)
    .not("lng", "is", null)
    .order("event_date", { ascending: true });

  if (genre) query = query.contains("genres", [genre]);
  if (max_price !== undefined) query = query.lte("ticket_price", max_price);

  const { data: events, error } = await query.limit(50);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Filter by radius client-side (use PostGIS in production for efficiency)
  const filtered = (events ?? []).filter((event) => {
    if (!event.lat || !event.lng) return false;
    const R = 3959; // Earth radius in miles
    const dLat = ((event.lat - lat) * Math.PI) / 180;
    const dLon = ((event.lng - lng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat * Math.PI) / 180) * Math.cos((event.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return distance <= radius_miles;
  });

  return NextResponse.json({ events: filtered });
}
