import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define the base URL for API requests
const API_BASE_URL = 'https://presidential-chauffeurs-node-nqnv.vercel.app';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // 15 seconds timeout
  withCredentials: false, // Important for CORS requests
});

/**
 * Generic API request function with error handling
 * @param method - HTTP method (get, post, put, delete)
 * @param url - API endpoint
 * @param data - Request data (for POST, PUT)
 * @param config - Additional axios config
 * @returns Promise with response data
 */
export const apiRequest = async <T = any>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    let response: AxiosResponse<T>;

    switch (method) {
      case 'get':
        response = await apiClient.get<T>(url, config);
        break;
      case 'post':
        response = await apiClient.post<T>(url, data, config);
        break;
      case 'put':
        response = await apiClient.put<T>(url, data, config);
        break;
      case 'delete':
        response = await apiClient.delete<T>(url, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response.data;
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

/**
 * Handle API errors with detailed logging
 * @param error - Axios error object
 */
const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', {
      data: error.response.data,
      status: error.response.status,
      headers: error.response.headers,
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API Error Request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error Message:', error.message);
  }
  console.error('API Error Config:', error.config);
};

/**
 * Send an inquiry to the server
 * @param inquiryData - Inquiry data
 * @returns Promise with response data
 */
export const sendInquiry = async (inquiryData: {
  vehicleId: number;
  vehicleName: string;
  purpose: string;
  date: string;
  description: string;
  email: string;
  captchaToken: string;
}): Promise<any> => {
  return apiRequest('post', '/api/inquiry', inquiryData);
};

export default apiClient; 