import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../layout/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

// Mock useMediaQuery hook
jest.mock('@mui/material/useMediaQuery', () => jest.fn().mockReturnValue(false));

describe('Navbar Component', () => {
  // Mock props
  const mockProps = {
    locale: 'en' as const,
    onLanguageChange: jest.fn()
  };

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <IntlProvider locale="en" messages={{}}>
          <Navbar locale={mockProps.locale} onLanguageChange={mockProps.onLanguageChange} />
        </IntlProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo', () => {
    renderNavbar();
    const logoElement = screen.getByAltText(/presidential chauffeurs/i);
    expect(logoElement).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderNavbar();
    
    // Check for desktop navigation links
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/services/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/fleet/i)).toBeInTheDocument();
    expect(screen.getByText(/gallery/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    // Mock useMediaQuery to return true (mobile view)
    require('@mui/material/useMediaQuery').mockReturnValue(true);
    
    renderNavbar();
    
    // Find and click the menu button
    const menuButton = screen.getByLabelText(/menu/i);
    expect(menuButton).toBeInTheDocument();
    
    // Initially, mobile menu should be closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    // Click to open menu
    fireEvent.click(menuButton);
    
    // Now mobile menu should be open
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Click again to close
    fireEvent.click(menuButton);
    
    // Menu should be closed again
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    
    // Reset mock
    require('@mui/material/useMediaQuery').mockReturnValue(false);
  });

  it('changes language when language selector is used', () => {
    renderNavbar();
    
    // Find language selector
    const languageSelector = screen.getByLabelText(/language/i);
    expect(languageSelector).toBeInTheDocument();
    
    // Click to open language menu
    fireEvent.click(languageSelector);
    
    // Select a different language
    const spanishOption = screen.getByText(/español/i);
    fireEvent.click(spanishOption);
    
    // Check if onLanguageChange was called with the correct language
    expect(mockProps.onLanguageChange).toHaveBeenCalledWith('es');
  });
}); 