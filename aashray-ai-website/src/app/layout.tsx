import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackgroundTopology from "@/components/BackgroundTopology";
import AmbientBackground from "@/components/AmbientBackground";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aashrayailabs.com'),
  title: "Aashray AI Labs | Enterprise Operational AI",
  description: "Enterprise AI infrastructure, governance systems, and operational automation.",
  alternates: {
    canonical: 'https://aashrayailabs.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2', type: 'image/x-icon' },
      { url: '/icon.png?v=2', type: 'image/png' },
      { url: '/icon.svg?v=2', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=2', type: 'image/png' },
      { url: '/apple-icon.png?v=2', type: 'image/png' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aashrayailabs.com',
    title: 'Aashray AI Labs | Enterprise Operational AI',
    description: 'Enterprise AI infrastructure, governance systems, and operational automation.',
    siteName: 'Aashray AI Labs',
    images: [{
      url: '/linkedin-banner.svg',
      width: 1584,
      height: 396,
      alt: 'Aashray AI Labs - Enterprise AI Infrastructure Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aashray AI Labs | Enterprise Operational AI',
    description: 'Enterprise AI infrastructure, governance systems, and operational automation.',
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aashray AI Labs",
  "url": "https://aashrayailabs.com",
  "logo": "https://aashrayailabs.com/logo-mark-white.svg",
  "sameAs": [
    "https://www.linkedin.com/company/aashray-ai-labs"
  ],
  "description": "Aashray AI Labs builds enterprise operational intelligence infrastructure, AI workflow orchestration systems, governed automation pipelines, and scalable AI execution architectures for modern organizations."
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Aashray AI Labs",
  "url": "https://aashrayailabs.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://aashrayailabs.com/insights?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const founderSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Akula Naveenkumar",
  "jobTitle": "Founder & Operational AI Architect",
  "worksFor": {
    "@type": "Organization",
    "name": "Aashray AI Labs"
  },
  "sameAs": [
    "https://www.linkedin.com/in/naveenkumar-akula-086967397"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Verification Engine Tags */}
        <meta name="google-site-verification" content="GOOGLE_SEARCH_CONSOLE_VERIFICATION_PLACEHOLDER" />
        <meta name="msvalidate.01" content="BING_WEBMASTER_VERIFICATION_PLACEHOLDER" />
        
        {/* Google Tag Manager Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PLACEHOLDER');
            `
          }}
        />

        {/* Google Analytics GA4 Script Placeholder */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GA4_PLACEHOLDER"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GA4_PLACEHOLDER');
            `
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased flex flex-col min-h-screen relative`}>
        {/* Google Tag Manager (noscript) Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PLACEHOLDER"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* JSON-LD Schemas */}
        <script
          key="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          key="web-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          key="founder-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
        />

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
