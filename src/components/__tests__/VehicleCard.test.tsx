import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import VehicleCard from '../VehicleCard';
import { IntlProvider } from 'react-intl';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Sample vehicle data for testing
const mockVehicle = {
  id: 1,
  name: 'Rolls-Royce Phantom',
  description: 'The epitome of luxury and refinement, perfect for executive travel.',
  rate: 1500,
  photos: [
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg'
  ]
};

// Wrap component with necessary providers
const renderVehicleCard = () => {
  return render(
    <IntlProvider locale="en" messages={{}}>
      <VehicleCard vehicle={mockVehicle} />
    </IntlProvider>
  );
};

describe('VehicleCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful post request
    mockedAxios.post.mockResolvedValue({ data: {} });
  });

  it('renders vehicle information correctly', () => {
    renderVehicleCard();
    
    // Check if vehicle name is displayed
    expect(screen.getByText(mockVehicle.name)).toBeInTheDocument();
    
    // Check if vehicle description is displayed
    expect(screen.getByText(mockVehicle.description)).toBeInTheDocument();
  });

  it('displays form fields for inquiry submission', () => {
    renderVehicleCard();
    
    // Check if form fields are displayed
    expect(screen.getByLabelText(/purpose/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    
    // Check if submit button is displayed
    expect(screen.getByRole('button', { name: /request chauffeur service/i })).toBeInTheDocument();
  });

  it('validates form fields on submission', async () => {
    renderVehicleCard();
    
    // Submit form without filling in required fields
    fireEvent.click(screen.getByRole('button', { name: /request chauffeur service/i }));
    
    // Check if validation error is displayed
    await waitFor(() => {
      expect(screen.getByText(/please fill out all fields correctly/i)).toBeInTheDocument();
    });
  });

  it('submits form data when all fields are valid', async () => {
    renderVehicleCard();
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/purpose/i), { target: { value: 'Executive Airport Transfer' } });
    fireEvent.change(screen.getByLabelText(/date/i), { 
      target: { value: new Date(Date.now() + 86400000).toISOString().split('T')[0] } // Tomorrow
    });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /request chauffeur service/i }));
    
    // Check if axios.post was called with correct data
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "https://presidential-chauffeurs-node-nqnv.vercel.app/api/inquiry",
        expect.objectContaining({
          vehicleId: mockVehicle.id,
          vehicleName: mockVehicle.name,
          purpose: 'Executive Airport Transfer',
          email: 'test@example.com',
          description: 'Test description',
          captchaToken: expect.any(String)
        })
      );
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock failed post request
    mockedAxios.post.mockRejectedValueOnce(new Error('API Error'));
    
    renderVehicleCard();
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/purpose/i), { target: { value: 'Executive Airport Transfer' } });
    fireEvent.change(screen.getByLabelText(/date/i), { 
      target: { value: new Date(Date.now() + 86400000).toISOString().split('T')[0] } // Tomorrow
    });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test description' } });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /request chauffeur service/i }));
    
    // Check if error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/vehiclePage.submitError/i)).toBeInTheDocument();
    });
  });
}); 