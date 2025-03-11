import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import WhatsAppButton from "./WhatsAppButton";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContactInfo from "./FooterContactInfo";
import mediaConfig from "../../config/media.json";
import { motion } from "framer-motion";

interface FooterProps {
  handleWhatsAppClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleWhatsAppClick }) => {
  const { whatsapp } = mediaConfig.contact;
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the footer is visible
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <WhatsAppButton 
        phoneNumber={whatsapp.number}
        message={whatsapp.message}
      />
      <Box
        ref={footerRef}
        sx={{
          bgcolor: "#1a1a1a",
          color: "text.primary",
          pt: 8,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            <Grid
              container
              spacing={4}
              sx={{
                mb: 6,
              }}
            >
              <Grid item xs={12} sm={6} md={3}>
                <motion.div variants={itemVariants}>
                  <FooterSocialLinks />
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <motion.div variants={itemVariants}>
                  <FooterQuickLinks />
                </motion.div>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <motion.div variants={itemVariants}>
                  <FooterContactInfo />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
          <Box
            sx={{
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              pt: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
              2025 © Copyright Presidential Chauffeurs. All Rights Reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Footer; 