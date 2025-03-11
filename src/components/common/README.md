# Animation Components

This directory contains a set of components and utilities for adding fade-in animations to elements as they enter the viewport when the user scrolls.

## Components

### AnimatedTypography

A Typography component with built-in fade-in animations.

```jsx
<AnimatedTypography
  variant="h3"
  fadeDelay={0.2}
  fadeDuration={0.6}
  fadeDirection="up"
  fadeDistance={30}
>
  This text will fade in when it enters the viewport
</AnimatedTypography>
```

### AnimatedSection

A component for animating entire sections with various animation options.

```jsx
<AnimatedSection
  delay={0.2}
  duration={0.6}
  direction="up"
  distance={30}
  staggerChildren={true}
  staggerDelay={0.1}
>
  <Typography>This will fade in first</Typography>
  <Typography>This will fade in second</Typography>
  <Typography>This will fade in third</Typography>
</AnimatedSection>
```

### AnimatedPage

A component for animating entire pages with staggered sections.

```jsx
<AnimatedPage
  staggerSections={true}
  sectionDelay={0.1}
  sectionDirection="up"
>
  <section>This section will fade in first</section>
  <section>This section will fade in second</section>
</AnimatedPage>
```

### PageContentWrapper

A wrapper component for page content that adds fade-in animations.

```jsx
<PageContentWrapper
  animate={true}
  staggerSections={true}
  sectionDelay={0.1}
>
  <section>This section will fade in first</section>
  <section>This section will fade in second</section>
</PageContentWrapper>
```

## Higher-Order Components (HOCs)

### withFadeInAnimation

A HOC for adding fade-in animations to any component.

```jsx
const AnimatedComponent = withFadeInAnimation(MyComponent, {
  delay: 0.2,
  duration: 0.6,
  direction: "up",
  distance: 30,
});
```

### withTextAnimations

A HOC for applying animations to all text elements in a component.

```jsx
const AnimatedPage = withTextAnimations(MyPage, {
  delay: 0.2,
  duration: 0.6,
  direction: "up",
  distance: 30,
  staggerDelay: 0.1,
});
```

## Hooks

### useFadeInAnimation

A hook for applying fade-in animations to any component.

```jsx
const { ref, style } = useFadeInAnimation({
  delay: 0.2,
  duration: 0.6,
  direction: "up",
  distance: 30,
});

return <div ref={ref} style={style}>This will fade in</div>;
```

### useScrollAnimation

A hook for detecting when elements enter the viewport.

```jsx
const { ref, style, isVisible } = useScrollAnimation({
  threshold: 0.1,
  delay: 0.2,
  duration: 0.6,
  direction: "up",
  distance: 30,
});

return <div ref={ref} style={style}>This will animate when visible</div>;
```

## Animation Options

- `delay`: The delay before the animation starts (in seconds)
- `duration`: The duration of the animation (in seconds)
- `threshold`: The percentage of the element that needs to be visible to trigger the animation (0-1)
- `direction`: The direction of the animation (`"up"`, `"down"`, `"left"`, `"right"`, `"none"`)
- `distance`: The distance the element moves during the animation (in pixels)
- `staggerChildren`: Whether to stagger the animation of children
- `staggerDelay`: The delay between each child's animation (in seconds)
- `once`: Whether the animation should only happen once 