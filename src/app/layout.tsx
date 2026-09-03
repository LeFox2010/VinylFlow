import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VinylFlow — Your music, in rotation",
  description: "A tactile, considered home for your Spotify listening.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
