import { MetadataRoute } from 'next';
import { SERVICES_DATA, PROJECTS_DATA, BLOG_POSTS } from '@/lib/siteData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://centerpestcontrol.com';
  const lastModified = new Date();

  // Static routes
  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/pest-identifier',
    '/warranty-verify',
    '/projects',
    '/pricing-plan',
    '/faqs',
    '/blog',
    '/contact-us',
    '/image-gallery',
    '/video-gallery',
    '/testimonials',
    '/privacy-policy',
    '/terms-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic service routes
  const serviceRoutes = SERVICES_DATA.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  // Dynamic project routes
  const projectRoutes = PROJECTS_DATA.map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes];
}
