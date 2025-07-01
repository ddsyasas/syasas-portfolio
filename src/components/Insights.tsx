"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './button';
import { useRouter } from 'next/navigation';

const Insights = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();
  
  const filters = ['All', 'SEO', 'Web Development'];
  
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
    }
  ];

  const filteredInsights = activeFilter === 'All' 
    ? insights 
    : insights.filter(insight => insight.category === activeFilter);

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
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInsights.map((insight, index) => (
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