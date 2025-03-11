/**
 * Animation utility functions for creating consistent animations across the application
 */

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export interface AnimationOptions {
  delay?: number;
  duration?: number;
  direction?: AnimationDirection;
  distance?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

/**
 * Default animation options used throughout the application
 */
export const defaultAnimationOptions: AnimationOptions = {
  delay: 0.2,
  duration: 0.6,
  direction: 'up',
  distance: 30,
  threshold: 0.1,
  once: true,
  staggerChildren: false,
  staggerDelay: 0.1,
};

/**
 * Predefined animation presets for common use cases
 */
export const animationPresets: Record<string, AnimationOptions> = {
  fadeIn: {
    delay: 0.2,
    duration: 0.6,
    direction: 'none',
    distance: 0,
  },
  fadeUp: {
    delay: 0.2,
    duration: 0.6,
    direction: 'up',
    distance: 30,
  },
  fadeDown: {
    delay: 0.2,
    duration: 0.6,
    direction: 'down',
    distance: 30,
  },
  fadeLeft: {
    delay: 0.2,
    duration: 0.6,
    direction: 'left',
    distance: 30,
  },
  fadeRight: {
    delay: 0.2,
    duration: 0.6,
    direction: 'right',
    distance: 30,
  },
  staggerUp: {
    delay: 0.2,
    duration: 0.6,
    direction: 'up',
    distance: 30,
    staggerChildren: true,
    staggerDelay: 0.1,
  },
  staggerDown: {
    delay: 0.2,
    duration: 0.6,
    direction: 'down',
    distance: 30,
    staggerChildren: true,
    staggerDelay: 0.1,
  },
  hero: {
    delay: 0.1,
    duration: 0.8,
    direction: 'up',
    distance: 50,
  },
  fast: {
    delay: 0.1,
    duration: 0.4,
    direction: 'up',
    distance: 20,
  },
  slow: {
    delay: 0.3,
    duration: 1.0,
    direction: 'up',
    distance: 40,
  },
};

/**
 * Creates a staggered delay based on index
 * @param baseDelay The base delay to start with
 * @param staggerDelay The delay between each item
 * @param index The index of the current item
 * @returns The calculated delay
 */
export const getStaggeredDelay = (baseDelay: number, staggerDelay: number, index: number): number => {
  return baseDelay + (staggerDelay * index);
};

/**
 * Merges custom animation options with default options
 * @param options Custom animation options
 * @returns Merged animation options
 */
export const mergeAnimationOptions = (options?: AnimationOptions): AnimationOptions => {
  return {
    ...defaultAnimationOptions,
    ...options,
  };
};

/**
 * Gets a preset animation with optional overrides
 * @param presetName The name of the preset to use
 * @param overrides Optional overrides for the preset
 * @returns The animation options
 */
export const getAnimationPreset = (
  presetName: keyof typeof animationPresets,
  overrides?: AnimationOptions
): AnimationOptions => {
  return {
    ...animationPresets[presetName],
    ...overrides,
  };
};

/**
 * Calculates the transform value based on animation direction and distance
 * @param direction The direction of the animation
 * @param distance The distance to move
 * @returns The transform CSS value
 */
export const getTransformValue = (direction: AnimationDirection, distance: number): string => {
  switch (direction) {
    case 'up':
      return `translate3d(0, ${distance}px, 0)`;
    case 'down':
      return `translate3d(0, -${distance}px, 0)`;
    case 'left':
      return `translate3d(${distance}px, 0, 0)`;
    case 'right':
      return `translate3d(-${distance}px, 0, 0)`;
    case 'none':
    default:
      return 'translate3d(0, 0, 0)';
  }
}; 