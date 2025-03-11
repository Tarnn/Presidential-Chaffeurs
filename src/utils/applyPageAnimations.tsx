import React, { ReactElement, ReactNode } from 'react';
import { Typography } from '@mui/material';
import AnimatedTypography from '../components/common/AnimatedTypography';
import AnimatedSection from '../components/common/AnimatedSection';

interface AnimationOptions {
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  staggerDelay?: number;
  sectionTags?: string[];
}

/**
 * Applies animations to a page by replacing Typography components with AnimatedTypography
 * and wrapping sections in AnimatedSection components
 * 
 * @param element The React element to process
 * @param options Animation options
 * @returns The processed element with animations applied
 */
const applyPageAnimations = (
  element: ReactElement | ReactNode,
  options: AnimationOptions = {}
): ReactNode => {
  const {
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    direction = 'up',
    distance = 20,
    staggerDelay = 0.1,
    sectionTags = ['section', 'div', 'article', 'main', 'aside', 'header', 'footer'],
  } = options;

  // Skip processing if the element is not valid
  if (!React.isValidElement(element)) {
    return element;
  }

  // Get the element type
  const elementType = element.type;
  const typeName = typeof elementType === 'string' 
    ? elementType 
    : (elementType as any).displayName || (elementType as any).name || '';

  // If it's a Typography component, replace it with AnimatedTypography
  if (elementType === Typography) {
    return (
      <AnimatedTypography
        fadeDelay={delay}
        fadeDuration={duration}
        fadeThreshold={threshold}
        fadeDirection={direction}
        fadeDistance={distance}
        fadeOnce={true}
        {...element.props}
      />
    );
  }

  // If it's a section tag, wrap it with AnimatedSection
  if (sectionTags.includes(typeName)) {
    // Process children first
    const children = element.props.children;
    let processedChildren;
    
    if (React.Children.count(children) > 0) {
      processedChildren = React.Children.map(children, (child, index) => {
        return applyPageAnimations(child, {
          ...options,
          delay: delay + index * staggerDelay,
        });
      });
    } else {
      processedChildren = children;
    }

    // Then wrap the section
    return (
      <AnimatedSection
        delay={delay}
        duration={duration}
        threshold={threshold}
        direction={direction}
        distance={distance}
        className={element.props.className}
        style={element.props.style}
      >
        {React.cloneElement(element, { ...element.props, children: processedChildren })}
      </AnimatedSection>
    );
  }

  // If it has children, process them recursively
  if (element.props && element.props.children) {
    const children = element.props.children;
    let processedChildren;
    
    if (React.Children.count(children) > 0) {
      processedChildren = React.Children.map(children, (child, index) => {
        return applyPageAnimations(child, {
          ...options,
          delay: delay + index * staggerDelay,
        });
      });
    } else {
      processedChildren = children;
    }

    return React.cloneElement(element, { ...element.props, children: processedChildren });
  }

  // Return the element unchanged if none of the above conditions are met
  return element;
};

export default applyPageAnimations; 