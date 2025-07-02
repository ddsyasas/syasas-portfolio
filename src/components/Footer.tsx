"use client";

import React from 'react';
import { Linkedin, X, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50 w-full">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Sajana Yasas</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Physics Scholar | SEO Expert | Developer | Indie Maker
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-muted-foreground hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#skills" className="text-muted-foreground hover:text-blue-400 transition-colors">Skills</a></li>
              <li><a href="#qualifications" className="text-muted-foreground hover:text-blue-400 transition-colors">Qualifications</a></li>
              {/* HIDDEN: Portfolio link - Hidden until Portfolio section data is finalized */}
              {/* <li><a href="#portfolio" className="text-muted-foreground hover:text-blue-400 transition-colors">Portfolio</a></li> */}
              <li><a href="#blog" className="text-muted-foreground hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="text-muted-foreground">yasas@idersolutions.com</p>
              <div>
                <p className="text-muted-foreground font-medium">Locations:</p>
                <ul className="text-muted-foreground text-sm space-y-1 mt-2">
                  <li>• Bologna, Italy (Current)</li>
                  <li>• Colombo, Sri Lanka</li>
                </ul>
              </div>
              <p className="text-muted-foreground text-sm">Available for remote work</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Follow Me</h4>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/ddsyasas/" target="_blank" rel="noopener noreferrer" className="bg-card p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Linkedin size={20} className="text-foreground" />
              </a>
              <a href="https://x.com/ddsyasas" target="_blank" rel="noopener noreferrer" className="bg-card p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <X size={20} className="text-foreground" />
              </a>
              <a href="https://www.facebook.com/ddsyasas" target="_blank" rel="noopener noreferrer" className="bg-card p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Facebook size={20} className="text-foreground" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 mt-8 text-center">
          <p className="text-muted-foreground">
            © 2025 Sajana Yasas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 