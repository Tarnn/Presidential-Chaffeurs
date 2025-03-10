import React, { useState } from 'react';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

/**
 * Component to test CORS configuration with the server
 */
const CorsTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
    data?: any;
  }>({});

  const testCors = async () => {
    setLoading(true);
    setResult({});

    try {
      // Test the CORS configuration with the server
      const response = await axios.get(
        'https://presidential-chauffeurs-node-nqnv.vercel.app/api/cors-test',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: false
        }
      );

      setResult({
        success: true,
        message: 'CORS test successful',
        data: response.data
      });
    } catch (error: any) {
      console.error('CORS test error:', error);
      
      setResult({
        success: false,
        message: 'CORS test failed',
        error: error.message,
        data: error.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  const testHealth = async () => {
    setLoading(true);
    setResult({});

    try {
      // Test the health endpoint
      const response = await axios.get(
        'https://presidential-chauffeurs-node-nqnv.vercel.app/health',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: false
        }
      );

      setResult({
        success: true,
        message: 'Health check successful',
        data: response.data
      });
    } catch (error: any) {
      console.error('Health check error:', error);
      
      setResult({
        success: false,
        message: 'Health check failed',
        error: error.message,
        data: error.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        CORS Test
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={testCors}
          disabled={loading}
        >
          Test CORS
        </Button>
        
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={testHealth}
          disabled={loading}
        >
          Test Health Endpoint
        </Button>
      </Box>
      
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
      
      {(result.success !== undefined) && (
        <Paper sx={{ p: 2, bgcolor: result.success ? 'success.light' : 'error.light', color: 'white' }}>
          <Typography variant="h6">{result.message}</Typography>
          
          {result.error && (
            <Typography variant="body1" sx={{ mt: 1 }}>
              Error: {result.error}
            </Typography>
          )}
          
          {result.data && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Response Data:</Typography>
              <pre style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: '200px' }}>
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default CorsTest; 