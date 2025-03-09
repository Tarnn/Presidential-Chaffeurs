import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import media from '../config/media.json';
import InstagramIcon from '@mui/icons-material/Instagram';

const GalleryPage: React.FC = () => {
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your Instagram Graph API token and user ID
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=YOUR_ACCESS_TOKEN`
        );
        const data = await response.json();
        setInstagramPosts(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <Box component="section">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '40vh',
          width: '100%',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={media.images.placeholders.gallery["1"]}
          alt="Gallery Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.7)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'white',
            width: '100%',
            padding: 4,
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            <FormattedMessage id="nav.gallery" defaultMessage="Gallery" />
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg">
        {/* Description Section */}
        <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="h5" color="text.primary" sx={{ mb: 4 }}>
            Explore our collection of memorable moments captured at real events with our valued customers. 
            Each photo tells a story of luxury, elegance, and exceptional service.
          </Typography>
        </Box>

        {/* Instagram Feed Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <InstagramIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
          <Typography variant="h4" gutterBottom>
            Follow Our Journey
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Stay updated with our latest events and services on Instagram
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Loading Instagram feed...</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 3,
            }}
          >
            {instagramPosts.map((post) => (
              <Paper
                key={post.id}
                elevation={2}
                sx={{
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    component="img"
                    src={post.media_url}
                    alt={post.caption || 'Instagram post'}
                    sx={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                    }}
                  />
                  {post.caption && (
                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {post.caption}
                      </Typography>
                    </Box>
                  )}
                </a>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GalleryPage; 