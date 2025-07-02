"use client";

import React from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Share this article</h3>
      <div className="flex gap-4">
        <button 
          onClick={handleTwitterShare}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Share on Twitter
        </button>
        <button 
          onClick={handleLinkedInShare}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Share on LinkedIn
        </button>
      </div>
    </div>
  );
};

export default ShareButtons; 