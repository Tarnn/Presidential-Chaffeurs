import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <Zoom in={showScrollTop}>
      <Fab
        color="primary"
        size="medium"
        aria-label="scroll to top"
        onClick={handleScrollTop}
        sx={{
          position: 'fixed',
          bottom: '75px',
          right: '75px',
          opacity: showScrollTop ? 1 : 0,
          transition: 'opacity 0.3s',
          bgcolor: '#D0A42B',
          '&:hover': {
            bgcolor: '#B08A23',
            transform: 'scale(1.05)',
          },
          zIndex: 1500,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop; 