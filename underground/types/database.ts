export type UserRole = "fan" | "dj" | "producer" | "venue" | "promoter" | "label" | "admin";
export type PostType = "text" | "clip" | "set" | "release_share" | "event_share" | "teaser" | "video";
export type ReleaseType = "single" | "ep" | "album" | "compilation" | "white_label" | "bootleg" | "edit";
export type IDStatus = "unsolved" | "solved" | "partial";
export type EventStatus = "draft" | "published" | "cancelled" | "past";
export type TicketStatus = "pending" | "confirmed" | "refunded" | "cancelled";
export type SetlistStatus = "processing" | "done";
export type TrackStatus = "identified" | "unreleased" | "unknown";
export type BookingStatus = "pending" | "read" | "accepted" | "declined";
export type SubscriptionPlan = "fan_pass" | "dj_pro" | "venue_pro" | "label_pro";
export type FollowType = "user" | "scene" | "genre" | "track" | "crate";
export type PromotionPlacement =
  | "feed_boost"
  | "search_top"
  | "city_page_boost"
  | "city_feature"
  | "release_spotlight"
  | "event_spotlight"
  | "tv_boost";

export interface User {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  city: string | null;
  role: UserRole;
  verified: boolean;
  follower_count: number;
  following_count: number;
  stripe_customer_id: string | null;
  stripe_account_id: string | null;
  location_lat: number | null;
  location_lng: number | null;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  role_type: UserRole;
  genres: string[];
  city: string | null;
  bio_extended: string | null;
  social_links: Record<string, string>;
  booking_email: string | null;
  fee_range: string | null;
  available_dates: Record<string, unknown>;
  verified: boolean;
  pro_subscriber: boolean;
}

export interface Event {
  id: string;
  organizer_id: string;
  name: string;
  venue_name: string;
  city: string;
  country: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  description: string | null;
  flyer_url: string | null;
  lineup: string[];
  genres: string[];
  ticket_price: number | null;
  ticket_capacity: number | null;
  tickets_sold: number;
  lat: number | null;
  lng: number | null;
  is_secret: boolean;
  requires_rsvp: boolean;
  is_afterparty: boolean;
  ticket_url_external: string | null;
  is_free: boolean;
  status: EventStatus;
  organizer?: User;
}

export interface Ticket {
  id: string;
  event_id: string;
  user_id: string;
  stripe_payment_intent_id: string;
  stripe_transfer_id: string | null;
  price_paid: number;
  platform_fee: number;
  status: TicketStatus;
  qr_code: string | null;
  event?: Event;
}

export interface Release {
  id: string;
  title: string;
  artist_name: string;
  label_id: string | null;
  artwork_url: string | null;
  release_date: string | null;
  release_type: ReleaseType;
  genres: string[];
  bpm_range: string | null;
  key_signature: string | null;
  beatport_url: string | null;
  spotify_url: string | null;
  soundcloud_url: string | null;
  apple_music_url: string | null;
  bandcamp_url: string | null;
  hype_count: number;
  heat_score: number;
  is_released: boolean;
}

export interface Post {
  id: string;
  user_id: string;
  type: PostType;
  content: string | null;
  media_url: string | null;
  video_url: string | null;
  event_id: string | null;
  release_id: string | null;
  genre_tags: string[];
  city: string | null;
  like_count: number;
  comment_count: number;
  repost_count: number;
  is_promoted: boolean;
  created_at: string;
  author?: User;
  event?: Event;
  release?: Release;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  like_count: number;
  created_at: string;
  author?: User;
}

export interface IDRequest {
  id: string;
  user_id: string;
  clip_url: string;
  clip_duration: number;
  status: IDStatus;
  solved_track_name: string | null;
  solved_artist: string | null;
  solved_label: string | null;
  upvote_count: number;
  created_at: string;
  author?: User;
  suggestions?: IDSuggestion[];
}

export interface IDSuggestion {
  id: string;
  request_id: string;
  user_id: string;
  suggested_artist: string;
  suggested_title: string;
  suggested_label: string | null;
  notes: string | null;
  votes: number;
  author?: User;
}

export interface SetlistUpload {
  id: string;
  user_id: string;
  file_url: string;
  dj_name: string;
  set_name: string;
  set_date: string;
  duration: number;
  source: "upload" | "soundcloud" | "mixcloud";
  total_tracks: number;
  identified_count: number;
  unidentified_count: number;
  status: SetlistStatus;
  tracks?: SetlistTrack[];
}

export interface SetlistTrack {
  id: string;
  setlist_id: string;
  timestamp_seconds: number;
  track_id: string | null;
  id_request_id: string | null;
  status: TrackStatus;
  confidence_score: number;
  release?: Release;
}

export interface TrackPlay {
  id: string;
  track_id: string | null;
  id_request_id: string | null;
  dj_user_id: string | null;
  dj_name: string;
  venue_name: string | null;
  city: string | null;
  country: string | null;
  play_date: string;
  set_url: string | null;
  timestamp_in_set: number | null;
  source: "setlist_ai" | "manual" | "community" | "tv_recognition";
}

export interface Festival {
  id: string;
  name: string;
  slug: string;
  dates_start: string;
  dates_end: string;
  city: string;
  country: string;
  lineup: string[];
  capacity: number | null;
  ticket_price: number | null;
  ticket_url: string | null;
  logo_url: string | null;
  cover_url: string | null;
  genres: string[];
  is_sponsored: boolean;
}

export interface Crate {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  genre_tags: string[];
  is_public: boolean;
  track_count: number;
  follower_count: number;
  owner?: User;
  tracks?: CrateTrack[];
}

export interface CrateTrack {
  id: string;
  crate_id: string;
  track_id: string;
  position: number;
  added_at: string;
  release?: Release;
}

export interface BookingRequest {
  id: string;
  from_user_id: string;
  to_user_id: string;
  event_name: string;
  event_date: string;
  venue: string;
  city: string;
  budget_range: string;
  message: string;
  status: BookingStatus;
  created_at: string;
  from_user?: User;
  to_user?: User;
}

export interface Follow {
  id: string;
  follower_id: string;
  following_id: string;
  following_type: FollowType;
}

export interface Scene {
  id: string;
  city: string;
  country: string;
  slug: string;
  description: string | null;
  cover_image_url: string | null;
  active_member_count: number;
  upcoming_event_count: number;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  plan: SubscriptionPlan;
  status: string;
  current_period_end: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  link: string | null;
  read: boolean;
  created_at: string;
}
