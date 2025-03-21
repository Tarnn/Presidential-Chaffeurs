import React, { ReactNode } from 'react';
import { motion, HTMLMotionProps, AnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimation as useFramerAnimation } from 'framer-motion';
import { useAnimation } from '../../context/AnimationContext';

interface AnimatedTextContentProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  staggerChildren?: boolean;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  tag?: keyof JSX.IntrinsicElements;
}

const AnimatedTextContent: React.FC<AnimatedTextContentProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  direction = 'up',
  distance = 20,
  staggerChildren = false,
  staggerDelay = 0.1,
  className = '',
  once = true,
  tag = 'div',
}) => {
  const { enabled, defaultDuration, defaultDirection, defaultDistance } = useAnimation();
  const controls = useFramerAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  // Use context defaults if available
  const actualDuration = duration || defaultDuration;
  const actualDirection = direction || defaultDirection;
  const actualDistance = distance || defaultDistance;

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  // If animations are disabled, render children normally
  if (!enabled) {
    const Component = tag as any;
    return <Component className={className}>{children}</Component>;
  }

  // Set initial animation properties based on direction
  const getInitialProps = () => {
    switch (actualDirection) {
      case 'up':
        return { opacity: 0, y: actualDistance };
      case 'down':
        return { opacity: 0, y: -actualDistance };
      case 'left':
        return { opacity: 0, x: actualDistance };
      case 'right':
        return { opacity: 0, x: -actualDistance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: actualDistance };
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren ? staggerDelay : 0,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: getInitialProps(),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: actualDuration,
        ease: 'easeOut',
      },
    },
  };

  // Common props for motion components
  const motionProps = {
    className,
    initial: "hidden",
    animate: controls,
  };

  // If staggering children, wrap each child in a motion element
  if (staggerChildren && React.Children.count(children) > 1) {
    // Use type assertion to handle dynamic tag
    const MotionComponent = motion[tag as keyof typeof motion] as any;
    
    if (MotionComponent) {
      return (
        <MotionComponent
          {...motionProps}
          ref={ref}
          variants={containerVariants}
        >
          {React.Children.map(children, (child) => (
            <motion.div variants={itemVariants}>{child}</motion.div>
          ))}
        </MotionComponent>
      );
    }
    
    // Fallback to motion.div if the tag doesn't exist in motion
    return (
      <motion.div
        {...motionProps}
        ref={ref}
        variants={containerVariants}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  // Otherwise, animate the whole container
  const MotionComponent = motion[tag as keyof typeof motion] as any;
  
  if (MotionComponent) {
    return (
      <MotionComponent
        {...motionProps}
        ref={ref}
        variants={itemVariants}
      >
        {children}
      </MotionComponent>
    );
  }
  
  // Fallback to motion.div
  return (
    <motion.div
      {...motionProps}
      ref={ref}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedTextContent; 