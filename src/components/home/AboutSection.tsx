import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Grid, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import mediaConfig from "../../config/media.json";

type ImageIndex = "1" | "2" | "3" | "4" | "5";

const AboutSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const totalImages = Object.keys(mediaConfig.images.placeholders.aboutUsSection).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === totalImages ? 1 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, [totalImages]);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === totalImages ? 1 : prevIndex + 1
    );
  };

  return (
    <Box sx={{ backgroundColor: "#2a2a2a", py: { xs: 10, md: 12 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              position: 'relative', 
              overflow: 'hidden', 
              borderRadius: "12px",
              paddingTop: "85%", // Taller aspect ratio for bigger images
              backgroundColor: "#1a1a1a",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
              },
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)"
            }}
            onClick={handleImageClick}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={mediaConfig.images.placeholders.aboutUsSection[currentImageIndex.toString() as ImageIndex]}
                  alt={`Luxury Car ${currentImageIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    objectFit: "cover",
                  }}
                />
              </AnimatePresence>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4, 
                fontWeight: 700, 
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "2rem", md: "2.5rem" }
              }}
            >
              Elite Standard Trusted Chauffeurs
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "#FFFFFF", 
                mb: 4, 
                textAlign: { xs: "center", md: "left" },
                fontSize: { xs: "1rem", md: "1.125rem" },
                lineHeight: 1.8
              }}
            >
              Presidential Chauffeurs' Executive Chauffeur Services in London provide a uniquely flexible service. Be it bespoke events, red carpet arrivals, corporate white glove transportation, weddings, or special nights out in London, our professional Chauffeur Services consistently deliver with both luxury and professionalism. Based in London and the Home Counties but operating all over the UK, our Executive Chauffeur Services are tailored to accommodate your every request. Indeed, all of Presidential's clients are VIP. Our Executive Chauffeur Services are entrusted by elite clientele who not only seek the highest standards of white glove service but also demand meticulous attention to detail.
            </Typography>
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Button 
                variant="contained" 
                component={RouterLink} 
                to="/fleet" 
                sx={{ 
                  background: "linear-gradient(45deg, #D0A42B, #B08A23)", 
                  color: "#000000", 
                  "&:hover": { 
                    background: "linear-gradient(45deg, #B08A23, #D0A42B)" 
                  }, 
                  fontSize: { xs: "0.9rem", md: "1.1rem" }, 
                  padding: { xs: "8px 16px", md: "10px 20px" } 
                }}
              >
                See Our Fleet
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSection; 