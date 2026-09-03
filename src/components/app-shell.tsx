"use client";

import { Icon } from "./icons";

const nav = [{ icon: "home", label: "Home", active: true }, { icon: "search", label: "Search" }, { icon: "library", label: "Collection" }] as const;
const queue = ["Northern Lights", "Paper Planes", "White Noise", "Slow Motion"];

export function AppShell() {
  return (
    <main className="app-frame">
      <aside className="sidebar">
        <a className="wordmark" href="#top" aria-label="VinylFlow home"><span className="wordmark-mark" /><span>vinylflow</span></a>
        <nav aria-label="Main navigation">
          {nav.map(({ icon, label, active }) => <a key={label} className={`nav-item ${active ? "active" : ""}`} href={`#${label.toLowerCase()}`}><Icon name={icon} /><span>{label}</span></a>)}
        </nav>
        <section className="sidebar-section"><p className="eyebrow">Your shelves</p><a href="#recent">Recently played</a><a href="#albums">Saved albums</a><a href="#playlists">Playlists</a></section>
        <div className="sidebar-footer"><span className="avatar">BJ</span><span><strong>Ben Joël</strong><small>Free listener</small></span><Icon name="chevron" /></div>
      </aside>

      <section className="stage" id="top">
        <header className="topbar"><div><p className="eyebrow">Now spinning</p><h1>Evening sessions</h1></div><button className="icon-button" aria-label="More options"><Icon name="more" /></button></header>
        <div className="turntable" aria-label="Vinyl player display">
          <div className="deck-shadow" /><div className="deck">
            <div className="platter"><div className="record"><div className="record-groove groove-one" /><div className="record-groove groove-two" /><div className="record-label"><span>VinylFlow</span><strong>02</strong><i /></div></div></div>
            <div className="tonearm"><span className="tonearm-pivot" /><span className="tonearm-bar" /><span className="cartridge" /></div>
            <span className="deck-screw screw-a" /><span className="deck-screw screw-b" />
          </div>
        </div>
        <section className="track-meta"><div className="artwork"><span>LS</span></div><div><p className="eyebrow">Luna Sea · 2024</p><h2>Low Season</h2><p className="artist">Maya Delilah</p></div><button className="icon-button heart" aria-label="Save Low Season"><Icon name="heart" /></button></section>
        <div className="timeline"><span>1:47</span><div className="progress" aria-label="Track progress"><i /></div><span>3:28</span></div>
        <div className="transport" aria-label="Playback controls"><button aria-label="Shuffle"><Icon name="shuffle" /></button><button aria-label="Previous track"><Icon name="previous" /></button><button className="play-button" aria-label="Play"><Icon name="play" /></button><button aria-label="Next track"><Icon name="next" /></button><button aria-label="Repeat"><Icon name="repeat" /></button></div>
      </section>

      <aside className="rightbar"><header><p className="eyebrow">Up next</p><button className="text-button">View queue <Icon name="chevron" /></button></header><ol className="queue-list">{queue.map((title, index) => <li key={title} className={index === 0 ? "current" : ""}><span className="queue-no">{index + 1}</span><div><strong>{title}</strong><small>{index === 0 ? "Maya Delilah" : "Luna Sea"}</small></div><button aria-label={`Options for ${title}`}><Icon name="more" /></button></li>)}</ol><div className="rightbar-spacer" /><section className="device-card"><div className="device-icon"><Icon name="device" /></div><div><p>Listening on</p><strong>VinylFlow Player</strong></div><span className="status-dot" /></section><div className="volume"><Icon name="volume" /><div><i /></div></div></aside>
    </main>
  );
}
