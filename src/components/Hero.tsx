import React from "react";
import { Box, Typography } from "@mui/material";

interface HeroProps {
  title: string;
  image: string;
  height?: string;
}

const Hero: React.FC<HeroProps> = ({ title, image, height = "40vh" }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: height,
        width: '100%',
        overflow: 'hidden',
        mb: 6,
      }}
    >
      <Box
        component="img"
        src={image}
        alt={`${title} Hero`}
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
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero; 