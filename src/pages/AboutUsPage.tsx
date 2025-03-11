import React from "react";
import { Typography, Box, Container, Grid, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import media from "../config/media.json";
import TestimonialsSection from "../components/home/TestimonialsSection";
import { AnimatedTypography } from "../components/common";

const AboutUsPage: React.FC = () => {
  return (
    <Box component="section">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '30vh',
          width: '100%',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={media.images.placeholders.aboutUs["1"]}
          alt="About Us Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 63%',
            filter: 'brightness(0.7)',
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
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
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
            fadeDelay={0.1}
            fadeDuration={1.0}
            fadeDirection="up"
            fadeDistance={40}
          >
            <FormattedMessage id="aboutPage.hero.about" defaultMessage="ABOUT" />{" "}
            <span style={{ color: "#D0A42B" }}>
              <FormattedMessage id="aboutPage.hero.us" defaultMessage="US" />
            </span>
          </AnimatedTypography>
        </Box>
      </Box>

      {/* About Content Section */}
      <Box sx={{ backgroundColor: "#1a1a1a", py: 8 }}>
        <Container>
          <Grid container spacing={6}>
            {/* Left Column - Header and Description */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "text.primary"
                }}
              >
                <FormattedMessage id="aboutPage.intro.presidential" defaultMessage="PRESIDENTIAL" />{" "}
                <span style={{ color: "#D0A42B" }}>
                  <FormattedMessage id="aboutPage.intro.chauffeurs" defaultMessage="CHAUFFEURS" />
                </span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#FFFFFF",
                  mb: 4,
                  lineHeight: 1.8,
                }}
              >
                <FormattedMessage id="aboutPage.intro.description" />
              </Typography>
            </Grid>

            {/* Right Column - Additional Content */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="body1"
                sx={{
                  color: "#FFFFFF",
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                <FormattedMessage id="aboutPage.services.description1" />
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#FFFFFF",
                  mb: 3,
                  lineHeight: 1.8,
                }}
              >
                <FormattedMessage id="aboutPage.services.description2" />
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#FFFFFF",
                  lineHeight: 1.8,
                }}
              >
                <FormattedMessage id="aboutPage.services.description3" />
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Commitment Section */}
      <Box sx={{ backgroundColor: "#1a1a1a", py: 8 }}>
        <Container>
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: "white",
            }}
          >
            <FormattedMessage id="aboutPage.commitment.our" defaultMessage="OUR" />{" "}
            <span style={{ color: "#D0A42B" }}>
              <FormattedMessage id="aboutPage.commitment.commitment" defaultMessage="COMMITMENT" />
            </span>
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 8,
              color: "white",
              lineHeight: 1.8,
            }}
          >
            <FormattedMessage id="aboutPage.commitment.description" />
          </Typography>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h4"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                <FormattedMessage id="aboutPage.whyChoose.title" />
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: "white",
                  lineHeight: 1.8,
                }}
              >
                <FormattedMessage id="aboutPage.whyChoose.description" />
              </Typography>
              <Box component="ul" sx={{ pl: 2, mb: 4 }}>
                <Typography component="li" sx={{ mb: 1, color: "white" }}>
                  <FormattedMessage id="aboutPage.whyChoose.point1" />
                </Typography>
                <Typography component="li" sx={{ mb: 1, color: "white" }}>
                  <FormattedMessage id="aboutPage.whyChoose.point2" />
                </Typography>
                <Typography component="li" sx={{ mb: 1, color: "white" }}>
                  <FormattedMessage id="aboutPage.whyChoose.point3" />
                </Typography>
                <Typography component="li" sx={{ mb: 1, color: "white" }}>
                  <FormattedMessage id="aboutPage.whyChoose.point4" />
                </Typography>
              </Box>
              <Button
                variant="contained"
                component={RouterLink}
                to="/vehicles"
                sx={{
                  background: "linear-gradient(45deg, #D0A42B, #B08A23)",
                  color: "#000000",
                  "&:hover": { background: "linear-gradient(45deg, #B08A23, #D0A42B)" },
                  fontFamily: "Cinzel, serif",
                  padding: "12px 24px",
                }}
              >
                <FormattedMessage id="aboutPage.whyChoose.cta" />
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={media.images.placeholders.aboutUsSection["1"]}
                alt="Chauffeur Service"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: "#1a1a1a", py: 8 }}>
        <Container>
          {/* Testimonials */}
          <TestimonialsSection />
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUsPage;
