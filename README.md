# VinylFlow

VinylFlow is a tactile, iPad landscape-first listening interface designed around the ritual of playing a record. This repository currently contains the visual foundation: a Next.js + TypeScript app shell and a polished static vinyl-player experience. Spotify authentication and playback integration are intentionally the next implementation phase.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in a landscape iPad-sized viewport for the intended experience.

## Available commands

- `npm run dev` — start development
- `npm run build` — production build
- `npm run typecheck` — validate TypeScript
- `npm run lint` — run lint checks

## Architecture

- `src/app` — Next.js App Router entry point and global design tokens
- `src/components` — reusable presentation components and inline SVG icon system

The current player is deliberately presentation-only: it does not simulate Spotify playback or offer inactive Spotify controls. The subsequent Spotify phase will replace the static listening state with verified Web Playback SDK state.
