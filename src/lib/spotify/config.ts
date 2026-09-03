export const SPOTIFY_SCOPES = ["user-read-currently-playing", "user-read-playback-state", "user-modify-playback-state", "user-library-read", "playlist-read-private"] as const;

export function getSpotifyClientId() { return process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID?.trim() ?? ""; }
export function getSpotifyRedirectUri() {
  const configured = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI?.trim();
  if (configured) return configured;
  if (typeof window === "undefined") return "";
  return `${window.location.origin}/callback`;
}
