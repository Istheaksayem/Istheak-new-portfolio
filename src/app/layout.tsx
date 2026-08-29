import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ScrollProgressRing } from "@/components/ui/ScrollProgressRing";
import { Loader } from "@/components/ui/Loader";
import { DevTerminal } from "@/components/ui/DevTerminal";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Istheak Ahmed | Full-Stack Developer",
  description:
    "Istheak Ahmed Sayem — Full-Stack / MERN Stack Developer building modern, scalable and engaging web experiences with Next.js, React, Node.js and MongoDB.",
  openGraph: {
    title: "Istheak Ahmed | Full-Stack Developer",
    description:
      "Full-Stack / MERN Stack Developer building modern, scalable and engaging web experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <Loader />
        <CustomCursor />
        <NoiseOverlay />
        <ScrollProgressRing />
        <LenisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
        <DevTerminal />
        <ChatWidget />
      </body>
    </html>
  );
}
