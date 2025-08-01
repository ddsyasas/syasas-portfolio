import { MetadataRoute } from 'next'
import { wordpressAPI } from '@/lib/wordpress'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yasas.dev'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  // Fetch all blog posts for dynamic pages
  try {
    const blogPosts = await wordpressAPI.getPosts({ per_page: 100 });
    const dynamicPages = blogPosts.map((post) => ({
      url: `${baseUrl}/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticPages, ...dynamicPages];
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Return only static pages if there's an error
    return staticPages;
  }
} 