# StreamHub

A polished Next.js landing and browse experience for a live-streaming platform concept.

## Features

- Animated landing page with hero, live channels, categories, community, and feature sections
- Browse page with filters and sorting
- Search page backed by local API routes
- Category and stream detail pages
- Demo API endpoints for streams, categories, and search

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

Or run everything:

```bash
npm run check
```

## Video/API roadmap

Current implementation uses local demo data and direct MP4 playback URLs so the UI and API contracts work without provider keys.

Recommended providers:

- **Pexels API**: best free source for demo video assets. Use `PEXELS_API_KEY` and map videos into `VideoItem`.
- **Mux**: best production option for uploading, transcoding, playback IDs, thumbnails, analytics, and live streams.
- **api.video**: strong alternative for hosted VOD/live streaming with simpler API ergonomics.
- **YouTube Data API**: useful if StreamHub embeds external creator videos instead of hosting them.
- **Twitch Helix API**: useful for live stream/category metadata if StreamHub aggregates Twitch-like data.

Implemented local API contracts:

- `GET /api/videos?q=&vertical=&status=&limit=&offset=`
- `GET /api/videos/:id`
- `GET /api/videos/:id/comments`
- `POST /api/videos/:id/comments` with `{ "body": "..." }`
- `GET /api/videos/:id/reactions`
- `POST /api/videos/:id/reactions` with `{ "type": "like" | "heart" | "fire" }`

Clerk integration seam:

- Comment/reaction write routes currently use `getDemoUser()` in `lib/content-data.ts`.
- After installing Clerk, replace that helper with `auth().protect()` plus `currentUser()` inside route handlers.
- Persist comments/reactions in a database before production. The current in-memory store is only for demo/local development.
