"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { completeSpotifyLogin } from "@/lib/spotify/auth";

export default function SpotifyCallbackPage() {
  const router = useRouter(); const [message, setMessage] = useState("Completing your Spotify connection…");
  useEffect(() => { void completeSpotifyLogin(new URLSearchParams(window.location.search)).then(() => router.replace("/")).catch((error: unknown) => setMessage(error instanceof Error ? error.message : "Spotify connection could not be completed.")); }, [router]);
  return <main className="callback-page"><section><p className="eyebrow">VinylFlow × Spotify</p><h1>{message}</h1><p>If this page remains open, return to VinylFlow and start the connection again.</p></section></main>;
}
