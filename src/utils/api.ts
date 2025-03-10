import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define the base URL for API requests
const API_BASE_URL = 'https://presidential-chauffeurs-node-nqnv.vercel.app';

// Cache configuration
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds
const requestCache = new Map<string, CacheItem<any>>();

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

// Generate a cache key from request details
const generateCacheKey = (method: string, url: string, data?: any): string => {
  return `${method}:${url}:${data ? JSON.stringify(data) : ''}`;
};

// Check if a cached response is still valid
const isCacheValid = <T>(cacheItem: CacheItem<T>): boolean => {
  return Date.now() - cacheItem.timestamp < CACHE_TTL;
};

/**
 * Generic API request function with error handling, caching, and retry
 * @param method - HTTP method (get, post, put, delete)
 * @param url - API endpoint
 * @param data - Request data (for POST, PUT)
 * @param config - Additional axios config
 * @param useCache - Whether to use cache for GET requests (default: true)
 * @param retries - Number of retries on failure (default: 1)
 * @returns Promise with response data
 */
export const apiRequest = async <T = any>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
  useCache: boolean = true,
  retries: number = 1
): Promise<T> => {
  // Only cache GET requests
  const canUseCache = method === 'get' && useCache;
  
  if (canUseCache) {
    const cacheKey = generateCacheKey(method, url, data);
    const cachedResponse = requestCache.get(cacheKey);
    
    if (cachedResponse && isCacheValid(cachedResponse)) {
      return cachedResponse.data;
    }
  }
  
  let lastError: Error | null = null;
  let attempts = 0;
  
  while (attempts <= retries) {
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
      
      // Cache successful GET responses
      if (canUseCache) {
        const cacheKey = generateCacheKey(method, url, data);
        requestCache.set(cacheKey, {
          data: response.data,
          timestamp: Date.now()
        });
      }

      return response.data;
    } catch (error) {
      lastError = error as Error;
      attempts++;
      
      // Only retry on network errors or 5xx server errors
      const axiosError = error as AxiosError;
      const shouldRetry = !axiosError.response || 
                          (axiosError.response && axiosError.response.status >= 500);
      
      if (!shouldRetry || attempts > retries) {
        break;
      }
      
      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempts - 1), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // If we got here, all retries failed
  handleApiError(lastError as AxiosError);
  throw lastError;
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
  // Don't use cache for POST requests, but enable retry
  return apiRequest('post', '/api/inquiry', inquiryData, undefined, false, 2);
};

// Clean up expired cache items periodically
setInterval(() => {
  const now = Date.now();
  Array.from(requestCache.entries()).forEach(([key, value]) => {
    if (now - value.timestamp > CACHE_TTL) {
      requestCache.delete(key);
    }
  });
}, CACHE_TTL);

export default apiClient; 