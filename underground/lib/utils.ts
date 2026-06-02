import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(date: string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  return new Date(date).toLocaleDateString();
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatTimestamp(seconds: number): string {
  return formatDuration(seconds);
}

export const GENRES = [
  "House",
  "Tech House",
  "Deep House",
  "Afro House",
  "Melodic House",
  "Techno",
  "Trance",
  "Drum & Bass",
  "Dubstep",
  "EDM",
  "Progressive",
  "Minimal",
  "Garage",
  "UKG",
  "Ambient",
  "Industrial",
  "Breaks",
] as const;

export const LAUNCH_CITIES = [
  "Miami",
  "Berlin",
  "London",
  "NYC",
  "Chicago",
  "Ibiza",
  "Amsterdam",
  "Detroit",
  "Melbourne",
  "São Paulo",
  "Barcelona",
  "Paris",
  "Tokyo",
] as const;
