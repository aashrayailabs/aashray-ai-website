import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Aashray AI Labs | Enterprise AI Infrastructure Company",
  description: "Aashray AI Labs is a serious global AI infrastructure company. We develop secure enterprise workflow automation, governed AI systems, and scalable operational architectures.",
  alternates: {
    canonical: 'https://aashrayailabs.com/about',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aashrayailabs.com/about',
    title: 'About Aashray AI Labs | Enterprise AI Infrastructure Company',
    description: 'Aashray AI Labs is a serious global AI infrastructure company. We develop secure enterprise workflow automation, governed AI systems, and scalable operational architectures.',
    siteName: 'Aashray AI Labs',
    images: [{
      url: '/linkedin-banner.svg',
      width: 1584,
      height: 396,
      alt: 'About Aashray AI Labs',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Aashray AI Labs | Enterprise AI Infrastructure Company',
    description: 'Aashray AI Labs is a serious global AI infrastructure company. We develop secure enterprise workflow automation, governed AI systems, and scalable operational architectures.',
    images: ['/linkedin-banner.svg'],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://aashrayailabs.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://aashrayailabs.com/about"
    }
  ]
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://aashrayailabs.com/about/#webpage",
  "url": "https://aashrayailabs.com/about",
  "name": "About Aashray AI Labs | Enterprise AI Infrastructure Company",
  "description": "Learn about Aashray AI Labs, our founder Akula Naveenkumar, and our mission to engineer secure workflow automation and governed AI infrastructure for modern enterprises.",
  "publisher": {
    "@type": "Organization",
    "name": "Aashray AI Labs",
    "logo": "https://aashrayailabs.com/logo-mark-white.svg"
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        key="about-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        key="about-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
