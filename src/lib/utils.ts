import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(inputs.filter(Boolean).join(' '));
}

export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  const cleaned = stripHtml(text);
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength).trim() + '...';
}

// Inject unique IDs into all headings in the HTML string
export function injectHeadingIds(html: string): string {
  if (!html) return html;
  let headingIndex = 0;
  return html.replace(/<(h[1-6])( [^>]*)?>([\s\S]*?)<\/\1>/gi, (match, tag, attrs = '', content) => {
    const id = `heading-${headingIndex++}`;
    // If the heading already has an id, don't overwrite it
    if (attrs && /id=\".*?\"/.test(attrs)) return match;
    return `<${tag}${attrs} id=\"${id}\">${content}</${tag}>`;
  });
} 