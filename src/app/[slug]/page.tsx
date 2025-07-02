import { notFound } from 'next/navigation';
import { fetchPostBySlug } from '@/lib/wp-graphql';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import { Calendar, Clock, User, Tag } from 'lucide-react';
import { stripHtml, injectHeadingIds } from '@/lib/utils';
import type { Metadata } from 'next';
import ArticleStructuredData from '@/components/ArticleStructuredData';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredImage = post.featuredImage?.node?.sourceUrl ||
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop';

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Inject heading IDs into the content
  const contentWithIds = injectHeadingIds(post.content);

  return (
    <div className="min-h-screen bg-background">
      <ArticleStructuredData
        title={post.title}
        description={stripHtml(post.content).substring(0, 160)}
        image={featuredImage}
        url={`https://yasas.dev/${post.slug}`}
        publishedDate={post.date}
        modifiedDate={post.modified || post.date}
        author="Sajana Yasas"
        categories={post.categories?.nodes?.map((cat: Category) => cat.name) || []}
      />
      <Navigation />
      <main className="py-20 px-6">
        <article className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <div className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
              <img 
                src={featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories && Array.isArray(post.categories.nodes) && post.categories.nodes.map((category: Category) => (
                    <span 
                      key={category.id}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{getReadTime(post.content)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>Sajana Yasas</span>
              </div>
            </div>


          </div>

          {/* Table of Contents */}
          {contentWithIds && <TableOfContents content={contentWithIds} />}

          {/* Content */}
          {contentWithIds && (
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-blue-600 prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-l-blue-600 prose-img:rounded-lg prose-img:shadow-lg prose-table:border prose-table:border-border prose-th:border-border prose-td:border-border">
              <div 
                dangerouslySetInnerHTML={{ __html: contentWithIds }}
                className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              />
            </div>
          )}

          {/* Tags Section */}
          {post.categories && Array.isArray(post.categories.nodes) && post.categories.nodes.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={20} className="text-muted-foreground" />
                <h3 className="text-lg font-semibold text-foreground">Categories</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.categories.nodes.map((category: Category) => (
                  <span 
                    key={category.id}
                    className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm border border-border hover:bg-accent transition-colors"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <ShareButtons title={post.title} url={`https://yasas.dev/${post.slug}`} />
        </article>
      </main>
      <Footer />
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Sajana Yasas',
      description: 'The requested blog post could not be found.',
    };
  }

  const strippedContent = stripHtml(post.content);
  const description = strippedContent.length > 160 
    ? strippedContent.substring(0, 157) + '...' 
    : strippedContent;

  return {
    title: `${post.title} - Sajana Yasas`,
    description,
    keywords: [
      ...post.categories?.nodes?.map((cat: Category) => cat.name) || [],
      'Sajana Yasas',
      'Blog',
      'Physics',
      'SEO',
      'Web Development'
    ],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: `https://yasas.dev/${post.slug}`,
      images: [
        {
          url: post.featuredImage?.node?.sourceUrl || '/Sajana-yasas-me.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: ['Sajana Yasas'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.featuredImage?.node?.sourceUrl || '/Sajana-yasas-me.png'],
    },
    alternates: {
      canonical: `https://yasas.dev/${post.slug}`,
    },
  };
} 