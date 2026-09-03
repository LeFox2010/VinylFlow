"use client";

import { readSpotifySession, refreshSpotifySession, SpotifyAuthError } from "./auth";
import type { SpotifyApiError } from "./types";

const API_URL = "https://api.spotify.com/v1";
export class SpotifyApiClientError extends Error { constructor(message: string, readonly status?: number, readonly retryAfter?: number) { super(message); } }

async function request<T>(path: string, init: RequestInit = {}, retried = false): Promise<T> {
  let session = readSpotifySession();
  if (!session) throw new SpotifyAuthError("Connect Spotify before making a request.");
  if (session.expiresAt <= Date.now() + 60_000) session = await refreshSpotifySession(session);
  const response = await fetch(`${API_URL}${path}`, { ...init, headers: { ...init.headers, Authorization: `Bearer ${session.accessToken}` } });
  if (response.status === 401 && !retried) { await refreshSpotifySession(session); return request<T>(path, init, true); }
  if (!response.ok) { const body = await response.json().catch(() => null) as SpotifyApiError | null; throw new SpotifyApiClientError(body?.error?.message ?? "Spotify API request failed.", response.status, Number(response.headers.get("Retry-After")) || undefined); }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const spotifyApi = {
  getCurrentlyPlaying: () => request<unknown>("/me/player/currently-playing"),
  getPlaybackState: () => request<unknown>("/me/player"),
  getSavedAlbums: (limit = 20, offset = 0) => request<unknown>(`/me/albums?limit=${limit}&offset=${offset}`),
  getPlaylists: (limit = 20, offset = 0) => request<unknown>(`/me/playlists?limit=${limit}&offset=${offset}`),
};
