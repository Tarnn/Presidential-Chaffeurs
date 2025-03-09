import React from "react";
import { Typography, Box, Container, Grid, Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";
import media from "../config/media.json";

const ServicesPage: React.FC = () => {
  return (
    <Box component="section">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          width: '100%',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={media.images.placeholders.services["1"]}
          alt="Services Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.7)',
            imageRendering: 'high-quality',
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
            }}
          >
            OUR <span style={{ color: "#D0A42B" }}>SERVICES</span>
          </Typography>
        </Box>
      </Box>

      {/* Services Description Section */}
      <Box sx={{ backgroundColor: "#1a1a1a", py: 6 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: 'white',
              maxWidth: '1000px',
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            }}
          >
            Presidential Chauffeurs provides premium chauffeur services in London and across the UK. From Executive Airport Transfers, Weddings & Red Carpet Events, to bespoke event transportation, our services are tailored to meet the unique needs of our elite clientele, ensuring unmatched professionalism and attention to detail.
          </Typography>
        </Container>
      </Box>

      {/* Services Title Section */}
      <Box sx={{ backgroundColor: "#1a1a1a", pt: 8, pb: 4 }}>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
              }}
            >
              EXPLORE OUR BESPOKE
            </Typography>
            <Typography
              variant="h3"
              sx={{
                mb: 6,
                fontWeight: 700,
                color: "#D0A42B",
              }}
            >
              CHAUFFEUR SERVICES
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Detailed Services Sections */}
      <Box sx={{ backgroundColor: "#1a1a1a", py: 4 }}>
        <Container>
          {/* Executive Chauffeur Service */}
          <Paper 
            elevation={3}
            sx={{ 
              mb: 6, 
              backgroundColor: '#262626',
              overflow: 'hidden',
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={media.images.placeholders.servicesSection["executiveChauffeur"]}
                  alt="Executive Chauffeur Service"
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Executive Chauffeur Service
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                    Our Executive Chauffeur Service offers a completely flexible and bespoke experience, designed to exceed the expectations of our most discerning clients.
                  </Typography>
                  <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Corporate transportation for executives and VIPs
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Dedicated chauffeur for multi-stop business meetings
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Roadshow and conference transportation
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Luxury vehicles equipped with mobile office amenities
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Airport Transfers */}
          <Paper 
            elevation={3}
            sx={{ 
              mb: 6, 
              backgroundColor: '#262626',
              overflow: 'hidden',
            }}
          >
            <Grid container direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Executive Airport Transfers
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                    Experience seamless airport transfers with our premium chauffeur service, ensuring punctual and comfortable journeys to and from all major UK airports.
                  </Typography>
                  <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Meet & Greet service at all terminals
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Flight monitoring and adjustment for delays
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Assistance with luggage and customs
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Luxury vehicle fleet for individual or group transfers
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={media.images.placeholders.servicesSection["airportTransfers"]}
                  alt="Airport Transfers"
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            </Grid>
          </Paper>

          {/* Events Service */}
          <Paper 
            elevation={3}
            sx={{ 
              mb: 6, 
              backgroundColor: '#262626',
              overflow: 'hidden',
            }}
          >
            <Grid container>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={media.images.placeholders.servicesSection["events"]}
                  alt="Events Service"
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Events & Special Occasions
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                    Make your special occasions truly memorable with our luxury chauffeur services, perfect for any event requiring sophisticated transportation.
                  </Typography>
                  <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Red carpet events and premieres
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Wedding transportation services
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Corporate events and galas
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Sporting events and concerts
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Photo/video shoot transportation
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Security Service */}
          <Paper 
            elevation={3}
            sx={{ 
              mb: 6, 
              backgroundColor: '#262626',
              overflow: 'hidden',
            }}
          >
            <Grid container direction={{ xs: 'column-reverse', md: 'row' }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h4" sx={{ color: 'white', mb: 2 }}>
                    Security & Close Protection
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                    Our highly trained security team provides discrete and professional protection services for clients requiring enhanced security measures.
                  </Typography>
                  <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                    <Typography component="li" sx={{ mb: 1 }}>
                      SIA qualified security personnel
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Close protection services
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Risk assessment and route planning
                    </Typography>
                    <Typography component="li" sx={{ mb: 1 }}>
                      Secure vehicle fleet with enhanced safety features
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={media.images.placeholders.servicesSection["securityChauffeurs"]}
                  alt="Security Service"
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default ServicesPage; 