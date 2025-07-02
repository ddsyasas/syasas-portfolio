import Script from 'next/script'

interface ArticleStructuredDataProps {
  title: string
  description: string
  image: string
  url: string
  publishedDate: string
  modifiedDate: string
  author: string
  categories: string[]
}

export default function ArticleStructuredData({
  title,
  description,
  image,
  url,
  publishedDate,
  modifiedDate,
  author,
  categories
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "url": url,
    "datePublished": publishedDate,
    "dateModified": modifiedDate,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://yasas.dev"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sajana Yasas",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yasas.dev/Sajana-yasas-me.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": categories.join(", "),
    "articleSection": categories[0] || "Technology"
  }

  return (
    <Script
      id="article-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 