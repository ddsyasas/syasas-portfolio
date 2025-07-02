import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Note: For dynamic blog posts, you would fetch them from your WordPress API
  // and add them to the sitemap. Here's an example structure:
  
  // const blogPosts = await fetchBlogPosts()
  // const dynamicPages = blogPosts.map((post) => ({
  //   url: `${baseUrl}/${post.slug}`,
  //   lastModified: new Date(post.modified),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [...staticPages]
} 