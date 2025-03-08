import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const FooterQuickLinks: React.FC = () => {
  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#FFFFFF" }}>
        QUICK LINKS
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            Home
          </Typography>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            About Us
          </Typography>
        </Link>
        <Link to="/services" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            Services
          </Typography>
        </Link>
        <Link to="/gallery" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            Gallery
          </Typography>
        </Link>
        <Link to="/contact" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            Contact
          </Typography>
        </Link>
        <Link to="/book" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            Book Now
          </Typography>
        </Link>
        <Link to="/testimonials" style={{ textDecoration: "none" }}>
          <Typography variant="body2" sx={{ color: "#FFFFFF", "&:hover": { color: "#D0A42B" } }}>
            Testimonials
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default FooterQuickLinks; 