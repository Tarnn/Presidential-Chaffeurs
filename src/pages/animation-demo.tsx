import React from 'react';
import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material';
import AnimatedTypography from '../components/common/AnimatedTypography';
import AnimatedSection from '../components/common/AnimatedSection';
import { useFadeInAnimation, useScrollAnimation } from '../hooks';
import { withTextAnimations } from '../hoc';

const DemoSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {children}
    </Paper>
  );
};

const AnimationDemo = () => {
  // Demo for useFadeInAnimation hook
  const { ref: fadeRef, style: fadeStyle } = useFadeInAnimation({
    delay: 0.2,
    duration: 0.8,
    direction: 'up',
    distance: 50,
  });

  // Demo for useScrollAnimation hook
  const { ref: scrollRef, style: scrollStyle, isVisible } = useScrollAnimation({
    threshold: 0.1,
    delay: 0.2,
    duration: 0.8,
    direction: 'left',
    distance: 100,
  });

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        py: 8,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="lg">
        <AnimatedTypography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ mb: 6 }}
          fadeDelay={0.1}
          fadeDuration={0.8}
          fadeDirection="up"
          fadeDistance={30}
        >
          Animation Components Demo
        </AnimatedTypography>

        <DemoSection title="AnimatedTypography Component">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <AnimatedTypography 
                variant="h4" 
                fadeDelay={0.2} 
                fadeDuration={0.6}
                fadeDirection="up"
                fadeDistance={30}
              >
                Fade Up Animation
              </AnimatedTypography>
              <AnimatedTypography 
                variant="body1" 
                fadeDelay={0.3} 
                fadeDuration={0.6}
                fadeDirection="up"
                fadeDistance={30}
                sx={{ mt: 2 }}
              >
                This text fades in from below with a slight delay after the heading.
              </AnimatedTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimatedTypography 
                variant="h4" 
                fadeDelay={0.2} 
                fadeDuration={0.6}
                fadeDirection="down"
                fadeDistance={30}
              >
                Fade Down Animation
              </AnimatedTypography>
              <AnimatedTypography 
                variant="body1" 
                fadeDelay={0.3} 
                fadeDuration={0.6}
                fadeDirection="down"
                fadeDistance={30}
                sx={{ mt: 2 }}
              >
                This text fades in from above with a slight delay after the heading.
              </AnimatedTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimatedTypography 
                variant="h4" 
                fadeDelay={0.2} 
                fadeDuration={0.6}
                fadeDirection="left"
                fadeDistance={30}
              >
                Fade Left Animation
              </AnimatedTypography>
              <AnimatedTypography 
                variant="body1" 
                fadeDelay={0.3} 
                fadeDuration={0.6}
                fadeDirection="left"
                fadeDistance={30}
                sx={{ mt: 2 }}
              >
                This text fades in from the right with a slight delay after the heading.
              </AnimatedTypography>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimatedTypography 
                variant="h4" 
                fadeDelay={0.2} 
                fadeDuration={0.6}
                fadeDirection="right"
                fadeDistance={30}
              >
                Fade Right Animation
              </AnimatedTypography>
              <AnimatedTypography 
                variant="body1" 
                fadeDelay={0.3} 
                fadeDuration={0.6}
                fadeDirection="right"
                fadeDistance={30}
                sx={{ mt: 2 }}
              >
                This text fades in from the left with a slight delay after the heading.
              </AnimatedTypography>
            </Grid>
          </Grid>
        </DemoSection>

        <DemoSection title="AnimatedSection Component">
          <AnimatedSection
            delay={0.2}
            duration={0.8}
            direction="up"
            distance={30}
            staggerChildren={true}
            staggerDelay={0.1}
          >
            <Typography variant="h5" gutterBottom>This will fade in first</Typography>
            <Typography variant="body1" paragraph>This paragraph will fade in second with a stagger delay.</Typography>
            <Typography variant="body1" paragraph>This paragraph will fade in third with a stagger delay.</Typography>
            <Typography variant="body1" paragraph>This paragraph will fade in fourth with a stagger delay.</Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>Nested content</Typography>
              <Typography variant="body2">This will also be animated with the stagger effect.</Typography>
            </Box>
          </AnimatedSection>
        </DemoSection>

        <DemoSection title="useFadeInAnimation Hook">
          <div 
            ref={fadeRef as React.RefObject<HTMLDivElement>} 
            style={{...fadeStyle, padding: '24px', backgroundColor: '#3f51b5', color: 'white', borderRadius: '8px'}}
          >
            <Typography variant="h5" gutterBottom>Custom Element with Fade Animation</Typography>
            <Typography variant="body1">
              This entire box is animated using the useFadeInAnimation hook. You can apply this hook to any component.
            </Typography>
          </div>
        </DemoSection>

        <DemoSection title="useScrollAnimation Hook">
          <Typography variant="body1" paragraph>
            Scroll down to see the next element animate when it enters the viewport.
          </Typography>
          <Box sx={{ height: '300px' }} />
          <div 
            ref={scrollRef} 
            style={{
              ...scrollStyle,
              padding: '24px', 
              backgroundColor: '#f50057', 
              color: 'white', 
              borderRadius: '8px',
              transition: 'background-color 0.3s ease'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Scroll-Triggered Animation
            </Typography>
            <Typography variant="body1">
              This box animates when it enters the viewport. It slides in from the left.
              Current visibility state: {isVisible ? 'Visible' : 'Not visible'}
            </Typography>
          </div>
        </DemoSection>

        <DemoSection title="Animation Directions">
          <Grid container spacing={4}>
            {['up', 'down', 'left', 'right', 'none'].map((direction, index) => (
              <Grid item xs={12} sm={6} md={4} key={direction}>
                <AnimatedSection
                  delay={0.1 * (index + 1)}
                  duration={0.6}
                  direction={direction as any}
                  distance={30}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Fade {direction}
                    </Typography>
                    <Typography variant="body2">
                      This element fades in from the {direction === 'none' ? 'center (no direction)' : direction}.
                    </Typography>
                  </Paper>
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        </DemoSection>
      </Container>
    </Box>
  );
};

// Apply text animations to the entire page
export default withTextAnimations(AnimationDemo, {
  delay: 0,
  duration: 0.6,
  direction: 'up',
  distance: 20,
  staggerDelay: 0.05
}); 