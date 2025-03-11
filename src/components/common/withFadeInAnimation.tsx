import React from 'react';
import FadeInView from './FadeInView';

interface WithFadeInAnimationProps {
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  once?: boolean;
}

// Higher-order component to add fade-in animation to any component
const withFadeInAnimation = <P extends object>(
  Component: React.ComponentType<P>,
  options: WithFadeInAnimationProps = {}
) => {
  const WithFadeInAnimation: React.FC<P> = (props) => {
    return (
      <FadeInView
        delay={options.delay}
        duration={options.duration}
        threshold={options.threshold}
        direction={options.direction}
        distance={options.distance}
        className={options.className}
        once={options.once}
      >
        <Component {...props} />
      </FadeInView>
    );
  };

  return WithFadeInAnimation;
};

export default withFadeInAnimation; 