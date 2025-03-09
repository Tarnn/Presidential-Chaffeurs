import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import VehicleCard from "../components/VehicleCard";
import { Vehicle } from "../types";
import media from "../config/media.json";
// Import static vehicle data
import vehicleData from "../vehicle.json";

const VehicleListPage: React.FC = () => {
  // Use static data instead of state and API call
  const vehicles: Vehicle[] = vehicleData;

  return (
    <Box component="section">
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '30vh',
          width: '100%',
          overflow: 'hidden',
          mb: 6,
        }}
      >
        <Box
          component="img"
          src={media.images.placeholders.fleet["1"]}
          alt="Fleet Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 48%',
            filter: 'brightness(0.7)',
            imageRendering: 'high-quality',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
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
          <Typography 
            variant="h2"
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Our Elite Fleet
          </Typography>
        </Box>
      </Box>

      <Box sx={{ px: 4 }}>
        <Grid container spacing={4}>
          {vehicles.map((vehicle) => (
            <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
              <VehicleCard vehicle={vehicle} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default VehicleListPage;
