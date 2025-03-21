import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const FooterQuickLinks: React.FC = () => {
  // Function to scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#FFFFFF" }}>
        <FormattedMessage id="footer.quickLinks" />
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Link to="/" style={{ textDecoration: "none" }} onClick={scrollToTop}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            <FormattedMessage id="footer.home" />
          </Typography>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }} onClick={scrollToTop}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            <FormattedMessage id="nav.aboutUs" />
          </Typography>
        </Link>
        <Link to="/services" style={{ textDecoration: "none" }} onClick={scrollToTop}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            <FormattedMessage id="nav.services" />
          </Typography>
        </Link>
        <Link to="/vehicles" style={{ textDecoration: "none" }} onClick={scrollToTop}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            <FormattedMessage id="nav.fleet" />
          </Typography>
        </Link>
        <Link to="/gallery" style={{ textDecoration: "none" }} onClick={scrollToTop}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            <FormattedMessage id="nav.gallery" />
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default FooterQuickLinks; 