import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import mediaConfig from "../../config/media.json";

const AboutSection: React.FC = () => {
  const images = Object.values(mediaConfig.images.placeholders.aboutUsSection);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000); // Matches the previous autoplaySpeed of 5000ms
    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  // Handle tap/click to go to the next image
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "#2a2a2a",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          px: { sm: 2, md: 3 },
        }}
      >
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="flex-start"
        >
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              sx={{
                width: "100%",
                height: { xs: "300px", md: "600px" },
                position: "relative",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleNextSlide}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: "100%", md: "100%" },
                  height: { xs: "300px", md: "600px" },
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={index}
                    component={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      transition: { duration: 0.5 },
                    }}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={image}
                      alt={`About Us ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        borderRadius: { xs: "12px", md: "16px" },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              sx={{
                height: { xs: "auto", md: "600px" }, // Match the image container height on desktop
                display: "flex",
                flexDirection: "column",
                justifyContent: "center", // Center the text vertically
                px: { xs: 2, sm: 0 }, // Add padding on mobile for text content
                py: { md: 4 }, // Add padding top and bottom on desktop to create space
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  sx={{
                    mb: 2,
                    fontWeight: 700,
                    textAlign: "center", // Center the text horizontally
                    fontSize: { xs: "2rem", md: "2.75rem" },
                    color: "#FFFFFF",
                    minHeight: { xs: "auto", md: "60px" },
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  <FormattedMessage id="about.eliteStandard" />
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 4,
                    textAlign: "center", // Center the text horizontally
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    color: "#D0A42B",
                    fontWeight: 600,
                    minHeight: { xs: "auto", md: "48px" },
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                  }}
                >
                  <FormattedMessage id="about.trustedChauffeurs" />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#FFFFFF",
                    mb: 3,
                    textAlign: "center",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.8,
                    opacity: 0.9,
                    minHeight: { xs: "auto", md: "350px" },
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 12,
                    overflow: "hidden",
                  }}
                >
                  <FormattedMessage id="about.description" />
                </Typography>
                <Box
                  sx={{
                    textAlign: "center", // Center the button horizontally
                    mt: 4,
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center", // Center the button
                  }}
                >
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="/vehicles"
                    sx={{
                      backgroundColor: "#D0A42B",
                      color: "#000000",
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#FFFFFF",
                      },
                    }}
                  >
                    <FormattedMessage id="nav.bookNow" />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection;