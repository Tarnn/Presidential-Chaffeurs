import React from "react";
import { Box, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { motion } from "framer-motion";
import mediaConfig from "../../config/media.json";
import { FormattedMessage } from "react-intl";

const FooterSocialLinks: React.FC = () => {
  const { whatsapp, facebook, instagram } = mediaConfig.socialMedia;

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#FFFFFF" }}>
        <FormattedMessage id="footer.24hours" />
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "#FFFFFF" }}>
        <FormattedMessage id="footer.hours" />
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <motion.a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          style={{ color: "#FFFFFF" }}
        >
          <WhatsAppIcon />
        </motion.a>
        <motion.a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          style={{ color: "#FFFFFF" }}
        >
          <InstagramIcon />
        </motion.a>
        <motion.a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          style={{ color: "#FFFFFF" }}
        >
          <FacebookIcon />
        </motion.a>
      </Box>
    </Box>
  );
};

export default FooterSocialLinks; 