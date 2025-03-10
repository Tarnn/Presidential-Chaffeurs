import React from "react";
import { Typography, Box, Container, Grid, Paper } from "@mui/material";
import { FormattedMessage } from "react-intl";
import media from "../config/media.json";
import { motion } from "framer-motion";

const ServicesPage: React.FC = () => {
  // Animation variants for staggered animations
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

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
            <FormattedMessage id="servicesPage.hero.our" defaultMessage="OUR" />{" "}
            <span style={{ color: "#D0A42B" }}>
              <FormattedMessage id="servicesPage.hero.services" defaultMessage="SERVICES" />
            </span>
          </Typography>
        </Box>
      </Box>

      {/* Services Description Section */}
      <Box sx={{ backgroundColor: "#1a1a1a", py: 6 }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
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
              <FormattedMessage
                id="servicesPage.description"
                defaultMessage="Presidential Chauffeurs provides premium chauffeur services in Toronto and across Canada. From Executive Airport Transfers, Weddings & Red Carpet Events, to bespoke event transportation, our services are tailored to meet the unique needs of our elite clientele, ensuring unmatched professionalism and attention to detail."
              />
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* Services Title Section */}
      <Box sx={{ backgroundColor: "#1a1a1a", pt: 8, pb: 4 }}>
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "white",
                }}
              >
                <FormattedMessage id="servicesPage.explore.title1" defaultMessage="EXPLORE OUR BESPOKE" />
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  mb: 6,
                  fontWeight: 700,
                  color: "#D0A42B",
                }}
              >
                <FormattedMessage id="servicesPage.explore.title2" defaultMessage="CHAUFFEUR SERVICES" />
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Detailed Services Sections */}
      <Box sx={{ backgroundColor: "#1a1a1a", py: 4 }}>
        <Container>
          {/* Executive Chauffeur Service */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUpVariants}
          >
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
                      <FormattedMessage id="servicesPage.executive.title" defaultMessage="Executive Chauffeur Service" />
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                      <FormattedMessage id="servicesPage.executive.description" defaultMessage="Our Executive Chauffeur Service offers a completely flexible and bespoke experience, designed to exceed the expectations of our most discerning clients." />
                    </Typography>
                    <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.executive.point1" defaultMessage="Corporate transportation for executives and VIPs" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.executive.point2" defaultMessage="Dedicated chauffeur for multi-stop business meetings" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.executive.point3" defaultMessage="Roadshow and conference transportation" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.executive.point4" defaultMessage="Luxury vehicles equipped with mobile office amenities" />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          {/* Airport Transfers */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUpVariants}
          >
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
                      <FormattedMessage id="servicesPage.airport.title" defaultMessage="Executive Airport Transfers" />
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                      <FormattedMessage
                        id="servicesPage.airport.description"
                        defaultMessage="Experience seamless airport transfers with our premium chauffeur service, ensuring timely and comfortable journeys to and from all major Canadian airports."
                      />
                    </Typography>
                    <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.airport.point1" defaultMessage="Meet & Greet service at all terminals" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.airport.point2" defaultMessage="Flight monitoring and adjustment for delays" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.airport.point3" defaultMessage="Assistance with luggage and customs" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.airport.point4" defaultMessage="Luxury vehicle fleet for individual or group transfers" />
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
          </motion.div>

          {/* Events Service */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUpVariants}
          >
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
                      <FormattedMessage id="servicesPage.events.title" defaultMessage="Events & Special Occasions" />
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                      <FormattedMessage id="servicesPage.events.description" defaultMessage="Make your special occasions truly memorable with our luxury chauffeur services, perfect for any event requiring sophisticated transportation." />
                    </Typography>
                    <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.events.point1" defaultMessage="Red carpet events and premieres" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.events.point2" defaultMessage="Wedding transportation services" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.events.point3" defaultMessage="Corporate events and galas" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.events.point4" defaultMessage="Sporting events and concerts" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.events.point5" defaultMessage="Photo/video shoot transportation" />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>

          {/* Wedding Service */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUpVariants}
          >
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
                      <FormattedMessage id="servicesPage.wedding.title" defaultMessage="Wedding Chauffeur Services" />
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 2 }}>
                      <FormattedMessage id="servicesPage.wedding.description" defaultMessage="Make your special day truly unforgettable with our bespoke wedding chauffeur services. We understand that every detail matters on your wedding day, which is why we provide an exceptional level of service that combines luxury, elegance, and meticulous attention to detail." />
                    </Typography>
                    <Box component="ul" sx={{ color: 'white', pl: 2 }}>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.wedding.point1" defaultMessage="Luxury bridal car service with elegant decorations" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.wedding.point2" defaultMessage="Coordinated transportation for wedding party and guests" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.wedding.point3" defaultMessage="Professional chauffeurs in formal attire" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.wedding.point4" defaultMessage="Wedding photoshoot location transfers" />
                      </Typography>
                      <Typography component="li" sx={{ mb: 1 }}>
                        <FormattedMessage id="servicesPage.wedding.point5" defaultMessage="Reception venue and post-wedding transportation" />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={media.images.placeholders.servicesSection["weddings"]}
                    alt="Wedding Chauffeur Services"
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
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default ServicesPage; 