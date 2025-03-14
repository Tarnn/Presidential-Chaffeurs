import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const scroll = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-25%);
  }
`;

interface ScrollingBannerProps {
  items: string[];
}

const ScrollingBanner: React.FC<ScrollingBannerProps> = ({ items = [] }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.92)',
        borderTop: '1px solid rgba(208, 164, 43, 0.25)',
        borderBottom: '1px solid rgba(208, 164, 43, 0.25)',
        zIndex: 2,
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        '&::before, &::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          width: '120px',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        },
        '&::before': {
          left: 0,
          background: 'linear-gradient(to right, rgba(0, 0, 0, 0.92) 20%, transparent)',
        },
        '&::after': {
          right: 0,
          background: 'linear-gradient(to left, rgba(0, 0, 0, 0.92) 20%, transparent)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'fit-content',
          animation: `${scroll} 30s linear infinite`,
          color: '#D0A42B',
          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' },
          fontFamily: 'Cinzel, serif',
          letterSpacing: '0.5px',
          opacity: 0.85,
          transform: 'translateZ(0)', // Hardware acceleration
          willChange: 'transform', // Optimization for animation
          '&:hover': {
            animationPlayState: 'paused',
            opacity: 1,
            transition: 'opacity 0.3s ease',
          },
        }}
      >
        {[...Array(4)].map((_, groupIndex) => (
          <Box
            key={groupIndex}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {items.map((item, index) => (
              <Box
                key={`${groupIndex}-${index}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
                  px: 1.2,
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  '&:after': {
                    content: '"✦"',
                    ml: 1.2,
                    mr: 0,
                    fontSize: '0.85em',
                    color: 'rgba(208, 164, 43, 0.85)',
                    display: index === items.length - 1 && groupIndex === 3 ? 'none' : 'block',
                    position: 'relative',
                    top: 0,
                  },
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ScrollingBanner; 