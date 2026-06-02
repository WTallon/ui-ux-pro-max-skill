import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "UNDERGROUND — Everything electronic in one place.",
  description:
    "The social network for electronic music. Feed, events, track IDs, setlist intelligence, and the scene — all in one place.",
  keywords: "electronic music, techno, house, DJ, events, track ID, setlist",
  metadataBase: new URL("https://ugscene.app"),
  openGraph: {
    title: "UNDERGROUND",
    description: "Everything electronic in one place.",
    siteName: "Underground",
    url: "https://ugscene.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#080808] text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
