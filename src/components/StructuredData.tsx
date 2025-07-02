import Script from 'next/script'

interface PersonStructuredDataProps {
  name: string
  jobTitle: string
  description: string
  image: string
  url: string
  sameAs?: string[]
}

export default function PersonStructuredData({ 
  name, 
  jobTitle, 
  description, 
  image, 
  url, 
  sameAs = [] 
}: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "description": description,
    "image": image,
    "url": url,
    "sameAs": sameAs,
    "knowsAbout": [
      "Material Physics",
      "SEO",
      "Web Development",
      "JavaScript",
      "React",
      "Next.js",
      "Python",
      "WordPress",
      "Shopify"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "IDER Solutions"
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "University"
    }
  }

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface WebsiteStructuredDataProps {
  name: string
  description: string
  url: string
}

export function WebsiteStructuredData({ name, description, url }: WebsiteStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": name,
    "description": description,
    "url": url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 