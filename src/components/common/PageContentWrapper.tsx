import React, { ReactNode } from 'react';
import { Container, ContainerProps } from '@mui/material';
import AnimatedPage from './AnimatedPage';

interface PageContentWrapperProps extends Omit<ContainerProps, 'children'> {
  children: ReactNode;
  animate?: boolean;
  threshold?: number;
  staggerSections?: boolean;
  sectionDelay?: number;
  sectionDuration?: number;
  sectionDirection?: 'up' | 'down' | 'left' | 'right' | 'none';
  sectionDistance?: number;
}

/**
 * A wrapper component for page content that adds fade-in animations
 * This component can be used as a drop-in replacement for Container
 */
const PageContentWrapper: React.FC<PageContentWrapperProps> = ({
  children,
  animate = true,
  threshold = 0.1,
  staggerSections = true,
  sectionDelay = 0.1,
  sectionDuration = 0.6,
  sectionDirection = 'up',
  sectionDistance = 20,
  ...containerProps
}) => {
  // If animations are disabled, render a regular Container
  if (!animate) {
    return <Container {...containerProps}>{children}</Container>;
  }

  // Otherwise, wrap the content in an AnimatedPage
  return (
    <Container {...containerProps}>
      <AnimatedPage
        threshold={threshold}
        staggerSections={staggerSections}
        sectionDelay={sectionDelay}
        sectionDuration={sectionDuration}
        sectionDirection={sectionDirection}
        sectionDistance={sectionDistance}
      >
        {children}
      </AnimatedPage>
    </Container>
  );
};

export default PageContentWrapper; 