import React, { useEffect } from 'react';
import { SEOData } from '../types';

interface SEOProps {
  data?: SEOData;
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ data, title, description, keywords = [], image, url }) => {
  // Use individual props if provided, otherwise use data object
  const seoData: SEOData = data || {
    title: title || 'TexnoAI',
    description: description || 'Sun\'iy intellekt va veb dasturlash xizmatlari',
    keywords: keywords.length > 0 ? keywords : ['AI', 'Texnologiya', 'Web Development'],
    image,
    url
  };

  useEffect(() => {
    // Set document title
    document.title = seoData.title;

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
    createMetaTag('description', seoData.description);
    createMetaTag('keywords', seoData.keywords.join(', '));

    // Open Graph meta tags
    createMetaTag('', seoData.title, 'og:title');
    createMetaTag('', seoData.description, 'og:description');
    createMetaTag('', 'website', 'og:type');
    
    if (seoData.url) {
      createMetaTag('', seoData.url, 'og:url');
    }
    
    if (seoData.image) {
      createMetaTag('', seoData.image, 'og:image');
    }

    // Twitter Card meta tags
    createMetaTag('twitter:card', 'summary_large_image');
    createMetaTag('twitter:title', seoData.title);
    createMetaTag('twitter:description', seoData.description);
    
    if (seoData.image) {
      createMetaTag('twitter:image', seoData.image);
    }

    // Additional SEO tags
    createMetaTag('author', 'TexnoAI');
    createMetaTag('robots', 'index, follow');
    createMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    createMetaTag('language', 'Uzbek');
    createMetaTag('geo.region', 'UZ');
    createMetaTag('geo.placename', 'Toshkent');
    
    // Canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    if (seoData.url) {
      const canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', seoData.url);
      document.head.appendChild(canonical);
    }
    
    // JSON-LD Structured Data
    const existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "TexnoAI",
      "description": seoData.description,
      "url": "https://texnoai.uz",
      "logo": "https://texnoai.uz/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+998-97-477-12-29",
        "contactType": "customer service",
        "areaServed": "UZ",
        "availableLanguage": ["uz", "ru"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Toshkent",
        "addressRegion": "Olmazor",
        "addressCountry": "UZ"
      },
      "sameAs": [
        "https://t.me/texnoaikanal"
      ]
    };
    
    const scriptTag = document.createElement('script');
    scriptTag.setAttribute('type', 'application/ld+json');
    scriptTag.textContent = JSON.stringify(structuredData);
    document.head.appendChild(scriptTag);

    return () => {
      // Cleanup on unmount
      const metaTags = document.querySelectorAll('meta[data-seo]');
      metaTags.forEach((tag) => tag.remove());
      
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
      
      const jsonLd = document.querySelector('script[type="application/ld+json"]');
      if (jsonLd) jsonLd.remove();
    };
  }, [seoData]);

  return null;
};

export default SEO;
