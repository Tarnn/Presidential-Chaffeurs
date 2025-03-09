import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Container, Typography, Box, Paper, CircularProgress, Fade, Fab, Zoom } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import media from '../config/media.json';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

interface S3Image {
  id: string;
  url: string;
  key: string;
  fileType: 'webp' | 'heic';
  loaded?: boolean;
}

const IMAGES_PER_PAGE = 12;
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
  console.log('Verifying credentials:', {
    accessKeyId: credentials.accessKeyId,
    hasSecretKey: !!credentials.secretAccessKey,
    expiration: credentials.expiration,
  });
};

verifyCredentials().catch(console.error);

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<S3Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [continuationToken, setContinuationToken] = useState<string | undefined>();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Create a ref for the intersection observer target
  const observerTarget = useRef<HTMLDivElement>(null);

  // Add new state for tracking loaded images
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Handle scroll to top
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle image load
  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set([...Array.from(prev), imageId]));
  };

  const fetchImages = async (token?: string) => {
    try {
      setLoading(true);
      
      // Debug logging
      console.log('AWS Config:', {
        region: import.meta.env.VITE_AWS_REGION,
        bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        keyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        // Log the first and last 4 characters of the secret key to verify it's loaded (never log the full key)
        secretKeyCheck: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY ? 
          `${import.meta.env.VITE_AWS_SECRET_ACCESS_KEY.substring(0, 4)}...${import.meta.env.VITE_AWS_SECRET_ACCESS_KEY.slice(-4)}` : 
          'not set'
      });
      
      // Verify S3 client configuration
      console.log('S3 Client Config:', {
        region: s3Client.config.region,
        credentials: await s3Client.config.credentials(),
      });
      
      const command = new ListObjectsV2Command({
        Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
        MaxKeys: IMAGES_PER_PAGE,
        ContinuationToken: token,
        Prefix: GALLERY_PREFIX,
      });

      console.log('Sending S3 command...');
      const response = await s3Client.send(command);
      console.log('S3 Response:', response);
      
      if (response.Contents) {
        const galleryImages = response.Contents
          .filter(obj => obj.Key && (obj.Key.endsWith('.webp') || obj.Key.endsWith('.heic')))
          .map(obj => {
            const fileType = obj.Key?.endsWith('.webp') ? 'webp' as const : 'heic' as const;
            return {
              id: obj.Key || '',
              key: obj.Key || '',
              url: `https://${import.meta.env.VITE_S3_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/${obj.Key}`,
              fileType,
              loaded: false
            };
          });

        // Sort images by their number in the filename
        const sortedImages = galleryImages.sort((a, b) => {
          const numA = parseInt(a.key.replace(GALLERY_PREFIX, '').split('.')[0]);
          const numB = parseInt(b.key.replace(GALLERY_PREFIX, '').split('.')[0]);
          return numA - numB;
        });

        setImages(prev => token ? [...prev, ...sortedImages] : sortedImages);
        setHasMore(!!response.IsTruncated);
        setContinuationToken(response.NextContinuationToken);
        setError(null);
      }
    } catch (error: any) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        code: error.code,
        requestId: error.$metadata?.requestId,
        cfId: error.$metadata?.cfId,
      });
      setError('Failed to load gallery images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer callback
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading) {
      fetchImages(continuationToken);
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
    fetchImages();
  }, []);

  return (
    <Box component="section">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '40vh',
          width: '100%',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={media.images.placeholders.gallery["1"]}
          alt="Gallery Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
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
          <Typography 
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
          >
            <Box component="span" sx={{ color: 'white' }}>
              <FormattedMessage id="galleryPage.titleStart" />
            </Box>
            <Box component="span" sx={{ color: '#D0A42B' }}>
              <FormattedMessage id="galleryPage.titleEnd" />
            </Box>
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Description Section */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="h5" color="text.primary" sx={{ mb: 4 }}>
            <FormattedMessage id="galleryPage.description" defaultMessage="Explore our collection of memorable moments captured at real events with our valued customers. Each photo tells a story of luxury, elegance, and exceptional service." />
          </Typography>
        </Box>

        {error ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 3,
                minHeight: '200px',
              }}
            >
              {images.map((image) => (
                <Fade 
                  key={image.id}
                  in={loadedImages.has(image.id)}
                  timeout={1000}
                  style={{ transitionDelay: '200ms' }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease-in-out',
                      opacity: loadedImages.has(image.id) ? 1 : 0,
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <Box
                      component="img"
                      src={image.url}
                      alt={`Gallery image ${image.key.replace(GALLERY_PREFIX, '').split('.')[0]}`}
                      onLoad={() => handleImageLoad(image.id)}
                      sx={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover',
                      }}
                      loading="lazy"
                    />
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
          </>
        )}
      </Container>

      {/* Scroll to Top Button */}
      <Zoom in={showScrollTop}>
        <Fab
          color="primary"
          size="small"
          onClick={handleScrollTop}
          sx={{
            position: 'fixed',
            bottom: 75,
            right:80,
            backgroundColor: '#D0A42B',
            '&:hover': {
              backgroundColor: '#B88A1C',
            },
          }}
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Zoom>
    </Box>
  );
};

export default GalleryPage; 