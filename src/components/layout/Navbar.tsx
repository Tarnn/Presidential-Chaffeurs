import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import mediaConfig from "../../config/media.json";

type Locale = "en" | "fr" | "hi" | "pa" | "es" | "zh";

interface NavbarProps {
  locale: Locale;
  onLanguageChange: (lang: Locale) => void;
}

const Navbar: React.FC<NavbarProps> = ({ locale, onLanguageChange }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLangChange = (lang: Locale) => {
    onLanguageChange(lang);
    handleCloseLangMenu();
  };

  const logoUrl = mediaConfig.images.logo.original;

  return (
    <AppBar position="sticky" color="secondary" sx={{ zIndex: 1200 }}>
      <Toolbar sx={{ 
        justifyContent: "space-between", 
        py: 1,
        px: { xs: 2, sm: 4, md: 6 },
        maxWidth: "1600px",
        width: "100%",
        margin: "0 auto"
      }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <img
              src={logoUrl}
              alt="Logo"
              style={{ 
                height: "65px",
                width: "auto",
                verticalAlign: "middle"
              }}
            />
          </Typography>
        </Link>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          gap: { xs: 1, md: 2 }
        }}>
          <Box sx={{ 
            display: { xs: "none", md: "flex" },
            gap: 1.5,
            alignItems: "center"
          }}>
            <Button component={Link} to="/about">
              <motion.span
                whileHover={{ color: "#D0A42B" }}
                transition={{ duration: 0.3 }}
                style={{ color: "#FFFFFF" }}
              >
                <FormattedMessage id="nav.aboutUs" />
              </motion.span>
            </Button>
            <Button component={Link} to="/services">
              <motion.span
                whileHover={{ color: "#D0A42B" }}
                transition={{ duration: 0.3 }}
                style={{ color: "#FFFFFF" }}
              >
                <FormattedMessage id="nav.services" />
              </motion.span>
            </Button>
            <Button component={Link} to="/vehicles">
              <motion.span
                whileHover={{ color: "#D0A42B" }}
                transition={{ duration: 0.3 }}
                style={{ color: "#FFFFFF" }}
              >
                <FormattedMessage id="nav.fleet" />
              </motion.span>
            </Button>
            <Button component={Link} to="/gallery">
              <motion.span
                whileHover={{ color: "#D0A42B" }}
                transition={{ duration: 0.3 }}
                style={{ color: "#FFFFFF" }}
              >
                <FormattedMessage id="nav.gallery" />
              </motion.span>
            </Button>
          </Box>
          <IconButton
            edge="end"
            sx={{ ml: 2 }}
            onClick={handleOpenLangMenu}
          >
            <motion.div
              whileHover={{ color: "#D0A42B" }}
              transition={{ duration: 0.3 }}
              style={{ color: "#FFFFFF" }}
            >
              <LanguageIcon />
            </motion.div>
          </IconButton>
          <Menu
            anchorEl={anchorElLang}
            open={Boolean(anchorElLang)}
            onClose={handleCloseLangMenu}
            PaperProps={{
              sx: { backgroundColor: "#2a2a2a", color: "#D0A42B" },
            }}
          >
            <MenuItem onClick={() => handleLangChange("en")}>English</MenuItem>
            <MenuItem onClick={() => handleLangChange("fr")}>Français</MenuItem>
            <MenuItem onClick={() => handleLangChange("hi")}>हिन्दी</MenuItem>
            <MenuItem onClick={() => handleLangChange("pa")}>ਪੰਜਾਬੀ</MenuItem>
            <MenuItem onClick={() => handleLangChange("es")}>Español</MenuItem>
            <MenuItem onClick={() => handleLangChange("zh")}>中文</MenuItem>
          </Menu>
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              edge="end"
              onClick={handleOpenNavMenu}
            >
              <motion.div
                whileHover={{ color: "#D0A42B" }}
                transition={{ duration: 0.3 }}
                style={{ color: "#FFFFFF" }}
              >
                <MenuIcon />
              </motion.div>
            </IconButton>
          </Box>
        </Box>
        {/* Mobile Hamburger Menu Dropdown */}
        <Menu
          anchorEl={anchorElNav}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          onClick={handleCloseNavMenu}
          PaperProps={{
            sx: { backgroundColor: "#2a2a2a", color: "#D0A42B" },
          }}
        >
          <MenuItem onClick={handleCloseNavMenu} component={Link} to="/about">
            <FormattedMessage id="nav.aboutUs" />
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu} component={Link} to="/services">
            <FormattedMessage id="nav.services" />
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu} component={Link} to="/vehicles">
            <FormattedMessage id="nav.fleet" />
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu} component={Link} to="/gallery">
            <FormattedMessage id="nav.gallery" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 