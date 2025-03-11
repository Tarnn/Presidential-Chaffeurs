import React, { ComponentType } from 'react';
import { useAnimation } from '../context/AnimationContext';
import applyPageAnimations from '../utils/applyPageAnimations';

interface WithTextAnimationsOptions {
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  staggerDelay?: number;
  sectionTags?: string[];
}

/**
 * Higher-order component that applies fade-in animations to all text elements in a page
 * 
 * @param Component The component to wrap
 * @param options Animation options
 * @returns A new component with animations applied to text elements
 */
const withTextAnimations = <P extends object>(
  Component: ComponentType<P>,
  options: WithTextAnimationsOptions = {}
) => {
  const WithTextAnimations = (props: P) => {
    const { enabled } = useAnimation();

    // If animations are disabled, render the component normally
    if (!enabled) {
      return <Component {...props} />;
    }

    // Render the component and apply animations to its output
    return (
      <AnimatedComponentWrapper options={options}>
        <Component {...props} />
      </AnimatedComponentWrapper>
    );
  };

  // Set display name for debugging
  const displayName = Component.displayName || Component.name || 'Component';
  WithTextAnimations.displayName = `WithTextAnimations(${displayName})`;

  return WithTextAnimations;
};

// Helper component to apply animations to its children
interface AnimatedComponentWrapperProps {
  children: React.ReactNode;
  options: WithTextAnimationsOptions;
}

const AnimatedComponentWrapper: React.FC<AnimatedComponentWrapperProps> = ({ 
  children, 
  options 
}) => {
  // Process each child with applyPageAnimations
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return applyPageAnimations(child, options);
    }
    return child;
  });

  return <>{processedChildren}</>;
};

export default withTextAnimations; 