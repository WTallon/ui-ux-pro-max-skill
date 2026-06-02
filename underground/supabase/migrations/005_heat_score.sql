-- Underground — Heat Score Function
-- Migration 005
-- Heat Score formula:
--   ID requests     40%
--   DJ plays        25%
--   Saves           15%
--   City activity   10%
--   Reposts          7%
--   Festival apps    3%

-- Festivals table (referenced in heat score)
CREATE TABLE festivals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  dates_start DATE NOT NULL,
  dates_end DATE NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  lineup TEXT[] NOT NULL DEFAULT '{}',
  capacity INTEGER,
  ticket_price DECIMAL(10, 2),
  ticket_url TEXT,
  logo_url TEXT,
  cover_url TEXT,
  genres TEXT[] NOT NULL DEFAULT '{}',
  is_sponsored BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Festivals are publicly viewable" ON festivals FOR SELECT USING (true);

-- Heat Score calculation function
CREATE OR REPLACE FUNCTION calculate_heat_score(release_id UUID)
RETURNS INTEGER AS $$
DECLARE
  id_request_count INTEGER;
  dj_play_count INTEGER;
  save_count INTEGER;
  city_count INTEGER;
  repost_count INTEGER;
  score DECIMAL;
BEGIN
  -- ID requests in last 30 days
  SELECT COUNT(*) INTO id_request_count
  FROM setlist_tracks st
  JOIN setlist_uploads su ON st.setlist_id = su.id
  WHERE st.track_id = release_id
    AND su.created_at > NOW() - INTERVAL '30 days';

  -- DJ plays in last 30 days
  SELECT COUNT(*) INTO dj_play_count
  FROM track_plays
  WHERE track_id = release_id
    AND play_date > NOW() - INTERVAL '30 days';

  -- Saves (track notifications = proxy for saves)
  SELECT COUNT(*) INTO save_count
  FROM track_notifications
  WHERE track_id = release_id;

  -- Unique cities where played
  SELECT COUNT(DISTINCT city) INTO city_count
  FROM track_plays
  WHERE track_id = release_id;

  -- Reposts (from posts referencing this release)
  SELECT COALESCE(SUM(repost_count), 0) INTO repost_count
  FROM posts
  WHERE release_id = release_id;

  -- Calculate weighted score (0-100)
  score := LEAST(100, (
    (LEAST(id_request_count, 50) / 50.0 * 40) +
    (LEAST(dj_play_count, 100) / 100.0 * 25) +
    (LEAST(save_count, 500) / 500.0 * 15) +
    (LEAST(city_count, 13) / 13.0 * 10) +
    (LEAST(repost_count, 200) / 200.0 * 7) +
    3  -- base score for being in the system
  ));

  RETURN ROUND(score)::INTEGER;
END;
$$ LANGUAGE plpgsql;

-- Nightly heat score update (called by Edge Function)
CREATE OR REPLACE FUNCTION update_all_heat_scores()
RETURNS void AS $$
DECLARE
  release_row releases%ROWTYPE;
BEGIN
  FOR release_row IN SELECT * FROM releases LOOP
    UPDATE releases
    SET heat_score = calculate_heat_score(release_row.id),
        updated_at = NOW()
    WHERE id = release_row.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
