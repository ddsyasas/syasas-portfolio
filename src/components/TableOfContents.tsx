"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Parse headings from content
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((element) => {
      const level = parseInt(element.tagName.charAt(1));
      const text = element.textContent || '';
      const id = element.id || '';
      return {
        id,
        text: text.trim(),
        level
      };
    });
    setHeadings(extractedHeadings);
  }, [content]);

  const getIndentClass = (level: number) => {
    switch (level) {
      case 1: return 'ml-0';
      case 2: return 'ml-4';
      case 3: return 'ml-8';
      case 4: return 'ml-12';
      case 5: return 'ml-16';
      case 6: return 'ml-20';
      default: return 'ml-0';
    }
  };

  const displayedHeadings = isExpanded ? headings : headings.slice(0, 3);
  const hasMoreHeadings = headings.length > 3;

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted/30 rounded-lg p-6 mb-8 border border-border">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        📋 Table of Contents
      </h2>
      
      <nav className="space-y-2">
        {displayedHeadings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={`block w-full text-left text-sm hover:text-blue-600 transition-colors ${getIndentClass(heading.level)}`}
            style={{ 
              fontWeight: heading.level === 1 ? '600' : '400',
              fontSize: heading.level === 1 ? '1rem' : '0.875rem',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            {heading.text}
          </a>
        ))}
      </nav>

      {hasMoreHeadings && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={16} />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              Show More ({headings.length - 3} more)
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default TableOfContents; 