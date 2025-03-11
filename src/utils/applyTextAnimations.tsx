import React, { ReactElement, ReactNode } from 'react';
import { Typography } from '@mui/material';
import FadeInView from '../components/common/FadeInView';

/**
 * Recursively traverses React elements and wraps Typography components with FadeInView
 * @param children The React children to process
 * @param options Animation options
 * @returns Processed React children with animations applied
 */
export const applyTextAnimations = (
  children: ReactNode,
  options: {
    delay?: number;
    duration?: number;
    threshold?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    staggerDelay?: number;
    excludeComponents?: string[];
    once?: boolean;
  } = {}
): ReactNode => {
  const {
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    direction = 'up',
    distance = 20,
    staggerDelay = 0.1,
    excludeComponents = ['NavLink', 'Link', 'Button', 'IconButton'],
    once = true,
  } = options;

  // Process an array of children
  if (Array.isArray(children)) {
    return React.Children.map(children, (child, index) => {
      // Apply staggered delay based on index
      const childDelay = delay + index * staggerDelay;
      return applyTextAnimations(child, { ...options, delay: childDelay });
    });
  }

  // Skip non-element nodes (strings, numbers, null, etc.)
  if (!React.isValidElement(children)) {
    return children;
  }

  const element = children as ReactElement;
  
  // Skip components in the exclude list
  const componentName = element.type.toString().split('(')[0].split(' ')[1];
  if (componentName && excludeComponents.includes(componentName)) {
    return element;
  }

  // If it's a Typography component, wrap it with FadeInView
  if (element.type === Typography) {
    return (
      <FadeInView
        delay={delay}
        duration={duration}
        threshold={threshold}
        direction={direction}
        distance={distance}
        once={once}
      >
        {element}
      </FadeInView>
    );
  }

  // If it has children, process them recursively
  if (element.props && element.props.children) {
    const newChildren = applyTextAnimations(element.props.children, options);
    return React.cloneElement(element, { ...element.props, children: newChildren });
  }

  // Return the element unchanged if none of the above conditions are met
  return element;
};

export default applyTextAnimations; 