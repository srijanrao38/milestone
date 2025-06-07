import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Chip,
  useTheme,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Slider,
  Stack,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AccessTime as TimeIcon,
  Verified as VerifiedIcon,
  MoreHoriz as MoreHorizIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

function Dashboard() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filters, setFilters] = useState({
    skills: [],
    company: '',
    location: '',
    verificationType: '',
    duration: '',
    jobType: '',
    workMode: '',
    postingDays: 7,
    minApplicants: 0,
  });

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [userInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    education: 'Computer Science',
    avatar: 'https://via.placeholder.com/150',
  });

  const verificationTypes = {
    red: { label: 'Basic', color: '#ff4444' },
    silver: { label: 'Silver', color: '#C0C0C0' },
    blue: { label: 'Premium', color: '#0a66c2' },
    gold: { label: 'Elite', color: '#FFD700' },
  };

  const jobPostings = [
    {
      id: 1,
      company: 'Tech Corp',
      companyLogo: 'https://via.placeholder.com/40',
      position: 'Software Developer Intern',
      location: 'New York, NY',
      description: 'Looking for a motivated intern to join our development team. You will work on cutting-edge projects and learn from industry experts.',
      postedDate: '2 days ago',
      salary: '$25-30/hr',
      requirements: ['React', 'Node.js', 'JavaScript'],
      type: 'Full-time',
      verificationType: 'gold',
      applicants: 245,
      duration: '6 months',
      workMode: 'Hybrid',
    },
    {
      id: 2,
      company: 'Data Systems',
      companyLogo: 'https://via.placeholder.com/40',
      position: 'Data Science Intern',
      location: 'San Francisco, CA',
      description: 'Join our data science team to work on exciting projects involving machine learning and big data analytics.',
      postedDate: '1 day ago',
      salary: '$28-35/hr',
      requirements: ['Python', 'Machine Learning', 'SQL'],
      type: 'Part-time',
      verificationType: 'blue',
      applicants: 189,
      duration: '3 months',
      workMode: 'Remote',
    },
    {
      id: 3,
      company: 'Cloud Solutions',
      companyLogo: 'https://via.placeholder.com/40',
      position: 'Cloud Engineering Intern',
      location: 'Remote',
      description: 'Work with our cloud infrastructure team to help build and maintain scalable cloud solutions.',
      postedDate: '3 days ago',
      salary: '$30-35/hr',
      requirements: ['AWS', 'Docker', 'Kubernetes'],
      type: 'Full-time',
      verificationType: 'silver',
      applicants: 156,
      duration: '4 months',
      workMode: 'On-site',
    },
  ];

  useEffect(() => {
    const filtered = jobPostings.filter(job => {
      // Skills filter
      if (filters.skills.length > 0) {
        const hasRequiredSkills = filters.skills.every(skill =>
          job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
        );
        if (!hasRequiredSkills) return false;
      }

      // Company filter
      if (filters.company && !job.company.toLowerCase().includes(filters.company.toLowerCase())) {
        return false;
      }

      // Location filter
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Verification type filter
      if (filters.verificationType && job.verificationType !== filters.verificationType) {
        return false;
      }

      // Duration filter
      if (filters.duration) {
        const jobDuration = parseInt(job.duration);
        if (jobDuration !== parseInt(filters.duration)) {
          return false;
        }
      }

      // Job type filter
      if (filters.jobType && job.type !== filters.jobType) {
        return false;
      }

      // Work mode filter
      if (filters.workMode && job.workMode !== filters.workMode) {
        return false;
      }

      // Posting days filter
      const postedDays = parseInt(job.postedDate);
      if (postedDays > filters.postingDays) {
        return false;
      }

      // Min applicants filter
      if (job.applicants < filters.minApplicants) {
        return false;
      }

      return true;
    });

    setFilteredJobs(filtered);
  }, [filters]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleApply = (jobId) => {
    console.log(`Applied to job ${jobId}`);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getVerificationBadge = (type) => {
    const { color, label } = verificationTypes[type];
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <VerifiedIcon sx={{ color, fontSize: 20 }} />
        <Typography variant="caption" sx={{ color }}>
          {label}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Student Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar
              src={userInfo.avatar}
              sx={{ width: 80, height: 80, mb: 1 }}
            />
            <Typography variant="h6">{userInfo.name}</Typography>
          </Box>
          <Divider />
          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={userInfo.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary={userInfo.education} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.12)',
            bgcolor: 'background.paper',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FilterIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Filters</Typography>
            <IconButton 
              onClick={() => setFiltersOpen(!filtersOpen)}
              sx={{ ml: 'auto' }}
            >
              <ExpandMoreIcon sx={{ 
                transform: filtersOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.3s'
              }} />
            </IconButton>
          </Box>
          
          <Collapse in={filtersOpen}>
            <Stack spacing={2}>
              {/* Skills Filter */}
              <TextField
                fullWidth
                label="Skills"
                placeholder="Enter skills (e.g., React, Python)"
                value={filters.skills.join(', ')}
                onChange={(e) => handleFilterChange('skills', e.target.value.split(',').map(s => s.trim()))}
              />

              {/* Company Filter */}
              <TextField
                fullWidth
                label="Company"
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
              />

              {/* Location Filter */}
              <TextField
                fullWidth
                label="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />

              {/* Verification Type Filter */}
              <FormControl fullWidth>
                <InputLabel>Verification Type</InputLabel>
                <Select
                  value={filters.verificationType}
                  label="Verification Type"
                  onChange={(e) => handleFilterChange('verificationType', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="red">Basic</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="blue">Premium</MenuItem>
                  <MenuItem value="gold">Elite</MenuItem>
                </Select>
              </FormControl>

              {/* Duration Filter */}
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={filters.duration}
                  label="Duration"
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1 month</MenuItem>
                  <MenuItem value="2">2 months</MenuItem>
                  <MenuItem value="3">3 months</MenuItem>
                  <MenuItem value="6">6 months</MenuItem>
                </Select>
              </FormControl>

              {/* Job Type Filter */}
              <FormControl fullWidth>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={filters.jobType}
                  label="Job Type"
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </Select>
              </FormControl>

              {/* Work Mode Filter */}
              <FormControl fullWidth>
                <InputLabel>Work Mode</InputLabel>
                <Select
                  value={filters.workMode}
                  label="Work Mode"
                  onChange={(e) => handleFilterChange('workMode', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>

              {/* Posting Days Filter */}
              <Box>
                <Typography gutterBottom>Posted within (days)</Typography>
                <Slider
                  value={filters.postingDays}
                  onChange={(e, value) => handleFilterChange('postingDays', value)}
                  min={1}
                  max={30}
                  valueLabelDisplay="auto"
                />
              </Box>

              {/* Min Applicants Filter */}
              <Box>
                <Typography gutterBottom>Minimum Applicants</Typography>
                <Slider
                  value={filters.minApplicants}
                  onChange={(e, value) => handleFilterChange('minApplicants', value)}
                  min={0}
                  max={500}
                  step={10}
                  valueLabelDisplay="auto"
                />
              </Box>

              {/* Clear Filters Button */}
              <Button
                variant="outlined"
                onClick={() => setFilters({
                  skills: [],
                  company: '',
                  location: '',
                  verificationType: '',
                  duration: '',
                  jobType: '',
                  workMode: '',
                  postingDays: 7,
                  minApplicants: 0,
                })}
                sx={{ mt: 2 }}
              >
                Clear All Filters
              </Button>
            </Stack>
          </Collapse>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ maxWidth: 680, mx: 'auto' }}>
          {filteredJobs.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No jobs match your current filters
              </Typography>
              <Button
                variant="text"
                onClick={() => setFilters({
                  skills: [],
                  company: '',
                  location: '',
                  verificationType: '',
                  duration: '',
                  jobType: '',
                  workMode: '',
                  postingDays: 7,
                  minApplicants: 0,
                })}
                sx={{ mt: 1 }}
              >
                Clear Filters
              </Button>
            </Paper>
          ) : (
            filteredJobs.map((job) => (
              <Paper
                key={job.id}
                elevation={1}
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden',
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                {/* Post Header */}
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={job.companyLogo} sx={{ width: 48, height: 48 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {job.company}
                      </Typography>
                      {getVerificationBadge(job.verificationType)}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {job.postedDate} • {job.applicants} applicants
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <MoreHorizIcon />
                  </IconButton>
                </Box>

                {/* Post Content */}
                <Box sx={{ px: 2, pb: 2 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {job.position}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <LocationIcon color="action" fontSize="small" />
                    <Typography variant="body2">{job.location}</Typography>
                    <Chip
                      label={job.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                    <Chip
                      label={job.workMode}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                    <Chip
                      label={job.duration}
                      size="small"
                      color="info"
                      variant="outlined"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {job.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                    {job.requirements.map((req, idx) => (
                      <Chip
                        key={idx}
                        label={req}
                        size="small"
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          color: 'white',
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="subtitle2" color="primary" sx={{ mb: 2 }}>
                    {job.salary}
                  </Typography>

                  {/* Post Actions */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 2,
                    mt: 2,
                  }}>
                    <Button
                      variant="contained"
                      startIcon={<WorkIcon />}
                      onClick={() => handleApply(job.id)}
                      sx={{
                        flexGrow: 1,
                        textTransform: 'none',
                        borderRadius: 2,
                        mr: 1,
                      }}
                    >
                      Apply Now
                    </Button>
                    <IconButton>
                      <BookmarkIcon />
                    </IconButton>
                    <IconButton>
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
