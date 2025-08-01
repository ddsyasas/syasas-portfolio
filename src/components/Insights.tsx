"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './button';
import { useRouter } from 'next/navigation';
import { wordpressAPI, WordPressPost } from '@/lib/wordpress';
import Link from 'next/link';

interface WordPressEmbeddedTerm {
  name: string;
  slug: string;
}

const Insights = () => {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const postsData = await wordpressAPI.getPosts({ per_page: 3 });
        setPosts(Array.isArray(postsData) ? postsData : []); // Show only latest 3
      } catch (error) {
        console.error('Error fetching WordPress data:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="py-20 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading insights...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Latest Insights
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore my thoughts and insights on SEO, Physics, Development, and more
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.id}
              href={`/${post.slug}`}
              className="block"
            >
              <article 
                className="bg-card/70 rounded-lg overflow-hidden border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                tabIndex={0}
                role="button"
                aria-label={`Read article: ${post.title.rendered}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop'}
                    alt={post.title.rendered}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {post._embedded?.['wp:term']?.[0] && Array.isArray(post._embedded['wp:term'][0]) && post._embedded['wp:term'][0].length > 0
                        ? post._embedded['wp:term'][0].map((category: WordPressEmbeddedTerm, index: number) => (
                            <span 
                              key={`${category.slug}-${index}`}
                              className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium transition-transform duration-200 group-hover:scale-105"
                            >
                              {category.name}
                            </span>
                          ))
                        : (
                            <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium transition-transform duration-200 group-hover:scale-105">
                              Uncategorized
                            </span>
                          )
                      }
                    </div>
                  </div>
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2">
                    {post.title.rendered}
                  </h3>
                  <p 
                    className="text-muted-foreground mb-4 leading-relaxed line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors mt-auto">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            onClick={() => router.push('/blog')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            View All Posts
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Insights; 