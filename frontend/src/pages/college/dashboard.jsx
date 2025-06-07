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
  Rating,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  School as SchoolIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

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

const JobCard = ({ job, onRatingChange }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div">
              {job.title}
            </Typography>
            <Box>
              <IconButton onClick={() => setIsBookmarked(!isBookmarked)}>
                {isBookmarked ? <BookmarkIcon color="primary" /> : <BookmarkBorderIcon />}
              </IconButton>
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" color="text.secondary">
            {job.company}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Chip icon={<WorkIcon />} label={job.type} size="small" />
            <Chip icon={<SchoolIcon />} label={job.location} size="small" />
            <Typography variant="body2" color="text.secondary">
              Posted: {job.postedDate}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            {job.description}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography component="legend">College Rating:</Typography>
            <Rating
              value={job.collegeRating}
              onChange={(event, newValue) => onRatingChange(job.id, newValue)}
              icon={<StarIcon fontSize="inherit" />}
              emptyIcon={<StarIcon fontSize="inherit" />}
            />
            <Chip 
              label={`${job.applicants} Students Applied`}
              color="primary"
              variant="outlined"
              size="small"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [stats] = useState({
    totalStudents: 150,
    activeInternships: 45,
    completedInternships: 75,
    totalApplications: 280,
  });

  const [jobs] = useState([
    {
      id: 1,
      title: 'Software Engineer Intern',
      company: 'Tech Corp',
      type: 'Full-time',
      location: 'Remote',
      description: 'Looking for talented software engineering interns to join our dynamic team...',
      postedDate: '2024-02-15',
      collegeRating: 4,
      applicants: 12,
    },
    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Data Systems Inc',
      type: 'Part-time',
      location: 'Hybrid',
      description: 'Seeking data science interns with strong analytical skills...',
      postedDate: '2024-02-18',
      collegeRating: 3,
      applicants: 8,
    },
    // Add more job listings as needed
  ]);

  const [students] = useState([
    {
      id: 1,
      name: 'John Doe',
      rollNo: 'CS2021001',
      company: 'Tech Corp',
      position: 'Software Engineer Intern',
      status: 'Working',
      startDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNo: 'CS2021002',
      company: 'Data Systems',
      position: 'Data Analyst Intern',
      status: 'Applied',
      applicationDate: '2024-02-20',
    },
    // Add more dummy data as needed
  ]);

  const [filters, setFilters] = useState({
    jobType: 'all',
    location: 'all',
    rating: 'all',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleRatingChange = (jobId, newRating) => {
    // Here you would typically update the rating in your backend
    console.log(`Updated rating for job ${jobId} to ${newRating}`);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const getStatusChipColor = (status) => {
    switch (status.toLowerCase()) {
      case 'working':
        return 'success';
      case 'applied':
        return 'primary';
      case 'completed':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.jobType !== 'all' && job.type !== filters.jobType) {
      return false;
    }
    if (filters.location !== 'all' && job.location !== filters.location) {
      return false;
    }
    if (filters.rating !== 'all' && job.collegeRating < parseInt(filters.rating)) {
      return false;
    }
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        College Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon={<PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Internships"
            value={stats.activeInternships}
            icon={<WorkIcon sx={{ fontSize: 40, color: 'success.main' }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Internships"
            value={stats.completedInternships}
            icon={<CheckCircleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Applications"
            value={stats.totalApplications}
            icon={<SchoolIcon sx={{ fontSize: 40, color: 'warning.main' }} />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="All Students" />
          <Tab label="Active Internships" />
          <Tab label="Job Posts" />
        </Tabs>
      </Box>

      {activeTab === 2 ? (
        <>
          {/* Job Posts Toolbar */}
          <Paper sx={{ p: 2, mb: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack direction="row" spacing={2}>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      name="jobType"
                      value={filters.jobType}
                      onChange={handleFilterChange}
                      label="Job Type"
                    >
                      <MenuItem value="all">All Types</MenuItem>
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Location</InputLabel>
                    <Select
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                      label="Location"
                    >
                      <MenuItem value="all">All Locations</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                      <MenuItem value="Hybrid">Hybrid</MenuItem>
                      <MenuItem value="On-site">On-site</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Min Rating</InputLabel>
                    <Select
                      name="rating"
                      value={filters.rating}
                      onChange={handleFilterChange}
                      label="Min Rating"
                    >
                      <MenuItem value="all">All Ratings</MenuItem>
                      <MenuItem value="4">4+ Stars</MenuItem>
                      <MenuItem value="3">3+ Stars</MenuItem>
                      <MenuItem value="2">2+ Stars</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          {/* Job Listings */}
          <Box>
            {filteredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                onRatingChange={handleRatingChange}
              />
            ))}
          </Box>
        </>
      ) : (
        /* Student Table */
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Roll No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.company}</TableCell>
                  <TableCell>{student.position}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.status}
                      color={getStatusChipColor(student.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {student.startDate || student.applicationDate}
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