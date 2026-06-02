import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { apiRateLimit } from "@/lib/redis/index";

const createPostSchema = z.object({
  type: z.enum(["text", "clip", "set", "release_share", "event_share", "teaser", "video"]),
  content: z.string().max(2000).optional(),
  media_url: z.string().url().optional(),
  video_url: z.string().url().optional(),
  event_id: z.string().uuid().optional(),
  release_id: z.string().uuid().optional(),
  genre_tags: z.array(z.string()).max(5).optional(),
  city: z.string().max(100).optional(),
});

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await apiRateLimit.limit(ip);
  if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const type = searchParams.get("type");
  const cursor = searchParams.get("cursor");
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 50);

  const supabase = await createClient();

  let query = supabase
    .from("posts")
    .select("*, author:users(id, username, display_name, avatar_url, role, verified), event:events(id, name, venue_name, city, event_date), release:releases(id, title, artist_name, heat_score, is_released)")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (city) query = query.eq("city", city);
  if (type) query = query.eq("type", type);
  if (cursor) query = query.lt("created_at", cursor);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ posts: data, next_cursor: data?.[data.length - 1]?.created_at });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await apiRateLimit.limit(ip);
  if (!success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = createPostSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });

  if (!parsed.data.content && !parsed.data.media_url && !parsed.data.video_url) {
    return NextResponse.json({ error: "Post must have content or media" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...parsed.data, user_id: user.id })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ post: data }, { status: 201 });
}
