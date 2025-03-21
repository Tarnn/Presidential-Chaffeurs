import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Alert,
  Modal,
  IconButton,
  CircularProgress,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Slider from "react-slick";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import axios, { AxiosError } from "axios";
import { Vehicle } from "../types";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage, useIntl } from "react-intl";
import { sendInquiry } from "../utils/api";

// Create a context to track global submission state
interface SubmissionContextType {
  anySubmitted: boolean;
  setAnySubmitted: (value: boolean) => void;
}

export const SubmissionContext = createContext<SubmissionContextType>({
  anySubmitted: false,
  setAnySubmitted: () => {},
});

// Provider component for the submission context
export const SubmissionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [anySubmitted, setAnySubmitted] = useState(false);
  
  return (
    <SubmissionContext.Provider value={{ anySubmitted, setAnySubmitted }}>
      {children}
    </SubmissionContext.Provider>
  );
};

interface VehicleCardProps {
  vehicle: Vehicle;
}

// Wrapper component that provides the reCAPTCHA context
const VehicleCardWithReCaptcha: React.FC<VehicleCardProps> = (props) => {
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  if (!recaptchaSiteKey) {
    return <VehicleCard {...props} />;
  }
  
  return (
    <GoogleReCaptchaProvider reCaptchaKey={recaptchaSiteKey}>
      <VehicleCard {...props} />
    </GoogleReCaptchaProvider>
  );
};

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const intl = useIntl();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { anySubmitted, setAnySubmitted } = useContext(SubmissionContext);
  const isMobile = useMediaQuery('(max-width:1000px)');
  
  const [formData, setFormData] = useState<{ purpose: string; date: string; description: string; email: string }>({
    purpose: "",
    date: "",
    description: "",
    email: ""
  });
  const [formErrors, setFormErrors] = useState<{ purpose: boolean; date: boolean; description: boolean; email: boolean }>({
    purpose: false,
    date: false,
    description: false,
    email: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [heicSupported, setHeicSupported] = useState<boolean | null>(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("info");

  // For touch gestures
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Get current date in YYYY-MM-DD format for date input min attribute
  const today = new Date().toISOString().split('T')[0];

  // Check if browser supports HEIC format
  useEffect(() => {
    const checkHeicSupport = () => {
      // Most browsers don't support HEIC natively
      // This is a simplified check that assumes most browsers don't support HEIC
      const userAgent = navigator.userAgent.toLowerCase();
      // Safari on iOS 11+ and macOS High Sierra+ has some HEIC support
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
      const isMac = /mac/i.test(userAgent);
      const isIOS = /iphone|ipad|ipod/i.test(userAgent);
      
      setHeicSupported(isSafari && (isMac || isIOS));
    };
    
    checkHeicSupport();
  }, []);

  // Check if email has been submitted for this vehicle
  useEffect(() => {
    const checkSubmissionStatus = () => {
      try {
        const submittedVehicles = localStorage.getItem('submittedVehicles');
        if (submittedVehicles) {
          const vehicleIds = JSON.parse(submittedVehicles);
          if (Array.isArray(vehicleIds) && vehicleIds.includes(vehicle.id)) {
            setEmailSubmitted(true);
            setAnySubmitted(true);
          }
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
      }
    };
    
    checkSubmissionStatus();
  }, [vehicle.id, setAnySubmitted]);

  // Function to handle input changes and clear validation errors
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    // Clear the error for this field as the user is fixing it
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: false });
      
      // If all errors are cleared, hide the error alert
      const updatedErrors = { ...formErrors, [field]: false };
      if (!Object.values(updatedErrors).some(Boolean)) {
        setShowError(false);
      }
    }
  };

  // Function to show a snackbar notification
  const showNotification = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Function to handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to get appropriate image URL based on file extension
  const getImageUrl = (url: string) => {
    // If the URL is already from the S3 bucket, try JPEG first
    if (url.includes('presidential-chaffeurs.s3.us-east-2.amazonaws.com')) {
      const baseUrl = url.substring(0, url.lastIndexOf('.'));
      // Always try JPEG first
      if (!url.endsWith('.jpeg')) {
        return `${baseUrl}.jpeg`;
      }
      return url;
    }
    // For local URLs, convert them to S3 URLs and ensure JPEG extension
    const filename = url.split('/').pop();
    if (filename) {
      const baseFilename = filename.substring(0, filename.lastIndexOf('.'));
      return `https://presidential-chaffeurs.s3.us-east-2.amazonaws.com/${baseFilename}.jpeg`;
    }
    return url;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    adaptiveHeight: false,
    accessibility: true,
    focusOnSelect: false,
    swipe: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  const handleImageClick = (imageUrl: string, index: number) => {
    // Don't open modal for mobile screens
    if (isMobile) {
      return;
    }
    setCurrentImage(imageUrl);
    setCurrentImageIndex(index);
    setImageLoading(true);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % vehicle.photos.length;
    setImageLoading(true);
    setCurrentImageIndex(nextIndex);
    setCurrentImage(getImageUrl(vehicle.photos[nextIndex]));
  };

  const handlePrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + vehicle.photos.length) % vehicle.photos.length;
    setImageLoading(true);
    setCurrentImageIndex(prevIndex);
    setCurrentImage(getImageUrl(vehicle.photos[prevIndex]));
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalOpen) return;
      
      switch (e.key) {
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'ArrowLeft':
          handlePrevImage();
          break;
        case 'Escape':
          handleCloseModal();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, currentImageIndex]);

  // Handle touch gestures for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    // Minimum swipe distance (in pixels)
    const minSwipeDistance = 50;
    const swipeDistance = touchEndX.current - touchStartX.current;
    
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped right, go to previous image
        handlePrevImage();
      } else {
        // Swiped left, go to next image
        handleNextImage();
      }
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If already submitted, don't allow resubmission
    if (emailSubmitted || anySubmitted) {
      return;
    }
    
    // Validate form
    const errors = {
      purpose: !formData.purpose,
      date: !formData.date || new Date(formData.date) < new Date(),
      description: !formData.description,
      email: !formData.email || !validateEmail(formData.email),
    };
    
    setFormErrors(errors);
    
    if (Object.values(errors).some(Boolean)) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Get reCAPTCHA token
      let token;
      
      // For testing in development, use a test token
      if (import.meta.env.DEV && import.meta.env.VITE_USE_TEST_TOKEN === 'true') {
        console.log('Using test token in development mode');
        token = 'TESTING_TOKEN';
      } else if (executeRecaptcha) {
        try {
          console.log('Executing reCAPTCHA with action: vehicleInquiry');
          // Execute reCAPTCHA with action
          token = await executeRecaptcha('vehicleInquiry');
          console.log('reCAPTCHA token obtained successfully');
        } catch (recaptchaError) {
          console.error('reCAPTCHA execution error:', recaptchaError);
          // Show non-intrusive notification instead of alert
          showNotification(intl.formatMessage({ id: "vehiclePage.captchaError" }), "error");
          setIsSubmitting(false);
          return;
        }
      } else {
        // If executeRecaptcha is not available, log error but don't show alert
        console.error('reCAPTCHA is not properly configured: executeRecaptcha is undefined');
        setIsSubmitting(false);
        return;
      }
      
      // Only proceed if we have a valid token
      if (!token) {
        console.error('Failed to obtain reCAPTCHA token');
        showNotification(intl.formatMessage({ id: "vehiclePage.captchaError" }), "error");
        setIsSubmitting(false);
        return;
      }
      
      console.log(`Sending inquiry with token (length: ${token.length})`);
      
      try {
        // Send form data with token to server using our API utility
        const response = await sendInquiry({
          vehicleId: vehicle.id,
          vehicleName: vehicle.name,
          purpose: formData.purpose,
          date: formData.date,
          description: formData.description,
          email: formData.email,
          captchaToken: token,
        });
        
        console.log('Inquiry submitted successfully:', response);
        showNotification(intl.formatMessage({ id: "vehiclePage.submitSuccess" }), "success");
        
        // Mark this vehicle as submitted in localStorage
        try {
          const submittedVehicles = localStorage.getItem('submittedVehicles');
          let vehicleIds = submittedVehicles ? JSON.parse(submittedVehicles) : [];
          if (!Array.isArray(vehicleIds)) vehicleIds = [];
          
          if (!vehicleIds.includes(vehicle.id)) {
            vehicleIds.push(vehicle.id);
            localStorage.setItem('submittedVehicles', JSON.stringify(vehicleIds));
          }
          
          // Update state to reflect submission
          setEmailSubmitted(true);
          // Update global submission state
          setAnySubmitted(true);
        } catch (storageError) {
          console.error('Error saving submission status:', storageError);
        }
        
        setFormData({ purpose: "", date: "", description: "", email: "" });
        setFormErrors({ purpose: false, date: false, description: false, email: false });
        setShowError(false);
      } catch (apiError: any) {
        console.error('Form submission error:', apiError);
        
        // Extract detailed error message if available
        let errorMessage = intl.formatMessage({ id: "vehiclePage.submitError" });
        if (apiError.response && apiError.response.data && apiError.response.data.error) {
          console.error('API error details:', apiError.response.data);
          errorMessage += ` (${apiError.response.data.error})`;
        }
        
        setShowError(true);
        showNotification(errorMessage, "error");
      }
    } catch (error) {
      console.error('Unexpected error during form submission:', error);
      setShowError(true);
      showNotification(intl.formatMessage({ id: "vehiclePage.submitError" }), "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height: '100%', display: 'flex' }}
    >
      <Card sx={{ 
        backgroundColor: "#2a2a2a",
        color: "white",
        border: "1px solid #D0A42B",
        borderRadius: 2,
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        overflow: 'hidden',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px)',
          transition: 'all 0.3s ease'
        },
        opacity: anySubmitted && !emailSubmitted ? 0.7 : 1,
        filter: anySubmitted && !emailSubmitted ? 'grayscale(50%)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <Slider {...sliderSettings}>
          {vehicle.photos
            .sort((a, b) => {
              // Sort JPEG files first
              const aIsJpeg = a.toLowerCase().endsWith('.jpeg');
              const bIsJpeg = b.toLowerCase().endsWith('.jpeg');
              if (aIsJpeg && !bIsJpeg) return -1;
              if (!aIsJpeg && bIsJpeg) return 1;
              return 0;
            })
            .map((photo, index) => (
              <div 
                key={`${vehicle.id}-${photo}-${index}`} 
                onClick={() => handleImageClick(getImageUrl(photo), index)}
                style={{ cursor: isMobile ? 'default' : 'pointer' }}
                role="tabpanel"
                aria-roledescription="slide"
                aria-label={`${vehicle.name} image ${index + 1} of ${vehicle.photos.length}`}
              >
                <img
                  src={getImageUrl(photo)}
                  alt={`${vehicle.name} ${index + 1} of ${vehicle.photos.length}`}
                  style={{ 
                    width: "100%", 
                    height: "250px", 
                    objectFit: "cover", 
                    cursor: isMobile ? 'default' : 'pointer',
                    transition: "transform 0.3s ease",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const currentSrc = target.src;
                    const baseUrl = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                    
                    // If JPEG fails, try WebP
                    if (!currentSrc.endsWith('.webp')) {
                      target.src = `${baseUrl}.webp`;
                      return;
                    }
                    
                    // If WebP fails, try HEIC
                    if (!currentSrc.endsWith('.heic')) {
                      target.src = `${baseUrl}.heic`;
                      return;
                    }
                    
                    // If all formats fail, use the logo
                    target.src = '/logo.png';
                  }}
                  loading="lazy"
                  tabIndex={-1}
                />
              </div>
            ))}
        </Slider>
        <CardContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          p: 2.5,
          justifyContent: 'space-between'
        }}>
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 1, 
              color: '#D0A42B',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              minHeight: '32px' // Ensure consistent height for titles
            }}>
              {vehicle.id === 1 ? (
                <FormattedMessage id="vehicle.cullinan.name" defaultMessage={vehicle.name} />
              ) : vehicle.id === 2 ? (
                <FormattedMessage id="vehicle.ghost.name" defaultMessage={vehicle.name} />
              ) : vehicle.id === 3 ? (
                <FormattedMessage id="vehicle.phantom.name" defaultMessage={vehicle.name} />
              ) : vehicle.id === 4 ? (
                <FormattedMessage id="vehicle.maybach.name" defaultMessage={vehicle.name} />
              ) : vehicle.id === 5 ? (
                <FormattedMessage id="vehicle.silverarrow.name" defaultMessage={vehicle.name} />
              ) : (
                vehicle.name
              )}
            </Typography>
            <Typography variant="body2" sx={{ 
              mb: 1, 
              flexGrow: 1,
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: 1.6,
              minHeight: '80px' // Ensure consistent height for descriptions
            }}>
              {vehicle.id === 1 ? (
                <FormattedMessage id="vehicle.cullinan.description" defaultMessage={vehicle.description} />
              ) : vehicle.id === 2 ? (
                <FormattedMessage id="vehicle.ghost.description" defaultMessage={vehicle.description} />
              ) : vehicle.id === 3 ? (
                <FormattedMessage id="vehicle.phantom.description" defaultMessage={vehicle.description} />
              ) : vehicle.id === 4 ? (
                <FormattedMessage id="vehicle.maybach.description" defaultMessage={vehicle.description} />
              ) : vehicle.id === 5 ? (
                <FormattedMessage id="vehicle.silverarrow.description" defaultMessage={vehicle.description} />
              ) : (
                vehicle.description
              )}
            </Typography>
            <Typography variant="body1" sx={{ 
              fontWeight: 'bold', 
              color: '#D0A42B', 
              mb: 2,
              fontSize: '1.1rem'
            }}>
              <FormattedMessage 
                id="vehiclePage.ratePerDay" 
                defaultMessage="Rate: Contact for pricing" 
              />
            </Typography>
          </Box>
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {showError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {intl.formatMessage({ id: "vehiclePage.submitError" })}
              </Alert>
            )}
            <TextField
              label={intl.formatMessage({ id: "vehiclePage.purposeLabel" })}
              fullWidth
              value={formData.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              disabled={anySubmitted}
              error={formErrors.purpose}
              helperText={formErrors.purpose ? intl.formatMessage({ id: "vehiclePage.requiredField" }) || "This field is required" : ""}
              sx={{
                mb: 2,
                input: { color: "white" },
                label: { color: formErrors.purpose ? "error.main" : "#D0A42B" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: formErrors.purpose ? "error.main" : "#D0A42B" },
                },
                "& .MuiFormHelperText-root": {
                  color: "error.main"
                }
              }}
            />
            <TextField
              label={intl.formatMessage({ id: "vehiclePage.emailLabel", defaultMessage: "Your Email" })}
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={anySubmitted}
              error={formErrors.email}
              helperText={formErrors.email ? intl.formatMessage({ id: "vehiclePage.emailError", defaultMessage: "Please enter a valid email address" }) : ""}
              placeholder={intl.formatMessage({ id: "vehiclePage.emailPlaceholder", defaultMessage: "Enter your email address" })}
              sx={{
                mb: 2,
                input: { color: "white" },
                label: { color: formErrors.email ? "error.main" : "#D0A42B" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: formErrors.email ? "error.main" : "#D0A42B" },
                },
                "& .MuiFormHelperText-root": {
                  color: "error.main"
                }
              }}
            />
            <TextField
              label={intl.formatMessage({ id: "vehiclePage.descriptionLabel" })}
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={anySubmitted}
              error={formErrors.description}
              helperText={formErrors.description ? intl.formatMessage({ id: "vehiclePage.requiredField" }) : ""}
              placeholder={intl.formatMessage({ id: "vehiclePage.descriptionPlaceholder", defaultMessage: "Tell us more about your requirements" })}
              sx={{
                mb: 2,
                textarea: { color: "white" },
                label: { color: formErrors.description ? "error.main" : "#D0A42B" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: formErrors.description ? "error.main" : "#D0A42B" },
                },
                "& .MuiFormHelperText-root": {
                  color: "error.main"
                }
              }}
            />
            <TextField
              label={intl.formatMessage({ id: "vehiclePage.dateLabel" })}
              type="date"
              fullWidth
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              disabled={anySubmitted}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              error={formErrors.date}
              helperText={formErrors.date ? intl.formatMessage({ id: "vehiclePage.dateError" }) || "Please select a valid future date" : ""}
              sx={{
                mb: 2,
                input: { color: "white" },
                label: { color: formErrors.date ? "error.main" : "#D0A42B" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: formErrors.date ? "error.main" : "#D0A42B" },
                },
                "& .MuiFormHelperText-root": {
                  color: "error.main"
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting || emailSubmitted || (anySubmitted && !emailSubmitted)}
              sx={{
                mt: 2,
                py: 1.2,
                background: emailSubmitted 
                  ? "linear-gradient(45deg, #4CAF50, #388E3C)" 
                  : "linear-gradient(45deg, #D0A42B, #B08A23)",
                color: "#000000",
                fontWeight: "bold",
                letterSpacing: "0.5px",
                border: "none",
                boxShadow: emailSubmitted 
                  ? "0 4px 8px rgba(76, 175, 80, 0.3)" 
                  : "0 4px 8px rgba(176, 138, 35, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: emailSubmitted 
                    ? "linear-gradient(45deg, #43A047, #2E7D32)" 
                    : "linear-gradient(45deg, #C09A25, #A07A1E)",
                  boxShadow: emailSubmitted 
                    ? "0 6px 12px rgba(76, 175, 80, 0.4)" 
                    : "0 6px 12px rgba(176, 138, 35, 0.4)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: emailSubmitted 
                    ? "linear-gradient(45deg, #4CAF50, #388E3C)" 
                    : anySubmitted ? "#5a5a5a" : "#5a5a5a",
                  color: emailSubmitted ? "#000000" : "#aaaaaa",
                  opacity: emailSubmitted ? 1 : 0.7,
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : emailSubmitted ? (
                <FormattedMessage id="vehiclePage.emailSubmitted" defaultMessage="Email Submitted!" />
              ) : (
                <FormattedMessage id="vehiclePage.requestService" defaultMessage="Request Chauffeur Service" />
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Image Modal with Carousel */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="vehicle-image-modal"
        aria-describedby="enlarged view of vehicle image"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 1,
            borderRadius: 2,
            outline: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.7)',
              },
              zIndex: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
          
          <Box 
            sx={{ position: 'relative', width: '100%', height: '100%' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {imageLoading && (
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: '300px',
                  minWidth: '300px'
                }}
              >
                <CircularProgress sx={{ color: '#D0A42B' }} />
              </Box>
            )}
            
            <img
              src={currentImage}
              alt={vehicle.name}
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                display: imageLoading ? 'none' : 'block',
                margin: '0 auto',
              }}
              onLoad={() => setImageLoading(false)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const currentSrc = target.src;
                const baseUrl = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                
                // If JPEG fails, try WebP
                if (!currentSrc.endsWith('.webp')) {
                  target.src = `${baseUrl}.webp`;
                  return;
                }
                
                // If WebP fails, try HEIC
                if (!currentSrc.endsWith('.heic')) {
                  target.src = `${baseUrl}.heic`;
                  return;
                }
                
                // If all formats fail, use the logo
                target.src = '/logo.png';
              }}
            />
            
            {/* Navigation Buttons */}
            {vehicle.photos.length > 1 && (
              <>
                <IconButton
                  aria-label="previous image"
                  onClick={handlePrevImage}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <NavigateBeforeIcon fontSize="large" />
                </IconButton>
                
                <IconButton
                  aria-label="next image"
                  onClick={handleNextImage}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                    },
                  }}
                >
                  <NavigateNextIcon fontSize="large" />
                </IconButton>
              </>
            )}
          </Box>
          
          {/* Image Counter */}
          {vehicle.photos.length > 1 && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'white', 
                mt: 1, 
                bgcolor: 'rgba(0, 0, 0, 0.5)', 
                px: 2, 
                py: 0.5, 
                borderRadius: 1 
              }}
            >
              {currentImageIndex + 1} / {vehicle.photos.length}
            </Typography>
          )}
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </motion.div>
  );
};

export default VehicleCardWithReCaptcha;
