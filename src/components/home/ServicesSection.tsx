import React from "react";
import {
  Typography,
  Box,
  Grid,
  Container,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import mediaConfig from "../../config/media.json";

const services = [
  {
    title: "Executive Chauffeur",
    description:
      "Our Executive Chauffeur Service offers a completely flexible and bespoke experience. From executive transfers to weddings and red carpet events.",
    image: (mediaConfig as any).images.placeholders.servicesSection
      .executiveChauffeur as string,
    link: "/services/executive",
  },
  {
    title: "Executive Airport Transfers",
    description:
      "Presidential Chauffeurs Airport Transfer service provides our clients with top-notch, bespoke and reliable service.",
    image: (mediaConfig as any).images.placeholders.servicesSection
      .airportTransfers as string,
    link: "/services/airport-transfers",
  },
  {
    title: "Events",
    description:
      "No matter the occasion, we can cater for your needs. Birthdays, Weddings, Red Carpet Events, Sporting Events, Business Events/Conferences, Photo/Video Shoots.",
    image: (mediaConfig as any).images.placeholders.servicesSection
      .events as string,
    link: "/services/events",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "#1a1a1a", py: 8 }}>
      <Container>
        <Typography
          variant="h4"
          sx={{ mb: 3, textAlign: "center", fontWeight: 700 }}
        >
          Our Services
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#FFFFFF",
            mb: 6,
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          We pride ourselves on delivering an exceptional experience by
          combining a stunning fleet of luxury vehicles with our signature white
          glove service. Furthermore, every journey is tailored to meet the
          unique needs of our elite clientele, ensuring unmatched
          professionalism and attention to detail.
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <RouterLink
                  to={service.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#2a2a2a",
                      color: "#FFFFFF",
                      border: "1px solid #D0A42B",
                      borderRadius: 2,
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 8px 16px rgba(208, 164, 43, 0.3)",
                      },
                      minHeight: "450px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={service.image}
                      alt={service.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                          {service.description}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#D0A42B",
                          fontWeight: 500,
                          "&:hover": { textDecoration: "underline" },
                          alignSelf: "flex-start",
                        }}
                      >
                        Learn More
                      </Typography>
                    </CardContent>
                  </Card>
                </RouterLink>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;
