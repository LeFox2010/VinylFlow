import type { Metadata } from "next";
import "./globals.css";
import { SpotifyAuthProvider } from "@/components/spotify-auth-provider";

export const metadata: Metadata = {
  title: "VinylFlow — Your music, in rotation",
  description: "A tactile, considered home for your Spotify listening.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SpotifyAuthProvider>{children}</SpotifyAuthProvider></body>
    </html>
  );
}
