import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Enterprise AI Architecture Review | Aashray AI Labs",
  description: "Schedule a technical consultation and security audit with our engineering team to review operational bottlenecks, automation options, and AI workflow infrastructure.",
  alternates: {
    canonical: 'https://aashrayailabs.com/contact',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aashrayailabs.com/contact',
    title: 'Request Enterprise AI Architecture Review | Aashray AI Labs',
    description: "Schedule a technical consultation and security audit with our engineering team to review operational bottlenecks, automation options, and AI workflow infrastructure.",
    siteName: 'Aashray AI Labs',
    images: [{
      url: '/linkedin-banner.svg',
      width: 1584,
      height: 396,
      alt: 'Aashray AI Labs Contact Architecture Review',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Request Enterprise AI Architecture Review | Aashray AI Labs',
    description: "Schedule a technical consultation and security audit with our engineering team to review operational bottlenecks, automation options, and AI workflow infrastructure.",
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
      "name": "Contact",
      "item": "https://aashrayailabs.com/contact"
    }
  ]
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://aashrayailabs.com/contact/#webpage",
  "url": "https://aashrayailabs.com/contact",
  "name": "Request Enterprise AI Architecture Review | Aashray AI Labs",
  "description": "Request a technical review and consultation for operational automation workflows and governed infrastructure configurations.",
  "publisher": {
    "@type": "Organization",
    "name": "Aashray AI Labs"
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        key="contact-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        key="contact-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
