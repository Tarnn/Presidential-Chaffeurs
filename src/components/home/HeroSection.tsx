import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import mediaConfig from "../../config/media.json";

const HeroSection: React.FC = () => {
  const { hero: videoUrl } = mediaConfig.videos;
  const { heroLoading: posterUrl } = mediaConfig.images.placeholders.servicesSection;

  return (
    <Box 
      sx={{ 
        width: "100vw",
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      {videoUrl ? (
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster={posterUrl}
          style={{ 
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0 
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Box 
          sx={{ 
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url(${posterUrl}) no-repeat center/cover`,
            zIndex: 0 
          }} 
        />
      )}

      <Box 
        sx={{ 
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1 
        }} 
      />

      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }} 
        style={{ 
          textAlign: "center",
          zIndex: 2,
          padding: "16px",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontFamily: "Cinzel, serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" 
          }}
        >
          <FormattedMessage id="hero.title" />
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: "Roboto, sans-serif",
            color: "#D0A42B",
            fontSize: { xs: "0.875rem", sm: "1.1rem", md: "1.5rem" },
            mb: { xs: 2, sm: 3, md: 4 },
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)" 
          }}
        >
          <FormattedMessage id="hero.subtitle" />
        </Typography>
        <Button 
          variant="contained" 
          component={RouterLink} 
          to="/vehicles" 
          sx={{ 
            background: "linear-gradient(45deg, #D0A42B, #B08A23)",
            color: "#000000",
            "&:hover": { background: "linear-gradient(45deg, #B08A23, #D0A42B)" },
            fontFamily: "Cinzel, serif",
            fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
            padding: { xs: "6px 12px", sm: "8px 16px", md: "10px 20px" },
            textTransform: "none",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" 
          }}
        >
          <FormattedMessage id="nav.bookNow" />
        </Button>
      </motion.div>
    </Box>
  );
};

export default HeroSection; 