import { useEffect, useRef, useState } from 'react';
import { useAnimation } from '../context/AnimationContext';

interface ScrollAnimationOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
}

const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    enabled,
    defaultThreshold,
    defaultDelay,
    defaultDuration,
    defaultDirection,
    defaultDistance,
  } = useAnimation();
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const {
    threshold = defaultThreshold,
    delay = defaultDelay,
    duration = defaultDuration,
    direction = defaultDirection,
    distance = defaultDistance,
    once = true,
  } = options;

  useEffect(() => {
    if (!enabled) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [enabled, threshold, once]);

  // Calculate initial and animate styles based on direction
  const getInitialStyle = () => {
    if (!enabled) return {};
    
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getAnimateStyle = () => {
    return {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: 'easeOut',
      },
    };
  };

  return {
    ref,
    style: {
      initial: getInitialStyle(),
      animate: isVisible ? getAnimateStyle() : getInitialStyle(),
    },
    isVisible,
  };
};

export default useScrollAnimation; 