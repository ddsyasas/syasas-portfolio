import type { Metadata } from "next";
import Navigation from '@/components/Navigation';
import BlogSection from '@/components/BlogSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Blog & Insights - Sajana Yasas",
  description: "Read my latest insights on SEO, Physics, Web Development, Technology, and more. Expert analysis and practical tips from a Material Physics Researcher and SEO Expert.",
  keywords: ["Blog", "SEO", "Physics", "Web Development", "Technology", "Insights", "Sajana Yasas"],
  openGraph: {
    title: "Blog & Insights - Sajana Yasas",
    description: "Read my latest insights on SEO, Physics, Web Development, Technology, and more.",
    type: "website",
    images: [
      {
        url: "/Sajana-yasas-me.png",
        width: 1200,
        height: 630,
        alt: "Sajana Yasas - Blog & Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Insights - Sajana Yasas",
    description: "Read my latest insights on SEO, Physics, Web Development, Technology, and more.",
    images: ["/Sajana-yasas-me.png"],
  },
  alternates: {
    canonical: 'https://yasas.dev/blog',
  },
};

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
} 