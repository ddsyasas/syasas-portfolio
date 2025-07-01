"use client";

import React from 'react';
import { Code, Wrench, Rocket, TrendingUp, Brain, Target } from 'lucide-react';

const Skills = () => {
  const skills = [
    {
      icon: Code,
      title: "Web/App Development",
      description: "Designing responsive, high-performance websites — from beginner-friendly platforms like WordPress and Shopify to complex frameworks like React, Next.js, Tailwind CSS, and more."
    },
    {
      icon: Wrench,
      title: "Python & Scientific Programming",
      description: "Applying Python for backend development, automation, and scientific research— bridging engineering physics with digital problem-solving."
    },
    {
      icon: Rocket,
      title: "Indie Product Development",
      description: "Creating and launching digital tools to solve niche problems, validate ideas, and explore product-market fit."
    },
    {
      icon: TrendingUp,
      title: "SEO Strategy & Content Optimization",
      description: "Crafting data-driven SEO strategies and optimized content that improve rankings and drive organic traffic."
    },
    {
      icon: Brain,
      title: "Analytical & Research Thinking",
      description: "Trained in critical thinking through scientific research in Material Physics — bringing precision and depth to digital problem-solving."
    },
    {
      icon: Target,
      title: "Digital Growth & Marketing Strategy",
      description: "Using multi-channel marketing strategies (SEO, content, social media) to help brands grow online and reach the right audience."
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-muted/50" aria-labelledby="skills-heading">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h2 id="skills-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & Expertise
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto" aria-hidden="true"></div>
        </header>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {skills.map((skill, index) => (
            <article 
              key={index}
              className="bg-card/50 p-8 rounded-lg border border-border/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer group active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
              role="listitem"
              tabIndex={0}
              aria-label={`Learn more about ${skill.title}`}
            >
              <header className="flex items-start mb-6">
                <div className="bg-blue-600 p-3 rounded-lg mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  <skill.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{skill.title}</h3>
                  <div className="w-12 h-0.5 bg-blue-600" aria-hidden="true"></div>
                </div>
              </header>
              <p className="text-muted-foreground leading-relaxed">{skill.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 