import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { createBreadcrumbData } from '../../utils/structuredData';
import { FormattedMessage } from 'react-intl';

interface BreadcrumbItem {
  name: string;
  url: string;
  translationKey?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

/**
 * Breadcrumbs component for navigation and SEO
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ 
  items = [], 
  showHome = true 
}) => {
  const location = useLocation();
  
  // Generate breadcrumbs based on current path if not provided
  const breadcrumbs: BreadcrumbItem[] = items.length > 0 ? items : generateBreadcrumbs(location.pathname);
  
  // Add home as first item if showHome is true
  if (showHome && (breadcrumbs.length === 0 || breadcrumbs[0].url !== '/')) {
    breadcrumbs.unshift({
      name: 'Home',
      url: '/',
      translationKey: 'breadcrumbs.home'
    });
  }
  
  // Create structured data for SEO
  const structuredData = createBreadcrumbData(breadcrumbs);

  return (
    <>
      {/* Structured data for SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Breadcrumbs UI */}
      <Box 
        sx={{ 
          py: 2, 
          px: { xs: 2, sm: 3 },
          backgroundColor: 'background.paper',
          borderRadius: 1,
          mb: 3
        }}
      >
        <MuiBreadcrumbs aria-label="breadcrumb" separator="›">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return isLast ? (
              <Typography 
                key={item.url} 
                color="primary"
                sx={{ fontWeight: 'medium' }}
              >
                {item.translationKey ? (
                  <FormattedMessage id={item.translationKey} defaultMessage={item.name} />
                ) : (
                  item.name
                )}
              </Typography>
            ) : (
              <Link
                key={item.url}
                component={RouterLink}
                to={item.url}
                color="inherit"
                underline="hover"
              >
                {item.translationKey ? (
                  <FormattedMessage id={item.translationKey} defaultMessage={item.name} />
                ) : (
                  item.name
                )}
              </Link>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    </>
  );
};

/**
 * Generate breadcrumbs based on URL path
 */
const generateBreadcrumbs = (path: string): BreadcrumbItem[] => {
  // Skip for home page
  if (path === '/') return [];
  
  // Split path into segments
  const segments = path.split('/').filter(Boolean);
  
  // Map path segments to breadcrumb items
  return segments.map((segment, index) => {
    // Create URL for this breadcrumb
    const url = '/' + segments.slice(0, index + 1).join('/');
    
    // Format name (capitalize, replace hyphens with spaces)
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Try to find translation key
    const translationKey = `breadcrumbs.${segment.toLowerCase()}`;
    
    return { name, url, translationKey };
  });
};

export default Breadcrumbs; 