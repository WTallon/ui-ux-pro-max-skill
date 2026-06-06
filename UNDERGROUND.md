# UNDERGROUND — Complete Project Context Document
**"The operating system for EDM culture."**
Version 5.0 Outline · Document date: June 2026

> This document is the single source of truth for continuing work on Underground in any Claude Code session.
> Read this entire file before writing a single line of code.

---

## TABLE OF CONTENTS

1. [What Underground Is](#1-what-underground-is)
2. [The Five Pillars](#2-the-five-pillars)
3. [User Roles](#3-user-roles)
4. [Design System](#4-design-system)
5. [Tech Stack](#5-tech-stack)
6. [Database Schema — 22 Tables](#6-database-schema--22-tables)
7. [All Pages & Routes — 26 Total](#7-all-pages--routes--26-total)
8. [Folder Structure](#8-folder-structure)
9. [Core Feature Details](#9-core-feature-details)
10. [Audio ID Pipeline](#10-audio-id-pipeline)
11. [Setlist Intelligence Pipeline](#11-setlist-intelligence-pipeline)
12. [Ticketing Flow — Stripe Connect](#12-ticketing-flow--stripe-connect)
13. [Heat Score Formula](#13-heat-score-formula)
14. [Scene Status & Reputation System](#14-scene-status--reputation-system)
15. [Business Model & Revenue](#15-business-model--revenue)
16. [Pricing Tiers](#16-pricing-tiers)
17. [24-Week Plan — Two Tracks](#17-24-week-plan--two-tracks)
18. [Environment Variables](#18-environment-variables)
19. [Security Requirements](#19-security-requirements)
20. [Email Templates](#20-email-templates)
21. [Push Notification Strategy](#21-push-notification-strategy)
22. [Launch Plan & Marketing](#22-launch-plan--marketing)
23. [Competitive Position](#23-competitive-position)
24. [Long-Term Vision (12–24 Month Roadmap)](#24-long-term-vision-1224-month-roadmap)
25. [Current Status & What To Build Next](#25-current-status--what-to-build-next)
26. [Architecture Decisions & Rationale](#26-architecture-decisions--rationale)
27. [Business Viability Assessment](#27-business-viability-assessment)
28. [Cost & Timeline Estimates](#28-cost--timeline-estimates)
29. [First Claude Code Prompt](#29-first-claude-code-prompt)

---

## 1. What Underground Is

Underground is **the operating system for EDM culture.**

Not a track ID app. Not a ticketing platform. Not a social network. The OS — where every part of the scene lives in one place, and everything else becomes a feature.

**Community first. Software second. Culture always.**

Instagram, TikTok, SoundCloud, Eventbrite, Beatport, Resident Advisor, Bandsintown, 1001Tracklists, Discord — fans currently use all of these badly because none of them were built for EDM culture. Underground is.

### TWO WAYS IN — ONE DESTINATION

People join Underground for one of two reasons. Both lead to the same place.

**Entry Point A — The Wedge: Track IDs + Events**
"What track was that?" and "What's happening tonight?" are the two questions EDM fans ask every single week. Underground answers both better than anything else.
- Market as: "The best place to discover IDs, track what DJs are playing, and find EDM events."

**Entry Point B — The Scene: Social + Culture**
For fans who already know they want a social network built for the scene. Post set reviews, festival clips, hot takes, rankings, predictions. Follow DJs. Build status.
- Market as: "Instagram for EDM. Built by the scene, for the scene."

Both entry points lead to the same experience: a feed, a community, and an identity in the scene. The wedge users discover the social layer. The social users discover the track ID and radar tools. Over time there is no difference.

### THE DAILY HABIT LOOP

Apps that people open because of a specific reason become habits. Underground gives users six reasons to open every day:

| Trigger | What fires it |
|---|---|
| **HEAT** | Heat Score changed on a track you follow |
| **ID** | Someone solved your track ID request |
| **PLAY** | A DJ you follow played a track last night |
| **DROP** | Track you've been tracking finally released |
| **EVENT** | New event announced near you |
| **STATUS** | You moved up the city leaderboard |

> The habit loop is not a feature — it is the product strategy. If people only open the app when they need tickets, you'll struggle. If they open it every day, that's where growth happens.

**Open the app and see:**
- Chris Stussy just announced he's playing Miami Friday
- New track from a producer you follow
- A warehouse rave tonight 2 miles from you
- Someone just solved your track ID from Berghain last night
- Ultra Miami lineup just dropped
- Venue posted the aftermovie from last weekend
- Your scene status just leveled up to Curator
- Unreleased ID you've been tracking just hit Heat Score 97

| Property | Value |
|---|---|
| Domain | `ugscene.app` |
| Positioning | "The operating system for EDM culture." |
| External tagline | "Everything electronic in one place." |
| Wedge tagline | "The best place to discover IDs, track what DJs are playing, and find events." |
| Primary audience | Electronic music fans, DJs, producers, venues, promoters |
| Launch city | Miami — University of Miami campus + local scene |
| Version | 5.0 — The Complete Outline |

**Genres covered:** House · Tech House · Deep House · Afro House · Melodic House · Techno · Trance · Drum & Bass · Dubstep · EDM · Progressive · Minimal · Garage · UKG · Ambient · Industrial · Breaks

---

## 2. The Five Pillars

Everything in Underground is built around five core pillars. All features feed into at least one of them.

### Pillar 1 — The Social Scene
The feed, profiles, follows, and community layer. Posts. Comments. Reposts. The community layer that connects every user type. This comes first. This is the reason people open the app every day.

### Pillar 2 — Setlist Intelligence
**The flagship feature and primary competitive moat.** Upload any DJ set. Get a complete timestamped tracklist automatically. Released tracks. Unreleased tracks. White labels. Everything identified. No other platform does this.

### Pillar 3 — Underground Radar
The track discovery and trending engine. Tracks gaining momentum before they go mainstream. Unreleased music, white labels, community IDs — all ranked by Heat Score. What the whole scene is buzzing about before it's mainstream.

### Pillar 4 — Underground TV
The engagement engine. TikTok/Reels-style vertical video feed built exclusively for electronic music. Every video auto-analyzed for track recognition.

### Pillar 5 — Tonight Near Me
What is happening tonight, near you, right now. Events, shows, afterparties, secret raves, last-minute tickets. The reason people open the app on a Friday night.

---

## 3. User Roles

There are 6 user roles. Role selection happens at signup and personalizes the entire experience.

### Fan / Listener
- Follow DJs, producers, venues, labels
- Discover events and buy tickets
- ID tracks from sets and clubs
- Follow city scenes
- Build playlists and crates
- Earn Scene Status XP by solving IDs and attending events
- Get notified when unreleased tracks drop
- Build an EDM Passport (events attended, DJs seen, venues visited)
- Find what's happening tonight near them

### DJ
- Post upcoming shows and sets
- Upload mixes for Setlist Intelligence
- Build a following that actually sees their posts (no algorithmic suppression)
- Receive booking inquiries through the app
- Share unreleased track teasers
- Access analytics on fans and reach
- Get verified badge and priority placement

### Producer
- Share previews and teasers of unreleased music
- Announce releases and upcoming drops
- Receive structured feedback from fans, DJs, and labels
- Track which DJs are playing their music via track_plays table
- Track release performance — streams, saves, hype count
- Grow an audience before a label deal

### Venue
- Post events with full lineups
- Sell tickets directly through the platform
- Build a venue follower base
- Upload aftermovies and event content
- Promote upcoming shows in city feeds

### Promoter
- Create and manage events
- Sell tickets with Stripe Connect
- Find and book DJs through the marketplace
- Target city-specific audiences
- Track ticket velocity and sellout pace
- Track audience growth across events

### Label
- Maintain a label profile with artist roster
- Manage release calendars
- Promote new drops to followers
- Scout emerging talent via Radar and Heat Score
- Access trend reports for A&R intelligence

---

## 4. Design System

### Brand
| Property | Value |
|---|---|
| Name | UNDERGROUND |
| Tagline | Everything electronic in one place. |
| URL | ugscene.app |
| Heading Font | Bebas Neue |
| Label/Tag Font | DM Mono |
| Body Font | DM Sans |

### Color Palette
| Name | Hex | Usage |
|---|---|---|
| Background | `#080808` | Pure black, base |
| Surface | `#111111` | Cards, panels |
| Accent Yellow | `#E8FF47` | Primary CTA, highlights |
| Pink | `#FF3366` | Unreleased badges, alerts |
| Blue | `#00D4FF` | Producers, city tags |
| Orange | `#FF9500` | Labels, white label |
| Purple | `#9B59B6` | Venues |
| Text Primary | `#FFFFFF` | |
| Text Secondary | `#888888` | |
| Border | `#222222` | |

### Role Badge Colors
- DJ → Blue (`#00D4FF`)
- Producer → Cyan/Blue
- Label → Orange (`#FF9500`)
- Venue → Purple (`#9B59B6`)
- Listener/Fan → default white

### Design Principles
- **Mobile first.** Every screen designed for a phone before a desktop.
- **The feed is the home screen.** Everything branches from it.
- **One tap to anything.** Events, tracks, profiles — never buried.
- **Speed over features.** A fast empty feed beats a slow full one.
- **Dark aesthetic throughout.** This is a club, not a tech startup.

### Google Fonts to Import
```
Bebas Neue
DM Mono
DM Sans
```

### CSS Variables (set on :root)
```css
--bg: #080808;
--surface: #111111;
--accent: #E8FF47;
--pink: #FF3366;
--blue: #00D4FF;
--orange: #FF9500;
--purple: #9B59B6;
--text: #FFFFFF;
--text-secondary: #888888;
--border: #222222;
```

---

## 5. Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native + Expo |
| Web App | Next.js 14 App Router |
| Language | TypeScript (strict mode throughout) |
| Styling | Tailwind CSS + CSS variables |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth + Google OAuth |
| Storage | Supabase Storage (audio, video, images) |
| Push Notifications | Expo Notifications (APNs + FCM) |
| Payments | Stripe + Stripe Connect (venue payouts) |
| Audio ID — Primary | Audd.io (best for DJ/social content) |
| Audio ID — Secondary | ACRCloud (bulk endpoint for Setlist Intelligence) |
| Audio ID — Fallback | AcoustID (free, community-submitted) |
| Music APIs | Spotify Web API, Beatport RSS, SoundCloud oEmbed |
| Email | Resend |
| Rate Limiting | Upstash Redis |
| Error Tracking | Sentry (client + server) |
| Web Hosting | Vercel |
| Mobile Builds | Expo EAS |
| Maps | Mapbox (preferred) or Google Maps |
| State Management | TanStack Query (React Query) |
| Validation | Zod (every API route) |
| Animation | Framer Motion |
| Icons | Lucide React |

### npm install command for web project:
```bash
npm install @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js \
  @upstash/redis @upstash/ratelimit resend zod @sentry/nextjs \
  lucide-react framer-motion mapbox-gl react-map-gl \
  @tanstack/react-query date-fns
```

---

## 6. Database Schema — 22 Tables

### users
```sql
id, email, username, display_name, avatar_url, bio, city
role (fan/dj/producer/venue/promoter/label/admin)
verified, follower_count, following_count
stripe_customer_id, stripe_account_id
location_lat, location_lng  -- for Tonight Near Me
scene_status_level (1–6), total_xp
```

### profiles
```sql
id, user_id → users, role_type, genres[], city
bio_extended, social_links (jsonb), booking_email
fee_range, available_dates (jsonb), verified, pro_subscriber
```

### events
```sql
id, organizer_id → users, name, venue_name, city, country
event_date, start_time, end_time, description, flyer_url
lineup[], genres[], ticket_price, ticket_capacity, tickets_sold
lat, lng  -- for Tonight Near Me map
is_secret, requires_rsvp, is_afterparty
ticket_url_external, is_free
status (draft/published/cancelled/past)
```

### tickets
```sql
id, event_id → events, user_id → users
stripe_payment_intent_id, stripe_transfer_id
price_paid, platform_fee
status (pending/confirmed/refunded/cancelled)
qr_code
```

### releases
```sql
id, title, artist_name, label_id → users (nullable)
artwork_url, release_date
release_type (single/ep/album/compilation/white_label/bootleg/edit)
genres[], bpm_range, key_signature
beatport_url, spotify_url, soundcloud_url, apple_music_url, bandcamp_url
hype_count, heat_score
is_released (bool — true for released, false for unreleased)
```

### posts
```sql
id, user_id → users
type (text/clip/set/release_share/event_share/teaser/video/set_review/festival_clip/ranking/hot_take/prediction/fan_setlist/scene_report)
content, media_url, video_url
event_id → events (nullable), release_id → releases (nullable)
genre_tags[], city
like_count, comment_count, repost_count, is_promoted
```

### comments
```sql
id, post_id → posts, user_id → users
parent_id (nullable — threading)
content, like_count
```

### id_requests
```sql
id, user_id → users, clip_url, clip_duration
status (unsolved/solved/partial)
solved_track_name, solved_artist, solved_label
upvote_count
```

### id_suggestions
```sql
id, request_id → id_requests, user_id → users
suggested_artist, suggested_title, suggested_label
notes, votes
```

### setlist_uploads
```sql
id, user_id → users, file_url, dj_name, set_name, set_date, duration
source (upload/soundcloud/mixcloud)
total_tracks, identified_count, unidentified_count
status (processing/done)
```

### setlist_tracks
```sql
id, setlist_id → setlist_uploads, timestamp_seconds
track_id → releases (nullable)
id_request_id → id_requests (nullable)
status (identified/unreleased/unknown)
confidence_score
```

### track_plays
```sql
id, track_id → releases, id_request_id (nullable)
dj_user_id → users (nullable), dj_name
venue_name, city, country, play_date
set_url, timestamp_in_set
source (setlist_ai/manual/community/tv_recognition)
```

### track_notifications
```sql
id, user_id → users
track_id → releases (nullable)
id_request_id → id_requests (nullable)
trigger_type (release/beatport/heat_threshold/community)
notified_at
```

### festivals
```sql
id, name, slug, dates_start, dates_end, city, country
lineup[], capacity, ticket_price, ticket_url
logo_url, cover_url, genres[], is_sponsored
```

### crates
```sql
id, user_id → users, name, description
genre_tags[], is_public, track_count, follower_count
```

### crate_tracks
```sql
id, crate_id → crates, track_id → releases
position, added_at
```

### booking_requests
```sql
id, from_user_id → users, to_user_id → users
event_name, event_date, venue, city, budget_range, message
status (pending/read/accepted/declined)
```

### promotions
```sql
id, user_id → users
placement_type (feed_boost/search_top/city_page_boost/city_feature/release_spotlight/event_spotlight/tv_boost)
target_city, target_genre, budget
impressions, clicks, start_date, end_date
stripe_payment_intent_id
status (active/paused/ended)
```

### follows
```sql
id, follower_id → users, following_id
following_type (user/scene/genre/track/crate)
UNIQUE (follower_id, following_id, following_type)
```

### scenes
```sql
id, city, country, slug, description, cover_image_url
active_member_count, upcoming_event_count
```

### subscriptions
```sql
id, user_id → users, stripe_subscription_id
plan (fan_pass/dj_pro/venue_pro/label_pro)
status, current_period_end
```

### notifications
```sql
id, user_id → users, type
title, body, link, read
```

### Supabase Migrations (in order)
```
001_initial_schema.sql
002_rls_policies.sql
003_storage_buckets.sql
004_indexes.sql
005_heat_score.sql
006_setlist_tables.sql
007_festivals_crates.sql
008_tonight_location.sql
009_tv_recognition.sql
```

---

## 7. All Pages & Routes — 26 Total

| Route | Page | Notes |
|---|---|---|
| `/` | Landing | Animated waveform hero, live ticker, 6-role value props, featured events with buy buttons, new releases, city scenes, Radar preview |
| `/feed` | Social Feed | For You / Following / Releases / Events / Sets / TV tabs. Compose modal. City toggle. Right sidebar: Radar widget, Tonight Near Me, upcoming events |
| `/tv` | Underground TV | TikTok/Reels vertical video feed. DJ clips, festival footage, track IDs, producer teasers, event announcements, aftermovies. Every video auto-analyzed |
| `/tonight` | Tonight Near Me | Geolocation-based. Map view + list view. Genre filters. Distance filter. Last-minute tickets. Friends attending. Sort by proximity and start time |
| `/discover` | People Directory | DJs / Producers / Venues / Labels / Promoters. Search + genre + city filters. Follow buttons. Verified badges |
| `/[username]` | Profile | Role-specific header and tools. EDM Passport displayed. Scene Status badge. DJs: upcoming shows, sets, releases, booking button. Fans: crates, ID history, status level |
| `/events` | Events & Ticketing | Filter by city, genre, date, distance. Sold out indicators. Almost sold out badge at 85%+ capacity |
| `/events/[id]` | Event Detail | Full lineup with artist links, ticket flow, share, venue profile link, follow event button, friends attending list, setlists after the event |
| `/releases` | Releases | Released AND unreleased music. This Week / Upcoming / Last Week / All Time / genre filter. Hype voting. Platform links |
| `/radar` | Underground Radar | Heat Score rankings. Filtered by genre, city, timeframe. Notify Me button on every entry |
| `/setlist` | Setlist Intelligence | Upload any DJ set up to 3 hours. Processing animation with step-by-step progress. Timestamped tracklist. Export to Spotify/Apple Music/Beatport |
| `/scenes` | City Scenes | Grid of all cities with member count and event count |
| `/scenes/[city]` | City Scene | City-filtered feed, local artists, local venues, upcoming events, city rankings, local releases |
| `/rankings` | City Rankings | Weekly leaderboard. Top cities by Heat Score activity, ID requests, new events, post volume |
| `/festivals` | Festivals | Ultra Miami, Tomorrowland, EDC, Movement Detroit, ADE, Creamfields, Dekmantel, Awakenings, and all major events |
| `/festivals/[slug]` | Festival Detail | 5 tabs: Lineup / Setlists / Track IDs / Aftermovies / Tickets. Community-built setlists. Festival-specific social feed |
| `/tracks/[id]` | Track Page | Every track gets its own page. Artwork, artist, label, genre, BPM, key, release status, Heat Score, streaming links, Where Was This Played, Track Lineage, comments |
| `/crates` | DJ Crates | Public, private, genre-tagged track collections. Follow curators |
| `/booking` | Booking Marketplace | Browse DJs by fee range, available dates, cities played, audience size. Direct inquiry form. Unlocks at 2,500 users. |
| `/reputation` | Scene Status | XP levels, city leaderboard, earn actions, progress bar, EDM Passport viewer |
| `/identify` | Audio ID Tool | Upload / record / paste URL. Works for released and unreleased tracks |
| `/identify/unsolved` | Community IDs | All unsolved track requests. Vote on suggestions. Sort by newest / most votes / genre |
| `/lineage` | Track Lineage | Full version tree. Original → Bootleg → Edit → VIP Mix → Festival Edit → Official Release |
| `/compatibility` | Mix Compatibility Engine | BPM + Camelot Wheel key matching. Perfect mix candidates sorted by harmonic score |
| `/pricing` | Pricing | All tiers with feature comparison, Stripe Checkout |
| `/dashboard` | Creator Dashboard | Full analytics suite. Follower growth, post reach, ticket sales by event, booking inquiry volume, release performance, city demand, promotion management |
| `/(auth)/login` | Login | Email + Google OAuth |
| `/(auth)/signup` | Signup | Email + Google OAuth. Role selection. Email verification required |

### API Routes
```
/api/identify/route.ts
/api/setlist/upload/route.ts
/api/setlist/process/route.ts
/api/events/route.ts
/api/events/[id]/route.ts
/api/tickets/route.ts
/api/releases/route.ts
/api/tracks/[id]/route.ts
/api/posts/route.ts
/api/follows/route.ts
/api/search/route.ts
/api/tonight/route.ts
/api/booking-requests/route.ts
/api/promotions/route.ts
/api/heat-score/route.ts
/api/webhooks/stripe/route.ts
```

---

## 8. Folder Structure

```
/app
  /page.tsx                      Landing
  /feed/page.tsx
  /tv/page.tsx                   Underground TV
  /tonight/page.tsx              Tonight Near Me
  /discover/page.tsx
  /[username]/page.tsx
  /events/page.tsx
  /events/[id]/page.tsx
  /releases/page.tsx
  /radar/page.tsx
  /setlist/page.tsx
  /tracks/[id]/page.tsx
  /scenes/page.tsx
  /scenes/[city]/page.tsx
  /rankings/page.tsx
  /festivals/page.tsx
  /festivals/[slug]/page.tsx
  /crates/page.tsx
  /booking/page.tsx
  /reputation/page.tsx
  /identify/page.tsx
  /identify/unsolved/page.tsx
  /lineage/page.tsx
  /compatibility/page.tsx
  /pricing/page.tsx
  /dashboard/page.tsx
  /(auth)/login/page.tsx
  /(auth)/signup/page.tsx
  /api/
    /identify/route.ts
    /setlist/upload/route.ts
    /setlist/process/route.ts
    /events/route.ts
    /events/[id]/route.ts
    /tickets/route.ts
    /releases/route.ts
    /tracks/[id]/route.ts
    /posts/route.ts
    /follows/route.ts
    /search/route.ts
    /tonight/route.ts
    /booking-requests/route.ts
    /promotions/route.ts
    /heat-score/route.ts
    /webhooks/stripe/route.ts

/components
  /ui
    Button, Card, Badge, Avatar, Modal, Input
    Waveform, Skeleton, HeatScore, StatusBadge, NotifyButton, SceneStatusRing, PassportCard
  /features
    /feed          FeedPost, PostComposer, FeedFilters, ClipPlayer
    /tv            TVFeed, TVPost, TrackRecognitionOverlay
    /tonight       TonightMap, EventPin, NearbyList, DistanceFilter
    /events        EventCard, TicketButton, EventDetail, FestivalCard
    /releases      ReleaseCard, HypeButton, GenreFilter
    /setlist       SetlistUpload, SetlistTrack, SetlistExport, ProcessingAnim
    /radar         RadarEntry, RadarFilters, HeatRing
    /tracks        TrackPage, WhereWasPlayed, TrackLineage
    /identify      UploadZone, WaveformPreview, IDResult, CommunityID
    /discover      UserCard, RoleBadge, SearchFilters
    /crates        CrateCard, CrateTrackList
    /booking       BookingCard, InquiryForm, BookingInbox
    /reputation    XPBar, SceneStatusLevel, Leaderboard, PassportGrid
    /scenes        SceneCard, CityHeader, CityRankCard
  /layout
    Sidebar, Header, MobileNav, BottomNav, Footer

/lib
  /supabase        client.ts, server.ts, admin.ts
  /audio           audd.ts, acrcloud.ts, acoustid.ts, pipeline.ts, setlist.ts
  /video           recognition.ts (TV track detection)
  /platforms       spotify.ts, beatport.ts, soundcloud.ts
  /location        geolocation.ts, nearby-events.ts
  /stripe          index.ts, connect.ts, webhooks.ts, tickets.ts
  /redis           index.ts, rateLimit.ts
  /resend          index.ts, templates/

/types
  database.ts, api.ts, audio.ts, events.ts, setlist.ts, location.ts

/supabase
  /migrations
    001_initial_schema.sql
    002_rls_policies.sql
    003_storage_buckets.sql
    004_indexes.sql
    005_heat_score.sql
    006_setlist_tables.sql
    007_festivals_crates.sql
    008_tonight_location.sql
    009_tv_recognition.sql
  /policies

/emails
  welcome.tsx
  ticket-confirmation.tsx
  new-event.tsx
  new-release.tsx
  id-solved.tsx
  notify-me-drop.tsx
  booking-request.tsx
  city-digest.tsx
  tonight-reminder.tsx
  payment-failed.tsx

/mobile (React Native + Expo)
  /app
    /(tabs)
      feed.tsx
      tonight.tsx
      tv.tsx
      radar.tsx
      profile.tsx
    /onboarding
      splash.tsx
      role.tsx
      city.tsx
      follow.tsx
  /components    (shared with web where possible)
```

---

## 9. Core Feature Details

### Fan UGC — What Fans Post Every Day

Too much content on most platforms comes from DJs, venues, and promoters. Fans need clear formats to post every day. The more fans post, the harder Underground is to copy.

| Post Type | Description |
|---|---|
| **Track IDs** | Upload 30-sec clip from a set. Ask the community. Most-played content type. |
| **Set Reviews** | Text or video review of a DJ set they attended. Rating, standout tracks, energy. |
| **Festival Clips** | Short video from an event. Auto-tagged to venue + event. Track recognition fires. |
| **Event Photos** | Photo post linked to an event. Builds the visual archive of every venue. |
| **DJ Rankings** | "My top 5 DJs playing Miami right now." Generates comments and follows. |
| **Hot Takes** | "This track is going to be massive." Controversial = high engagement. |
| **Predictions** | "Predict the closing track for Ultra main stage." Pre-event community games. |
| **Fan Setlists** | Manually build the setlist from a show attended. Community verifies. |
| **Scene Reports** | "What's happening in Miami this month." City context no algorithm can generate. |

### Social Feed

**Feed algorithm:**
- People you follow, ranked by recency and engagement
- City-filtered view available at the top of every feed
- NO black-box algorithm hiding content from followers
- DJs post a show — every follower sees it

**City toggle:**
- One tap switches the entire feed to a specific city's content
- Chicago. Berlin. London. NYC. Miami. Ibiza. Amsterdam. Detroit.
- This is the #1 differentiator vs Instagram for scene culture

### Mobile Onboarding Flow
- **Screen 1 — Splash:** Logo, animated waveform, two buttons: Get Started / Sign In.
- **Screen 2 — Role Selection:** Fan / DJ / Producer / Venue / Label. Personalizes the feed from second one.
- **Screen 3 — Pick Your Scene:** Choose your city or cities. Fills the feed with local content immediately.
- **Screen 4 — Follow 5 Artists:** Suggested DJs/producers/labels based on selected city and role. Gate: cannot enter until 5 follows are made. Users who follow 5+ on day one have 3–4x better 30-day retention.
- **Screen 5 — Feed (Live):** App opens with content already there. Tonight Near Me notification permission prompt.

### Mobile Tab Navigation
| Tab | Icon | Content |
|---|---|---|
| Feed | home | Main social scene. Everything from people you follow. |
| Tonight | location | Tonight Near Me. Map view + list view. Last-minute tickets. Friend activity. |
| TV | play | Underground TV. Vertical video feed. Auto track recognition. |
| Radar | signal | What's blowing up before it blows up. Heat Scores. Notify Me. |
| You | person | Profile, notifications, Scene Status, EDM Passport, settings |

### EDM Passport
Every event a user attends gets logged. Every DJ they see. Every venue they visit. This becomes a visual identity — proof of who you are in the scene.

**How passport stamps are earned:**
- Check in at an event via the app (geolocation or QR scan) → +Event stamp
- Upload a clip from the event (auto-tags the venue)
- Post a set review tagged to a DJ and event → +DJ Seen stamp
- RSVP + mark as attended after the event

**Passport stamp types:**

| Stamp | How Earned | Displayed As |
|---|---|---|
| Event Attended | Check-in, clip upload, or RSVP + attended | Event badge on passport grid |
| DJ Seen Live | Attend an event where that DJ played | DJ avatar added to passport |
| Venue Visited | Check in at a venue | Venue badge with visit count |
| City Explored | Attend an event in a new city | City pin on a globe visual |
| Festival Badge | Attend a named festival | Festival artwork stamp |
| Early Adopter | Joined before public launch | Permanent gold badge |

> "Send me your passport" becomes a thing in the community. Users share them on Instagram. Every shared passport is a free ad for Underground.

### Annual Underground Lists
Published once a year. Creates enormous engagement — people argue about rankings all December.

- **Top 100 IDs** — Most-hunted unreleased tracks of the year
- **Top 100 DJs** — Underground's own DJ ranking (not DJ Mag)
- **Rising Producers** — Artists who broke through this year
- **Top Venues** — Voted by fans who attended
- **Top Cities** — Most active scenes worldwide
- **Track of the Year** — Community vote + Heat Score data

These lists are a PR event. Music press covers them. DJs share when they're on them.

### The EDM Graph — Your Data Moat
Every interaction builds a graph no competitor can buy or copy.

| Node Relationship | What it reveals |
|---|---|
| User → Track | Which fans follow which tracks. Who identified what before it blew up. |
| User → DJ | Which fans follow which DJs. Who discovered a DJ early. Who attends regularly. |
| DJ → Track | Which DJs play which tracks. Who breaks tracks first. DJ audience overlap. |
| City → Trend | Which tracks are blowing up in which cities before going global. |
| Time → Prediction | At scale: which tracks at Heat Score 60 today will hit 90 in 3 weeks. |

At scale: what every user likes, which DJs overlap in audience, which cities are growing, which tracks are exploding. This data becomes extremely valuable to labels, booking agencies, and festival promoters — and it only exists on Underground.

### Underground TV
- Full-screen vertical scrolling. Every video is content from the scene.
- 3 sub-tabs: Following / For You / Live
- Every video auto-analyzed for audio fingerprints on upload
- Detected tracks link automatically to: Track Page, Underground Radar, Setlist Intelligence data, Heat Score, Artist profile
- Content types: DJ set clips, festival clips, track ID clips, producer teasers, event announcements, aftermovies, crate drops

### Tonight Near Me
- Shows: clubs and shows tonight, afterparties, secret events, last-minute tickets, friends who are going
- **Filters:** Distance (1mi / 5mi / 25mi / any), Genre, Time, Ticket price
- **Views:** List view (sorted by distance + start time) + Map view (pins on map)
- **Key habit:** People check this tab every Friday and Saturday

### City Scenes
- 13 launch cities: Miami · Berlin · London · NYC · Chicago · Ibiza · Amsterdam · Detroit · Melbourne · São Paulo · Barcelona · Paris · Tokyo
- City page: city-filtered feed, local DJs, venues, upcoming events, City Rankings, local releases
- **City Rankings (weekly):** Top tracks by Heat Score, Top DJs by activity, Upcoming events by ticket velocity, Trending genres
- Cities compete globally. Scenes take pride. Word spreads.

### DJ Crates
- Curated track collections. Released and unreleased together.
- Types: Public (anyone can follow), Private (invite only), Genre crates
- Follow a crate → get notified when curator adds new tracks

### Booking Marketplace
- Unlocks at 2,500 users (marketplace needs volume to work)
- Promoters browse DJs by fee range, available dates, cities played, audience size
- DJ Pro required to see and respond to booking requests
- Underground takes 5% of confirmed bookings

### Mix Compatibility Engine
- Input: any track with BPM and key data
- Output: ranked list of tracks that mix harmonically
- Matching criteria: BPM range (±2 BPM), Camelot Wheel key compatibility, Energy level

### AI Mix Recommendations (after 10K+ uploads)
- "Tracks DJs actually mix with this." Powered by transition data from Setlist Intelligence.
- **DEPENDENCY:** Do not build this before 10,000+ sets uploaded. Do not fake it.

---

## 10. Audio ID Pipeline

```
Upload (clip or URL)
  → Validate: MIME type (MP3/WAV/M4A/MP4/MOV), max 60s, max 50MB (Zod)
  → Store in Supabase Storage
  → Send to Audd.io

Match found + confidence ≥ 80%?
  YES → Enrich: Spotify by ISRC, YouTube, Beatport
       → Return identified result with all links
       → Show Heat Score, Where Was This Played, Track Lineage

  NO  → Try ACRCloud
        → Match found?
          YES → Same enrichment
          NO  → Try AcoustID
                → Still nothing?
                  → Create id_requests row
                  → Show community ID UI
                  → Optional: post to feed as UNID clip
                  → Notify user when community solves it
```

**Rate limits:**
- Free: 3/day, max 10/hour
- Fan Pass+: unlimited

---

## 11. Setlist Intelligence Pipeline

The biggest competitive moat. No other platform does this.

**Input:** any DJ set (MP3, WAV, FLAC, M4A, SoundCloud URL, Mixcloud URL, up to 3 hours)

```
Upload (file or SoundCloud/Mixcloud URL, up to 3 hours)
  → Validate: audio/video MIME, max 3hr, max 2GB
  → Upload to Supabase Storage
  → Create setlist_uploads row (status: processing)
  → Split audio into 60-second segments
  → Batch send to ACRCloud bulk fingerprinting endpoint
  → For each segment:

      IDENTIFIED (confidence ≥ 80%):
        → Save to setlist_tracks with timestamp_seconds
        → Link to releases row (or create if new)
        → Increment track_plays for this DJ + set
        → Queue for Heat Score recompute

      UNIDENTIFIED:
        → Create id_requests row
        → Save to setlist_tracks (status: unreleased/unknown)
        → Flag for Radar if multiple DJs have played it

  → Update setlist_uploads (status: done, counts)
  → Trigger Heat Score nightly recompute
  → Return timestamped setlist to user
  → Offer playlist exports
```

**The flywheel:** More set uploads → more Radar data → better Heat Scores → more Notify Me subscriptions → more users → more uploads

**Rate limits:**
- Free: 5/day
- DJ Pro+: unlimited

---

## 12. Ticketing Flow — Stripe Connect

```
Venue creates event → sets ticket price and capacity
User clicks Buy Ticket (from feed, Tonight Near Me, event page, anywhere)
  → Create Stripe Checkout session
  → User completes payment
  → Stripe webhook: checkout.session.completed
  → Stripe Connect transfers to venue minus 2.5% fee
  → Create tickets row (status: confirmed)
  → Generate QR code stored in mobile ticket wallet
  → Confirmation email via Resend with QR attached
  → In-app notification to buyer
  → Mobile ticket viewable offline
```

**Platform fee:** $1.50–$2.50 per ticket (2.5% of face value)
**Why Stripe Connect:** venues receive money directly. Underground never holds funds. KYC and payouts handled automatically.

---

## 13. Heat Score Formula

**Proprietary 0 to 100 score. Computed nightly via Supabase Edge Function.**

| Signal | Weight |
|---|---|
| ID requests (last 7 days) | 40% |
| DJ plays via Setlist Intelligence | 25% |
| Saves and playlist additions | 15% |
| City activity (unique cities where heard) | 10% |
| Reposts and shares | 7% |
| Festival appearances | 8% |

**Rules:**
- Score decays over time without activity
- Score resets to 0 when a track becomes truly mainstream (Beatport Top 10 or Spotify editorial)
- Animated ring appears in UI at 90+
- Unreleased tracks build Heat Score from ID requests and DJ plays
- A track released on Bandcamp but being played at Berghain will rank high even if not on Spotify yet

---

## 14. Scene Status & Reputation System

Reddit has karma. Discord has roles. GitHub has contributions. Underground has Scene Status — the proof of who you are in electronic music. People love status. Status creates retention. Status creates identity. Identity creates evangelists.

### Six Levels of Scene Status

| Level | Name | XP Required | What it means |
|---|---|---|---|
| 1 | **Local** | 0–200 XP | New to the scene. Just showed up. |
| 2 | **Regular** | 200–1,000 XP | Posts, attends events, engages. |
| 3 | **Resident** | 1,000–5,000 XP | Solves IDs, builds crates, known locally. |
| 4 | **Curator** | 5,000–15,000 XP | People follow your crates. Known for taste. |
| 5 | **Tastemaker** | 15,000–50,000 XP | Discovers tracks before they blow up. Cited in the scene. |
| 6 | **Scene Legend** | 50,000+ XP | Irreplaceable. The community knows who you are. |

### Earning XP — Track ID & Discovery
| Action | XP |
|---|---|
| Submit an answer to a community ID | +50 |
| Your ID confirmed correct by upvotes | +100 |
| First person to correctly ID a track | +200 |
| ID confirmed by the artist themselves | +500 |
| Followed a track before Heat Score 50 — it hits 90+ | +300 |
| Track you discovered gets officially released | +250 |

### Earning XP — Content & Community
| Action | XP |
|---|---|
| Post any content (text, video, photo) | +10 |
| Post gets 20+ likes | +50 |
| Post a set review with 200+ words | +75 |
| Post a festival clip that gets 50+ views | +100 |
| Build a public crate with 10+ tracks | +80 |
| Your crate gets 10+ followers | +150 |

### Earning XP — Scene Participation
| Action | XP |
|---|---|
| Attend an event (check-in or clip) | +100 |
| Attend 5 events in one month | +300 |
| Manually submit a fan setlist | +75 |
| Daily app open streak (7-day) | +50 |
| Invite a DJ who joins and posts | +200 |
| Refer a user who stays 30+ days | +150 |

### Special Badges
| Badge | How Earned |
|---|---|
| **Founder** | Joined waitlist before launch. Permanent. Never available again. |
| **Campus Ambassador** | Recruited as UM/FSU/UCF/FIU rep. Referral code attached to profile. |
| **First ID** | First person to correctly ID a specific track. Permanent on that track's page. |
| **City OG** | First 100 users in a city. Permanent city badge on profile. |
| **Tastemaker** | Followed 5+ tracks before they hit Heat Score 90+. |
| **Legend** | Community nominated. Top 1% of contributors city-wide. |

---

## 15. Business Model & Revenue

> **Revenue rule:** community adoption unlocks each revenue tier. Do not optimize for money before you have retention. A platform with 500 daily active users and $0 revenue is more valuable than one with $2K/month and declining engagement.
>
> Focus order: community → retention → ticketing → subscriptions → marketplace → advertising → data.

### Revenue Streams

**1. Pro Subscriptions — Month 4**
- Fan Pass: $5/month (unlimited IDs, early alerts, Notify Me, Passport export, no ads)
- DJ Pro: $15/month (booking inbox, analytics, verified badge, sets)
- Venue Pro: $50–200/month (ticketing tools, analytics, branded pages) — add Month 6
- Label Pro: $49–500/month (roster, release calendar, trend monitoring)
- **Key: Pro unlocks tools, not the platform. Free is genuinely useful.**

**2. Ticketing — Month 6 (500 WAU)**
- Venues list events free. Underground takes $1.50–$2.50 per ticket (2.5%).
- Stripe Connect pays venues directly. We never hold funds.
- Starts as RSVP-only, upgrades to real tickets when retention is proven.
- Math: 300 tickets × $2 = $600/event. 20 venues × 3 nights/week = **$36,000/week at scale**

**3. Promoted Placement — Month 6**
- Feed boost, city page top, Tonight Near Me pin. $50–$500/week.
- Self-serve Stripe dashboard. No sales team needed.
- Only worth buying when the platform has real audience.

**4. Affiliate Links — Month 8 (1K users)**
- Pioneer DJ gear, Ableton, Native Instruments, Splice, Plugin Boutique
- Contextual placement (on DJ profiles, setlist exports, track pages). 4–8% commission.

**5. Booking Marketplace Fee — Month 10 (2,500 users)**
- Underground takes 5% of confirmed bookings. Only build after 2,500 users.
- Free DJs see locked booking requests (unlock with DJ Pro).

**6. Festival & Brand Advertising — 50K users**
- Ultra, Tomorrowland, ADE, Movement, Pioneer DJ, Roland, Output
- Sponsored city pages, feed takeovers, event spotlights: $5K–$50K/deal

**7. Data & Intelligence Reports — Future (10K+ users)**
- Anonymized trend intelligence sold to labels, booking agencies, festivals
- "Which unreleased tracks are getting the most ID requests in Miami?"
- "Which DJs are breaking tracks earliest?"

### Revenue Timeline Summary
| Milestone | Revenue Stream Unlocks | Est. Monthly Revenue |
|---|---|---|
| Launch (Month 4) | Fan Pass + DJ Pro subscriptions | $500–$2K |
| 500 WAU (Month 6) | Full ticketing + Venue Pro + Promoted Placements | $2K–$10K |
| 1,000 WAU (Month 8) | Affiliate links | $5K–$20K |
| 2,500 users (Month 10) | Booking Marketplace | $10K–$50K |
| 10,000 users | Data reports + brand partnerships begin | $50K+/mo potential |
| 50,000 users | Full brand advertising, festival deals | $200K+/mo potential |

---

## 16. Pricing Tiers

| Tier | Price | Key Features |
|---|---|---|
| **FREE** | $0 | Follow anyone, browse everything, 3 audio IDs/month, city scene access, Tonight Near Me, basic profile, Scene Status (up to Resident) |
| **FAN PASS** | $5/month | Unlimited audio IDs, early show announcements (24hr before public), Notify Me on any track, full Radar access, weekly city digest, EDM Passport export, no ads |
| **DJ PRO** | $15/month | Everything in Fan Pass + verified DJ badge, set uploads (Setlist Intelligence), booking inquiry inbox, follower + reach analytics, priority in DJ search |
| **VENUE PRO** | $50–200/month | Everything in DJ Pro + branded event pages, built-in ticketing, lineup management, aftermovie hosting, ticketing analytics |
| **LABEL PRO** | $49–500/month | Everything in Venue Pro + label page with artist roster, release calendar, release emails to followers, trend monitoring dashboard |

---

## 17. 24-Week Plan — Two Tracks

This plan runs two tracks in parallel from Week 1: building the product and building the audience. The app does not launch until there is real content and real people ready.

**Track A (Build) — All 24 Weeks:** Writing code, setting up infra, shipping features. Claude Code is your main tool. Budget 2–3 hours every day.

**Track B (Grow) — All 24 Weeks:** TikTok, Instagram, DJ outreach, events, UM networking. This never stops. 30–60 min per day minimum.

**Critical rules:**
- Do NOT skip the social media work in Weeks 1–8. The audience must exist before launch.
- Do NOT build moat features (audio ID, Heat Score) before MVP is in real users' hands.
- Do NOT launch mobile before web is proven and stable.
- Buffer weeks are real — use them. Do not treat them as free weeks to add features.

| Week | Build (Track A) | Grow (Track B) | Hrs | Cost |
|---|---|---|---|---|
| **Phase 1 — Foundation + Audience (Weeks 1–4)** | | | | |
| 01 | Next.js + TypeScript + Tailwind + Supabase setup. Design system (colors, fonts, folder structure). Apply for Apple Developer account Day 1 — approval takes 1–2 days. | Create Instagram + TikTok. Post Day 1: "Building the EDM app I wish existed." 3–5x/day TikTok, 1–2x/day IG from now on. | 20 hrs | $249 |
| 02 | Supabase schema — MVP tables only (users, profiles, posts, events, track_ids, follows, notifications). RLS policies. Storage buckets. Test every policy with a second account. | Write list of 20 Miami DJs to target. Start following and engaging with their content genuinely. Do not DM yet. | 20 hrs | $0 |
| 03 | Auth (email + Google OAuth), role selection onboarding (fan / DJ / producer / venue / promoter), protected routes, basic landing page. | DM first 5 DJs: "Building a Miami EDM platform — feedback appreciated." Go to one Miami event this weekend. | 18 hrs | $0 |
| 04 | User profiles (all roles — bio, links, role badge, avatar). Follow system. Notification subscriptions. Discover/directory page. | DM 5 more DJs. Reach out to 2–3 Miami venues on Instagram. Post first "app teaser" — no link yet, just the concept. | 20 hrs | $25 |
| **Phase 2 — MVP Core (Weeks 5–8)** | | | | |
| 05 | Social feed — text, photo, video, event flyer post types. Compose modal. Infinite scroll. Like + comment. Fast and smooth. | Start posting "events this weekend in Miami" content. Screenshot format. Becomes a weekly staple. Engage every comment. | 22 hrs | $25 |
| 06 | Events — create/edit/publish event, event detail page, RSVP (no ticketing yet). Tonight Near Me — geolocation + Mapbox dark map + nearby events. | Attend one Miami event. Collect Instagram handles. Pitch: "I'm building the Miami EDM app — 30 seconds to sign up when it launches." | 20 hrs | $54 |
| 07 | Track ID requests — upload 30-sec clip, community comments answers, upvote correct IDs, mark as solved. Make uploading clips dead simple on mobile browser. | Post 5 Track ID clips this week. "ID? Heard this in Miami last weekend." Track which posts perform best. | 22 hrs | $0 |
| 08 | Scene Status skeleton — XP table, levels 1–6, basic display on profile. EDM Passport (basic event checkin). Waitlist page built and live. | Launch the waitlist leaderboard. Post it everywhere. Start recruiting campus ambassadors from UM, FSU, UCF, FIU (5 per school). | 20 hrs | $0 |
| **Phase 3 — Moat Features (Weeks 9–14)** | | | | |
| 09 | Setlist Intelligence — upload pipeline, ACRCloud bulk, setlist output. Apply for Spotify Extended Quota this week — takes 1–3 weeks. | Show DJ contacts the setlist feature. Every DJ who tries it talks about it. This is your first viral loop. | 24 hrs | $299 |
| 10 | Heat Score — nightly Supabase Edge Function, indexed column, animated ring at 90+. Underground Radar page. | Post "Underground Radar" content: "This track has the highest ID requests in Miami right now." Showcase Heat Score concept. | 22 hrs | $0 |
| 11 | Track Pages — every track (released + unreleased) gets its own page. Where Was This Played. Track Lineage. Notify Me. | Start real DJ outreach with a working feature to show. "Here's what your setlist from last week looks like on Underground." | 22 hrs | $0 |
| 12 | Audio ID tool — Audd → ACRCloud → AcoustID pipeline. Community ID requests and voting. Integration with Radar and Heat Score. | Post "what is this track" clips every day. Comment "solved in 3 min on Underground" when someone IDs it. | 20 hrs | $0 |
| 13 | Releases page (Beatport RSS + Spotify). City Scenes pages (local feed, events, artists). City Rankings (weekly leaderboard). | Begin DJ Pro outreach: offer free DJ Pro for life if they join in the first 90 days and post one set. | 22 hrs | $0 |
| 14 | Buffer week — fix everything broken by real users. Performance audit. Mobile browser QA on iOS Safari and Android Chrome. | Continue outreach. Attend one more event. Collect feedback in person from DJ/fan testers. | 16 hrs | $0 |
| **Phase 4 — Mobile + Launch (Weeks 15–20)** | | | | |
| 15 | React Native + Expo — splash, role selection, city selection, follow 5 gate, live feed. Mobile mirrors web MVP. EAS build setup. | DM all campus ambassadors their referral codes. Post "launching soon — get on the waitlist" content. | 22 hrs | $0 |
| 16 | Mobile: Tab navigation (Feed / Tonight / TV / Radar / You), Expo Notifications (APNs + FCM), Tonight Near Me with Mapbox. | Walk in to 5 Miami venues. Show ticketing on your phone. Get 2–3 to commit to posting their next event on Underground. | 20 hrs | $99 |
| 17 | Underground TV — vertical video feed. Upload + track recognition. 3 sub-tabs (Following / For You / Live). | Contact music press: Magnetic Magazine, DJ Mag, Mixmag. Wait to pitch until you have venue exclusivity story. | 20 hrs | $0 |
| 18 | Stripe Connect onboarding for venues. Ticket purchase flow (Checkout session, webhook, QR code, confirmation email). Fan Pass + DJ Pro subscriptions via Stripe. | First venue posts an event exclusively on Underground. Pitch to press: "Electronic music's social network just launched in Miami." | 22 hrs | $29 |
| 19 | Public launch — web + mobile. Seed the feed with real content before go-live. Invite waitlist users in order of leaderboard rank. | Email every waitlist user. Post launch video. Tag every DJ and venue who is already on the platform. | 20 hrs | $0 |
| 20 | Immediate post-launch fixes based on real usage data. Monitor Heat Score accuracy. Fix any mobile crashes. | Respond to every comment, review, DM. This week is customer service. Do not ship new features — stabilize. | 22 hrs | $0 |
| **Phase 5 — Scale (Weeks 21–24)** | | | | |
| 21 | DJ Crates (full feature). Promoted placement self-serve dashboard. Creator analytics. Full Scene Status XP system all 6 levels. | Expand outreach to second city (Chicago or London). Apply learnings from Miami. | 22 hrs | $0 |
| 22 | Festival pages (Ultra, EDC, Tomorrowland, ADE — community setlists + live event feed). Mix Compatibility Engine. | Annual Underground Lists prep. Contact labels and booking agencies about data partnerships. | 20 hrs | $0 |
| 23 | Booking Marketplace (if 2,500+ users reached — do not build before). Affiliate links integration. | Attend one major event. Recruit ambassadors from next city. | 20 hrs | $0 |
| 24 | Security hardening. Full RLS audit. Rate limiting on all endpoints. Sentry setup. Performance final pass. README. | Press follow-up. Month 2 plan. Evaluate second city timing. | 18 hrs | $0 |

**Total: ~$780 to launch | ~450 hours over 24 weeks**

### Post-Launch Roadmap (Milestone-Gated)

**Batch 1 — Unlocks at 500 WAU**
Full ticketing + Stripe Connect payouts · Venue Pro subscription tier · Promoted placement self-serve · RSVP-to-ticket conversion · Ticket velocity analytics

**Batch 2 — Unlocks at 1,000 WAU**
Affiliate link integration (DJ gear, Ableton, Splice) · Advanced EDM Passport (export to image/share) · City OG badges · Full Annual Underground Lists · Underground Radio (Phase 1 — curated playlists by city/genre)

**Batch 3 — Unlocks at 2,500 Users**
Booking Marketplace (full flow — 5% fee) · Label Pro subscription tier · Producer Feedback Marketplace · Direct messaging · EDM Graph analytics dashboard (internal)

**Batch 4 — Unlocks at 5,000+ Users**
AI Mix Recommendations (requires 10K+ sets) · Brand advertising packages · Data & trend reports for labels and agencies · Virtual festival features · Livestreaming from events

---

## 18. Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_FAN_PASS=
STRIPE_PRICE_DJ_PRO=
STRIPE_PRICE_VENUE_PRO=
STRIPE_PRICE_LABEL_PRO=

# Audio Fingerprinting
AUDD_API_TOKEN=
ACRCLOUD_HOST=
ACRCLOUD_ACCESS_KEY=
ACRCLOUD_ACCESS_SECRET=

# Music Platforms
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=

# Location / Maps
MAPBOX_ACCESS_TOKEN=
# or: NEXT_PUBLIC_GOOGLE_MAPS_KEY=

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@ugscene.app

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Error Tracking
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# App
NEXT_PUBLIC_SITE_URL=https://ugscene.app
```

**CRITICAL:** `.env.local` must be in `.gitignore`. Never commit real credentials.

---

## 19. Security Requirements

These apply to every build. Non-negotiable.

### Row Level Security (Supabase RLS)
| Table | Policy |
|---|---|
| users | select/update own row only |
| posts | select public; insert own only |
| events | select all published; insert/update by organizer or admin |
| tickets | select own only; insert via service role only |
| setlist_uploads | select/update own only |
| track_plays | select all (public data); insert via service role |
| booking_requests | select where from_user or to_user = auth.uid() |
| promotions | select/update own only |
| subscriptions | select own only; update via service role only |
| notifications | select/update own only |

### Rate Limiting (Upstash Redis)
| Endpoint | Limit |
|---|---|
| /api/identify | 3/day free, unlimited Fan+; max 10/hour |
| /api/setlist/upload | 5/day free, unlimited DJ Pro+ |
| /api/auth/* | 5 attempts per 15 min per IP |
| All routes | 30 requests/min per authenticated user |

### Input Validation (Zod)
- Every API route has a Zod schema
- File uploads: MIME whitelist + max size enforced server-side
- Text inputs: sanitized, max lengths enforced, no HTML injection

### Security Headers (next.config.js)
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: configured
CORS: allow ugscene.app only
```

### Additional
- Stripe webhook signature verification on all events
- JWT validation on all protected routes
- No sensitive data in API responses
- All secrets in environment variables
- Location data stored with user consent only
- GDPR-compliant data handling for EU users

---

## 20. Email Templates

10 templates to build with Resend:

| File | Subject |
|---|---|
| `welcome.tsx` | Welcome to Underground |
| `ticket-confirmation.tsx` | Your ticket + QR code for [Event Name] |
| `new-event.tsx` | [DJ Name] just announced a show in [City] |
| `new-release.tsx` | New release from [Label Name] |
| `id-solved.tsx` | The track you posted has been identified |
| `notify-me-drop.tsx` | The track you've been waiting for just dropped |
| `booking-request.tsx` | You have a new booking inquiry from [Promoter] |
| `city-digest.tsx` | What's happening in [City] this week (Friday) |
| `tonight-reminder.tsx` | Tonight near you — [X] events within [Y] miles |
| `payment-failed.tsx` | Action required — your payment failed |

---

## 21. Push Notification Strategy

The single highest-leverage feature in a mobile app. Get this right and people leave notifications on forever. Get it wrong and they turn them off in 48 hours.

### HIGH VALUE — Always send
- "Chris Stussy just announced a show in London" (DJ you follow)
- "The track you've been tracking for 4 months just dropped" (Notify Me)
- "Your ticket to Fabric on Jun 7 is confirmed. QR code inside."
- "Someone identified the track you posted 3 days ago"
- "New event tonight 2 miles from you — tickets still available"
- "Your Scene Status just leveled up to Curator" (status milestone)

### MEDIUM VALUE — Respect timing
- Weekly city digest (Friday morning)
- New release from a label you follow (on release day only)
- New DJ set uploaded by someone you follow

### LOW VALUE — Never send
- Generic "check what's new" prompts
- Engagement bait ("someone liked your post")
- Promotional content not relevant to followed accounts

**Rule: every notification should feel like a text from a friend who knows what you're into. Not an app sending a push.**

---

## 22. Launch Plan & Marketing

### Core Principle
Build the scene first. Seed it with real artists. Every other feature is meaningless without the community. Culture first. Software second.

### The One Question That Determines Everything

> "Can I build a 10,000-person EDM audience before the app is ready?"

If the answer is yes, your chances of success increase dramatically. Apps rarely blow up because of code. They blow up because the right community already exists when the product arrives. Spend the first month trying to answer this question with action, not planning.

### Waitlist Leaderboard (Pre-Launch)

Before the app launches, create a public waitlist with a points system. This builds the audience, generates social proof, and identifies your most committed early users — before you've written a line of code.

**Earn points by:**
- Join the waitlist → +100 pts
- Refer a friend who signs up → +200 pts each
- Follow Underground Instagram → +50 pts
- Follow Underground TikTok → +50 pts
- Refer a DJ who signs up → +500 pts

**Top users get:**
- Permanent Founder badge on profile
- First access when app launches
- Free premium for life (top 100)
- Campus Ambassador role
- Exclusive merch drop (top 50)

The leaderboard is public. People share their rank. People compete to move up. Every share is organic reach. Build this on a simple landing page before the app exists.

### Campus Ambassador Program

University campuses are the fastest growth channel for an app targeting 18–25 year-old EDM fans.

**Recruit 5 students from each of these schools:**
- **UM** — University of Miami
- **FSU** — Florida State
- **UCF** — University of Central Florida
- **FIU** — Florida International

**Each Campus Ambassador Gets:**
- Personal referral code (track every signup they drive)
- Permanent Founder role + Campus Ambassador badge on their profile
- Free premium for life
- Exclusive Underground merch when it drops
- First access to event partnerships at their university

20 ambassadors across 4 schools = 20 people whose personal brand is tied to Underground's success. This is probably the fastest growth channel available.

### Launch City: Miami

The first goal is not "become the EDM app." The first goal is: become the app Miami EDM fans check before going out.

**Why Miami:**
- School is there — you can meet people in person
- EDM culture is strong — clubs, promoters, DJs, events
- University of Miami student base already goes out every weekend

### Channel Playbook

**DIRECT DJ OUTREACH**
- Email the top 50 DJs in Miami. One at a time. Personalized.
- Offer free DJ Pro for life if they join in the first 90 days.
- Key message: "Your followers will actually see your posts here. Booking inquiries come through the app. It's built for this world."

**VENUE WALK-INS**
- Don't email venues. Go in person.
- Show the ticketing feature on your phone.
- Free to list. $2 per ticket. Fans are already on the platform.

**CAMPUS AMBASSADORS**
- UM, FSU, UCF, FIU — 5 per school, 20 total
- Personal referral codes, Founder badges, free premium for life

**TONIGHT NEAR ME AS ACQUISITION HOOK**
- "What's happening tonight?" is a search people do every Friday
- Users find an event, buy a ticket, create an account
- First retention hook: show them what else is in their city

**UNDERGROUND TV FOR ORGANIC REACH**
- "Do you know this track?" clips shared from Underground TV circulate in electronic music TikTok
- Every clip links back to the ID tool and the app

**REDDIT**
- r/DJs, r/electronicmusic, r/housemusic, r/techno, r/edmproduction
- Contribute genuinely for 2–3 months. Then transparent launch post.

**MUSIC PRESS**
- Magnetic Magazine, Data Transmission, Mixmag, DJ Mag, Attack Magazine.
- Angle: "The social network electronic music has been missing."
- Wait until you have named venues and DJs to reference.

**SOCIAL MEDIA CONTENT RATIO**
- For every 10 posts: 7 normal EDM content, 2 community discussion, 1 mention the app.
- Do not spam "download the app." Build trust first.

### Build the Audience Before the App

Create Instagram and TikTok before launch. The page should feel like an EDM media page, not a startup page.

**Instagram bio:**
```
UNDERGROUND
Everything electronic in one place.

🎵 Unreleased IDs
📍 Events & raves
🔥 Tracks before they blow up
🎧 DJs • Producers • Fans

Miami → Worldwide

Launching soon.
```

**Content types:**
- Unreleased track clips: "ID? Heard this in Miami last weekend."
- Festival clips: "This drop nearly started a riot."
- Event posts: "MIAMI THIS WEEKEND — Best events happening in the city."
- Track discovery: "If you know this track, you're deep in the scene."
- App teaser: "Imagine one app where you could: find tonight's events • track unreleased IDs • follow DJs."

---

## 23. Competitive Position

| Feature | Underground | Instagram | SoundCloud | Beatport | RA | Bandsintown | TikTok |
|---|---|---|---|---|---|---|---|
| Social scene for EDM | ✓ Only | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Setlist Intelligence | ✓ Only | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Underground Radar | ✓ Proprietary | ✗ | ✗ | Charts only | ✗ | ✗ | ✗ |
| Heat Score | ✓ Proprietary | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Scene Status (fan rep) | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| EDM Passport | ✓ Only | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| EDM Graph (data moat) | ✓ Only | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Where Was This Played | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Tonight Near Me | ✓ | ✗ | ✗ | ✗ | Partial | Partial | ✗ |
| Underground TV | ✓ EDM-focused | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ (broad) |
| Audio ID (released+unrel.) | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Track Pages (all music) | ✓ | ✗ | Partial | Partial | ✗ | ✗ | ✗ |
| DJ Crate Sharing | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Festival Mode | ✓ | ✗ | ✗ | ✗ | Partial | ✗ | ✗ |
| Built-in Ticketing | ✓ | ✗ | ✗ | ✗ | ✗ | Partial | ✗ |
| Booking Marketplace | ✓ | DM only | ✗ | ✗ | ✗ | ✗ | ✗ |
| City Scene Feeds | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Free for Fans | ✓ | ✓ | ✓ | Limited | ✓ | ✓ | ✓ |

---

## 24. Long-Term Vision (12–24 Month Roadmap)

Underground becomes the operating system for electronic music.

| Currently uses | Underground replaces it with |
|---|---|
| Instagram | Social feed with role-specific content |
| TikTok | Underground TV (EDM-only vertical video) |
| SoundCloud | Set uploads with Setlist Intelligence |
| Resident Advisor | Events, festivals, city scenes |
| Eventbrite | Built-in ticketing with Stripe Connect |
| Bandsintown | DJ profiles with upcoming shows + Tonight Near Me |
| 1001Tracklists | Setlist Intelligence (automated, not manual) |
| Discord | City scene feeds + community ID solving |
| Beatport | Releases page + Heat Score + Underground Radar |

**Future features (12–24 month roadmap):**
- Direct messaging between users
- Livestreaming from events and studios
- Virtual festival experiences
- Artist fan clubs with exclusive content
- EDM marketplace (sample packs, Ableton templates, plugins)
- DJ gear affiliate store (Pioneer DJ, Native Instruments)
- Label deal pipeline — connecting producers with labels via Heat Score data
- Touring data for booking agencies
- Underground Radio — curated live radio streams by city/genre
- AI Mix Recommendations (after 10K+ uploaded sets)
- Sample Recognition (WhoSampled partnership)
- EDM Graph public API for labels and booking agencies

---

## 25. Current Status & What To Build Next

### Current Status — June 2026
**NOTHING IS BUILT YET.**

All planning is complete:
- ✅ Full product spec written (Version 5.0 — The Complete Outline)
- ✅ Design system defined and mockups approved (5 screens reviewed)
- ✅ Database schema finalized (22 tables)
- ✅ Tech stack decided
- ✅ All 26 pages/routes mapped
- ✅ 24-week two-track plan (Build + Grow) finalized
- ✅ Business model finalized (milestone-gated revenue)
- ✅ Marketing strategy written (Waitlist Leaderboard + Campus Ambassadors)
- ✅ Revenue projections done
- ✅ Security requirements defined
- ✅ Environment variables listed
- ✅ Folder structure defined
- ✅ Scene Status 6-level system designed
- ✅ EDM Passport feature designed
- ✅ Fan UGC content types defined
- ✅ Annual Lists strategy defined
- ✅ EDM Graph data moat strategy defined
- ✅ Post-launch milestone-gated roadmap defined

**The build has not started. Week 1, Track A is the starting point.**

### Cold Start Strategy (Most Important Decision)

**DO NOT launch the full social platform first.**

Recommended cold start sequence:
1. **Launch Setlist Intelligence ONLY** — let DJs upload sets and get tracklists
2. Get 20 DJs uploading sets. The Heat Score now has real data.
3. **Add Underground Radar** — the data from DJ uploads feeds directly into this
4. Users start following tracks on Radar → they need accounts → social layer begins
5. **Add social layer** — now the feed has real content (DJs' sets, their tracks, their events)
6. **Add Tonight Near Me** — sign 5 venues. Friday night opens the app.
7. **Full platform** — everything connects once each piece has real users

This is how you avoid an empty feed on day one.

### Phase 1 Checklist (Start Here)
- [ ] Task 01: Next.js 14 project setup, TypeScript strict, Tailwind, design system
- [ ] Task 02: Supabase — all 22 tables, RLS, storage buckets, indexes
- [ ] Task 03: Auth — email + Google OAuth, role selection on signup, protected routes
- [ ] Task 04: Landing page — animated waveform hero, 6-role value props, featured events
- [ ] Task 05: Mobile (React Native + Expo) — splash, role selection, city selection, follow 5, feed
- [ ] Task 06: User profiles — role-specific layout for each of the 6 roles + Scene Status badge + EDM Passport preview
- [ ] Task 07: Discover directory — DJs/Producers/Venues/Labels with search + filters
- [ ] Task 08: Follow system — follows table, notification subscriptions
- [ ] Task 09: Push notifications — Expo Notifications, APNs + FCM

---

## 26. Architecture Decisions & Rationale

| Decision | Choice | Why |
|---|---|---|
| Web framework | Next.js 14 App Router | SSR for SEO (track pages, event pages need to be crawlable), server components reduce client bundle, API routes built-in |
| Mobile framework | React Native + Expo | Cross-platform (iOS + Android), Expo EAS handles builds and OTA updates, Expo Notifications for push |
| Database | Supabase (PostgreSQL) | RLS built-in (critical for this app), real-time subscriptions for feed, auth included, storage included, edge functions for Heat Score |
| Auth | Supabase Auth | Zero-config, works with RLS, Google OAuth included, role metadata in JWT |
| Payments | Stripe + Stripe Connect | Venues get paid directly, Underground never holds funds, KYC automated |
| Audio ID | Audd.io → ACRCloud → AcoustID | Three-tier fallback: Audd is best for social/DJ content, ACRCloud has the bulk endpoint needed for Setlist Intelligence, AcoustID is free fallback |
| Rate limiting | Upstash Redis | Serverless-compatible, sliding window algorithm, low latency |
| Email | Resend | Best deliverability for transactional email, React email templates |
| Maps | Mapbox | Better dark theme support than Google Maps, better performance for custom markers, lower cost at scale |
| State | TanStack Query | Server state management, infinite scroll, optimistic updates, cache invalidation |
| Validation | Zod | Runtime validation matches TypeScript types, works in both client and server |
| Hosting | Vercel | Next.js native, edge functions, image optimization, fast CI/CD |

### Why NOT to use alternatives
- **Firebase over Supabase:** Supabase has RLS (row-level security) which is essential. Firebase requires manual security rules that are harder to audit.
- **Expo Go over EAS:** EAS is required for APNs (Apple push notifications) which is non-negotiable for the Tonight Near Me feature.
- **Simple video player over TikTok-style scroll:** The vertical scroll format is mandatory for Underground TV.
- **Generic algorithm over transparent feed:** Electronic music culture specifically hates algorithmic suppression. Underground's promise is that DJs post → every follower sees it. This is a feature, not a limitation.

---

## 27. Business Viability Assessment

**Honest assessment: 35–50% probability of meaningful traction.**

### What Makes This Real
1. **The moat is real.** Setlist Intelligence does not exist anywhere. ACRCloud bulk fingerprinting on a full DJ set is technically achievable.
2. **The pain is real.** Anyone who has spent 45 minutes in YouTube comments asking "what is this track?" understands this product immediately.
3. **The community is real.** Electronic music fans are obsessive, global, and underserved by current tools.
4. **The founder advantage is real.** If the builder knows the scene (specific DJs, how Berghain works, what Drumcode is), they will build the right product.
5. **The data moat is real.** The EDM Graph compounds over time. After 2 years of real data, no competitor can catch up.

### What Makes This Hard
1. **Cold start.** An empty feed is worse than no app. The first 20 DJs need to be signed before launch. This is offline work, not code.
2. **Two-sided marketplace × 6 roles.** Six user types need value simultaneously.
3. **ACRCloud cost at scale.** Setlist Intelligence costs $99–$8,000+/month depending on usage. Must be on DJ Pro ($15/month) from day one.
4. **Spotify Extended Quota.** Needed for playlist exports. Takes 1–3 weeks to get approved. Apply Week 1.
5. **Established competitors are sticky.** RA has 20 years of inertia. Getting venues to use a new ticketing platform is hard.

### The Make-or-Break Questions
1. Do you personally know 20 DJs and 5 venues in Miami who will post before launch?
2. Can you build a 10,000-person EDM audience (social media + waitlist) before the app launches?

If yes to both — this has a real shot. If no to either — that's the first problem to solve, not code.

---

## 28. Cost & Timeline Estimates

### Build Cost (24 weeks)

| Phase | Focus | Cost |
|---|---|---|
| Weeks 1–4 | Foundation + setup | $274 (domain, Apple Developer) |
| Weeks 5–8 | MVP features | $79 (Mapbox, Supabase Pro) |
| Weeks 9–14 | Setlist Intelligence, ACRCloud, Heat Score | $299 (ACRCloud) |
| Weeks 15–20 | Mobile, TV, ticketing, launch | $128 (EAS, Stripe) |
| Weeks 21–24 | Scale + hardening | $0 |
| **Total** | | **~$780** |

### Monthly Running Costs (at launch)

| Service | Cost/month |
|---|---|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Upstash Redis | $10 |
| Resend | $20 |
| Sentry | $26 |
| Expo EAS | $99 |
| Audd.io | $29 |
| ACRCloud | $99 (variable — biggest cost) |
| Mapbox | $5–50 |
| **Total** | **~$333–$378/month** |

### Timeline (Claude Code approach)
- **2–3 weeks** to have a working web app (Phase 1 complete)
- **6–8 weeks** for full web MVP (Phases 1–2)
- **12–16 weeks** for full web platform with moat features (Phases 1–3)
- **20–24 weeks** for web + mobile + hardened launch (all phases)

**Hard limits that can't be accelerated:**
- Apple App Store review: 1–2 weeks
- Spotify Extended Quota approval: 1–3 weeks (apply Week 1)
- ACRCloud bulk endpoint access: 1–5 days
- Waitlist audience: starts building Day 1 — can't be rushed

### Time Per Day Required
- Claude Code does ~70% of the build
- Expect 2–4 hours/day of active work: reviewing Claude's output, making decisions, testing UI, doing offline work (DJ outreach, venue calls)
- The offline work (signing DJs and venues, running social media) cannot be delegated to Claude Code

---

## 29. First Claude Code Prompt

Copy this exactly into your first Claude Code session. This starts Week 1, Track A.

```
I'm building Underground — the operating system for EDM culture.
Everything electronic in one place. ugscene.app

Read the context file UNDERGROUND.md before starting. It has everything.

Start Week 1, Track A: Set up the Next.js 14 App Router project.

Requirements:
- TypeScript strict mode throughout
- Tailwind CSS with custom CSS variables for the Underground color palette:
  Background #080808, Surface #111111, Accent Yellow #E8FF47,
  Pink #FF3366, Blue #00D4FF, Orange #FF9500, Purple #9B59B6,
  Text Primary #FFFFFF, Text Secondary #888888, Border #222222
- Google Fonts: Bebas Neue (headings), DM Mono (labels/tags), DM Sans (body)
- ESLint configured
- src/ directory structure

Install these packages:
@supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js
@upstash/redis @upstash/ratelimit resend zod @sentry/nextjs
lucide-react framer-motion mapbox-gl react-map-gl
@tanstack/react-query date-fns

Create the full folder structure:
/app (with all 26 route files as empty page.tsx stubs)
/components/ui, /components/features/*, /components/layout
/lib/supabase (client.ts server.ts admin.ts)
/lib/audio (audd.ts acrcloud.ts acoustid.ts pipeline.ts setlist.ts)
/lib/stripe (index.ts connect.ts webhooks.ts tickets.ts)
/lib/redis (index.ts rateLimit.ts)
/lib/resend (index.ts templates/)
/lib/location (geolocation.ts nearby-events.ts)
/lib/platforms (spotify.ts beatport.ts soundcloud.ts)
/types (database.ts api.ts audio.ts events.ts setlist.ts location.ts)
/supabase/migrations (9 empty SQL files: 001 through 009)
/emails (10 template stubs)

After project setup, proceed to Task 2:
Create all 22 Supabase database tables with these exact columns.
(I'll paste the full schema from UNDERGROUND.md section 6.)
Include RLS policies on every table.
Include storage buckets: audio-clips, dj-sets, videos, images.
Include indexes on: heat_score, city, genres, location lat/lng,
is_released, status, scene_status_level, total_xp columns.
```

### Phase 1 Checklist
- [ ] Task 01: Next.js 14 project, TypeScript strict, Tailwind, design system, color palette, fonts, folder structure
- [ ] Task 02: Supabase — all 22 tables, RLS policies, storage buckets (audio-clips/dj-sets/videos/images), indexes, 9 migrations
- [ ] Task 03: Auth — email + Google OAuth, role selection on signup, protected routes, Supabase SSR middleware
- [ ] Task 04: Landing page — animated waveform hero, 6-role value props, featured events section, city scenes preview, Radar preview
- [ ] Task 05: Mobile (React Native + Expo) — splash, role selection, city selection, follow 5 artists gate, live feed
- [ ] Task 06: User profiles — role-specific layout for all 6 roles (Fan/DJ/Producer/Venue/Promoter/Label) + Scene Status badge + EDM Passport preview
- [ ] Task 07: Discover directory — DJs/Producers/Venues/Labels with search + genre + city filters
- [ ] Task 08: Follow system — follows table, following_type (user/scene/genre/track/crate), notification subscriptions
- [ ] Task 09: Push notifications — Expo Notifications, APNs (Apple) + FCM (Android), notification templates

---

*Document last updated: June 2026*
*Source: Underground v5.0 Complete Outline (The Complex)*
*Owner: William Tallon — williamftallon@gmail.com*
*Domain: ugscene.app*
*Repo branch: claude/laughing-cori-of1fk*
