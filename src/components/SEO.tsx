import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: Record<string, any>;
  keywords?: string;
  language?: string;
}

/**
 * SEO component for managing meta tags, structured data, and other SEO elements
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/images/og-image.jpg',
  structuredData,
  keywords,
  language = 'en',
}) => {
  const site = {
    name: 'Presidential Chauffeurs',
    url: 'https://presidential-chauffeurs.com',
  };

  const fullTitle = `${title} | ${site.name}`;
  const fullCanonicalUrl = canonicalUrl ? `${site.url}${canonicalUrl}` : site.url;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${site.url}${ogImage}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang={language} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={site.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 