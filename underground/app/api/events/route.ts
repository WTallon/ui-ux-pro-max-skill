import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { apiRateLimit } from "@/lib/redis/index";

const createEventSchema = z.object({
  name: z.string().min(1).max(200),
  venue_name: z.string().min(1).max(200),
  city: z.string().min(1).max(100),
  country: z.string().min(1).max(100),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  start_time: z.string().regex(/^\d{2}:\d{2}$/),
  end_time: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  description: z.string().max(5000).optional(),
  lineup: z.array(z.string()).max(50).optional(),
  genres: z.array(z.string()).max(10).optional(),
  ticket_price: z.number().min(0).max(10000).optional(),
  ticket_capacity: z.number().min(1).max(100000).optional(),
  lat: z.number().min(-90).max(90).optional(),
  lng: z.number().min(-180).max(180).optional(),
  is_free: z.boolean().optional(),
  is_secret: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await apiRateLimit.limit(ip);
  if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const genre = searchParams.get("genre");
  const from_date = searchParams.get("from_date") ?? new Date().toISOString().slice(0, 10);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("*, organizer:users(id, username, display_name, avatar_url, verified)")
    .eq("status", "published")
    .gte("event_date", from_date)
    .order("event_date", { ascending: true })
    .limit(limit);

  if (city) query = query.eq("city", city);
  if (genre) query = query.contains("genres", [genre]);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ events: data });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await apiRateLimit.limit(ip);
  if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Verify user role allows event creation
  const { data: userProfile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!["venue", "promoter", "dj", "admin"].includes(userProfile?.role ?? "")) {
    return NextResponse.json({ error: "Only venues, promoters, and DJs can create events" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = createEventSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });

  const { data, error } = await supabase
    .from("events")
    .insert({ ...parsed.data, organizer_id: user.id, status: "published" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ event: data }, { status: 201 });
}
