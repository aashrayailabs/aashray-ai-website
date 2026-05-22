import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundTopology from "@/components/BackgroundTopology";
import AmbientBackground from "@/components/AmbientBackground";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aashrayailabs.com'),
  title: "Aashray AI Labs | Intelligent AI Infrastructure",
  description: "Helping businesses deploy operational AI systems, workflow intelligence, and scalable automation infrastructure.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aashrayailabs.com',
    title: 'Aashray AI Labs | Intelligent AI Infrastructure',
    description: 'Deploying operational AI systems, workflow intelligence, and scalable automation infrastructure.',
    siteName: 'Aashray AI Labs',
    images: [{
      url: '/linkedin-banner.svg', // Using the banner as the default OG image
      width: 1584,
      height: 396,
      alt: 'Aashray AI Labs',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aashray AI Labs | Intelligent AI Infrastructure',
    description: 'Deploying operational AI systems, workflow intelligence, and scalable automation infrastructure.',
    images: ['/linkedin-banner.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#020202] text-gray-100 flex flex-col min-h-screen relative`}>
        {/* Privacy-first lightweight analytics placeholder */}
        <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "REPLACE_WITH_YOUR_TOKEN"}'></script>
        <BackgroundTopology />
        <AmbientBackground />
        <Navbar />
        <main className="flex-1 relative z-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
