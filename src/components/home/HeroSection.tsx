import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import mediaConfig from "../../config/media.json";
import AnimatedTypography from "../common/AnimatedTypography";
import ScrollingBanner from "../common/ScrollingBanner";

const HeroSection: React.FC = () => {
  const { hero: videoUrl } = mediaConfig.videos;
  const { heroLoading: posterUrl } = mediaConfig.images.placeholders.servicesSection;

  const bannerItems = [
    "Toronto",
    "Vaughan",
    "Richmond Hill",
    "Mississauga",
    "Brampton",
    "Oakville",
    "Milton",
    "Guelph",
    "Waterloo",
    "Kitchener"
  ];

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
        <AnimatedTypography 
          variant="h3" 
          fadeDelay={0.2}
          fadeDuration={0.8}
          fadeDirection="up"
          fadeDistance={30}
          sx={{ 
            fontFamily: "Cinzel, serif",
            fontWeight: 700,
            color: "#FFFFFF",
            fontSize: { xs: "1.2rem", sm: "2.5rem", md: "3.5rem" },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            '@media (max-width: 410px)': {
              fontSize: '1.1rem',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              whiteSpace: 'nowrap',
              padding: '0 8px'
            }
          }}
        >
          <FormattedMessage id="hero.title" />
        </AnimatedTypography>
        <AnimatedTypography 
          variant="h6" 
          fadeDelay={0.4}
          fadeDuration={0.8}
          fadeDirection="up"
          fadeDistance={30}
          sx={{ 
            fontFamily: "Roboto, sans-serif",
            color: "#D0A42B",
            fontSize: { xs: "0.75rem", sm: "1.1rem", md: "1.5rem" },
            lineHeight: { xs: 1.2, sm: 1.5, md: 1.6 },
            mb: { xs: 2, sm: 3, md: 4 },
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
            maxWidth: { xs: "100%", sm: "none" },
            mx: "auto",
            px: { xs: 2, sm: 0 },
            whiteSpace: { xs: "pre-line", sm: "pre-line" },
            textAlign: { xs: "center", sm: "center" },
            wordBreak: { xs: "break-word", sm: "normal" },
            display: "block"
          }}
        >
          <FormattedMessage id="hero.subtitle" />
        </AnimatedTypography>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
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
      </motion.div>
      <ScrollingBanner items={bannerItems} />
    </Box>
  );
};

export default HeroSection; 