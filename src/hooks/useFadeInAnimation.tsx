import { useRef, useEffect, useState } from 'react';
import { useAnimation } from '../context/AnimationContext';

interface FadeInAnimationOptions {
  threshold?: number;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  once?: boolean;
}

/**
 * A custom hook that provides fade-in animation properties for any component
 */
const useFadeInAnimation = (options: FadeInAnimationOptions = {}) => {
  const {
    enabled,
    defaultThreshold,
    defaultDelay,
    defaultDuration,
    defaultDirection,
    defaultDistance,
  } = useAnimation();
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  const {
    threshold = defaultThreshold || 0.1,
    delay = defaultDelay || 0,
    duration = defaultDuration || 0.6,
    direction = defaultDirection || 'up',
    distance = defaultDistance || 20,
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

  // Calculate animation styles based on direction
  const getAnimationStyles = () => {
    if (!enabled) return {};
    
    const initialStyles = {
      opacity: 0,
      transform: '',
    };
    
    const animatedStyles = {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
    };
    
    switch (direction) {
      case 'up':
        initialStyles.transform = `translate3d(0, ${distance}px, 0)`;
        break;
      case 'down':
        initialStyles.transform = `translate3d(0, -${distance}px, 0)`;
        break;
      case 'left':
        initialStyles.transform = `translate3d(${distance}px, 0, 0)`;
        break;
      case 'right':
        initialStyles.transform = `translate3d(-${distance}px, 0, 0)`;
        break;
      case 'none':
        initialStyles.transform = 'translate3d(0, 0, 0)';
        break;
      default:
        initialStyles.transform = `translate3d(0, ${distance}px, 0)`;
    }
    
    return isVisible ? animatedStyles : initialStyles;
  };

  return {
    ref,
    style: getAnimationStyles(),
    isVisible,
  };
};

export default useFadeInAnimation; 