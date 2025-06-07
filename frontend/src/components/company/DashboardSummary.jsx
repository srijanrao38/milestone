import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={3}
    sx={{
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      height: 200,
      width: '100%',
      bgcolor: `${color}.light`,
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        bgcolor: `${color}.main`,
        '& .MuiTypography-root': { color: 'white' },
        '& .MuiSvgIcon-root': { color: 'white' },
      },
    }}
  >
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: 2
    }}>
      {React.cloneElement(icon, { sx: { fontSize: 50 } })}
      <Typography component="h2" variant="h3" align="center">
        {value}
      </Typography>
      <Typography 
        color="text.secondary" 
        variant="h6" 
        align="center"
        sx={{ 
          mt: 1,
          fontWeight: 500
        }}
      >
        {title}
      </Typography>
    </Box>
  </Paper>
);

const DashboardSummary = () => {
  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    shortlisted: 0,
    pending: 0,
  });

  useEffect(() => {
    // TODO: Fetch actual statistics from the backend
    // For now, using dummy data
    setStats({
      totalJobs: 12,
      totalApplicants: 48,
      shortlisted: 15,
      pending: 33,
    });
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <StatCard
              title="Total Jobs Posted"
              value={stats.totalJobs}
              icon={<WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
              color="primary"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <StatCard
              title="Total Applicants"
              value={stats.totalApplicants}
              icon={<PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />}
              color="secondary"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <StatCard
              title="Shortlisted"
              value={stats.shortlisted}
              icon={<CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />}
              color="success"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <StatCard
              title="Pending Review"
              value={stats.pending}
              icon={<PendingIcon sx={{ fontSize: 40, color: 'warning.main' }} />}
              color="warning"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardSummary; 