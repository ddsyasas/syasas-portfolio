"use client";

import React from 'react';
import { Microscope, TrendingUp, Rocket, Zap, Wrench, Target } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Microscope,
      title: "Research-Driven Developer",
      description: "Research-Driven Developer"
    },
    {
      icon: TrendingUp,
      title: "SEO-Integrated Web Builds",
      description: "SEO-Integrated Web Builds"
    },
    {
      icon: Rocket,
      title: "From MVPs to Scalable Apps",
      description: "From MVPs to Scalable Apps"
    },
    {
      icon: Zap,
      title: "Physics-Backed Problem Solver",
      description: "Physics-Backed Problem Solver"
    },
    {
      icon: Wrench,
      title: "Experimentation Mindset",
      description: "Experimentation Mindset"
    },
    {
      icon: Target,
      title: "Builder with a Purpose",
      description: "Builder with a Purpose"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Hello! I&apos;m <span className="text-foreground font-semibold">Sajana Yasas</span> — a Material Physics researcher, SEO 
                expert, and indie maker passionate about building the future of the 
                web.
              </p>
              
              <p>
                My academic journey in <span className="text-foreground font-semibold">Material Physics</span> sharpened my analytical 
                thinking and introduced me to <span className="text-foreground font-semibold">Python</span>, which I now use both in 
                scientific research and web-based product development. Outside 
                the lab, I <span className="text-foreground font-semibold">lead SEO, GEO, AIO, AEO strategies at IDER Solutions</span>, helping businesses 
                grow through smarter content and search engine visibility.
              </p>
              
              <p>
                I&apos;m also a self-driven developer — building websites, tools, and 
                digital experiences that solve real-world problems. My work spans 
                from user-friendly <span className="text-foreground font-semibold">WP and Shopify</span> sites to custom-coded 
                platforms using <span className="text-foreground font-semibold">JavaScript, Tailwind CSS, React, and Next.js to build web apps</span>.
              </p>
              
              <p>
                Whether it&apos;s launching a marketing site, developing a web app, or 
                prototyping an indie product idea, I bring together <span className="text-foreground font-semibold">critical thinking, 
                creative thinking, technical skill, and real-world impact</span>.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-lg border border-border/50 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
                tabIndex={0}
                role="button"
                aria-label={`Learn more about ${highlight.title}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-600 p-3 rounded-lg mb-4 transition-transform duration-300 group-hover:scale-110">
                    <highlight.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-foreground font-medium text-sm leading-tight">{highlight.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 