import React, { ReactNode } from 'react';
import FadeInView from './FadeInView';

interface AnimatedContentProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  direction = 'up',
  distance = 20,
  className = '',
  once = true,
  staggerChildren = false,
  staggerDelay = 0.1,
}) => {
  // If staggerChildren is true, we need to handle React children differently
  if (staggerChildren && React.Children.count(children) > 1) {
    return (
      <>
        {React.Children.map(children, (child, index) => (
          <FadeInView
            key={index}
            delay={delay + index * staggerDelay}
            duration={duration}
            threshold={threshold}
            direction={direction}
            distance={distance}
            className={className}
            once={once}
          >
            {child}
          </FadeInView>
        ))}
      </>
    );
  }

  // Default case: wrap all children in a single FadeInView
  return (
    <FadeInView
      delay={delay}
      duration={duration}
      threshold={threshold}
      direction={direction}
      distance={distance}
      className={className}
      once={once}
    >
      {children}
    </FadeInView>
  );
};

export default AnimatedContent; 