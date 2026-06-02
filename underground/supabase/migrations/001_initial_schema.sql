-- Underground — Initial Schema
-- Migration 001

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Enums
CREATE TYPE user_role AS ENUM ('fan', 'dj', 'producer', 'venue', 'promoter', 'label', 'admin');
CREATE TYPE post_type AS ENUM ('text', 'clip', 'set', 'release_share', 'event_share', 'teaser', 'video');
CREATE TYPE release_type AS ENUM ('single', 'ep', 'album', 'compilation', 'white_label', 'bootleg', 'edit');
CREATE TYPE id_status AS ENUM ('unsolved', 'solved', 'partial');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'past');
CREATE TYPE ticket_status AS ENUM ('pending', 'confirmed', 'refunded', 'cancelled');
CREATE TYPE setlist_status AS ENUM ('processing', 'done');
CREATE TYPE track_status AS ENUM ('identified', 'unreleased', 'unknown');
CREATE TYPE booking_status AS ENUM ('pending', 'read', 'accepted', 'declined');
CREATE TYPE subscription_plan AS ENUM ('fan_pass', 'dj_pro', 'venue_pro', 'label_pro');
CREATE TYPE follow_type AS ENUM ('user', 'scene', 'genre', 'track', 'crate');
CREATE TYPE promotion_placement AS ENUM ('feed_boost', 'search_top', 'city_page_boost', 'city_feature', 'release_spotlight', 'event_spotlight', 'tv_boost');

-- Users (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  city TEXT,
  role user_role NOT NULL DEFAULT 'fan',
  verified BOOLEAN NOT NULL DEFAULT false,
  follower_count INTEGER NOT NULL DEFAULT 0,
  following_count INTEGER NOT NULL DEFAULT 0,
  stripe_customer_id TEXT,
  stripe_account_id TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Profiles (extended role-specific data)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  role_type user_role NOT NULL,
  genres TEXT[] NOT NULL DEFAULT '{}',
  city TEXT,
  bio_extended TEXT,
  social_links JSONB NOT NULL DEFAULT '{}',
  booking_email TEXT,
  fee_range TEXT,
  available_dates JSONB NOT NULL DEFAULT '{}',
  verified BOOLEAN NOT NULL DEFAULT false,
  pro_subscriber BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scenes (city-based communities)
CREATE TABLE scenes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  cover_image_url TEXT,
  active_member_count INTEGER NOT NULL DEFAULT 0,
  upcoming_event_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Releases (tracks — released and unreleased)
CREATE TABLE releases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_name TEXT NOT NULL,
  label_id UUID REFERENCES users(id),
  artwork_url TEXT,
  release_date DATE,
  release_type release_type NOT NULL DEFAULT 'single',
  genres TEXT[] NOT NULL DEFAULT '{}',
  bpm_range TEXT,
  key_signature TEXT,
  beatport_url TEXT,
  spotify_url TEXT,
  soundcloud_url TEXT,
  apple_music_url TEXT,
  bandcamp_url TEXT,
  hype_count INTEGER NOT NULL DEFAULT 0,
  heat_score INTEGER NOT NULL DEFAULT 0,
  is_released BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  venue_name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME,
  description TEXT,
  flyer_url TEXT,
  lineup TEXT[] NOT NULL DEFAULT '{}',
  genres TEXT[] NOT NULL DEFAULT '{}',
  ticket_price DECIMAL(10, 2),
  ticket_capacity INTEGER,
  tickets_sold INTEGER NOT NULL DEFAULT 0,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  is_secret BOOLEAN NOT NULL DEFAULT false,
  requires_rsvp BOOLEAN NOT NULL DEFAULT false,
  is_afterparty BOOLEAN NOT NULL DEFAULT false,
  ticket_url_external TEXT,
  is_free BOOLEAN NOT NULL DEFAULT false,
  status event_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tickets
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT NOT NULL,
  stripe_transfer_id TEXT,
  price_paid DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  status ticket_status NOT NULL DEFAULT 'pending',
  qr_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Posts
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type post_type NOT NULL DEFAULT 'text',
  content TEXT,
  media_url TEXT,
  video_url TEXT,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  release_id UUID REFERENCES releases(id) ON DELETE SET NULL,
  genre_tags TEXT[] NOT NULL DEFAULT '{}',
  city TEXT,
  like_count INTEGER NOT NULL DEFAULT 0,
  comment_count INTEGER NOT NULL DEFAULT 0,
  repost_count INTEGER NOT NULL DEFAULT 0,
  is_promoted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Comments
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  like_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Follows
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL,
  following_type follow_type NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (follower_id, following_id, following_type)
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  plan subscription_plan NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER releases_updated_at BEFORE UPDATE ON releases FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
