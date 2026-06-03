import { notFound } from "next/navigation";
import { publications } from "@/lib/publications";
import ResearchDetailClient from "@/components/ResearchDetailClient";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

interface PageProps {
  params: Params;
}

export async function generateStaticParams() {
  return publications.map((pub) => ({
    slug: pub.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = publications.find((pub) => pub.slug === slug);
  
  if (!publication) {
    return {
      title: "Publication Not Found | Aashray AI Labs",
    };
  }

  return {
    title: `${publication.title} | Aashray AI Labs Research`,
    description: publication.excerpt,
    openGraph: {
      title: `${publication.title} | Aashray AI Labs Research`,
      description: publication.excerpt,
      type: "article",
      publishedTime: publication.date,
      authors: [publication.author],
    },
  };
}

export default async function PublicationPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = publications.find((pub) => pub.slug === slug);

  if (!publication) {
    notFound();
  }

  return <ResearchDetailClient publication={publication} />;
}
