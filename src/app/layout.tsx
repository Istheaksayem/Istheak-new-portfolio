import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ScrollProgressRing } from "@/components/ui/ScrollProgressRing";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
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
  title: "Istheak Ahmed | MERN Stack Developer",
  description:
    "MERN Stack Developer specializing in scalable web applications with React, Next.js, Node.js, MongoDB, and real-time features.",
  openGraph: {
    title: "Istheak Ahmed | MERN Stack Developer",
    description:
      "MERN Stack Developer specializing in scalable web applications with React, Next.js, Node.js, MongoDB, and real-time features.",
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <CustomCursor />
        <NoiseOverlay />
        <ScrollProgressRing />
        <LenisProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
        <ChatWidget />
      </body>
    </html>
  );
}
