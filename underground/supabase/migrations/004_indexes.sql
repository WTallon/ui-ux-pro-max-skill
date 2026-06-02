-- Underground — Performance Indexes
-- Migration 004

-- Users
CREATE INDEX users_username_idx ON users (username);
CREATE INDEX users_role_idx ON users (role);
CREATE INDEX users_city_idx ON users (city);
CREATE INDEX users_location_idx ON users (location_lat, location_lng);

-- Posts
CREATE INDEX posts_user_id_idx ON posts (user_id);
CREATE INDEX posts_created_at_idx ON posts (created_at DESC);
CREATE INDEX posts_city_idx ON posts (city);
CREATE INDEX posts_type_idx ON posts (type);
CREATE INDEX posts_event_id_idx ON posts (event_id);
CREATE INDEX posts_release_id_idx ON posts (release_id);

-- Events
CREATE INDEX events_organizer_id_idx ON events (organizer_id);
CREATE INDEX events_city_idx ON events (city);
CREATE INDEX events_date_idx ON events (event_date);
CREATE INDEX events_status_idx ON events (status);
CREATE INDEX events_location_idx ON events (lat, lng);

-- Releases
CREATE INDEX releases_artist_idx ON releases (artist_name);
CREATE INDEX releases_heat_score_idx ON releases (heat_score DESC);
CREATE INDEX releases_is_released_idx ON releases (is_released);
CREATE INDEX releases_release_type_idx ON releases (release_type);

-- Track plays
CREATE INDEX track_plays_track_id_idx ON track_plays (track_id);
CREATE INDEX track_plays_play_date_idx ON track_plays (play_date DESC);
CREATE INDEX track_plays_city_idx ON track_plays (city);

-- Follows
CREATE INDEX follows_follower_id_idx ON follows (follower_id);
CREATE INDEX follows_following_id_idx ON follows (following_id);

-- Full-text search
CREATE INDEX users_search_idx ON users USING gin(to_tsvector('english', username || ' ' || display_name || ' ' || COALESCE(bio, '')));
CREATE INDEX releases_search_idx ON releases USING gin(to_tsvector('english', title || ' ' || artist_name));
CREATE INDEX events_search_idx ON events USING gin(to_tsvector('english', name || ' ' || venue_name || ' ' || city));
