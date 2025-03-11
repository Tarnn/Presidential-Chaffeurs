import React from 'react';
import { Typography, TypographyProps } from '@mui/material';
import useFadeInAnimation from '../../hooks/useFadeInAnimation';

interface AnimatedTypographyProps extends TypographyProps {
  fadeDelay?: number;
  fadeDuration?: number;
  fadeThreshold?: number;
  fadeDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
  fadeDistance?: number;
  fadeOnce?: boolean;
}

const AnimatedTypography: React.FC<AnimatedTypographyProps> = ({
  children,
  fadeDelay = 0,
  fadeDuration = 0.6,
  fadeThreshold = 0.1,
  fadeDirection = 'up',
  fadeDistance = 20,
  fadeOnce = true,
  sx,
  style,
  ...typographyProps
}) => {
  const { ref, style: animationStyle, isVisible } = useFadeInAnimation({
    delay: fadeDelay,
    duration: fadeDuration,
    threshold: fadeThreshold,
    direction: fadeDirection,
    distance: fadeDistance,
    once: fadeOnce,
  });

  // Combine the animation style with any custom styles
  const combinedStyle = {
    ...style,
    ...animationStyle,
  };

  return (
    <Typography
      ref={ref as React.Ref<HTMLElement>}
      sx={sx}
      style={combinedStyle}
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};

export default AnimatedTypography; 