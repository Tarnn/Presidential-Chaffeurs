import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";

const HomePage: React.FC = () => {
  return (
    <Box sx={{ 
      position: "relative",
      minHeight: "100vh",
      overflowX: "hidden",
      width: "100vw",
      marginLeft: "calc(-50vw + 50%)",
      marginRight: "calc(-50vw + 50%)",
      '& > *': {
        width: "100%"
      }
    }}>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TestimonialsSection />
    </Box>
  );
};

export default HomePage;
