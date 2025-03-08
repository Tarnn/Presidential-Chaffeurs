import React from "react";
import { Typography, Box } from "@mui/material";

const AboutUsPage: React.FC = () => (
  <Box
    sx={{
      py: 6,
      color: "text.primary",
      background: "#2a2a2a",
      minHeight: "80vh",
    }}
  >
    <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
      About Presidential Chauffeurs
    </Typography>
    <Typography variant="body1" sx={{ maxWidth: "800px", mx: "auto" }}>
      At Presidential Chauffeurs, we redefine luxury transportation. Founded
      with a vision to offer the ultimate in comfort, style, and
      professionalism, our service caters to discerning clients who demand
      nothing less than excellence. Our hand-picked fleet of high-end vehicles
      and expertly trained chauffeurs ensure every journey is an event in
      itself.
    </Typography>
  </Box>
);

export default AboutUsPage;
