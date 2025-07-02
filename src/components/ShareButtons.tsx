"use client";

import React from 'react';
import { X, Linkedin, MessageCircle, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const handleXShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
      <div className="flex gap-4">
        <button
          onClick={handleXShare}
          aria-label="Share on X"
          className="flex items-center justify-center bg-black hover:bg-neutral-800 text-white p-3 rounded-lg transition-colors"
        >
          <X size={24} />
        </button>
        <button
          onClick={handleLinkedInShare}
          aria-label="Share on LinkedIn"
          className="flex items-center justify-center bg-[#0077B5] hover:bg-[#005983] text-white p-3 rounded-lg transition-colors"
        >
          <Linkedin size={24} />
        </button>
        <button
          onClick={handleWhatsAppShare}
          aria-label="Share on WhatsApp"
          className="flex items-center justify-center bg-[#25D366] hover:bg-[#1DA851] text-white p-3 rounded-lg transition-colors"
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={handleFacebookShare}
          aria-label="Share on Facebook"
          className="flex items-center justify-center bg-[#1877F3] hover:bg-[#145DB2] text-white p-3 rounded-lg transition-colors"
        >
          <Facebook size={24} />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons; 