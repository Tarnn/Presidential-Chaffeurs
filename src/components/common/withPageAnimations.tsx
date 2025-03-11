import React, { ComponentType } from 'react';
import { useAnimation } from '../../context/AnimationContext';
import applyTextAnimations from '../../utils/applyTextAnimations';

interface WithPageAnimationsOptions {
  excludeComponents?: string[];
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  staggerDelay?: number;
}

/**
 * Higher-order component that applies fade-in animations to all text elements in a page
 */
const withPageAnimations = <P extends object>(
  Component: ComponentType<P>,
  options: WithPageAnimationsOptions = {}
) => {
  const WithPageAnimations: React.FC<P> = (props) => {
    const { enabled } = useAnimation();

    // If animations are disabled, render the component normally
    if (!enabled) {
      return <Component {...props} />;
    }

    // Create a wrapper component that will process the rendered output
    const AnimatedComponent: React.FC<P> = (componentProps) => {
      const element = <Component {...componentProps} />;
      
      if (!React.isValidElement(element)) {
        return element;
      }
      
      return applyTextAnimations(element, options);
    };

    return <AnimatedComponent {...props} />;
  };

  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithPageAnimations.displayName = `WithPageAnimations(${displayName})`;

  return WithPageAnimations;
};

export default withPageAnimations; 