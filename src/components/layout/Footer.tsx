import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import WhatsAppButton from "./WhatsAppButton";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContactInfo from "./FooterContactInfo";
import mediaConfig from "../../config/media.json";
import { motion, useAnimation } from "framer-motion";
import { FormattedMessage } from "react-intl";
import { useInView } from "react-intersection-observer";
import AnimatedSection from "../common/AnimatedSection";

interface FooterProps {
  handleWhatsAppClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleWhatsAppClick }) => {
  const { whatsapp } = mediaConfig.contact;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const copyrightVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.8,
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
        ref={ref}
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
            animate={controls}
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
          <motion.div
            variants={copyrightVariants}
            initial="hidden"
            animate={controls}
          >
            <Box
              sx={{
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                pt: 3,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                2025 © Copyright Presidential Chauffeurs.
              </Typography>
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", display: "block" }}>
                <FormattedMessage 
                  id="footer.recaptchaNotice" 
                  defaultMessage="This site is protected by reCAPTCHA and the Google {privacyPolicy} and {termsOfService} apply."
                  values={{
                    privacyPolicy: (
                      <Box component="a" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" 
                        sx={{ color: "rgba(255, 255, 255, 0.7)", mx: 0.5, textDecoration: "none", "&:hover": { color: "#D0A42B" } }}>
                        <FormattedMessage id="footer.privacyPolicy" defaultMessage="Privacy Policy" />
                      </Box>
                    ),
                    termsOfService: (
                      <Box component="a" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer"
                        sx={{ color: "rgba(255, 255, 255, 0.7)", mx: 0.5, textDecoration: "none", "&:hover": { color: "#D0A42B" } }}>
                        <FormattedMessage id="footer.termsOfService" defaultMessage="Terms of Service" />
                      </Box>
                    )
                  }}
                />
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default Footer; 