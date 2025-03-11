import React from 'react';
import applyTextAnimations from '../../utils/applyTextAnimations';
import { useAnimation } from '../../context/AnimationContext';

interface WithTextAnimationsOptions {
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  staggerDelay?: number;
  excludeComponents?: string[];
  once?: boolean;
}

/**
 * Higher-order component that applies fade-in animations to all Typography components
 * within the wrapped component
 */
const withTextAnimations = <P extends object>(
  Component: React.ComponentType<P>,
  options: WithTextAnimationsOptions = {}
) => {
  const WithTextAnimations: React.FC<P> = (props) => {
    const { enabled } = useAnimation();

    // If animations are disabled, render the component normally
    if (!enabled) {
      return <Component {...props} />;
    }

    // Render the component with a special render prop that processes its children
    return (
      <Component
        {...props}
        render={(children: React.ReactNode) => applyTextAnimations(children, options)}
      />
    );
  };

  return WithTextAnimations;
};

export default withTextAnimations; 