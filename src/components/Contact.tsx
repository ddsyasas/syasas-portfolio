"use client";

import React, { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Textarea } from './textarea';
import { Linkedin, X, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon!",
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-muted-foreground text-lg">
            Let's discuss how I can help you achieve your digital marketing goals
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-foreground font-medium mb-2">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-card/50 border-border text-foreground placeholder-muted-foreground focus:border-blue-400 h-12"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-foreground font-medium mb-2">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-card/50 border-border text-foreground placeholder-muted-foreground focus:border-blue-400 h-12"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-foreground font-medium mb-2">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-card/50 border-border text-foreground placeholder-muted-foreground focus:border-blue-400 resize-none"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg h-12"
              >
                Send Message
              </Button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Connect With Me</h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out through the form or connect with me on social media.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="bg-card p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Linkedin size={24} className="text-foreground" />
                </a>
                <a href="#" className="bg-card p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <X size={24} className="text-foreground" />
                </a>
                <a href="#" className="bg-card p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <Facebook size={24} className="text-foreground" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Email</h4>
              <a href="mailto:yasas@idersolutions.com" className="text-blue-400 hover:text-blue-300 transition-colors">
                yasas@idersolutions.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 