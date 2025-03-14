import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Fade, Modal, IconButton, useMediaQuery } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import CloseIcon from '@mui/icons-material/Close';
import mediaConfig from '../config/media.json';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { AnimatedTypography, AnimatedSection } from '../components/common';

interface S3Media {
  id: string;
  url: string;
  key: string;
  type: 'image';
  fileType: 'webp' | 'heic' | 'jpeg';
  loaded?: boolean;
}

const MEDIA_PER_PAGE = 12;
const GALLERY_PREFIX = 'gallery_';

// Initialize S3 Client
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID?.trim() || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY?.trim() || '',
  },
  maxAttempts: 3,
});

// Verify credentials before component renders
const verifyCredentials = async () => {
  const credentials = await s3Client.config.credentials();
};

verifyCredentials().catch(() => {
  // Error handled silently
});

const GalleryPage: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:1000px)');
  const [media, setMedia] = useState<S3Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [continuationToken, setContinuationToken] = useState<string | undefined>();
  
  // Add state for the lightbox modal
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<S3Media | null>(null);
  const [imageLoading, setImageLoading] = useState(false);

  // Create a ref for the intersection observer target
  const observerTarget = useRef<HTMLDivElement>(null);

  // Add new state for tracking loaded images
  const [loadedMedia, setLoadedMedia] = useState<Set<string>>(new Set());

  // Handle media load
  const handleMediaLoad = (mediaId: string) => {
    setLoadedMedia(prev => new Set([...Array.from(prev), mediaId]));
  };

  // Handle image click to open the lightbox modal
  const handleMediaClick = (mediaItem: S3Media) => {
    if (isMobile) return; // Don't open modal on mobile
    setCurrentMedia(mediaItem);
    setImageLoading(true);
    setModalOpen(true);
  };

  // Handle closing the lightbox modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fetchMedia = async (token?: string) => {
    try {
      setLoading(true);

      // Add the new static image files
      const newImages: S3Media[] = Array.from({ length: 6 }, (_, i) => ({
        id: `gallery_8${i + 1}`,
        key: `gallery_8${i + 1}.jpeg`,
        url: `https://presidential-chaffeurs.s3.us-east-2.amazonaws.com/gallery_8${i + 1}.jpeg`,
        type: 'image',
        fileType: 'jpeg'
      }));

      const command = new ListObjectsV2Command({
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        MaxKeys: MEDIA_PER_PAGE,
        ContinuationToken: token,
        Prefix: GALLERY_PREFIX,
      });

      const response = await s3Client.send(command);
      
      if (response.Contents) {
        const galleryMedia = response.Contents
          .filter(obj => obj.Key && (obj.Key.endsWith('.webp') || obj.Key.endsWith('.heic') || obj.Key.endsWith('.jpeg')))
          .map(obj => {
            const fileType = obj.Key?.endsWith('.webp') ? 'webp' as const : 
                           obj.Key?.endsWith('.heic') ? 'heic' as const : 'jpeg' as const;
            const baseName = obj.Key?.replace(GALLERY_PREFIX, '').split('.')[0] || '';
            const uniqueId = `${baseName}_${fileType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            return {
              id: uniqueId,
              key: obj.Key || '',
              url: `https://presidential-chaffeurs.s3.us-east-2.amazonaws.com/${obj.Key}`,
              type: 'image' as const,
              fileType,
              loaded: false
            };
          });

        // Combine all media and sort by file type (JPEG first), then randomize within each type
        const mediaGroups = [...newImages, ...galleryMedia]
          // First separate JPEGs from other formats
          .reduce<{ jpegs: S3Media[]; others: S3Media[] }>((acc, item: S3Media) => {
            if (item.fileType === 'jpeg') {
              acc.jpegs.push(item);
            } else {
              acc.others.push(item);
            }
            return acc;
          }, { jpegs: [], others: [] });

        // Randomize and combine both groups
        const allMedia: S3Media[] = [
          ...mediaGroups.jpegs.sort(() => Math.random() - 0.5),
          ...mediaGroups.others.sort(() => Math.random() - 0.5)
        ];

        setMedia(prev => {
          const mediaMap = new Map<string, S3Media>();
          if (token) {
            prev.forEach((item: S3Media) => {
              const baseKey = item.key.split('.')[0];
              mediaMap.set(baseKey, item);
            });
          }
          
          allMedia.forEach((item: S3Media) => {
            const baseKey = item.key.split('.')[0];
            // Only update if the item doesn't exist or if it's a JPEG
            if (!mediaMap.has(baseKey) || item.fileType === 'jpeg') {
              mediaMap.set(baseKey, item);
            }
          });
          
          // Convert map values to array and randomize the order
          return Array.from(mediaMap.values())
            .sort(() => Math.random() - 0.5);
        });
        
        setHasMore(!!response.IsTruncated);
        setContinuationToken(response.NextContinuationToken);
        setError(null);
      }
    } catch (error: any) {
      setError('Failed to load gallery media. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer callback
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading) {
      fetchMedia(continuationToken);
    }
  }, [continuationToken, hasMore, loading]);

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

  // Initial fetch
  useEffect(() => {
    fetchMedia();
  }, []);

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
          maxWidth: '800px', 
          mx: 'auto',
          px: { xs: 2, md: 0 },
          position: 'relative'
        }}>
          <AnimatedTypography 
            variant="h5" 
            color="text.primary" 
            sx={{ 
              mb: 2,
              fontFamily: 'Cinzel, serif',
              fontWeight: 500,
              lineHeight: 1.5
            }}
            fadeDelay={0.2}
            fadeDuration={0.8}
            fadeDirection="up"
            fadeDistance={30}
          >
            <FormattedMessage id="galleryPage.description" defaultMessage="Explore our collection of memorable moments captured at real events with our valued customers." />
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

        {loading && media.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#D0A42B' }} />
          </Box>
        ) : error ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography color="error">{error}</Typography>
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
              {media.map((mediaItem, index) => (
                <Fade 
                  key={mediaItem.id}
                  in={loadedMedia.has(mediaItem.id)}
                  timeout={1000}
                  style={{ 
                    transitionDelay: `${200 + (index % 12) * 100}ms`,
                  }}
                >
                  <Paper
                    elevation={3}
                    sx={{
                      overflow: 'hidden',
                      borderRadius: 2,
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: loadedMedia.has(mediaItem.id) ? 1 : 0,
                      transform: loadedMedia.has(mediaItem.id) ? 'translateY(0)' : 'translateY(20px)',
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
                    onClick={() => handleMediaClick(mediaItem)}
                  >
                    <Box
                      component="img"
                      src={mediaItem.url}
                      alt={`Gallery image ${mediaItem.key.replace(GALLERY_PREFIX, '').split('.')[0]}`}
                      onLoad={() => handleMediaLoad(mediaItem.id)}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const currentSrc = target.src;
                        const baseUrl = currentSrc.substring(0, currentSrc.lastIndexOf('.'));
                        
                        // Try loading JPEG first
                        if (!currentSrc.endsWith('.jpeg')) {
                          target.src = `${baseUrl}.jpeg`;
                          return;
                        }
                        
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
              {loading && <CircularProgress />}
            </Box>
          </AnimatedSection>
        )}
      </Container>

      {/* Image Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="gallery-media-modal"
        aria-describedby="enlarged view of gallery media"
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
              src={currentMedia?.url}
              alt="Gallery media"
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                display: imageLoading ? 'none' : 'block',
                margin: '0 auto',
              }}
              onLoad={() => setImageLoading(false)}
            />
          </>
        </Box>
      </Modal>
    </Box>
  );
};

export default GalleryPage; 