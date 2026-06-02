import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Support | Aashray AI Labs",
  description: "We deploy secure enterprise workflow automation and governed AI infrastructure for Financial Services, Insurance, Healthcare, Real Estate, Enterprise Operations, Ecommerce, Service Businesses, and Operational Teams.",
  alternates: {
    canonical: 'https://aashrayailabs.com/industries',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aashrayailabs.com/industries',
    title: "Industries We Support | Aashray AI Labs",
    description: "We deploy secure enterprise workflow automation and governed AI infrastructure for Financial Services, Insurance, Healthcare, Real Estate, Enterprise Operations, Ecommerce, Service Businesses, and Operational Teams.",
    siteName: 'Aashray AI Labs',
    images: [{
      url: '/linkedin-banner.svg',
      width: 1584,
      height: 396,
      alt: 'Aashray AI Labs Industries We Support',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Industries We Support | Aashray AI Labs",
    description: "We deploy secure enterprise workflow automation and governed AI infrastructure for Financial Services, Insurance, Healthcare, Real Estate, Enterprise Operations, Ecommerce, Service Businesses, and Operational Teams.",
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
      "name": "Industries",
      "item": "https://aashrayailabs.com/industries"
    }
  ]
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://aashrayailabs.com/industries/#webpage",
  "url": "https://aashrayailabs.com/industries",
  "name": "Industries We Support | Aashray AI Labs",
  "description": "Enterprise solutions and operational AI workflow showcases for Financial Services, Insurance, Healthcare, Real Estate, Enterprise Operations, Ecommerce, Service Businesses, and Operational Teams.",
  "publisher": {
    "@type": "Organization",
    "name": "Aashray AI Labs"
  }
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        key="industries-webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        key="industries-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
