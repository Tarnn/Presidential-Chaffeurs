import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const GalleryPage: React.FC = () => {
  return (
    <Box component="section" py={8}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
          <FormattedMessage id="nav.gallery" defaultMessage="Gallery" />
        </Typography>
        {/* Gallery grid will be added here */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 3 }}>
          {/* Gallery items will be mapped here */}
        </Box>
      </Container>
    </Box>
  );
};

export default GalleryPage; 