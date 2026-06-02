import { MetadataRoute } from 'next';
import { publications } from '@/lib/publications';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aashrayailabs.com';

  // Core static routes
  const routes = [
    '',
    '/platforms',
    '/infrastructure',
    '/governance',
    '/security',
    '/research',
    '/about',
    '/contact',
    '/trust-center',
    '/status',
    '/architecture',
    '/whitepapers',
    '/legal',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Research routes
  const researchRoutes = publications.map((pub) => {
    let dateStr = new Date().toISOString();
    try {
      dateStr = new Date(pub.date).toISOString();
    } catch (e) {
      // fallback
    }
    return {
      url: `${baseUrl}/research/${pub.slug}`,
      lastModified: dateStr,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...routes, ...researchRoutes];
}

