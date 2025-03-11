import React from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import VehicleCard, { SubmissionProvider } from "../components/VehicleCard";
import { Vehicle } from "../types";
import media from "../config/media.json";
// Import static vehicle data
import vehicleData from "../vehicle.json";
import { FormattedMessage } from "react-intl";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LazyImage from "../components/common/LazyImage";
import { motion } from "framer-motion";
import { AnimatedTypography } from "../components/common";

const VehicleListPage: React.FC = () => {
  // Use static data instead of state and API call
  const vehicles: Vehicle[] = vehicleData;

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Structured data for fleet/vehicles
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": vehicles.map((vehicle, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": vehicle.name,
        "description": vehicle.description,
        "image": vehicle.photos[0],
        "offers": {
          "@type": "Offer",
          "price": vehicle.rate,
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  // Empty breadcrumbs - keeping the container but removing the content
  const breadcrumbs: any[] = [];

  return (
    <>
      <SEO 
        title="Luxury Fleet | Premium Chauffeur Vehicles"
        description="Explore our exclusive fleet of luxury vehicles including Rolls-Royce Phantom, Bentley Mulsanne, and Mercedes-Maybach S-Class for your executive transportation needs."
        canonicalUrl="/vehicles"
        keywords="luxury fleet, Rolls-Royce, Bentley, Mercedes-Maybach, chauffeur vehicles, premium cars"
        structuredData={structuredData}
      />
      <Box component="section">
        {/* Hero Section */}
        <Box
          sx={{
            position: 'relative',
            height: '30vh',
            width: '100%',
            overflow: 'hidden',
            mb: 4,
          }}
        >
          <LazyImage
            src={media.images.placeholders.fleet["1"]}
            alt="Luxury Fleet of Presidential Chauffeurs"
            height="30vh"
            objectPosition="center 48%"
            sx={{
              filter: 'brightness(0.7)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'white',
              width: '100%',
              padding: 4,
            }}
          >
            <AnimatedTypography 
              variant="h2"
              component="h1" 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap'
              }}
              fadeDelay={0.1}
              fadeDuration={1.0}
              fadeDirection="up"
              fadeDistance={40}
            >
              <Box component="span" sx={{ color: 'white' }}>
                <FormattedMessage id="vehiclePage.titleStart" defaultMessage="Our Elite" />
              </Box>
              <Box component="span" sx={{ color: '#D0A42B' }}>
                <FormattedMessage id="vehiclePage.titleEnd" defaultMessage="Fleet" />
              </Box>
            </AnimatedTypography>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ mb: 6 }}>
          {/* Empty breadcrumb container for layout purposes */}
          <Box 
            sx={{ 
              py: 2, 
              px: { xs: 2, sm: 3 },
              backgroundColor: 'background.paper',
              borderRadius: 1,
              mb: 3
            }}
          />
          
          <SubmissionProvider>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <Grid container spacing={3} alignItems="stretch">
                {vehicles.map((vehicle) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    key={vehicle.id} 
                    sx={{ 
                      display: 'flex',
                      height: '100%'
                    }}
                  >
                    <motion.div variants={itemVariants} style={{ width: '100%', height: '100%' }}>
                      <VehicleCard vehicle={vehicle} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </SubmissionProvider>
        </Container>
      </Box>
    </>
  );
};

export default VehicleListPage;
