-- Underground — Crates + Booking tables
-- Migration 007

-- Crates (curated track collections)
CREATE TABLE crates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  genre_tags TEXT[] NOT NULL DEFAULT '{}',
  is_public BOOLEAN NOT NULL DEFAULT true,
  track_count INTEGER NOT NULL DEFAULT 0,
  follower_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Crate Tracks
CREATE TABLE crate_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crate_id UUID NOT NULL REFERENCES crates(id) ON DELETE CASCADE,
  track_id UUID NOT NULL REFERENCES releases(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (crate_id, track_id)
);

-- Booking Requests (DJ marketplace)
CREATE TABLE booking_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  message TEXT NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Promotions (paid placements)
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  placement_type promotion_placement NOT NULL,
  target_city TEXT,
  target_genre TEXT,
  budget DECIMAL(10, 2) NOT NULL,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  stripe_payment_intent_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'ended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS
ALTER TABLE crates ENABLE ROW LEVEL SECURITY;
ALTER TABLE crate_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public crates are viewable by all" ON crates FOR SELECT USING (is_public = true OR auth.uid() = user_id);
CREATE POLICY "Users can create crates" ON crates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own crates" ON crates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own crates" ON crates FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Crate tracks viewable with crate" ON crate_tracks FOR SELECT USING (
  EXISTS (SELECT 1 FROM crates WHERE id = crate_id AND (is_public = true OR user_id = auth.uid()))
);
CREATE POLICY "Crate owners can add tracks" ON crate_tracks FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM crates WHERE id = crate_id AND user_id = auth.uid())
);

CREATE POLICY "Booking requests visible to participants" ON booking_requests FOR SELECT USING (
  auth.uid() = from_user_id OR auth.uid() = to_user_id
);
CREATE POLICY "Authenticated users can send booking requests" ON booking_requests FOR INSERT WITH CHECK (auth.uid() = from_user_id);
CREATE POLICY "DJ can update booking request status" ON booking_requests FOR UPDATE USING (auth.uid() = to_user_id);

CREATE POLICY "Users can view own promotions" ON promotions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create promotions" ON promotions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Triggers
CREATE TRIGGER crates_updated_at BEFORE UPDATE ON crates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER booking_requests_updated_at BEFORE UPDATE ON booking_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
