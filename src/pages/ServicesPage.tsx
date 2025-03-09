import React from "react";
import { Typography, Box } from "@mui/material";
import media from "../config/media.json";

const ServicesPage: React.FC = () => {
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
          src={media.images.placeholders.services["1"]}
          alt="Services Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 48%',
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
          <Typography 
            variant="h2"
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Services We Provide
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ServicesPage; 