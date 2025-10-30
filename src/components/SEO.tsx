import React, { useEffect } from 'react';
import { SEOData } from '../types';

interface SEOProps {
  data: SEOData;
}

const SEO: React.FC<SEOProps> = ({ data }) => {
  useEffect(() => {
    // Set document title
    document.title = data.title;

    // Remove existing meta tags
    const existingMeta = document.querySelectorAll('meta[data-seo]');
    existingMeta.forEach((tag) => tag.remove());

    // Helper function to create meta tags
    const createMetaTag = (name: string, content: string, property?: string) => {
      const meta = document.createElement('meta');
      meta.setAttribute('data-seo', 'true');
      
      if (property) {
        meta.setAttribute('property', property);
      } else {
        meta.setAttribute('name', name);
      }
      
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };

    // Basic meta tags
    createMetaTag('description', data.description);
    createMetaTag('keywords', data.keywords.join(', '));

    // Open Graph meta tags
    createMetaTag('', data.title, 'og:title');
    createMetaTag('', data.description, 'og:description');
    createMetaTag('', 'website', 'og:type');
    
    if (data.url) {
      createMetaTag('', data.url, 'og:url');
    }
    
    if (data.image) {
      createMetaTag('', data.image, 'og:image');
    }

    // Twitter Card meta tags
    createMetaTag('twitter:card', 'summary_large_image');
    createMetaTag('twitter:title', data.title);
    createMetaTag('twitter:description', data.description);
    
    if (data.image) {
      createMetaTag('twitter:image', data.image);
    }

    // Additional SEO tags
    createMetaTag('author', 'TexnoAI');
    createMetaTag('robots', 'index, follow');
    createMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    return () => {
      // Cleanup on unmount
      const metaTags = document.querySelectorAll('meta[data-seo]');
      metaTags.forEach((tag) => tag.remove());
    };
  }, [data]);

  return null;
};

export default SEO;
