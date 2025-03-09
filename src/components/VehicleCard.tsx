import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Alert,
} from "@mui/material";
import Slider from "react-slick";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { Vehicle } from "../types";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const [formData, setFormData] = useState<{ purpose: string; date: string }>({
    purpose: "",
    date: "",
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get ReCAPTCHA site key from environment variables
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!recaptchaSiteKey) {
      setError("ReCAPTCHA configuration is missing. Please try again later.");
      return;
    }

    if (!captchaToken) {
      setError("Please complete the CAPTCHA verification");
      return;
    }

    try {
      await axios.post("/api/inquiry", {
        vehicleId: vehicle.id,
        purpose: formData.purpose,
        date: formData.date,
        captchaToken,
      });
      alert("Your inquiry has been submitted successfully.");
      setFormData({ purpose: "", date: "" });
      setCaptchaToken(null);
    } catch (error) {
      setError("Error submitting inquiry. Please try again later.");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      style={{ cursor: "pointer" }}
    >
      <Card
        sx={{
          backgroundColor: "#2a2a2a",
          color: "white",
          border: "1px solid #D0A42B",
          borderRadius: 2,
        }}
      >
        <Slider {...sliderSettings}>
          {vehicle.photos.map((photo, index) => (
            <div key={index}>
              <img
                src={photo}
                alt={`${vehicle.name} ${index}`}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
            </div>
          ))}
        </Slider>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {vehicle.name}
          </Typography>
          <Typography variant="body2" color="textPrimary" sx={{ mb: 1 }}>
            {vehicle.description}
          </Typography>
          <Typography variant="body1">Rate: ${vehicle.rate}/day</Typography>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              label="Purpose of Travel"
              fullWidth
              value={formData.purpose}
              onChange={(e) =>
                setFormData({ ...formData, purpose: e.target.value })
              }
              sx={{
                mb: 2,
                input: { color: "white" },
                label: { color: "#D0A42B" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D0A42B" },
                },
              }}
            />
            <TextField
              label="Preferred Date"
              type="date"
              fullWidth
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              sx={{
                mb: 2,
                input: { color: "white" },
                label: { color: "#D0A42B" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#D0A42B" },
                },
              }}
            />
            {recaptchaSiteKey && (
              <ReCAPTCHA
                sitekey={recaptchaSiteKey}
                onChange={(token) => setCaptchaToken(token)}
              />
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #D0A42B, #B08A23)",
                color: "#000000",
                "&:hover": {
                  background: "linear-gradient(45deg, #B08A23, #D0A42B)",
                },
              }}
            >
              Request Chauffeur Service
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default VehicleCard;
