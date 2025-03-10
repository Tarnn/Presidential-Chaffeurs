import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { IntlProvider } from "react-intl";
import { HelmetProvider } from 'react-helmet-async';
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import VehicleListPage from "./pages/VehicleListPage";
import GalleryPage from "./pages/GalleryPage";
import ServicesPage from "./pages/ServicesPage";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AudioControls from "./components/common/AudioControls";
import ScrollToTop from "./components/common/ScrollToTop";
import CorsTest from "./components/common/CorsTest";
import { Analytics } from "@vercel/analytics/react"
// Import locale data
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import hi from "./locales/hi.json";
import pa from "./locales/pa.json";
import es from "./locales/es.json";
import zh from "./locales/zh.json";

// Define supported locales
type Locale = "en" | "fr" | "hi" | "pa" | "es" | "zh";

// Define message structure with an index signature
interface Messages {
  "app.title": string;
  "nav.aboutUs": string;
  "nav.services": string;
  "nav.fleet": string;
  "footer.24hours": string;
  "footer.hours": string;
  "footer.quickLinks": string;
  "footer.home": string;
  "footer.testimonials": string;
  "footer.contactInfo": string;
  "footer.phone": string;
  "footer.whatsapp": string;
  "footer.email": string;
  "footer.location": string;
  "footer.copyright": string;
  [key: string]: string;
}

// Luxury theme with updated gold and font
const theme = createTheme({
  palette: {
    primary: { main: "#D0A42B" }, // Gold: rgb(208, 164, 43)
    secondary: { main: "#000000" }, // Black
    background: { default: "#1a1a1a", paper: "#2a2a2a" }, // Dark gray-black
    text: { primary: "#FFFFFF", secondary: "#D0A42B" },
  },
  typography: {
    fontFamily: "Roboto, sans-serif", // Default font for body text
    h3: { fontFamily: "Cinzel, serif", fontWeight: 700, color: "#D0A42B" },
    h4: { fontFamily: "Cinzel, serif", fontWeight: 700, color: "#D0A42B" },
    h5: { fontFamily: "Cinzel, serif", fontWeight: 700, color: "#D0A42B" },
    h6: { fontFamily: "Cinzel, serif", fontWeight: 700, color: "#D0A42B" },
    button: {
      fontFamily: "Cinzel, serif",
      textTransform: "none",
      fontSize: "1rem",
      color: "#FFFFFF",
      fontWeight: 500,
    },
  },
});

const messages: Record<Locale, Messages> = {
  en,
  fr,
  hi,
  pa,
  es,
  zh,
};

const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>("en");

  const handleWhatsAppClick = () => {
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER;
    if (whatsappNumber) {
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        messages[locale]["footer.whatsapp"] ||
          "Hello, I have an inquiry about Presidential Chauffeurs"
      )}`;
      window.open(url, "_blank");
    }
  };

  return (
    <HelmetProvider>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navbar locale={locale} onLanguageChange={setLocale} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/vehicles" element={<VehicleListPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/cors-test" element={<CorsTest />} />
            </Routes>
            <Footer handleWhatsAppClick={handleWhatsAppClick} />
            <AudioControls />
            <ScrollToTop />
          </Router>
        </ThemeProvider>
      </IntlProvider>
    </HelmetProvider>
  );
};

export default App;
