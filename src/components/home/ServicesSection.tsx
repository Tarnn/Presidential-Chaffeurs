import React from "react";
import {
  Typography,
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FormattedMessage } from "react-intl";
import mediaConfig from "../../config/media.json";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlightIcon from "@mui/icons-material/Flight";
import EventIcon from "@mui/icons-material/Event";
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: -20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: '#D0A42B',
        '&:hover': {
          color: '#FFFFFF',
        },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        left: -20,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 2,
        color: '#D0A42B',
        '&:hover': {
          color: '#FFFFFF',
        },
      }}
    >
      <ArrowBackIosIcon />
    </IconButton>
  );
};

const services = [
  {
    titleId: "services.executive.title",
    descriptionId: "services.executive.description",
    icon: <DirectionsCarIcon sx={{ fontSize: "2rem" }} />,
    image: (mediaConfig as any).images.placeholders.servicesSection
      .executiveChauffeur as string,
    link: "/services",
  },
  {
    titleId: "services.airport.title",
    descriptionId: "services.airport.description",
    icon: <FlightIcon sx={{ fontSize: "2rem" }} />,
    image: (mediaConfig as any).images.placeholders.servicesSection
      .airportTransfers as string,
    link: "/services",
  },
  {
    titleId: "services.wedding.title",
    descriptionId: "services.wedding.description",
    icon: <CelebrationIcon sx={{ fontSize: "2rem" }} />,
    image: (mediaConfig as any).images.placeholders.servicesSection
      .weddings as string,
    link: "/services",
  },
  {
    titleId: "services.event.title",
    descriptionId: "services.event.description",
    icon: <EventIcon sx={{ fontSize: "2rem" }} />,
    image: (mediaConfig as any).images.placeholders.servicesSection
      .events as string,
    link: "/services",
  },
];

const ServicesSection: React.FC = () => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box sx={{ backgroundColor: "#1a1a1a", py: 8 }}>
      <Container>
        <Typography
          variant="h4"
          sx={{ 
            mb: 3, 
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            fontWeight: 700 
          }}
        >
          <FormattedMessage id="services.title" />
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#FFFFFF",
            mb: 6,
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
            lineHeight: 1.8,
          }}
        >
          <FormattedMessage id="services.description" />
        </Typography>
        <Box sx={{ mx: -2 }}>
          <Slider {...settings}>
            {services.map((service, index) => (
              <Box key={index} sx={{ px: 2, height: 550 }}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  style={{ height: "100%" }}
                >
                  <Card
                    sx={{
                      backgroundColor: "#2a2a2a",
                      color: "#FFFFFF",
                      border: "1px solid #D0A42B",
                      borderRadius: 2,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height={250}
                      image={service.image}
                      alt={service.titleId}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        p: 3,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        height: 300,
                      }}
                    >
                      <Box sx={{ mb: "auto" }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          <FormattedMessage id={service.titleId} />
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mb: 3,
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 6,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          <FormattedMessage id={service.descriptionId} />
                        </Typography>
                      </Box>
                      <RouterLink
                        to={service.link}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#D0A42B",
                            fontWeight: 500,
                            width: "fit-content",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              color: "#FFFFFF",
                              textDecoration: "underline",
                            },
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <FormattedMessage id="common.learnMore" />
                        </Typography>
                      </RouterLink>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;
