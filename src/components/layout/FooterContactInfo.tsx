import React from "react";
import { Box, Typography, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import mediaConfig from "../../config/media.json";
import { FormattedMessage } from "react-intl";

const FooterContactInfo: React.FC = () => {
  const { phone, email, location, whatsapp } = mediaConfig.contact;

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(whatsapp.message);
    const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#FFFFFF" }}>
        <FormattedMessage id="footer.contactInfo" />
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneIcon sx={{ color: "#D0A42B" }} />
          <Link href={`tel:${phone}`} sx={{ color: "#FFFFFF", textDecoration: "none", "&:hover": { color: "#D0A42B" } }}>
            {phone}
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WhatsAppIcon sx={{ color: "#25D366" }} />
          <Typography
            variant="body2"
            sx={{ color: "#FFFFFF", cursor: "pointer", "&:hover": { color: "#D0A42B" } }}
            onClick={handleWhatsAppClick}
          >
            Whatsapp Message
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmailIcon sx={{ color: "#D0A42B" }} />
          <Link 
            href={`mailto:${email}`}
            sx={{ color: "#FFFFFF", textDecoration: "none", "&:hover": { color: "#D0A42B" } }}
          >
            {email}
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon sx={{ color: "#D0A42B" }} />
          <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
            {location}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterContactInfo; 