import React, { useState, useEffect } from "react";
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
import { motion, useAnimation } from "framer-motion";
import { FormattedMessage } from "react-intl";
import mediaConfig from "../../config/media.json";

type Locale = "en" | "fr" | "hi" | "pa" | "es" | "zh";

interface NavbarProps {
  locale: Locale;
  onLanguageChange: (lang: Locale) => void;
}

// Custom component to capitalize navigation links with animated underline
const CapitalizedNavLink: React.FC<{ id: string }> = ({ id }) => {
  return (
    <span style={{ textTransform: 'uppercase', position: 'relative' }}>
      <FormattedMessage id={id} />
    </span>
  );
};

// Custom styled nav button with animated underline
const NavButton: React.FC<{ to: string; id: string; onClick: () => void }> = ({ to, id, onClick }) => {
  return (
    <Button 
      component={Link} 
      to={to} 
      onClick={onClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: '#D0A42B',
          transform: 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        },
        '&:hover::after': {
          transform: 'translateX(0)',
        }
      }}
    >
      <motion.span
        whileHover={{ color: "#D0A42B" }}
        transition={{ duration: 0.3 }}
        style={{ color: "#FFFFFF" }}
      >
        <CapitalizedNavLink id={id} />
      </motion.span>
    </Button>
  );
};

// Custom styled menu item with animated underline for mobile
const NavMenuItem: React.FC<{ to: string; id: string; onClick: () => void }> = ({ to, id, onClick }) => {
  return (
    <MenuItem 
      component={Link} 
      to={to} 
      onClick={onClick}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: '#D0A42B',
          transform: 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        },
        '&:hover::after': {
          transform: 'translateX(0)',
        },
        '@media (max-width: 400px)': {
          padding: '8px 12px',
          fontSize: '0.9rem',
        }
      }}
    >
      <CapitalizedNavLink id={id} />
    </MenuItem>
  );
};

const Navbar: React.FC<NavbarProps> = ({ locale, onLanguageChange }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const logoControls = useAnimation();

  // Function to handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial animation to fade in the logo
    logoControls.start({ opacity: 1, transition: { duration: 0.8 } });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [logoControls]);

  // Function to scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
        px: { xs: 1, sm: 4, md: 6 },
        maxWidth: "1600px",
        width: "100%",
        margin: "0 auto",
        '@media (max-width: 400px)': {
          padding: '8px 12px',
        }
      }}>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <Box sx={{
              '@media (max-width: 400px)': {
                '& img': {
                  height: `${scrolled ? "40px" : "50px"} !important`
                }
              }
            }}>
              <motion.img
                src={logoUrl}
                alt="Logo"
                initial={{ opacity: 0 }}
                animate={logoControls}
                style={{ 
                  height: scrolled ? "60px" : "80px",
                  width: "auto",
                  verticalAlign: "middle",
                  transition: "height 0.3s ease"
                }}
              />
            </Box>
          </Typography>
        </Link>
        <Box sx={{ 
          display: "flex", 
          alignItems: "center",
          gap: { xs: 0.5, sm: 1, md: 2 },
          '@media (max-width: 400px)': {
            gap: '4px',
          }
        }}>
          <Box sx={{ 
            display: { xs: "none", md: "flex" },
            gap: 1.5,
            alignItems: "center"
          }}>
            <NavButton to="/" id="nav.aboutUs" onClick={scrollToTop} />
            <NavButton to="/services" id="nav.services" onClick={scrollToTop} />
            <NavButton to="/vehicles" id="nav.fleet" onClick={scrollToTop} />
            <NavButton to="/gallery" id="nav.gallery" onClick={scrollToTop} />
          </Box>
          <IconButton
            edge="end"
            sx={{ 
              ml: { xs: 1, sm: 2 },
              '@media (max-width: 400px)': {
                marginLeft: '4px',
                padding: '8px',
              }
            }}
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
              sx: { 
                backgroundColor: "#2a2a2a", 
                color: "#D0A42B",
                '@media (max-width: 400px)': {
                  minWidth: '120px',
                }
              },
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
              sx={{
                '@media (max-width: 400px)': {
                  padding: '8px',
                }
              }}
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
          PaperProps={{
            sx: { 
              backgroundColor: "#2a2a2a", 
              color: "#FFFFFF",
              '@media (max-width: 400px)': {
                minWidth: '150px',
              }
            },
          }}
        >
          <NavMenuItem 
            to="/" 
            id="nav.aboutUs" 
            onClick={() => {
              handleCloseNavMenu();
              scrollToTop();
            }}
          />
          <NavMenuItem 
            to="/services" 
            id="nav.services" 
            onClick={() => {
              handleCloseNavMenu();
              scrollToTop();
            }}
          />
          <NavMenuItem 
            to="/vehicles" 
            id="nav.fleet" 
            onClick={() => {
              handleCloseNavMenu();
              scrollToTop();
            }}
          />
          <NavMenuItem 
            to="/gallery" 
            id="nav.gallery" 
            onClick={() => {
              handleCloseNavMenu();
              scrollToTop();
            }}
          />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 