import React, { ReactNode } from 'react';
import { useAnimation } from '../../context/AnimationContext';
import AnimatedSection from './AnimatedSection';

interface AnimatedPageProps {
  children: ReactNode;
  threshold?: number;
  staggerSections?: boolean;
  sectionDelay?: number;
  sectionDuration?: number;
  sectionDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
  sectionDistance?: number;
}

/**
 * A wrapper component that adds fade-in animations to page content
 * This component automatically animates direct children as separate sections
 */
const AnimatedPage: React.FC<AnimatedPageProps> = ({
  children,
  threshold = 0.1,
  staggerSections = true,
  sectionDelay = 0.1,
  sectionDuration = 0.6,
  sectionDirection = 'up',
  sectionDistance = 20,
}) => {
  const { enabled } = useAnimation();

  // If animations are disabled, render children normally
  if (!enabled) {
    return <>{children}</>;
  }

  // If there's only one child, wrap it in an AnimatedSection
  if (React.Children.count(children) === 1) {
    return (
      <AnimatedSection
        threshold={threshold}
        duration={sectionDuration}
        direction={sectionDirection}
        distance={sectionDistance}
      >
        {children}
      </AnimatedSection>
    );
  }

  // If staggerSections is true, wrap each child in an AnimatedSection with staggered delays
  if (staggerSections) {
    return (
      <>
        {React.Children.map(children, (child, index) => (
          <AnimatedSection
            key={index}
            threshold={threshold}
            delay={index * sectionDelay}
            duration={sectionDuration}
            direction={sectionDirection}
            distance={sectionDistance}
          >
            {child}
          </AnimatedSection>
        ))}
      </>
    );
  }

  // Otherwise, wrap all children in a single AnimatedSection
  return (
    <AnimatedSection
      threshold={threshold}
      duration={sectionDuration}
      direction={sectionDirection}
      distance={sectionDistance}
    >
      {children}
    </AnimatedSection>
  );
};

export default AnimatedPage; 