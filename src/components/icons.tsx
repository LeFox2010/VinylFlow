import type { SVGProps } from "react";

type IconName = "home" | "search" | "library" | "chevron" | "more" | "volume" | "queue" | "play" | "pause" | "previous" | "next" | "shuffle" | "repeat" | "heart" | "device";

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.2 4.2" /></>,
    library: <><path d="M5 4v16M10 4v16M15 4v16M20 4v16" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    volume: <><path d="M5 10v4h3l4 3V7L8 10Z" /><path d="M16 9.5a4 4 0 0 1 0 5M18.5 7a7.5 7.5 0 0 1 0 10" /></>,
    queue: <><path d="M4 6h16M4 12h12M4 18h8" /></>,
    play: <path d="m8 5 11 7-11 7Z" fill="currentColor" stroke="none" />,
    pause: <><path d="M8 5v14M16 5v14" /></>,
    previous: <><path d="M6 5v14M18 6l-8 6 8 6Z" fill="currentColor" stroke="none" /></>,
    next: <><path d="M18 5v14M6 6l8 6-8 6Z" fill="currentColor" stroke="none" /></>,
    shuffle: <><path d="m4 7 3 0 10 10h3M17 7h3v3M20 7l-5 5M4 17h3l2-2" /></>,
    repeat: <><path d="M17 4l3 3-3 3M20 7H8a4 4 0 0 0-4 4M7 20l-3-3 3-3M4 17h12a4 4 0 0 0 4-4" /></>,
    heart: <path d="M20.8 8.7c0 5-8.8 10.4-8.8 10.4S3.2 13.7 3.2 8.7A4.5 4.5 0 0 1 12 7.3a4.5 4.5 0 0 1 8.8 1.4Z" />,
    device: <><rect x="4" y="4" width="16" height="12" rx="1.5" /><path d="M9 20h6M12 16v4" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true" {...common} {...props}>{paths[name]}</svg>;
}
