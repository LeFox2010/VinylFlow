"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { beginSpotifyLogin, clearSpotifySession, restoreSpotifySession } from "@/lib/spotify/auth";
import { getSpotifyClientId } from "@/lib/spotify/config";

type SpotifyAuthStatus = "restoring" | "disconnected" | "authorizing" | "connected";
type SpotifyAuthContextValue = { status: SpotifyAuthStatus; error: string | null; isConfigured: boolean; signIn: () => Promise<void>; signOut: () => void; refresh: () => Promise<void>; };
const SpotifyAuthContext = createContext<SpotifyAuthContextValue | null>(null);

export function SpotifyAuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [status, setStatus] = useState<SpotifyAuthStatus>("restoring"); const [error, setError] = useState<string | null>(null);
  const refresh = useCallback(async () => { setError(null); try { const session = await restoreSpotifySession(); setStatus(session ? "connected" : "disconnected"); } catch (reason) { setStatus("disconnected"); setError(reason instanceof Error ? reason.message : "Spotify session could not be restored."); } }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  const signIn = useCallback(async () => { setError(null); setStatus("authorizing"); try { await beginSpotifyLogin(); } catch (reason) { setStatus("disconnected"); setError(reason instanceof Error ? reason.message : "Spotify sign-in could not start."); } }, []);
  const signOut = useCallback(() => { clearSpotifySession(); setError(null); setStatus("disconnected"); }, []);
  const value = useMemo(() => ({ status, error, isConfigured: Boolean(getSpotifyClientId()), signIn, signOut, refresh }), [status, error, signIn, signOut, refresh]);
  return <SpotifyAuthContext.Provider value={value}>{children}</SpotifyAuthContext.Provider>;
}
export function useSpotifyAuth() { const context = useContext(SpotifyAuthContext); if (!context) throw new Error("useSpotifyAuth must be used within SpotifyAuthProvider."); return context; }
