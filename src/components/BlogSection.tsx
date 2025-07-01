"use client";

import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './button';

const BlogSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCards, setVisibleCards] = useState(6);
  
  const filters = ['All', 'SEO', 'Web Development', 'Physics', 'Technology'];
  
  const insights = [
    {
      title: "Test blog post title 0001",
      excerpt: "test blog Excerpt",
      date: "April 20, 2025",
      readTime: "1 min read",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      category: "Web Development"
    },
    {
      title: "my first blog post",
      excerpt: "first blog post excerpt",
      date: "April 20, 2025",
      readTime: "1 min read",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
      category: "SEO"
    },
    {
      title: "3rd Article test title",
      excerpt: "Excerpt test for the 3rd Article",
      date: "April 20, 2025",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=250&fit=crop",
      category: "SEO"
    },
    {
      title: "Advanced SEO Strategies for 2025",
      excerpt: "Discover the latest SEO techniques and strategies that will dominate search rankings in 2025",
      date: "April 19, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      category: "SEO"
    },
    {
      title: "Building Scalable Web Applications",
      excerpt: "Learn how to architect and build web applications that can handle millions of users",
      date: "April 18, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
      category: "Web Development"
    },
    {
      title: "The Future of Material Physics",
      excerpt: "Exploring cutting-edge research in material physics and its applications in modern technology",
      date: "April 17, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop",
      category: "Physics"
    },
    {
      title: "Next.js 15: What's New and Exciting",
      excerpt: "A comprehensive overview of the latest features and improvements in Next.js 15",
      date: "April 16, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      category: "Technology"
    },
    {
      title: "AI in Modern Web Development",
      excerpt: "How artificial intelligence is revolutionizing the way we build and maintain websites",
      date: "April 15, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
      category: "Technology"
    },
    {
      title: "Quantum Computing Fundamentals",
      excerpt: "Understanding the basics of quantum computing and its potential impact on technology",
      date: "April 14, 2025",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
      category: "Physics"
    },
    {
      title: "Performance Optimization Techniques",
      excerpt: "Essential techniques for optimizing web application performance and user experience",
      date: "April 13, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      category: "Web Development"
    },
    {
      title: "Content Marketing for SEO Success",
      excerpt: "How to create content that not only ranks well but also engages and converts your audience",
      date: "April 12, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
      category: "SEO"
    },
    {
      title: "The Science Behind Modern Materials",
      excerpt: "Exploring the fascinating world of advanced materials and their applications in everyday life",
      date: "April 11, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=250&fit=crop",
      category: "Physics"
    }
  ];

  const filteredInsights = activeFilter === 'All' 
    ? insights 
    : insights.filter(insight => insight.category === activeFilter);

  const displayedInsights = filteredInsights.slice(0, visibleCards);
  const hasMoreCards = visibleCards < filteredInsights.length;

  const handleSeeMore = () => {
    setVisibleCards(prev => Math.min(prev + 6, filteredInsights.length));
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setVisibleCards(6); // Reset to show first 6 cards when filter changes
  };

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
          {displayedInsights.map((insight, index) => (
            <article 
              key={index}
              className="bg-card/70 rounded-lg overflow-hidden border border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer hover:shadow-xl active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              tabIndex={0}
              role="button"
              aria-label={`Read article: ${insight.title}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={insight.image} 
                  alt={insight.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-transform duration-200 group-hover:scale-105">
                    {insight.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-3">
                  <span>{insight.date}</span>
                  <span>•</span>
                  <span>{insight.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-blue-300 transition-colors">
                  {insight.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {insight.excerpt}
                </p>
                
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="text-sm font-medium">Read More</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
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
              Showing {displayedInsights.length} of {filteredInsights.length} posts
            </p>
          </div>
        )}
        
        {!hasMoreCards && filteredInsights.length > 0 && (
          <div className="text-center">
            <p className="text-muted-foreground text-lg">
              You've reached the end! All {filteredInsights.length} posts are displayed.
            </p>
          </div>
        )}
        
        {filteredInsights.length === 0 && (
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