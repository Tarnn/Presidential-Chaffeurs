import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../../pages/HomePage';
import { IntlProvider } from 'react-intl';

// Mock the components used in HomePage
jest.mock('../../components/home/HeroSection', () => () => <div data-testid="hero-component">Hero Component</div>);
jest.mock('../../components/home/AboutSection', () => () => <div data-testid="about-component">About Component</div>);
jest.mock('../../components/home/ServicesSection', () => () => <div data-testid="services-component">Services Component</div>);
jest.mock('../../components/home/TestimonialsSection', () => () => <div data-testid="testimonials-component">Testimonials Component</div>);

describe('HomePage Component', () => {
  const renderHome = () => {
    return render(
      <IntlProvider locale="en" messages={{}}>
        <HomePage />
      </IntlProvider>
    );
  };

  it('renders all sections of the home page', () => {
    renderHome();
    
    // Check if all sections are rendered
    expect(screen.getByTestId('hero-component')).toBeInTheDocument();
    expect(screen.getByTestId('about-component')).toBeInTheDocument();
    expect(screen.getByTestId('services-component')).toBeInTheDocument();
    expect(screen.getByTestId('testimonials-component')).toBeInTheDocument();
  });

  it('renders sections in the correct order', () => {
    renderHome();
    
    // Get all section elements
    const sections = screen.getAllByTestId(/-component$/);
    
    // Check if sections are in the correct order
    expect(sections[0]).toHaveTextContent('Hero Component');
    expect(sections[1]).toHaveTextContent('About Component');
    expect(sections[2]).toHaveTextContent('Services Component');
    expect(sections[3]).toHaveTextContent('Testimonials Component');
  });
}); 