import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Container,
} from '@mui/material';

const PostJob = () => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
    type: 'full-time',
    experience: '',
    skills: [],
    requirements: '',
    responsibilities: '',
  });

  const [skillInput, setSkillInput] = useState('');

  const jobTypes = [
    'full-time',
    'part-time',
    'contract',
    'internship',
    'remote',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillInputKeyPress = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!jobData.skills.includes(skillInput.trim())) {
        setJobData((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }));
      }
      setSkillInput('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setJobData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement job posting logic
    console.log('Job Data:', jobData);
    // Reset form after successful submission
    setJobData({
      title: '',
      description: '',
      location: '',
      salary: '',
      type: 'full-time',
      experience: '',
      skills: [],
      requirements: '',
      responsibilities: '',
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 6 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6, fontWeight: 'bold' }}>
          Post a New Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'medium' }}>
                Basic Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Box>
            </Grid>

            <Grid item>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Job Type</InputLabel>
                <Select
                  name="type"
                  value={jobData.type}
                  onChange={handleChange}
                  label="Job Type"
                  sx={{ backgroundColor: 'background.paper' }}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <TextField
                required
                fullWidth
                label="Location"
                name="location"
                value={jobData.location}
                onChange={handleChange}
                variant="outlined"
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                fullWidth
                label="Salary Range"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                placeholder="e.g., $50,000 - $70,000"
                variant="outlined"
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Grid>

            <Grid item>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'medium' }}>
                Job Details
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  required
                  fullWidth
                  label="Job Description"
                  name="description"
                  value={jobData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  variant="outlined"
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Add Skills (Press Enter to add)"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  onKeyPress={handleSkillInputKeyPress}
                  placeholder="Type a skill and press Enter"
                  variant="outlined"
                  sx={{ backgroundColor: 'background.paper' }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '50px' }}>
                {jobData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => handleDeleteSkill(skill)}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>

            <Grid item>
              <TextField
                required
                fullWidth
                label="Requirements"
                name="requirements"
                value={jobData.requirements}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="List the key requirements for this position"
                variant="outlined"
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Grid>

            <Grid item>
              <TextField
                required
                fullWidth
                label="Responsibilities"
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="List the key responsibilities for this position"
                variant="outlined"
                sx={{ backgroundColor: 'background.paper' }}
              />
            </Grid>

            <Grid item>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 8,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: 2,
                  }}
                >
                  Post Job
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostJob; 