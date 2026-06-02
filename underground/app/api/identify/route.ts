import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { apiRateLimit, identifyRateLimit } from "@/lib/redis/index";

const schema = z.object({
  clip_url: z.string().url(),
  duration: z.number().min(1).max(60),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";

  // Rate limit — free tier: 3/day
  const { success, reset } = await identifyRateLimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Upgrade to Fan Pass for unlimited IDs." },
      {
        status: 429,
        headers: { "X-RateLimit-Reset": new Date(reset).toISOString() },
      }
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // TODO: Call Audd.io → ACRCloud → AcoustID pipeline
  // For now, return mock response structure
  return NextResponse.json({
    status: "processing",
    message: "Audio fingerprinting in progress. Results will appear shortly.",
    request_id: crypto.randomUUID(),
  });
}
