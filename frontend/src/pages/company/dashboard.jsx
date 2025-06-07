import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';
import DashboardSummary from '../../components/company/DashboardSummary';
import PostJob from '../../components/company/PostJob';

const StatCard = ({ title, value, icon, color }) => (
  <Card
    elevation={3}
    sx={{
      height: '100%',
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
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        {icon}
        <Typography variant="h3" component="div">
          {value}
        </Typography>
        <Typography color="text.secondary" variant="h6">
          {title}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats] = useState({
    totalJobs: 25,
    totalApplicants: 150,
    shortlisted: 45,
    hired: 20,
  });

  // Dummy data for job applications
  const [applications] = useState([
    {
      id: 1,
      position: 'Software Engineer Intern',
      applicantName: 'John Doe',
      college: 'ABC Institute of Technology',
      status: 'Shortlisted',
      appliedDate: '2024-02-15',
    },
    {
      id: 2,
      position: 'Data Analyst Intern',
      applicantName: 'Jane Smith',
      college: 'XYZ University',
      status: 'Under Review',
      appliedDate: '2024-02-20',
    },
    {
      id: 3,
      position: 'Frontend Developer',
      applicantName: 'Mike Johnson',
      college: 'Tech University',
      status: 'Hired',
      appliedDate: '2024-02-10',
    },
    // Add more dummy data as needed
  ]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'hired':
        return 'success';
      case 'shortlisted':
        return 'primary';
      case 'under review':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Company Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Jobs Posted"
            value={stats.totalJobs}
            icon={<WorkIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Applicants"
            value={stats.totalApplicants}
            icon={<PersonIcon sx={{ fontSize: 40, color: 'secondary.main' }} />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Shortlisted"
            value={stats.shortlisted}
            icon={<DescriptionIcon sx={{ fontSize: 40, color: 'warning.main' }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hired"
            value={stats.hired}
            icon={<CheckCircleIcon sx={{ fontSize: 40, color: 'success.main' }} />}
            color="success"
          />
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Applications" />
          <Tab label="Shortlisted" />
          <Tab label="Post New Job" />
        </Tabs>
      </Box>

      {activeTab === 2 ? (
        <PostJob />
      ) : (
        /* Table showing applications */
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Position</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Applied Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications
                .filter(app => 
                  activeTab === 0 || 
                  (activeTab === 1 && app.status.toLowerCase() === 'shortlisted')
                )
                .map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.position}</TableCell>
                    <TableCell>{application.applicantName}</TableCell>
                    <TableCell>{application.college}</TableCell>
                    <TableCell>{application.appliedDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={application.status}
                        color={getStatusChipColor(application.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label="View Details"
                          color="primary"
                          size="small"
                          onClick={() => {}}
                          sx={{ cursor: 'pointer' }}
                        />
                        <Chip
                          label="Update Status"
                          color="secondary"
                          size="small"
                          onClick={() => {}}
                          sx={{ cursor: 'pointer' }}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Dashboard; 