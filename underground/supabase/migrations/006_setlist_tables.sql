-- Underground — Setlist Intelligence Tables
-- Migration 006

-- ID Requests (community track identification)
CREATE TABLE id_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  clip_url TEXT NOT NULL,
  clip_duration INTEGER NOT NULL DEFAULT 0,
  status id_status NOT NULL DEFAULT 'unsolved',
  solved_track_name TEXT,
  solved_artist TEXT,
  solved_label TEXT,
  upvote_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ID Suggestions (community answers)
CREATE TABLE id_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES id_requests(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  suggested_artist TEXT NOT NULL,
  suggested_title TEXT NOT NULL,
  suggested_label TEXT,
  notes TEXT,
  votes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Setlist Uploads
CREATE TABLE setlist_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  dj_name TEXT NOT NULL,
  set_name TEXT NOT NULL,
  set_date DATE NOT NULL,
  duration INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'upload' CHECK (source IN ('upload', 'soundcloud', 'mixcloud')),
  total_tracks INTEGER NOT NULL DEFAULT 0,
  identified_count INTEGER NOT NULL DEFAULT 0,
  unidentified_count INTEGER NOT NULL DEFAULT 0,
  status setlist_status NOT NULL DEFAULT 'processing',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Setlist Tracks (identified tracks within a set)
CREATE TABLE setlist_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setlist_id UUID NOT NULL REFERENCES setlist_uploads(id) ON DELETE CASCADE,
  timestamp_seconds INTEGER NOT NULL,
  track_id UUID REFERENCES releases(id) ON DELETE SET NULL,
  id_request_id UUID REFERENCES id_requests(id) ON DELETE SET NULL,
  status track_status NOT NULL DEFAULT 'unknown',
  confidence_score DECIMAL(5, 2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Track Plays (where tracks have been played)
CREATE TABLE track_plays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  track_id UUID REFERENCES releases(id) ON DELETE CASCADE,
  id_request_id UUID REFERENCES id_requests(id) ON DELETE CASCADE,
  dj_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  dj_name TEXT NOT NULL,
  venue_name TEXT,
  city TEXT,
  country TEXT,
  play_date DATE NOT NULL,
  set_url TEXT,
  timestamp_in_set INTEGER,
  source TEXT NOT NULL DEFAULT 'setlist_ai' CHECK (source IN ('setlist_ai', 'manual', 'community', 'tv_recognition')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Track Notifications (Notify Me)
CREATE TABLE track_notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track_id UUID REFERENCES releases(id) ON DELETE CASCADE,
  id_request_id UUID REFERENCES id_requests(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('release', 'beatport', 'heat_threshold', 'community')),
  notified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, track_id),
  UNIQUE (user_id, id_request_id)
);

-- RLS for new tables
ALTER TABLE id_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE id_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE setlist_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE setlist_tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_plays ENABLE ROW LEVEL SECURITY;
ALTER TABLE track_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "ID requests are publicly viewable" ON id_requests FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create ID requests" ON id_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "ID suggestions are publicly viewable" ON id_suggestions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can suggest IDs" ON id_suggestions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Setlist uploads viewable by owner" ON setlist_uploads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Authenticated users can upload setlists" ON setlist_uploads FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Setlist tracks viewable publicly" ON setlist_tracks FOR SELECT USING (true);
CREATE POLICY "Track plays viewable publicly" ON track_plays FOR SELECT USING (true);

CREATE POLICY "Track notifications private to user" ON track_notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can subscribe to track notifications" ON track_notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove track notifications" ON track_notifications FOR DELETE USING (auth.uid() = user_id);

-- Updated_at triggers
CREATE TRIGGER id_requests_updated_at BEFORE UPDATE ON id_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER setlist_uploads_updated_at BEFORE UPDATE ON setlist_uploads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
