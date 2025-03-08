import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import VehicleCard from "../components/VehicleCard";
import { Vehicle } from "../types";

const VehicleListPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    axios
      .get("/api/vehicles")
      .then((response) => setVehicles(response.data as Vehicle[]))
      .catch((error) => console.error("Error fetching vehicles:", error));
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Our Elite Fleet
      </Typography>
      <Grid container spacing={4}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} sm={6} md={4} key={vehicle.id}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default VehicleListPage;
