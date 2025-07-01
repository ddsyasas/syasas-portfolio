"use client";

import React, { useState, useEffect } from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/button';
import { usePathname, useRouter } from 'next/navigation';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Qualifications', href: '#qualifications' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Get theme from localStorage or use time-based detection
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      const shouldBeDark = savedTheme === 'dark';
      setIsDarkMode(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Time-based detection
      const hour = new Date().getHours();
      const shouldBeDark = hour < 6 || hour >= 18;
      setIsDarkMode(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleNavClick = (href: string, name: string) => {
    setIsMenuOpen(false);
    if (pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      if (name === 'Home') {
        router.push('/');
      } else {
        router.push('/');
      }
    }
  };

  const renderThemeToggle = () => {
    if (!mounted) {
      return <div className="w-10 h-10" />;
    }
    
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="text-muted-foreground hover:text-foreground"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-foreground text-xl font-semibold">
            Sajana Yasas
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.name)}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
            {renderThemeToggle()}
          </div>
          <div className="md:hidden flex items-center space-x-2">
            {renderThemeToggle()}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.name)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 