/**
 * Structured data templates for SEO
 * These templates follow the Schema.org specifications
 */

/**
 * Creates LocalBusiness structured data
 */
export const createLocalBusinessData = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Presidential Chauffeurs",
  "image": "https://presidential-chauffeurs.com/images/fleet/rolls-royce-phantom.jpg",
  "description": "Luxury chauffeur services for executive travel, airport transfers, and special occasions.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Luxury Drive",
    "addressLocality": "London",
    "addressRegion": "Greater London",
    "postalCode": "W1 1AA",
    "addressCountry": "UK"
  },
  "telephone": "+44-20-1234-5678",
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/presidentialchauffeurs",
    "https://www.instagram.com/presidentialchauffeurs",
    "https://twitter.com/presidentchauff"
  ]
});

/**
 * Creates FAQPage structured data
 * @param {Array} faqs - Array of FAQ items with question and answer properties
 */
export const createFAQData = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

/**
 * Creates Service structured data
 * @param {string} name - Service name
 * @param {string} description - Service description
 * @param {string} image - Service image URL
 * @param {number} price - Service price
 */
export const createServiceData = (
  name: string, 
  description: string, 
  image: string, 
  price: number
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": name,
  "description": description,
  "provider": {
    "@type": "LocalBusiness",
    "name": "Presidential Chauffeurs"
  },
  "image": image,
  "offers": {
    "@type": "Offer",
    "price": price,
    "priceCurrency": "GBP"
  }
});

/**
 * Creates BreadcrumbList structured data
 * @param {Array} items - Array of breadcrumb items with name and url properties
 */
export const createBreadcrumbData = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://presidential-chauffeurs.com${item.url}`
  }))
});

/**
 * Creates WebSite structured data
 */
export const createWebsiteData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Presidential Chauffeurs",
  "url": "https://presidential-chauffeurs.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://presidential-chauffeurs.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}); 