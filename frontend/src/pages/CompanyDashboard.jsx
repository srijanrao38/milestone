import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Tab, Tabs } from '@mui/material';
import DashboardSummary from '../components/company/DashboardSummary';
import PostJob from '../components/company/PostJob';

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Company Dashboard
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Dashboard Overview" />
          <Tab label="Post New Job" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DashboardSummary />
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <PostJob />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CompanyDashboard; 