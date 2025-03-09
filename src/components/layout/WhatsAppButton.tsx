import React from "react";
import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface WhatsAppButtonProps {
  phoneNumber: string; // Phone number in international format without + or spaces
  message?: string; // Optional message to pre-fill
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message = "Hello! I'm interested in your chauffeur services." }) => {
  const handleClick = () => {
    // Format the URL for WhatsApp's click-to-chat feature
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#25D366",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#1EB754" },
      }}
      onClick={handleClick}
    >
      <WhatsAppIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
    </Box>
  );
};

export default WhatsAppButton; 