import { MetadataRoute } from 'next';
import { insightsData } from '@/lib/insights-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aashrayailabs.com';

  // Core static routes
  const routes = [
    '',
    '/about',
    '/ai-agents',
    '/ai-products',
    '/industries',
    '/workflow-systems',
    '/insights',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Insight routes
  const insightRoutes = insightsData.map((insight) => ({
    url: `${baseUrl}/insights/${insight.slug}`,
    lastModified: new Date(insight.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...insightRoutes];
}
