declare module '@vercel/analytics/react' {
  import * as React from 'react';
  
  export interface AnalyticsProps {
    /**
     * Whether to enable or disable Analytics. Defaults to true.
     */
    enabled?: boolean;
    /**
     * Debug mode. Defaults to false.
     */
    debug?: boolean;
    /**
     * Custom data to include with events.
     */
    data?: Record<string, unknown>;
  }

  export const Analytics: React.FC<AnalyticsProps>;
} 