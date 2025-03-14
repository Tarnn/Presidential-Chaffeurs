import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Fade, Modal, IconButton, useMediaQuery } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '@mui/icons-material/Close';
import mediaConfig from '../config/media.json';
import galleryConfig from '../config/gallery.json';
import { AnimatedTypography, AnimatedSection } from '../components/common';

interface GalleryImage {
  id: string;
  url: string;
  type: string;
  loaded?: boolean;
}

const IMAGES_PER_PAGE = 12;

const GalleryPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:1000px)');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [displayedImages, setDisplayedImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Create a ref for the intersection observer target
  const observerTarget = useRef<HTMLDivElement>(null);

  // Add state for tracking loaded images
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Initialize images from gallery config
  useEffect(() => {
    setImages(galleryConfig.images as GalleryImage[]);
    setLoading(false);
  }, []);

  // Update displayed images based on current page
  useEffect(() => {
    const end = currentPage * IMAGES_PER_PAGE;
    setDisplayedImages(images.slice(0, end));
    setHasMore(end < images.length);
  }, [images, currentPage]);

  // Handle image load
  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set([...Array.from(prev), imageId]));
  };

  // Handle image click to open the lightbox modal
  const handleImageClick = (image: GalleryImage) => {
    if (isMobile) return;
    setCurrentImage(image);
    setImageLoading(true);
    setModalOpen(true);
  };

  // Handle closing the lightbox modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
  };

  // Handle image error fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const currentSrc = target.src;
    const imageId = currentSrc.split('/').pop()?.split('.')[0] || '';
    
    // Try different image formats in order
    for (const type of galleryConfig.imageTypes) {
      if (!currentSrc.endsWith(type)) {
        target.src = `${galleryConfig.baseUrl}/${imageId}.${type}`;
        return;
      }
    }
    
    // If all formats fail, use the fallback image
    target.src = galleryConfig.fallbackImage;
  };

  // Intersection Observer callback
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, loading]);

  // Set up the intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <Box component="section">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          width: '100%',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={mediaConfig.images.placeholders.gallery["1"]}
          alt="Gallery Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 65%',
            filter: 'brightness(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            width: '100%',
            padding: 4,
          }}
        >
          <AnimatedTypography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: "1.5rem", sm: "2.5rem", md: "3.5rem" },
              fontFamily: "Cinzel, serif",
              textTransform: 'uppercase',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2px'
            }}
            fadeDelay={0.1}
            fadeDuration={1.0}
            fadeDirection="up"
            fadeDistance={40}
          >
            <Box component="span" sx={{ color: 'white' }}>
              <FormattedMessage id="galleryPage.titleStart" />
            </Box>
            <Box component="span" sx={{ color: '#D0A42B' }}>
              <FormattedMessage id="galleryPage.titleEnd" />
            </Box>
          </AnimatedTypography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Description Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 8, 
          maxWidth: { xs: '800px', md: '1000px', lg: '1200px' }, 
          mx: 'auto',
          px: { xs: 2, md: 4 },
          position: 'relative'
        }}>
          <AnimatedTypography 
            variant="h5" 
            color="text.primary" 
            sx={{ 
              mb: 2,
              fontFamily: 'Cinzel, serif',
              fontWeight: 500,
              lineHeight: 1.5,
              fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
              width: { xs: '100%', md: '100%' },
              mx: 'auto',
              whiteSpace: { md: 'nowrap' }
            }}
            fadeDelay={0.2}
            fadeDuration={0.8}
            fadeDirection="up"
            fadeDistance={30}
          >
            <FormattedMessage id="galleryPage.description" defaultMessage="Explore our collection of memorable moments captured at real events with our valued clients." />
          </AnimatedTypography>
          <AnimatedTypography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontStyle: 'italic',
              maxWidth: '90%',
              mx: 'auto',
              fontSize: '1.1rem'
            }}
            fadeDelay={0.4}
            fadeDuration={0.8}
            fadeDirection="up"
            fadeDistance={20}
          >
            <FormattedMessage id="galleryPage.subDescription" defaultMessage="Each photo tells a story of luxury, elegance, and exceptional service." />
          </AnimatedTypography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#D0A42B' }} />
          </Box>
        ) : (
          <AnimatedSection
            delay={0.2}
            duration={0.8}
            direction="up"
            distance={30}
            staggerChildren={true}
            staggerDelay={0.1}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                },
                gap: 3,
                mb: 6,
              }}
            >
              {displayedImages.map((image, index) => (
                <Fade 
                  key={image.id}
                  in={loadedImages.has(image.id)}
                  timeout={1000}
                  style={{ 
                    transitionDelay: `${200 + (index % IMAGES_PER_PAGE) * 100}ms`,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      overflow: 'hidden',
                      borderRadius: 2,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: loadedImages.has(image.id) ? 1 : 0,
                      transform: loadedImages.has(image.id) ? 'translateY(0)' : 'translateY(20px)',
                      height: '100%',
                      position: 'relative',
                      '&:hover': {
                        transform: 'scale(1.03) translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
                        cursor: isMobile ? 'default' : 'pointer',
                        '& .media-overlay': {
                          opacity: isMobile ? 0 : 1,
                        }
                      },
                    }}
                    onClick={() => handleImageClick(image)}
                  >
                    <Box
                      component="img"
                      src={image.url}
                      alt={`Gallery image ${image.id}`}
                      onLoad={() => handleImageLoad(image.id)}
                      onError={handleImageError}
                      sx={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        }
                      }}
                      loading="lazy"
                    />
                    <Box 
                      className="media-overlay"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                        padding: '30px 15px 15px',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: 'medium',
                          textShadow: '0 1px 2px rgba(0,0,0,0.6)'
                        }}
                      >
                        <FormattedMessage 
                          id="galleryPage.clickToEnlarge"
                          defaultMessage="Click to enlarge"
                        />
                      </Typography>
                    </Box>
                  </Paper>
                </Fade>
              ))}
            </Box>
            
            {/* Intersection Observer Target */}
            {hasMore && (
              <Box
                ref={observerTarget}
                sx={{
                  width: '100%',
                  height: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mt: 4,
                }}
              >
                {loading && <CircularProgress sx={{ color: '#D0A42B' }} />}
              </Box>
            )}
          </AnimatedSection>
        )}
      </Container>

      {/* Image Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="gallery-image-modal"
        aria-describedby="enlarged view of gallery image"
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
          
          {currentImage && (
            <>
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
                src={currentImage.url}
                alt={`Gallery image ${currentImage.id}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '85vh',
                  display: imageLoading ? 'none' : 'block',
                  margin: '0 auto',
                }}
                onLoad={() => setImageLoading(false)}
                onError={handleImageError}
              />
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default GalleryPage; 