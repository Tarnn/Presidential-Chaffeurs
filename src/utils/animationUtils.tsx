import React, { ReactNode } from 'react';
import { Typography } from '@mui/material';
import AnimatedSection from '../components/common/AnimatedSection';
import AnimatedTextContent from '../components/common/AnimatedTextContent';

/**
 * Wraps Typography components with animations
 * @param element The React element to process
 * @returns The processed element with animations
 */
export const wrapTypographyWithAnimation = (
  element: React.ReactElement,
  options: {
    delay?: number;
    duration?: number;
    threshold?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
  } = {}
): React.ReactElement => {
  // If it's a Typography component, wrap it with AnimatedTextContent
  if (element.type === Typography) {
    return (
      <AnimatedTextContent
        delay={options.delay}
        duration={options.duration}
        threshold={options.threshold}
        direction={options.direction}
        distance={options.distance}
      >
        {element}
      </AnimatedTextContent>
    );
  }

  // If it has children, process them recursively
  if (element.props && element.props.children) {
    const newChildren = React.Children.map(element.props.children, (child) => {
      if (React.isValidElement(child)) {
        return wrapTypographyWithAnimation(child, options);
      }
      return child;
    });

    return React.cloneElement(element, { ...element.props, children: newChildren });
  }

  // Return the element unchanged if none of the above conditions are met
  return element;
};

/**
 * Wraps sections with staggered animations
 * @param sections Array of sections to animate
 * @returns Array of animated sections
 */
export const createAnimatedSections = (
  sections: ReactNode[],
  options: {
    delay?: number;
    duration?: number;
    threshold?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    staggerDelay?: number;
  } = {}
): ReactNode[] => {
  return sections.map((section, index) => (
    <AnimatedSection
      key={index}
      delay={options.delay ? options.delay + index * (options.staggerDelay || 0.1) : index * 0.1}
      duration={options.duration}
      threshold={options.threshold}
      direction={options.direction}
      distance={options.distance}
    >
      {section}
    </AnimatedSection>
  ));
};

/**
 * Creates a staggered animation container for multiple elements
 * @param children Elements to animate with staggered timing
 * @returns Animated container with staggered children
 */
export const createStaggeredAnimation = (
  children: ReactNode,
  options: {
    delay?: number;
    duration?: number;
    threshold?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    staggerDelay?: number;
  } = {}
): ReactNode => {
  return (
    <AnimatedSection
      staggerChildren={true}
      delay={options.delay}
      duration={options.duration}
      threshold={options.threshold}
      direction={options.direction}
      distance={options.distance}
      staggerDelay={options.staggerDelay}
    >
      {children}
    </AnimatedSection>
  );
}; 