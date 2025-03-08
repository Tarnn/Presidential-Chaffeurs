import React from "react";
import { Typography, Box, Container } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StarIcon from "@mui/icons-material/Star";

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
    text: "We booked with Presidential chauffeurs for a business meeting with a client. I would like to thank Joe and the team for a fabulous evening, the service was delivered with utmost professionalism.",
    author: "Nb Exquisite Designs",
    date: "7 Feb 2025",
    rating: 5,
  },
  {
    id: 2,
    text: "We hired Presidential Chauffeurs and their Mercedes Landjet for our airport transfer from South Wales to Heathrow. The experience was seamless and luxurious.",
    author: "Rowan Evans",
    date: "30 Dec 2024",
    rating: 5,
  },
  {
    id: 3,
    text: "Very professional service can honestly say out of all the chauffeur companies I have used over the years this one was outstanding with a beautiful vehicle and attentive staff.",
    author: "Lisa Wellman",
    date: "11 Nov 2024",
    rating: 5,
  },
  {
    id: 4,
    text: "The team provided an exceptional ride for my wedding. The attention to detail and punctuality were beyond expectations.",
    author: "Michael Chen",
    date: "15 Oct 2024",
    rating: 4,
  },
  {
    id: 5,
    text: "Reliable and discreet service for our corporate event. Highly recommend Presidential Chauffeurs to anyone needing top-tier transport.",
    author: "Emma Thompson",
    date: "20 Sep 2024",
    rating: 5,
  },
  {
    id: 6,
    text: "A fantastic experience with the Rolls-Royce fleet. The driver was courteous and made our trip to the gala memorable.",
    author: "David Lee",
    date: "5 Aug 2024",
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
  return (
    <Box sx={{ backgroundColor: "#2a2a2a", py: 8 }}>
      <Container>
        {/* Header and Subheader */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#D0A42B", // Gold color for the title
            mb: 2,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Trusted by the Elite
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "#FFFFFF",
            mb: 6,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          We are proud to be entrusted by leading business executives,
          celebrated athletes, and entertainment industry icons. Our commitment
          to discretion and professionalism ensures their trust in every
          journey.
        </Typography>

        {/* Testimonials Slider with Custom Styles */}
        <Box sx={{ maxWidth: "1000px", mx: "auto", mb: 1 }}>
          {" "}
          {/* Further reduced mb to 1 */}
          <style>{customSliderStyles}</style> {/* Inject custom CSS */}
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial) => (
              <Box
                key={testimonial.id}
                sx={{
                  p: 3,
                  textAlign: "center",
                  color: "#FFFFFF",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  mx: 1, // Reduced mx to avoid overlap with custom margin
                  height: "300px", // Fixed height to ensure uniform size
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Ensures content is evenly distributed
                }}
              >
                {/* Reviewer Info */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#2a2a2a", mr: 1 }}
                  >
                    {testimonial.author}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#888" }}>
                    {testimonial.date}
                  </Typography>
                </Box>

                {/* Star Rating */}
                <Box sx={{ display: "flex", mb: 2, justifyContent: "center" }}>
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <StarIcon
                      key={index}
                      sx={{ color: "#D0A42B", fontSize: 20 }}
                    />
                  ))}
                </Box>

                {/* Testimonial Text */}
                <Typography
                  variant="body2"
                  sx={{
                    color: "#2a2a2a",
                    mb: 2,
                    flexGrow: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 4, // Limit to 4 lines
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {testimonial.text}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Google Rating Footer */}
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "#FFFFFF", mt: 0 }} // Reduced mt to 0
        >
          Google rating score: 5.0 of 5, based on 20 reviews
        </Typography>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
