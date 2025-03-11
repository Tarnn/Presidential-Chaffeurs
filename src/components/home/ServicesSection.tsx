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
import { motion, useAnimation } from "framer-motion";
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
import { useInView } from 'react-intersection-observer';
import AnimatedTypography from "../common/AnimatedTypography";

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

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

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
    <Box component="section" sx={{ py: 8, backgroundColor: "#1a1a1a" }}>
      <Container maxWidth="lg">
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
          sx={{ textAlign: "center", mb: 6 }}
        >
          <motion.div variants={textVariants}>
            <AnimatedTypography
              variant="h3"
              component="h2"
              fadeDelay={0}
              fadeDuration={0.6}
              fadeDirection="up"
              sx={{
                fontWeight: "bold",
                color: "white",
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              <FormattedMessage id="services.title" defaultMessage="Our Services" />
            </AnimatedTypography>
          </motion.div>

          <motion.div variants={textVariants}>
            <AnimatedTypography
              variant="h6"
              fadeDelay={0.2}
              fadeDuration={0.6}
              fadeDirection="up"
              sx={{
                color: "#D0A42B",
                mb: 4,
                maxWidth: "800px",
                mx: "auto",
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              }}
            >
              <FormattedMessage
                id="services.subtitle"
                defaultMessage="Tailored to your needs"
              />
            </AnimatedTypography>
          </motion.div>

          <motion.div variants={textVariants}>
            <AnimatedTypography
              variant="body1"
              fadeDelay={0.4}
              fadeDuration={0.6}
              fadeDirection="up"
              sx={{
                color: "white",
                maxWidth: "900px",
                mx: "auto",
                mb: 6,
                lineHeight: 1.8,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              }}
            >
              <FormattedMessage id="services.description" />
            </AnimatedTypography>
          </motion.div>
        </Box>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <Slider {...settings}>
            {services.map((service, index) => (
              <Box key={index} sx={{ p: 1, height: 500 }}>
                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#262626",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 20px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.image}
                      alt={service.titleId}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        height: 260,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          height: 40,
                        }}
                      >
                        {service.icon}
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{
                            fontWeight: "bold",
                            color: "white",
                            ml: 1,
                            fontSize: { xs: '1.1rem', sm: '1.25rem' },
                            lineHeight: 1.2,
                          }}
                        >
                          <FormattedMessage
                            id={service.titleId}
                            defaultMessage={service.titleId}
                          />
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#cccccc",
                          mb: 2,
                          flexGrow: 1,
                          height: 160,
                          overflow: 'auto',
                          fontSize: { xs: '0.875rem', sm: '0.875rem' },
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 7,
                          textOverflow: 'ellipsis',
                          overflowY: 'hidden',
                        }}
                      >
                        <FormattedMessage
                          id={service.descriptionId}
                          defaultMessage={service.descriptionId}
                        />
                      </Typography>
                      <Box
                        component={RouterLink}
                        to={service.link}
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          color: "#D0A42B",
                          textDecoration: "none",
                          fontWeight: "bold",
                          mt: 'auto',
                          height: 24,
                          "&:hover": {
                            textDecoration: "underline",
                          },
                        }}
                      >
                        <FormattedMessage
                          id="common.learnMore"
                          defaultMessage="Learn More"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Slider>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ServicesSection;
