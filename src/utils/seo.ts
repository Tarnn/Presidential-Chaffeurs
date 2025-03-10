/**
 * SEO utility functions
 */

/**
 * Generate canonical URL
 * @param path - The path to generate a canonical URL for
 * @returns The full canonical URL
 */
export const getCanonicalUrl = (path: string): string => {
  const baseUrl = 'https://presidential-chauffeurs.com';
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
};

/**
 * Generate structured data for a page
 * @param type - The type of structured data to generate
 * @param data - The data to use for generating structured data
 * @returns The structured data object
 */
export const generateStructuredData = (type: string, data: any): Record<string, any> => {
  switch (type) {
    case 'website':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Presidential Chauffeurs',
        url: 'https://presidential-chauffeurs.com',
        description: data.description || 'Luxury chauffeur services for executive travel and special occasions',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://presidential-chauffeurs.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      };
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Presidential Chauffeurs',
        url: 'https://presidential-chauffeurs.com',
        logo: 'https://presidential-chauffeurs.com/logo.png',
        description: data.description || 'Luxury chauffeur services for executive travel and special occasions',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '123 Luxury Drive',
          addressLocality: 'London',
          addressRegion: 'Greater London',
          postalCode: 'W1 1AA',
          addressCountry: 'UK'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+44-20-1234-5678',
          contactType: 'customer service'
        },
        sameAs: [
          'https://www.facebook.com/presidentialchauffeurs',
          'https://www.instagram.com/presidentialchauffeurs',
          'https://twitter.com/presidentchauff'
        ]
      };
    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: getCanonicalUrl(item.url)
        }))
      };
    default:
      return {};
  }
};

/**
 * Generate meta tags for a page
 * @param title - The page title
 * @param description - The page description
 * @param image - The page image
 * @param url - The page URL
 * @returns The meta tags object
 */
export const generateMetaTags = (
  title: string,
  description: string,
  image: string = '/images/og-image.jpg',
  url: string = '/'
): Record<string, string> => {
  const fullUrl = getCanonicalUrl(url);
  const fullImage = image.startsWith('http') ? image : getCanonicalUrl(image);
  
  return {
    title: `${title} | Presidential Chauffeurs`,
    description,
    'og:title': title,
    'og:description': description,
    'og:image': fullImage,
    'og:url': fullUrl,
    'og:type': 'website',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': fullImage
  };
};

/**
 * Generate JSON-LD script for structured data
 * @param data - The structured data object
 * @returns The JSON-LD script as a string
 */
export const generateJsonLd = (data: Record<string, any>): string => {
  return JSON.stringify(data);
}; 