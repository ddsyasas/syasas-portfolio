"use client";

import React, { useState } from 'react';
import { Button } from './button';
import { ChevronDown } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'WordPress', 'Next.js', 'Python', 'Physics', 'SEO', 'Research'];
  
  const projects = [
    {
      title: "Custom WordPress Theme for Restaurant",
      description: "Developed a fully custom WordPress theme with online ordering system and table reservations.",
      tags: ["WordPress", "PHP", "JavaScript"],
      category: "WordPress",
      image: "/lovable-uploads/f1b5a2a7-3cc2-402a-9f19-f7444cf45e4e.png"
    },
    {
      title: "WordPress Multisite for Education",
      description: "Built a multisite WordPress network for a group of educational institutions.",
      tags: ["WordPress", "LMS", "Multisite"],
      category: "WordPress",
      image: "/lovable-uploads/f1b5a2a7-3cc2-402a-9f19-f7444cf45e4e.png"
    },
    {
      title: "E-commerce Platform with Next.js",
      description: "Built a high-performance e-commerce platform using Next.js and Stripe integration.",
      tags: ["Next.js", "React", "TypeScript"],
      category: "Next.js",
      image: "/lovable-uploads/f1b5a2a7-3cc2-402a-9f19-f7444cf45e4e.png"
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Portfolio
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg">
            Showcasing some of my best work and the results achieved for clients.
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className="bg-card/50 rounded-lg overflow-hidden border border-border/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer group active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              tabIndex={0}
              role="button"
              aria-label={`View project: ${project.title}`}
            >
              <div className="h-48 bg-muted/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <span className="text-muted-foreground">Project Preview</span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-transform duration-200 hover:scale-105"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            See More Projects
            <ChevronDown size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 