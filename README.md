# VinylFlow

VinylFlow is a tactile, iPad landscape-first listening interface designed around the ritual of playing a record. It includes Spotify OAuth 2.0 Authorization Code with PKCE; no Spotify client secret is sent to or stored in the browser.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a landscape iPad-sized viewport for the intended experience.

## Spotify setup

Create a Spotify app and add the exact callback URL (`http://127.0.0.1:3000/callback` for local development) to its allowlist. Spotify does not permit `localhost` as a redirect URI. Then create `.env.local`:

```bash
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
NEXT_PUBLIC_SPOTIFY_REDIRECT_URI=http://127.0.0.1:3000/callback
```

`NEXT_PUBLIC_SPOTIFY_REDIRECT_URI` may be omitted when the deployment origin plus `/callback` is already allowlisted. Requested permissions are limited to current playback, playback control, saved music, and private playlists. Refresh tokens are stored locally by the browser for the PKCE session and are cleared on logout or a failed refresh.

## Available commands

- `npm run dev` — start development
- `npm run build` — production build
- `npm run typecheck` — validate TypeScript
- `npm run lint` — run lint checks

## Architecture

- `src/app` — Next.js App Router entry point and global design tokens
- `src/components` — reusable presentation components and inline SVG icon system

The current player does not simulate tracks or playback. The Spotify API client is ready for verified current-playback, library, and playlist requests; Web Playback SDK controls come in a later phase.
