"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';
import { wordpressAPI, WordPressPost, Category } from '@/lib/wordpress';
import { stripHtml } from '@/lib/utils';

interface WordPressEmbeddedTerm {
  name: string;
  slug: string;
}

const BlogSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCards, setVisibleCards] = useState(6);
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          wordpressAPI.getPosts({ per_page: 100 }), // Increased to get more posts
          wordpressAPI.getCategories()
        ]);
        setPosts(Array.isArray(postsData) ? postsData : []);
        // Show all categories, including those with no posts (so user can see all available categories)
        const filteredCategories = Array.isArray(categoriesData) 
          ? categoriesData.filter(cat => 
              cat.name && 
              cat.name !== 'Uncategorized' && 
              cat.name.toLowerCase() !== 'uncategorized'
            )
          : [];
        
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching WordPress data:', error);
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
    : posts.filter(post => {
        if (!post._embedded?.['wp:term']?.[0]) return false;
        return post._embedded['wp:term'][0].some((cat: WordPressEmbeddedTerm) => cat.name === activeFilter);
      });

  const displayedPosts = filteredPosts.slice(0, visibleCards);
  const hasMoreCards = visibleCards < filteredPosts.length;

  const handleSeeMore = () => {
    setVisibleCards(prev => Math.min(prev + 6, filteredPosts.length));
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCards(6);
  };

  const getFeaturedImage = (post: WordPressPost) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
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
        {/* Enhanced Category Filters */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-foreground">Filter by Category</h3>
            <span className="text-sm text-muted-foreground">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const postCount = filter === 'All' 
                ? posts.length 
                : posts.filter(post => 
                    post._embedded?.['wp:term']?.[0]?.some((cat: WordPressEmbeddedTerm) => cat.name === filter)
                  ).length;
              
              return (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`group relative px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg border transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-card text-muted-foreground border-border hover:bg-accent hover:text-foreground hover:border-blue-300'
                  }`}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    {filter}
                    <span className={`text-xs px-0.4 py-0.5 sm:px-2 rounded-full ${
                      activeFilter === filter
                        ? 'bg-blue-500/30 text-blue-100'
                        : 'bg-muted text-muted-foreground group-hover:bg-accent group-hover:text-foreground'
                    }`}>
                      {postCount}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
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
                aria-label={`Read article: ${post.title.rendered}`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={getFeaturedImage(post)}
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
                  <h3 
                    className="text-xl font-semibold text-foreground mb-2 leading-tight group-hover:text-blue-300 transition-colors line-clamp-2"
                  >
                    {post.title.rendered}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {stripHtml(post.excerpt.rendered)}
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