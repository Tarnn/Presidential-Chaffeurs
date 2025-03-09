import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import WhatsAppButton from "./WhatsAppButton";
import FooterSocialLinks from "./FooterSocialLinks";
import FooterQuickLinks from "./FooterQuickLinks";
import FooterContactInfo from "./FooterContactInfo";
import mediaConfig from "../../config/media.json";

interface FooterProps {
  handleWhatsAppClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ handleWhatsAppClick }) => {
  const { whatsapp } = mediaConfig.contact;

  return (
    <>
      <WhatsAppButton 
        phoneNumber={whatsapp.number}
        message={whatsapp.message}
      />
      <Box
        sx={{
          bgcolor: "#1a1a1a",
          color: "text.primary",
          pt: 8,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
            sx={{
              mb: 6,
            }}
          >
            <Grid item xs={12} sm={6} md={3}>
              <FooterSocialLinks />
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <FooterQuickLinks />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FooterContactInfo />
            </Grid>
          </Grid>
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