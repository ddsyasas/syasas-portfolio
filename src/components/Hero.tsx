"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Tada animation variants
const tadaAnimation = {
  initial: { scale: 1, rotate: 0 },
  animate: {
    scale: [1, 1.1, 0.9, 1.1, 0.9, 1.1, 1],
    rotate: [0, -3, 3, -3, 3, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 5
    }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 bg-hero-background" aria-label="Hero section">
      <div className="text-center max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl">
            <Image 
              src="/Sajana-yasas-me.png" 
              alt="Sajana Yasas - Material Physics Researcher and SEO Expert" 
              className="w-full h-full object-cover"
              width={192}
              height={192}
            />
          </div>
        </header>
        
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Sajana Yasas
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8" role="banner">
          Physics Scholar | SEO Expert | Developer | Indie Maker
        </p>
        
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          I&apos;m a material physics researcher exploring the science of tomorrow, 
          an SEO expert at IDER Solutions helping brands dominate search, a 
          full-stack developer building web sites and web apps, and an indie 
          maker creating tools that fill digital market gaps.
        </p>
        
        <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-0" aria-label="Primary navigation">
          {/* HIDDEN: Portfolio button - Hidden until Portfolio section data is finalized */}
          {/* <motion.a
            whileHover={{ scale: 1.05 }}
            href="#portfolio"
            className="relative z-10 inline-block px-8 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors min-w-[180px] text-center"
            aria-label="View my work portfolio"
          >
            View My Work
          </motion.a> */}
          <motion.a
            variants={tadaAnimation}
            initial="initial"
            animate="animate"
            whileHover="hover"
            href="#contact"
            className="relative z-10 inline-block px-8 py-3 text-base font-medium rounded-md text-foreground bg-card hover:bg-accent active:bg-accent/80 border border-border transition-all duration-300 min-w-[180px] text-center shadow-lg hover:shadow-xl shadow-black/10 hover:shadow-black/20"
            aria-label="Contact me"
          >
            Let&apos;s Chat
          </motion.a>
        </nav>
      </div>
    </section>
  );
};

export default Hero; 