import React from "react";
import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface WhatsAppButtonProps {
  onClick: () => void;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onClick }) => {
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
      onClick={onClick}
    >
      <WhatsAppIcon sx={{ color: "#FFFFFF", fontSize: "32px" }} />
    </Box>
  );
};

export default WhatsAppButton; 