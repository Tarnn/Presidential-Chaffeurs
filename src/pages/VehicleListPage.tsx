import React from "react";
import { Grid, Typography, Box, Container } from "@mui/material";
import VehicleCard from "../components/VehicleCard";
import { Vehicle } from "../types";
import media from "../config/media.json";
// Import static vehicle data
import vehicleData from "../vehicle.json";
import { FormattedMessage } from "react-intl";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LazyImage from "../components/common/LazyImage";

const VehicleListPage: React.FC = () => {
  // Use static data instead of state and API call
  const vehicles: Vehicle[] = vehicleData;

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

  // Custom breadcrumbs for this page
  const breadcrumbs = [
    { name: "Home", url: "/", translationKey: "breadcrumbs.home" },
    { name: "Fleet", url: "/vehicles", translationKey: "breadcrumbs.fleet" }
  ];

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
            <Typography 
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
            >
              <Box component="span" sx={{ color: 'white' }}>
                <FormattedMessage id="vehiclePage.titleStart" defaultMessage="Our Elite" />
              </Box>
              <Box component="span" sx={{ color: '#D0A42B' }}>
                <FormattedMessage id="vehiclePage.titleEnd" defaultMessage="Fleet" />
              </Box>
            </Typography>
          </Box>
        </Box>

        <Container maxWidth="lg" sx={{ mb: 6 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />
          
          <Grid container spacing={2}>
            {vehicles.map((vehicle) => (
              <Grid item xs={12} sm={6} md={4} key={vehicle.id} sx={{ display: 'flex' }}>
                <VehicleCard vehicle={vehicle} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default VehicleListPage;
