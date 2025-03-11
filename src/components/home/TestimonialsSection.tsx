import React from "react";
import { Typography, Box, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@mui/icons-material/Star";
import GoogleIcon from "@mui/icons-material/Google";
import { FormattedMessage } from "react-intl";
import { motion, useAnimation } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import AnimatedTypography from "../common/AnimatedTypography";

// Custom CSS to control spacing and height
const customSliderStyles = `
  .slick-slide {
    margin: 0 10px; /* Adds 10px spacing on both sides of each slide */
  }
  .slick-list {
    margin: 0 -10px; /* Counteracts the margin to keep the slider centered */
  }
  .slick-track {
    display: flex; /* Ensures all slides align properly */
    align-items: stretch; /* Makes slides the same height */
  }
  .slick-slider {
    padding-bottom: 0; /* Remove extra padding at the bottom */
  }
`;

const testimonials = [
  {
    id: 1,
    text: "Presidential Chauffeurs exceeded all expectations during our corporate roadshow. Their attention to detail, punctuality, and the immaculate Rolls-Royce made a lasting impression on our international clients. The chauffeur's professionalism and discretion were exemplary.",
    author: "Sarah-Thompson",
    date: "15 Feb 2025",
    rating: 5,
  },
  {
    id: 2,
    text: "As a frequent business traveler, I've experienced luxury car services worldwide. Presidential Chauffeurs stands out with their Mercedes Landjet's exceptional comfort and their chauffeurs' unparalleled service. They've become my exclusive choice for all Greater Toronto Area transportation.",
    author: "Michael Chen-Williams",
    date: "30 Jan 2025",
    rating: 5,
  },
  {
    id: 3,
    text: "Our wedding day was made even more special thanks to Presidential Chauffeurs. The vintage Rolls-Royce was stunning, and our chauffeur went above and beyond, ensuring everything was perfect. The red carpet service truly made us feel like royalty.",
    author: "Surmi Patel",
    date: "22 Dec 2024",
    rating: 5,
  },
  {
    id: 4,
    text: "For our annual charity gala, we needed a service that could handle VIP transportation with the utmost discretion and elegance. Presidential Chauffeurs delivered flawlessly, coordinating multiple luxury vehicles and providing impeccable service throughout the evening.",
    author: "Manny Singh",
    date: "15 Nov 2024",
    rating: 5,
  },
  {
    id: 5,
    text: "The level of sophistication and attention to detail is unmatched. From the moment I was greeted at Toronto Pearson International Airport to my various appointments in Toronto, the service was consistently exceptional. Their Bentley fleet is immaculate, and the chauffeurs are incredibly knowledgeable.",
    author: "Victoria Kim-Martinez",
    date: "28 Oct 2024",
    rating: 5,
  },
  {
    id: 6,
    text: "Presidential Chauffeurs provided an extraordinary experience for our film premiere. Their fleet of luxury vehicles and professional chauffeurs handled our celebrity guests with perfect discretion and elegance. The service was nothing short of spectacular.",
    author: "Raj Desai",
    date: "10 Sep 2024",
    rating: 5,
  },
];

const sliderSettings = {
  dots: false, // Remove the slick-dots
  infinite: true,
  speed: 500,
  slidesToShow: 2, // Show 2 testimonials at a time on desktop and tablet
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false, // Remove the navigation arrows
  responsive: [
    {
      breakpoint: 600, // Mobile screens
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TestimonialsSection: React.FC = () => {
  // Use IntersectionObserver for the text section
  const [textRef, textInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const textControls = useAnimation();

  React.useEffect(() => {
    if (textInView) {
      textControls.start("visible");
    }
  }, [textControls, textInView]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <Box sx={{ backgroundColor: "#2a2a2a", py: 8 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        {/* Header and Subheader */}
        <Box
          ref={textRef}
          component={motion.div}
          initial="hidden"
          animate={textControls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          <motion.div variants={textVariants}>
            <AnimatedTypography
              variant="h4"
              fadeDelay={0}
              fadeDuration={0.6}
              fadeDirection="up"
              sx={{
                textAlign: "center",
                color: "#D0A42B",
                mb: 2,
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: { xs: "1.75rem", sm: "2.125rem" }
              }}
            >
              <FormattedMessage id="about.trustedByElite" />
            </AnimatedTypography>
          </motion.div>

          <motion.div variants={textVariants}>
            <AnimatedTypography
              variant="body1"
              fadeDelay={0.2}
              fadeDuration={0.6}
              fadeDirection="up"
              sx={{
                textAlign: "center",
                color: "#FFFFFF",
                mb: 6,
                maxWidth: "800px",
                mx: "auto",
                px: { xs: 1, sm: 2 }
              }}
            >
              <FormattedMessage id="about.trustedDescription" />
            </AnimatedTypography>
          </motion.div>
        </Box>

        {/* Testimonials Slider with Custom Styles */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          sx={{ 
            maxWidth: { xs: "100%", sm: "1000px" }, 
            mx: "auto", 
            mb: 1,
            px: { xs: 0, sm: 2 }
          }}
        >
          <style>{customSliderStyles}</style>
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial) => (
              <Box
                key={testimonial.id}
                sx={{
                  p: { xs: 2, sm: 2.5 },
                  textAlign: "center",
                  color: "#FFFFFF",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  mx: { xs: 0.5, sm: 1 },
                  height: { xs: "280px", sm: "260px" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Reviewer Info */}
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  mb: 1.5,
                  gap: 1
                }}>
                  <GoogleIcon sx={{ color: "#4285F4", fontSize: 18 }} />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#2a2a2a" }}
                  >
                    {testimonial.author}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    • {testimonial.date}
                  </Typography>
                </Box>

                {/* Star Rating */}
                <Box sx={{ display: "flex", mb: 1.5, justifyContent: "center" }}>
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <StarIcon
                      key={index}
                      sx={{ color: "#D0A42B", fontSize: 18 }}
                    />
                  ))}
                </Box>

                {/* Testimonial Text */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#2a2a2a",
                    mb: 1.5,
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    fontSize: "0.875rem",
                    lineHeight: 1.5,
                  }}
                >
                  {testimonial.text}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Google Rating Footer */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AnimatedTypography
            variant="body2"
            fadeDelay={0.4}
            fadeDuration={0.6}
            fadeDirection="up"
            sx={{ 
              textAlign: "center", 
              color: "#FFFFFF", 
              mt: 0,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: { xs: 2, sm: 0 },
              maxWidth: "100%",
              wordBreak: "break-word"
            }}
          >
            <FormattedMessage id="testimonials.googleRating" />
          </AnimatedTypography>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
