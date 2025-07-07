"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';
import { fetchPostsAndCategories } from '@/lib/wp-graphql';
import { stripHtml } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  categories: { nodes: Category[] };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  };
}

const BlogSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCards, setVisibleCards] = useState(6);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { posts, categories } = await fetchPostsAndCategories();
        setPosts(Array.isArray(posts) ? posts : []);
        setCategories(Array.isArray(categories) ? categories : []);
      } catch {
        setPosts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filters = ['All', ...categories.map(cat => cat.name)];

  const filteredPosts = activeFilter === 'All'
    ? posts
    : posts.filter(post =>
        post.categories.nodes.some(cat => cat.name === activeFilter)
      );

  const displayedPosts = filteredPosts.slice(0, visibleCards);
  const hasMoreCards = visibleCards < filteredPosts.length;

  const handleSeeMore = () => {
    setVisibleCards(prev => Math.min(prev + 6, filteredPosts.length));
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCards(6);
  };

  const getFeaturedImage = (post: Post) => {
    return post.featuredImage?.node?.sourceUrl ||
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop';
  };

  if (loading) {
    return (
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading blog posts...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog & Insights
          </h1>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Explore my thoughts and insights on SEO, Physics, Development, Technology, and more
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-card text-muted-foreground hover:bg-accent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedPosts.map((post) => (
            <Link 
              key={post.id}
              href={`/${post.slug}`}
              className="block"
            >
              <article 
                className="bg-card/70 rounded-lg overflow-hidden border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                tabIndex={0}
                role="button"
                aria-label={`Read article: ${post.title}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={getFeaturedImage(post)}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {post.categories && Array.isArray(post.categories.nodes) && post.categories.nodes.length > 0
                        ? post.categories.nodes.map((category) => (
                            <span 
                              key={category.id}
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
                  <h3 
                    className="text-xl font-semibold text-foreground mb-2 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2"
                  >
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {stripHtml(post.excerpt)}
                  </p>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors mt-auto">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        {hasMoreCards && (
          <div className="text-center">
            <Button 
              onClick={handleSeeMore}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              See More
              <ChevronDown size={16} className="ml-2" />
            </Button>
            <p className="text-muted-foreground text-sm mt-2">
              Showing {displayedPosts.length} of {filteredPosts.length} posts
            </p>
          </div>
        )}
        {!hasMoreCards && filteredPosts.length > 0 && (
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              You&apos;ve reached the end! All {filteredPosts.length} posts are displayed.
            </p>
          </div>
        )}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No posts found for the selected category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection; 