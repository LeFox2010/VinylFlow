"use client";

import { useSpotifyAuth } from "./spotify-auth-provider";
import { Icon } from "./icons";

const nav = [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Search", active: false }, { icon: "library", label: "Collection", active: false }] as const;

export function AppShell() {
  const { error, isConfigured, signIn, signOut, status } = useSpotifyAuth();
  const isConnected = status === "connected";
  return (
    <main className={`app-frame ${isConnected ? "connected" : "disconnected"}`}>
      <aside className="sidebar">
        <a className="wordmark" href="#top" aria-label="VinylFlow home"><span className="wordmark-mark" /><span>vinylflow</span></a>
        <nav aria-label="Main navigation">
          {nav.map(({ icon, label, active }) => <a key={label} className={`nav-item ${active ? "active" : ""}`} href={`#${label.toLowerCase()}`}><Icon name={icon} /><span>{label}</span></a>)}
        </nav>
        <section className="sidebar-section"><p className="eyebrow">Your shelves</p><a href="#recent">Recently played</a><a href="#albums">Saved albums</a><a href="#playlists">Playlists</a></section>
        <div className="sidebar-footer"><span className={`connection-led ${isConnected ? "online" : ""}`} /><span><strong>{isConnected ? "Spotify connected" : "Spotify disconnected"}</strong><small>{isConnected ? "Session restored" : "Sign in to begin"}</small></span></div>
      </aside>

      <section className="stage" id="top">
        <header className="topbar"><div><p className="eyebrow">Your listening room</p><h1>VinylFlow</h1></div><span className={`connection-badge ${isConnected ? "online" : ""}`}>{status === "restoring" ? "Restoring session" : isConnected ? "Spotify connected" : "Spotify not connected"}</span></header>
        <div className="turntable" aria-label="Vinyl player display">
          <div className="deck-shadow" /><div className="deck">
            <div className="platter"><div className="record"><div className="record-groove groove-one" /><div className="record-groove groove-two" /><div className="record-label"><span>VinylFlow</span><strong>02</strong><i /></div></div></div>
            <div className="tonearm"><span className="tonearm-pivot" /><span className="tonearm-bar" /><span className="cartridge" /></div>
            <span className="deck-screw screw-a" /><span className="deck-screw screw-b" />
          </div>
        </div>
        <section className="auth-panel" aria-live="polite">
          <p className="eyebrow">Spotify account</p>
          <h2>{isConnected ? "Spotify is ready." : "Make the first connection."}</h2>
          <p>{isConnected ? "Your authorised session is active. Playback and library features can now safely use the Spotify API." : "Connect your account to bring your current listening, library and playlists into VinylFlow."}</p>
          {error && <p className="auth-error" role="alert">{error}</p>}
          {isConnected ? <button className="secondary-action" onClick={signOut}>Disconnect Spotify</button> : <button className="primary-action" onClick={signIn} disabled={!isConfigured || status === "authorizing"}>{status === "authorizing" ? "Opening Spotify…" : "Connect Spotify"}</button>}
          {!isConfigured && <p className="auth-hint">Set <code>NEXT_PUBLIC_SPOTIFY_CLIENT_ID</code> to enable sign-in.</p>}
        </section>
      </section>

      <aside className="rightbar"><header><p className="eyebrow">Connection</p></header><section className="connection-card"><div className="device-icon"><Icon name="device" /></div><p>{isConnected ? "Account authorised" : "No account connected"}</p><strong>{isConnected ? "Spotify API access is enabled" : "Connect Spotify to unlock playback"}</strong></section><section className="scope-card"><p className="eyebrow">Approved access</p><ul><li>Current listening</li><li>Playback controls</li><li>Saved music</li><li>Private playlists</li></ul></section><div className="rightbar-spacer" /><p className="privacy-note">VinylFlow uses OAuth with PKCE. Your Spotify client secret is never requested or stored.</p></aside>
    </main>
  );
}
