# UNDERGROUND — Complete Project Context Document
**"Everything electronic in one place."**
Version 4.0 Outline · Document date: June 2026

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
14. [Fan Reputation System](#14-fan-reputation-system)
15. [Business Model & Revenue](#15-business-model--revenue)
16. [Pricing Tiers](#16-pricing-tiers)
17. [Build Order — 7 Phases, 47 Tasks](#17-build-order--7-phases-47-tasks)
18. [Environment Variables](#18-environment-variables)
19. [Security Requirements](#19-security-requirements)
20. [Email Templates](#20-email-templates)
21. [Push Notification Strategy](#21-push-notification-strategy)
22. [Marketing & Launch Strategy](#22-marketing--launch-strategy)
23. [Competitive Position](#23-competitive-position)
24. [Long-Term Vision (12–24 Month Roadmap)](#24-long-term-vision-1224-month-roadmap)
25. [Current Status & What To Build Next](#25-current-status--what-to-build-next)
26. [Architecture Decisions & Rationale](#26-architecture-decisions--rationale)
27. [Business Viability Assessment](#27-business-viability-assessment)
28. [Cost & Timeline Estimates](#28-cost--timeline-estimates)
29. [First Claude Code Prompt](#29-first-claude-code-prompt)

---

## 1. What Underground Is

Underground is the social scene for electronic music.

Not a track ID app. Not a ticketing platform. Not a music database. A social network where the community, the music, the events, and the culture all live in one place.

**The scene first. Every feature second.**

Instagram, TikTok, SoundCloud, Eventbrite, Beatport, Resident Advisor, Bandsintown, 1001Tracklists, Discord — fans currently use all of these badly. Underground replaces them all with one feed that understands EDM culture.

**Open the app and see:**
- Chris Stussy just announced he's playing Miami Friday
- New track from a producer you follow
- A warehouse rave tonight 2 miles from you
- Someone asking for a track ID from Berghain last night
- Ultra Miami lineup just dropped
- Venue posted the aftermovie from last weekend
- Unreleased ID you've been tracking just hit Heat Score 97

That's the product. Everything electronic, in one place.

**Domain:** underground.fm  
**Tagline:** "Everything electronic in one place."

**Genres covered:** House · Tech House · Deep House · Afro House · Melodic House · Techno · Trance · Drum & Bass · Dubstep · EDM · Progressive · Minimal · Garage · UKG · Ambient · Industrial · Breaks (all released and unreleased music across every sub-genre)

---

## 2. The Five Pillars

Everything in Underground is built around four core pillars. All features feed into at least one of them. (Note: spec says "four" but describes five — the nav has five tabs, treat it as five.)

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
- Earn reputation by solving IDs
- Get notified when unreleased tracks drop
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
- Track sales by event, venue, and genre

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
| URL | underground.fm |
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
type (text/clip/set/release_share/event_share/teaser/video)
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
| `/[username]` | Profile | Role-specific header and tools. DJs: upcoming shows, sets, releases, booking button. Producers: teasers, releases, feedback. Venues: events, aftermovies, lineup history. Fans: saved tracks, crates, ID history, reputation level |
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
| `/tracks/[id]` | Track Page | Every track (released and unreleased) gets its own page. Artwork, artist, label, genre, BPM, key, release status, Heat Score, streaming links, Where Was This Played, Track Lineage, comments |
| `/crates` | DJ Crates | Public, private, genre-tagged track collections. Follow curators |
| `/booking` | Booking Marketplace | Browse DJs by fee range, available dates, cities played, audience size. Direct inquiry form |
| `/reputation` | Fan Reputation | XP levels, city leaderboard, earn actions, progress bar |
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
    Waveform, Skeleton, HeatScore, StatusBadge, NotifyButton
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
    /reputation    XPBar, ReputationLevel, Leaderboard
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

### Social Feed

**Post types:**
- Text posts — news, thoughts, scene updates
- Clip posts — short audio/video with track recognition
- Set posts — full DJ set uploads with setlist
- Release posts — new or upcoming music announcements
- Event posts — show announcements with ticket link embedded
- Teaser posts — unreleased track previews
- Repost — reshare any post to your followers

**Feed algorithm:**
- People you follow, ranked by recency and engagement
- City-filtered view available at the top of every feed
- NO black-box algorithm hiding content from followers
- DJs post a show — every follower sees it
- Activity feed — see what people you follow are liking, saving, attending

**City toggle:**
- One tap switches the entire feed to a specific city's content
- Chicago. Berlin. London. NYC. Miami. Ibiza. Amsterdam. Detroit.
- This is the #1 differentiator vs Instagram for scene culture

### Mobile Onboarding Flow
- **Screen 1 — Splash:** Logo, animated waveform, two buttons: Get Started / Sign In. Just the vibe.
- **Screen 2 — Role Selection:** Fan / DJ / Producer / Venue / Label. Personalizes the feed algorithm from second one.
- **Screen 3 — Pick Your Scene:** Choose your city or cities. Fills the feed with local content immediately.
- **Screen 4 — Follow 5 Artists:** Suggested DJs/producers/labels based on selected city and role. Gate: cannot enter until 5 follows are made. Users who follow 5+ on day one have 3-4x better 30-day retention.
- **Screen 5 — Feed (Live):** App opens with content already there. Tonight Near Me notification permission prompt.

### Mobile Tab Navigation
| Tab | Icon | Content |
|---|---|---|
| Feed | home | Main social scene. Everything from people you follow. Sub-tabs: For You / Following / Releases / Events / Sets |
| Tonight | location | Tonight Near Me. Map view + list view. Last-minute tickets. Friend activity. The tab people open on Friday night |
| TV | play | Underground TV. Vertical video feed. Auto track recognition |
| Radar | signal | What's blowing up before it blows up. Heat Scores. Notify Me. City and genre filters |
| You | person | Your profile, settings, notifications, saved tracks, playlists, reputation level, booking inbox (DJs), event dashboard (venues), creator analytics |

### Underground TV
- Full-screen vertical scrolling. Every video is content from the scene.
- 3 sub-tabs: Following / For You / Live
- Right side: avatar + follow, heart/like count, comment count, share, spinning record icon
- Bottom: creator handle, role badge, caption, detected track with speaker icon
- Action buttons: ID AVAILABLE / + ADD TO CRATE / ID SOLVED / MAKE AN ID
- Every video auto-analyzed for audio fingerprints on upload
- Detected tracks link automatically to: Track Page, Underground Radar, Setlist Intelligence data, Heat Score, Artist profile, Event if relevant
- Content types: DJ set clips, festival clips, track ID clips, producer teasers, event announcements, aftermovies, crate drops

### Tonight Near Me
- Shows: clubs and shows tonight within configurable distance, festivals and major events nearby, afterparties, secret events (unlocked on RSVP or friend connection), last-minute ticket availability, friends who are going
- **Filters:** Distance (1 mile, 5 miles, 25 miles, any), Genre (House, Techno, EDM, Trance, D&B, etc.), Time (starting now, starting tonight, this weekend), Ticket price (free, under $20, under $50, any)
- **Views:** List view (event cards sorted by distance and start time) + Map view (pins on a map)
- **Actions:** Buy ticket (Stripe checkout, in-app), Mark Going (public, friends can see), Mark Interested (private), Share event, Follow the venue or DJ
- **Key habit:** People check this tab every Friday and Saturday. Unlike Eventbrite or RA, it's personalized to your city, your genre preferences, and your friends' activity.

### City Scenes
- 13 launch cities: Miami · Berlin · London · NYC · Chicago · Ibiza · Amsterdam · Detroit · Melbourne · São Paulo · Barcelona · Paris · Tokyo
- City scene page: city-filtered social feed, local DJs and artists, local venues, upcoming events + Tonight Near Me for that city, City Rankings, local releases and trending tracks, follow scene → weekly digest email
- **City Rankings (weekly):** Top tracks by Heat Score in that city, Top DJs by activity, Upcoming events sorted by ticket velocity, Trending genres, Fastest-growing artists
- Cities compete globally. Scenes take pride. Word spreads.

### DJ Crates
- Curated track collections. Released and unreleased music together.
- Think Spotify playlists but built for DJs with Heat Scores and play data.
- Types: Public (anyone can follow), Private (invite only), Genre crates (tagged and discoverable)
- Examples: Miami Afterhours Crate, Ibiza Summer Weapons 2025, Deep House Openers, Peak-Time Tech House, Unreleased Weapons (Radar-fed), Berlin Warehouse Tools
- Follow a crate → get notified when curator adds new tracks

### Booking Marketplace
- Promoters browse and book DJs directly through Underground
- DJ profile shows: fee range (e.g. €2K–$5K), available dates, cities played (from Setlist Intelligence + manual), audience size (follower count), genre tags, past shows, booking button
- Promoter filters: City, Genre, Budget range, Availability window
- Inquiry flow: Promoter sends inquiry → DJ receives notification in booking inbox → DJ Pro required to see and respond → conversation stays in-app → Underground takes 5% of confirmed bookings
- DJ booking analytics: inquiry volume, acceptance rate, avg booking fee, top cities

### Fan Reputation System
- Quality control for community IDs + reason superfans stay engaged
- Level 1 — ID Hunter (0–500 XP)
- Level 2 — Crate Digger (500–2K XP)
- Level 3 — Underground Expert (2K–10K XP)
- Level 4 — Scene Legend (10K+ XP)

**XP Actions:**
| Action | XP |
|---|---|
| Solve a community ID | +50 XP |
| Correct ID confirmed by community | +100 XP |
| First person to correctly ID a track | +200 XP |
| ID confirmed by the artist | +500 XP |
| Add track to setlist manually | +25 XP |
| Daily login streak | +5 XP/day |
| Post a set that generates 10+ IDs | +100 XP |
| Invite a DJ who joins and posts | +150 XP |

**Benefits:** Higher-level users' ID suggestions weighted more heavily. Scene Legends get profile badge and city leaderboard placement. Top 10 per city published weekly.

### Track Pages
Every track — released, unreleased, white label, bootleg, edit — gets its own page.

**Track page includes:**
- Artwork (or gradient placeholder for unreleased)
- Title, artist, label
- Genre, BPM, key signature
- Release status badge (Released / Unreleased / White Label / Unknown)
- Heat Score with animated ring at 90+
- Streaming links (Spotify, Apple Music, Beatport, SoundCloud, Bandcamp, YouTube)
- Notify Me button (if unreleased)
- Hype vote button
- Where Was This Played section
- Track Lineage section
- Community comments
- Related tracks

**"Where Was This Played?"** — Which DJs have played it (with play count), which venues it's been heard at, which cities it's appeared in, timeline: first appearance to most recent. Sources: Setlist Intelligence (automatic) + community entries.

**Track Lineage** — Full version tree: Original → Bootleg → Edit → VIP Mix → Festival Edit → Official Release. Artists and labels tag their own versions. Community suggests connections. Shows play counts per version and which version DJs are currently playing.

### Mix Compatibility Engine
- Input: any track with BPM and key data
- Output: ranked list of tracks that mix harmonically
- Matching criteria: BPM range (±2 BPM), Camelot Wheel key compatibility (adjacent and matching keys), Energy level (derived from genre and Heat Score)
- Pulls BPM and key data from Beatport and Spotify APIs where available. Community fills the rest.

### AI Mix Recommendations (Phase 6 — after 10K+ uploads)
- "Tracks DJs actually mix with this." Better than collaborative filtering because it uses real behavior.
- Powered by transition data from Setlist Intelligence
- After 10,000+ uploaded sets, system knows what tracks DJs play immediately before and after any given track
- **DEPENDENCY:** Do not build this before 10,000+ sets uploaded. Do not fake it.

### Producer Feedback Marketplace (Phase 6 — after producer community scales)
- Product Hunt for dance music
- Producer uploads unreleased track → receives structured feedback from Fans (would you hear this at a club?), DJs (would you play this?), Labels (is this release-ready?)
- Feedback is anonymous by default. Labels can scout via this section.

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

**What Setlist Intelligence does:**
- Splits the set into 60-second segments
- Sends all segments to ACRCloud bulk fingerprinting endpoint
- Timestamps every identified track
- Flags unidentified segments as community ID requests
- Auto-builds a complete, exportable timestamped setlist
- Shows transitions between tracks
- Feeds all play data into track_plays table
- Builds set history and archives for each DJ
- Tracks track order and transitions within sets
- Generates most-played-tracks lists per DJ
- Feeds unreleased IDs directly into Underground Radar
- Contributes to Heat Score for every track in the set

**Output example:**
```
00:00  Unreleased ID         Unknown          [HEAT: 97] [Notify Me]
04:17  XXX (Original Mix)    Chris Stussy     [Released] [Spotify]
08:44  Unknown PAWSA ID      PAWSA            [HEAT: 89] [Notify Me]
12:05  Fly Away XTC          KETTAMA          [Released] [Beatport]
16:22  White Label Edit      Unknown          [HEAT: 78] [Notify Me]
```

**Exports:** Spotify playlist (released tracks only, pending tracks queued), Apple Music playlist, Beatport playlist, Shareable tracklist link, Embed code for DJ websites

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

**Why Stripe Connect:** venues receive money directly. Underground never holds funds. KYC and payouts handled automatically. This is legally correct from day one.

**Platform fee:** $1.50–$2.50 per ticket (2.5% of face value)

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
- Score resets to 0 when a track becomes truly mainstream (defined as charting on Beatport Top 10 or Spotify editorial)
- Animated ring appears in UI at 90+
- Unreleased tracks build Heat Score from ID requests and DJ plays
- Released tracks that are gaining underground momentum also appear when being played heavily in sets before going mainstream
- A track released on Bandcamp but being played at Berghain will rank high even if it's not on Spotify yet

---

## 14. Fan Reputation System

See Section 9 for full details.

**Level Summary:**
| Level | Name | XP Range |
|---|---|---|
| 1 | ID Hunter | 0–500 |
| 2 | Crate Digger | 500–2,000 |
| 3 | Underground Expert | 2,000–10,000 |
| 4 | Scene Legend | 10,000+ |

---

## 15. Business Model & Revenue

### 1. Ticketing — Primary · Day 1
- Venues and promoters list events free
- Underground takes $1.50–$2.50 per ticket sold (2.5%)
- Stripe Connect pays venues directly. We never hold funds.
- Math: 300 tickets × $2 = $600/event. 20 venues × 3 nights/week = **$36,000/week from ticketing alone** (at scale)

### 2. Promoted Placement — Primary · Day 1
- DJs, labels, venues, and promoters pay for featured placement
- Types: feed boost, search top, city page boost, city scene feature, release spotlight, event spotlight, TV boost
- Flat rate: $50–$500/week depending on placement
- Self-serve dashboard — no sales team needed

### 3. Booking Marketplace Fee
- Underground takes **5%** of confirmed bookings made through the platform
- Free DJs see locked booking requests — unlock with DJ Pro
- Scales naturally as more promoters use the platform to book

### 4. Pro Subscriptions
- Fan Pass: $5/month — unlimited IDs, early alerts, Notify Me, no ads
- DJ Pro: $15/month — booking inbox, analytics, verified badge, sets
- Venue Pro: $50–200/month — ticketing tools, analytics, branded pages
- Label Pro: $49–500/month — roster, release calendar, trend monitoring
- **Key: Pro unlocks tools, not the platform. Free is genuinely useful.**

### 5. Affiliate Links — Passive · Add at 10K users
- Pioneer DJ gear, Ableton, Native Instruments, Splice, Plugin Boutique
- 4–8% commission. Contextual and zero friction.

### 6. Festival & Brand Advertising — Scale · Add at 50K users
- Ultra, Tomorrowland, ADE, Movement, Pioneer DJ, Roland, Output
- Sponsored city pages, feed takeovers, event spotlights: $5K–$50K/deal

### 7. Data & Trend Reports — Future
- Anonymized intelligence sold to labels, booking agencies, festivals
- "What genres are growing in Chicago this month?"
- "Which unreleased tracks are getting the most ID requests?"
- "Which DJs are breaking tracks earliest?"
- "Which cities have the highest demand for a specific artist?"

---

## 16. Pricing Tiers

| Tier | Price | Key Features |
|---|---|---|
| **FREE** | $0 | Follow anyone, browse everything, 3 audio IDs/month, city scene access, Tonight Near Me, basic profile |
| **FAN PASS** | $5/month | Unlimited audio IDs, early show announcements (24hr before public), Notify Me When This Drops on any track, full Underground Radar access, weekly city scene digest email, no ads |
| **DJ PRO** | $15/month | Everything in Fan Pass + verified DJ profile and badge, upload sets (Setlist Intelligence), post upcoming shows, booking inquiry inbox, follower and reach analytics, priority in DJ search results |
| **VENUE PRO** | $50–200/month | Everything in DJ Pro + branded event pages with built-in ticketing, lineup management, aftermovie hosting, ticketing analytics and revenue tracking, follower growth tools |
| **LABEL PRO** | $49–500/month | Everything in Venue Pro + label page with artist roster, release calendar management, release announcement emails to all followers, trend monitoring dashboard, up to 10 artist profiles under label umbrella |

---

## 17. Build Order — 7 Phases, 47 Tasks

Each phase is fully shippable before the next begins. Build mobile and web in parallel from Phase 1.

### Phase 1 — Foundation (6–8 weeks)
1. Project setup — TypeScript, Tailwind, ESLint, GitHub, Vercel/EAS CI
2. Supabase schema — all 22 tables, RLS policies, storage buckets, indexes
3. Auth — email + Google OAuth, role selection, protected routes
4. Landing page (web)
5. Mobile onboarding — splash, role, city, follow 5, feed
6. User profiles — role-specific (DJ, Producer, Venue, Label, Fan)
7. Discover directory — DJs, Producers, Venues, Labels
8. Follow system — follows table, notification subscriptions
9. Push notifications — Expo Notifications setup, APNs + FCM

### Phase 2 — Events & Ticketing (4–5 weeks)
10. Events CRUD — create, edit, publish, cancel
11. Stripe Connect onboarding for venues and promoters
12. Ticket purchase flow — Checkout session, webhook, QR code
13. Ticket confirmation email via Resend
14. Events page + event detail page
15. Tonight Near Me — geolocation, map view, nearby events
16. Festival pages — static initially, community setlists later

### Phase 3 — Core Moat Features (6–8 weeks)
17. Setlist Intelligence — upload pipeline, ACRCloud bulk, setlist output
18. Heat Score — nightly Supabase Edge Function, indexed column
19. Underground Radar — page, feed widget, filters
20. Track Pages — every track gets a page (released + unreleased)
21. Where Was This Played — track_plays table, history view, timeline
22. Notify Me When This Drops — track_notifications, Resend trigger
23. Audio ID tool — Audd → ACRCloud → AcoustID pipeline
24. Community ID requests and voting

### Phase 4 — Social & Content (4–5 weeks)
25. Social feed — all post types, compose modal, infinite scroll
26. Underground TV — vertical video feed, upload, track recognition
27. Releases page — Beatport RSS, Spotify new releases (released + unreleased)
28. City scenes pages — local feed, events, artists
29. City Rankings — leaderboard powered by Heat Score + events
30. DJ Crate Sharing — crates + crate_tracks, follow curators
31. Fan Reputation System — XP, levels, badges, leaderboard

### Phase 5 — Marketplace (3–4 weeks)
32. Booking Marketplace — full DJ booking, inquiry form, inbox, 5% fee
33. Track Lineage — version tree, artist tagging, community suggestions
34. Promoted placement self-serve dashboard
35. Creator analytics dashboard — followers, reach, ticket sales, bookings

### Phase 6 — Advanced Features (4–6 weeks)
36. Mix Compatibility Engine (BPM + Camelot Wheel — after data at scale)
37. AI Mix Recommendations (Setlist transition data — after 10K+ uploads)
38. Producer Feedback Marketplace (after producer community scales)
39. Sample Recognition (if WhoSampled partnership secured)
40. Playlist Builder cross-platform exports (Spotify, Apple Music, etc.)

### Phase 7 — Hardening (2–3 weeks)
41. Full RLS audit — test every policy with a second user account
42. Rate limiting — Upstash Redis on all API routes
43. Security headers — next.config.js
44. Sentry — frontend + backend, source maps, remove all console.log
45. Mobile QA — real iOS and Android devices, every screen
46. Performance audit — Lighthouse, feed load time, push latency
47. README + deployment docs

---

## 18. Environment Variables

Full list of required env vars:

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
RESEND_FROM_EMAIL=noreply@underground.fm

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Error Tracking
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# App
NEXT_PUBLIC_SITE_URL=https://underground.fm
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
CORS: allow underground.fm only
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

### MEDIUM VALUE — Respect timing
- Weekly city digest (Friday morning — exactly when people plan their weekend)
- New release from a label you follow (on release day only)
- New DJ set uploaded by someone you follow

### LOW VALUE — Never send
- Generic "check what's new" prompts
- Engagement bait ("someone liked your post")
- Promotional content not relevant to followed accounts

**Rule: every notification should feel like a text from a friend who knows what you're into. Not an app sending a push.**

---

## 22. Marketing & Launch Strategy

### Core Principle
Build the social scene first. Seed it with real artists. Every other feature is meaningless without the community.

### Before Any Marketing
- Pick one launch city — Miami, Chicago, or London.
- Sign 10 venues and 20 DJs manually before public announcement.
- Content must exist when users arrive.
- One exclusive event announced only on Underground = press hook.

### Channel Playbook

**DIRECT DJ OUTREACH**
- Email the top 50 DJs in your launch city. One at a time. Personalized.
- Offer free DJ Pro for life if they join in the first 90 days.
- Key message: "Your followers will actually see your posts here. Booking inquiries come through the app. It's built for this world."
- One major DJ posting about Underground unprompted > every other channel.

**VENUE WALK-INS**
- Don't email venues. Go in person.
- Show the ticketing feature on your phone.
- Free to list. $2 per ticket. Fans are already on the platform.
- Ask: if first event goes well, mention Underground to their audience.
- 3–5 venues announcing exclusively = press story.

**TONIGHT NEAR ME AS ACQUISITION HOOK**
- "What's happening tonight?" is a search people do every Friday.
- Tonight Near Me surfaces in location-based search on mobile.
- A user finds an event, buys a ticket, creates an account.
- First retention hook: show them what else is in their city.
- Organic acquisition with zero ad spend.

**UNDERGROUND TV FOR ORGANIC REACH**
- "Do you know this track?" clips shared from Underground TV circulate in electronic music TikTok and Instagram Reels.
- Every clip links back to the ID tool and the app.
- Track ID content is genuinely shareable and search-relevant.
- One viral "mystery track from Berghain" clip = thousands of downloads.

**REDDIT**
- r/DJs, r/electronicmusic, r/housemusic, r/techno, r/edmproduction
- Contribute genuinely for 2–3 months. Answer track ID questions.
- Then: transparent launch post. "I built this for this community. Tell me why it's a bad idea." Reddit rewards authenticity.

**MUSIC PRESS**
- Magnetic Magazine, Data Transmission, Mixmag, DJ Mag, Attack Magazine.
- Angle: "The social network electronic music has been missing."
- Wait until you have named venues and DJs to reference.
- Target the specific writer who covered the last platform launch.

**YOUTUBE SET CHANNELS**
- Channels with millions of subscribers, comments full of track ID requests.
- Partner: they get Underground channel pages, you get their audience.

**DISCORD & TELEGRAM**
- Every genre and major artist has active server/group.
- Join genuinely. One trusted launch announcement moves thousands.

### Launch Sequence
| Timeframe | Activity |
|---|---|
| Weeks 1–4 | Seed — 20 DJs, 5 venues, 3 labels. No public announcement. |
| Weeks 5–6 | Soft launch to personal network and Reddit. No press. Fix what's broken based on real usage. |
| Weeks 7–8 | Press outreach with venue exclusivity story. One event announced only on Underground = journalist hook. |
| Month 3+ | Expand to second city. Apply everything learned. |

### Budget Guidance
- Spend almost nothing on paid ads for the first 6 months.
- Electronic music audiences resist advertising.
- Every dollar is better spent on personal outreach and product.
- At 10,000 active users with clear retention data, paid acquisition makes sense.

---

## 23. Competitive Position

| Feature | Underground | Instagram | SoundCloud | Beatport | RA | Bandsintown | TikTok |
|---|---|---|---|---|---|---|---|
| Social scene for EDM | ✓ Only | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Setlist Intelligence | ✓ Only | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Underground Radar | ✓ Proprietary | ✗ | ✗ | Charts only | ✗ | ✗ | ✗ |
| Heat Score | ✓ Proprietary | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Where Was This Played | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Tonight Near Me | ✓ | ✗ | ✗ | ✗ | Partial | Partial | ✗ |
| Underground TV | ✓ EDM-focused | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ (broad) |
| Audio ID (released+unrel.) | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Track Pages (all music) | ✓ | ✗ | Partial | Partial | ✗ | ✗ | ✗ |
| DJ Crate Sharing | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Festival Mode | ✓ | ✗ | ✗ | ✗ | Partial | ✗ | ✗ |
| Built-in Ticketing | ✓ | ✗ | ✗ | ✗ | ✗ | Partial | ✗ |
| Booking Marketplace | ✓ | DM only | ✗ | ✗ | ✗ | ✗ | ✗ |
| Fan Reputation | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| City Scene Feeds | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| City Rankings | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Track Lineage | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| All Roles in One Place | ✓ | ✗ | Partial | ✗ | ✗ | ✗ | ✗ |
| Free for Fans | ✓ | ✓ | ✓ | Limited | ✓ | ✓ | ✓ |

---

## 24. Long-Term Vision (12–24 Month Roadmap)

Underground becomes the operating system for electronic music.

Instead of:
- Instagram for following DJs
- TikTok for discovering content
- SoundCloud for listening to sets
- Resident Advisor for event listings
- Eventbrite for buying tickets
- Bandsintown for tour dates
- 1001Tracklists for setlists
- Discord for community
- Beatport for new music

Everything lives in one place. One account. One feed. The scene, the music, the events, the culture — all connected.

**Future features (12–24 month roadmap):**
- Direct messaging between users
- Livestreaming from events and studios
- Virtual festival experiences
- Artist fan clubs with exclusive content
- EDM marketplace (sample packs, Ableton templates, plugins)
- DJ gear affiliate store
- Label deal pipeline — connecting producers with labels via data
- Touring data for booking agencies
- Underground Radio — curated live radio streams by city/genre
- AI Mix Recommendations (after 10K+ uploaded sets)
- Sample Recognition (WhoSampled partnership)

---

## 25. Current Status & What To Build Next

### Current Status — June 2026
**NOTHING IS BUILT YET.**

All planning is complete:
- ✅ 52-page product spec written (Version 4.0 — The Complete Outline)
- ✅ Design system defined and mockups approved (5 screens reviewed)
- ✅ Database schema finalized (22 tables)
- ✅ Tech stack decided
- ✅ All 26 pages/routes mapped
- ✅ All 47 build tasks across 7 phases ordered
- ✅ Business model finalized
- ✅ Marketing strategy written
- ✅ Revenue projections done
- ✅ Security requirements defined
- ✅ Environment variables listed
- ✅ Folder structure defined
- ✅ Build cost estimated ($1,834 to launch)
- ✅ Running costs estimated ($359/month)

**The build has not started. Phase 1 is the starting point.**

### What To Do In The Next Claude Session

The very first thing to build is the **Next.js web project**. Use this exact prompt:

```
Create a new Next.js 14 App Router project called "underground" with TypeScript 
strict mode, Tailwind CSS, ESLint, src/ directory structure.

Install: @supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js 
@upstash/redis @upstash/ratelimit resend zod @sentry/nextjs lucide-react 
framer-motion mapbox-gl react-map-gl @tanstack/react-query date-fns

Set up color palette as CSS variables:
  Background: #080808
  Surface: #111111
  Accent Yellow: #E8FF47
  Pink: #FF3366
  Blue: #00D4FF
  Orange: #FF9500
  Purple: #9B59B6
  Text Primary: #FFFFFF
  Text Secondary: #888888
  Border: #222222

Add Bebas Neue, DM Mono, DM Sans from Google Fonts.

Create this exact folder structure:
/app, /components/ui, /components/features, /components/layout,
/lib/supabase, /lib/audio, /lib/stripe, /lib/redis, /lib/resend,
/types, /supabase/migrations, /emails

Create all 22 Supabase tables with proper foreign keys, RLS policies, 
storage buckets (audio, video, images), and indexes.

Create Supabase migrations in this order:
001_initial_schema.sql, 002_rls_policies.sql, 003_storage_buckets.sql,
004_indexes.sql, 005_heat_score.sql, 006_setlist_tables.sql,
007_festivals_crates.sql, 008_tonight_location.sql, 009_tv_recognition.sql
```

### Phase 1 Checklist (Start Here)
- [ ] Task 01: Next.js 14 project setup, TypeScript strict, Tailwind, design system
- [ ] Task 02: Supabase — all 22 tables, RLS, storage buckets, indexes
- [ ] Task 03: Auth — email + Google OAuth, role selection on signup, protected routes
- [ ] Task 04: Landing page — animated waveform hero, 6-role value props, featured events section
- [ ] Task 05: Mobile (React Native + Expo) — splash, role selection, city selection, follow 5, feed
- [ ] Task 06: User profiles — role-specific layout for each of the 6 roles
- [ ] Task 07: Discover directory — DJs/Producers/Venues/Labels with search + filters
- [ ] Task 08: Follow system — follows table, notification subscriptions
- [ ] Task 09: Push notifications — Expo Notifications, APNs + FCM

### Cold Start Strategy (Most Important Decision)

**DO NOT launch the full social platform first.**

The recommended cold start sequence:
1. **Launch Setlist Intelligence ONLY** — let DJs upload sets and get tracklists
2. Get 20 DJs uploading sets. The Heat Score now has real data.
3. **Add Underground Radar** — the data from DJ uploads feeds directly into this
4. Users start following tracks on Radar → they need accounts → social layer begins
5. **Add social layer** — now the feed has real content (DJs' sets, their tracks, their events)
6. **Add Tonight Near Me** — sign 5 venues. Friday night opens the app.
7. **Full platform** — everything connects once each piece has real users

This is how you avoid an empty feed on day one.

---

## 26. Architecture Decisions & Rationale

| Decision | Choice | Why |
|---|---|---|
| Web framework | Next.js 14 App Router | SSR for SEO (track pages, event pages need to be crawlable), server components reduce client bundle, API routes built-in |
| Mobile framework | React Native + Expo | Cross-platform (iOS + Android), Expo EAS handles builds and OTA updates, Expo Notifications for push |
| Database | Supabase (PostgreSQL) | RLS built-in (critical for this app), real-time subscriptions for feed, auth included, storage included, edge functions for Heat Score |
| Auth | Supabase Auth | Zero-config, works with RLS, Google OAuth included, role metadata in JWT |
| Payments | Stripe + Stripe Connect | Stripe Connect is the only correct choice — venues get paid directly, Underground never holds funds, KYC automated |
| Audio ID | Audd.io → ACRCloud → AcoustID | Three-tier fallback: Audd is best for social/DJ content, ACRCloud has the bulk endpoint needed for Setlist Intelligence, AcoustID is free fallback |
| Rate limiting | Upstash Redis | Serverless-compatible, sliding window algorithm, low latency |
| Email | Resend | Best deliverability for transactional email, React email templates |
| Maps | Mapbox | Better dark theme support than Google Maps, better performance for custom markers (venue dots), lower cost at scale |
| State | TanStack Query | Server state management, infinite scroll, optimistic updates, cache invalidation |
| Validation | Zod | Runtime validation matches TypeScript types, works in both client and server |
| Hosting | Vercel | Next.js native, edge functions, image optimization, fast CI/CD |

### Why NOT to use alternatives
- **Firebase over Supabase:** Supabase has RLS (row-level security) which is essential. Firebase requires manual security rules that are harder to audit.
- **Expo Go over EAS:** EAS is required for APNs (Apple push notifications) which is non-negotiable for the Tonight Near Me feature.
- **Simple video player over TikTok-style scroll:** The vertical scroll format is mandatory for Underground TV. It's a different product if you don't have it.
- **Generic algorithm over transparent feed:** Electronic music culture specifically hates algorithmic suppression (Instagram does this). Underground's promise is that DJs post → every follower sees it. This is a feature, not a limitation.

---

## 27. Business Viability Assessment

**Honest assessment: 35–50% probability of meaningful traction.**

### What Makes This Real
1. **The moat is real.** Setlist Intelligence does not exist anywhere. 1001Tracklists is manual and community-built. ACRCloud bulk fingerprinting on a full DJ set is technically achievable and Underground has a path to doing it automatically.
2. **The pain is real.** Anyone who has spent 45 minutes in YouTube comments asking "what is this track?" understands this product immediately.
3. **The community is real.** Electronic music fans are obsessive, global, and underserved by current tools.
4. **The founder advantage is real.** If the builder knows the scene (specific DJs, how Berghain works, what Drumcode is), they will build the right product. If not, the cultural inauthenticity will show.

### What Makes This Hard
1. **Cold start.** An empty feed is worse than no app. The first 20 DJs need to be signed before launch. This is offline work, not code.
2. **Two-sided marketplace × 6 roles.** Six user types need value simultaneously. Fan with no DJs = useless. DJ with no fans = useless.
3. **ACRCloud cost at scale.** Setlist Intelligence is the moat but it costs $99–$8,000+/month depending on usage. This needs to be on DJ Pro ($15/month) from day one.
4. **Spotify Extended Quota.** Needed for playlist exports. Takes 1–3 weeks to get approved. Apply early.
5. **Established competitors are sticky.** RA has 20 years of inertia. Getting venues to use a new ticketing platform is hard. Getting DJs off Instagram is hard.

### The Make-or-Break Question
Do you personally know 20 DJs and 5 venues in one city who will post before launch? If yes, this has a real shot. If no, that's the first problem to solve — not code.

---

## 28. Cost & Timeline Estimates

### Build Cost (18 weeks)

| Week | Focus | Cost |
|---|---|---|
| 1–2 | Setup, Supabase schema, auth | $200 (domain, tools) |
| 3–4 | Landing page, profiles, discover | $0 |
| 5–6 | Events, ticketing, Stripe Connect | $29 (Stripe test, Supabase Pro) |
| 7–8 | Tonight Near Me, festival pages | $50 (Mapbox) |
| 9–10 | Setlist Intelligence, ACRCloud | $99–$299 (ACRCloud) |
| 11–12 | Heat Score, Radar, Track Pages | $0 |
| 13–14 | Social feed, Underground TV | $0 |
| 15–16 | Booking, promotions, analytics | $0 |
| 17–18 | Hardening, QA, deploy | $99 (Apple Developer $99/yr) |
| **Total** | | **~$1,834** |

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
| Sentry | $26 |
| **Total** | **~$359/month** |

### Timeline (Claude Code approach)
- **2–3 weeks** to have a working web app (Phase 1 complete)
- **5–8 weeks** for full web platform (Phases 1–4)
- **10–14 weeks** for web + mobile (Phases 1–5)
- **18 weeks** for the complete product with hardening (all 7 phases)

**Hard limits that can't be accelerated:**
- Apple App Store review: 1–2 weeks
- Spotify Extended Quota approval: 1–3 weeks (apply Week 1)
- ACRCloud bulk endpoint access: 1–5 days

### Time Per Day Required
- Claude Code does ~70% of the build
- Expect 2–4 hours/day of active work: reviewing Claude's output, making decisions, testing UI, doing offline work (DJ outreach, venue calls)
- Design decisions still require human judgment
- The offline work (signing DJs and venues) cannot be delegated to Claude Code

---

## 29. First Claude Code Prompt

When starting the build for real, use this as your very first prompt in a new session:

```
I'm building Underground — a social network for electronic music. 
Everything electronic in one place.

Read the context file UNDERGROUND.md before starting. It has everything.

Start Phase 1, Task 1: Set up the Next.js 14 App Router project.

Requirements:
- TypeScript strict mode
- Tailwind CSS with custom CSS variables for the Underground color palette
  (Background #080808, Surface #111111, Accent Yellow #E8FF47, Pink #FF3366,
  Blue #00D4FF, Orange #FF9500, Purple #9B59B6)
- Google Fonts: Bebas Neue (headings), DM Mono (labels/tags), DM Sans (body)
- ESLint + Prettier configured
- src/ directory structure

Install these packages:
@supabase/supabase-js @supabase/ssr stripe @stripe/stripe-js @upstash/redis 
@upstash/ratelimit resend zod @sentry/nextjs lucide-react framer-motion 
mapbox-gl react-map-gl @tanstack/react-query date-fns

Create the full folder structure as defined in the context document:
/app (with all 26 route files as empty page.tsx stubs)
/components/ui, /components/features/*, /components/layout
/lib/supabase, /lib/audio, /lib/stripe, /lib/redis, /lib/resend
/types (database.ts, api.ts, audio.ts, events.ts, setlist.ts, location.ts)
/supabase/migrations (9 migration files, empty for now)
/emails (10 template files, empty stubs)

After the project is created and all packages installed, 
proceed to Task 2: Create all 22 Supabase database tables.
Write all migration SQL files in order (001 through 009).
Include all columns exactly as specified in the schema.
Include RLS policies on every table.
Include storage buckets: audio-clips, dj-sets, videos, images.
Include all relevant indexes for performance (heat_score, city, genres, lat/lng).
```

---

*Document last updated: June 2026*
*Source: Underground v4.0 Complete Outline (52 pages) + session context*
*Owner: William Tallon — williamftallon@gmail.com*
*Domain: underground.fm*
*Repo branch: claude/laughing-cori-of1fk*
