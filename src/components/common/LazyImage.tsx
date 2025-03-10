import React, { useState, useEffect, useRef } from 'react';
import { Box, Skeleton, BoxProps } from '@mui/material';

interface LazyImageProps extends Omit<BoxProps, 'component'> {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  placeholderColor?: string;
  objectFit?: string;
  objectPosition?: string;
  loadingHeight?: string | number;
  blur?: boolean;
}

/**
 * LazyImage component for optimized image loading
 * Uses IntersectionObserver to load images only when they enter the viewport
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  placeholderColor = '#1a1a1a',
  objectFit = 'cover',
  objectPosition = 'center',
  loadingHeight = '300px',
  blur = true,
  sx,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Set up intersection observer to detect when image is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width,
        height: isLoaded ? height : loadingHeight,
        backgroundColor: placeholderColor,
        overflow: 'hidden',
        ...sx
      }}
      {...props}
    >
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
      
      {isInView && (
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          sx={{
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            filter: blur && !isLoaded ? 'blur(10px)' : 'none',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            imageRendering: 'high-quality',
          }}
        />
      )}
    </Box>
  );
};

export default LazyImage; 