import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import SEO from "../components/SEO";

const HomePage: React.FC = () => {
  // Structured data for LocalBusiness
  const structuredData = {
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
  };

  return (
    <>
      <SEO 
        title="Luxury Chauffeur Services"
        description="Experience unparalleled luxury with Presidential Chauffeurs. We provide executive transportation services with a fleet of premium vehicles including Rolls-Royce, Bentley, and Mercedes-Maybach."
        canonicalUrl="/"
        keywords="luxury chauffeur, executive travel, airport transfers, wedding car hire, Rolls-Royce, Bentley, chauffeur service"
        structuredData={structuredData}
      />
      <Box sx={{ 
        position: "relative",
        minHeight: "100vh",
        overflowX: "hidden",
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        '& > *': {
          width: "100%"
        }
      }}>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
      </Box>
    </>
  );
};

export default HomePage;
