"use client";

import { SPOTIFY_SCOPES, getSpotifyRedirectUri, getSpotifyClientId } from "./config";
import type { SpotifySession, SpotifyTokenResponse } from "./types";

const SESSION_KEY = "vinylflow.spotify.session";
const VERIFIER_KEY = "vinylflow.spotify.pkce.verifier";
const STATE_KEY = "vinylflow.spotify.pkce.state";
const TOKEN_URL = "https://accounts.spotify.com/api/token";

export class SpotifyAuthError extends Error {}

function base64Url(bytes: Uint8Array) {
  let value = "";
  bytes.forEach((byte) => { value += String.fromCharCode(byte); });
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function randomValue(byteLength = 64) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64Url(bytes);
}

async function challengeFor(verifier: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64Url(new Uint8Array(digest));
}

function saveSession(response: SpotifyTokenResponse, fallbackRefreshToken?: string): SpotifySession {
  const session: SpotifySession = { accessToken: response.access_token, refreshToken: response.refresh_token ?? fallbackRefreshToken ?? "", expiresAt: Date.now() + response.expires_in * 1000, scope: response.scope ?? SPOTIFY_SCOPES.join(" ") };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

async function requestToken(body: URLSearchParams) {
  const response = await fetch(TOKEN_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  const json = await response.json().catch(() => null) as SpotifyTokenResponse & { error?: string; error_description?: string } | null;
  if (!response.ok || !json?.access_token) throw new SpotifyAuthError(json?.error_description ?? json?.error ?? "Spotify could not issue a token.");
  return json;
}

export async function beginSpotifyLogin() {
  const clientId = getSpotifyClientId();
  if (!clientId) throw new SpotifyAuthError("Spotify is not configured. Add NEXT_PUBLIC_SPOTIFY_CLIENT_ID first.");
  const verifier = randomValue();
  const state = randomValue(32);
  sessionStorage.setItem(VERIFIER_KEY, verifier);
  sessionStorage.setItem(STATE_KEY, state);
  const params = new URLSearchParams({ client_id: clientId, response_type: "code", redirect_uri: getSpotifyRedirectUri(), code_challenge_method: "S256", code_challenge: await challengeFor(verifier), state, scope: SPOTIFY_SCOPES.join(" ") });
  window.location.assign(`https://accounts.spotify.com/authorize?${params}`);
}

export async function completeSpotifyLogin(search: URLSearchParams) {
  const error = search.get("error");
  if (error) throw new SpotifyAuthError(error === "access_denied" ? "Spotify authorization was cancelled." : `Spotify authorization failed: ${error}.`);
  const code = search.get("code");
  const state = search.get("state");
  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  const expectedState = sessionStorage.getItem(STATE_KEY);
  if (!code || !verifier || !expectedState || state !== expectedState) throw new SpotifyAuthError("The Spotify authorization response could not be verified. Please try again.");
  try {
    return saveSession(await requestToken(new URLSearchParams({ client_id: getSpotifyClientId(), grant_type: "authorization_code", code, redirect_uri: getSpotifyRedirectUri(), code_verifier: verifier })));
  } finally { sessionStorage.removeItem(VERIFIER_KEY); sessionStorage.removeItem(STATE_KEY); }
}

export function readSpotifySession() {
  try { const session = localStorage.getItem(SESSION_KEY); return session ? JSON.parse(session) as SpotifySession : null; } catch { clearSpotifySession(); return null; }
}

export async function refreshSpotifySession(session = readSpotifySession()) {
  if (!session?.refreshToken) throw new SpotifyAuthError("Your Spotify session has expired. Please connect again.");
  try { return saveSession(await requestToken(new URLSearchParams({ client_id: getSpotifyClientId(), grant_type: "refresh_token", refresh_token: session.refreshToken })), session.refreshToken); }
  catch (error) { clearSpotifySession(); throw error; }
}

export async function restoreSpotifySession() {
  const session = readSpotifySession();
  if (!session) return null;
  if (session.expiresAt > Date.now() + 60_000) return session;
  return refreshSpotifySession(session);
}

export function clearSpotifySession() { localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(VERIFIER_KEY); sessionStorage.removeItem(STATE_KEY); }
