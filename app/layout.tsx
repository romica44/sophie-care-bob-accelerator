import "./styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Sidebar } from "./components/Sidebar";

export const metadata: Metadata = {
  metadataBase: new URL('https://sophiecare-bob-accelerator.vercel.app'),
  title: "SophieCare | AI Surgical Co-Pilot",
  description: "AI-powered surgical intelligence platform for ophthalmology teams. Real-time phase detection, safety monitoring, and resident training assistance.",
  keywords: ["Healthcare AI", "Surgical Intelligence", "Ophthalmology", "Medical Training", "AI Co-Pilot", "IBM Bob"],
  authors: [{ name: "SophieCare Labs" }],
  creator: "SophieCare Labs",
  publisher: "SophieCare Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sophiecare-bob-accelerator.vercel.app",
    title: "SophieCare | AI Surgical Co-Pilot",
    description: "AI-powered surgical intelligence platform for ophthalmology teams. Built with IBM Bob.",
    siteName: "SophieCare",
    images: [
      {
        url: "/cover-16x9.jpg",
        width: 1200,
        height: 675,
        alt: "SophieCare - AI Surgical Co-Pilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SophieCare | AI Surgical Co-Pilot",
    description: "AI-powered surgical intelligence platform for ophthalmology teams",
    images: ["/cover-16x9.jpg"],
    creator: "@sophiecare",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/sophiecare-logo.png",
    apple: "/sophiecare-logo.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050816",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased overflow-x-hidden">
        {/* Premium background effects */}
        <div className="fixed inset-0 -z-10 bg-[#050816]">
          {/* Animated gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-glow" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 grid-pattern opacity-20" />
        </div>
        
        <div className="flex min-h-screen relative">
          <Sidebar />
          <main className="flex-1 lg:ml-72 relative">
            {/* Page transition wrapper */}
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

// Made with Bob
