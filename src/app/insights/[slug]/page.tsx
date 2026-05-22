import { notFound } from "next/navigation";
import { insightsData } from "@/lib/insights-data";
import InsightDetailClient from "@/components/InsightDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return insightsData.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const article = insightsData.find((item) => item.slug === params.slug);

  if (!article) {
    return {
      title: "Insight Not Found | Aashray AI Labs",
    };
  }

  return {
    title: `${article.title} | Aashray AI Labs`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: new Date(article.date).toISOString(),
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
    },
  };
}

export default async function InsightDetail(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const article = insightsData.find((item) => item.slug === params.slug);

  if (!article) {
    notFound();
  }

  return <InsightDetailClient article={article} />;
}
