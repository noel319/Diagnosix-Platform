import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  Divider
} from '@mui/material';
import {
  Person as PersonIcon,
  MedicalServices as DoctorIcon,
  AdminPanelSettings as AdminIcon,
  Upload as UploadIcon,
  Dashboard as DashboardIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Get icon based on user role
  const getRoleIcon = () => {
    switch (user?.role) {
      case 'doctor':
        return <DoctorIcon fontSize="large" color="primary" />;
      case 'admin':
        return <AdminIcon fontSize="large" color="primary" />;
      default:
        return <PersonIcon fontSize="large" color="primary" />;
    }
  };
  
  // Get content based on user role
  const getRoleContent = () => {
    switch (user?.role) {
      case 'doctor':
        return (
          <>
            <Typography variant="h6" gutterBottom>Doctor Dashboard</Typography>
            <Typography variant="body1" paragraph>
              Welcome to your doctor dashboard. Here you can manage patient diagnostics, 
              view uploaded medical images, and add professional assessments.
            </Typography>
            <Box sx={{ my: 2 }}>
              <Chip 
                label="Doctor Portal" 
                color="primary" 
                icon={<DoctorIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label="View Patient Files" 
                color="secondary" 
                icon={<DashboardIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label="Manage Appointments" 
                color="info" 
                icon={<EventIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
            </Box>
          </>
        );
      case 'admin':
        return (
          <>
            <Typography variant="h6" gutterBottom>Admin Dashboard</Typography>
            <Typography variant="body1" paragraph>
              Welcome to the admin dashboard. Here you can manage users, monitor system 
              activity, and configure system settings.
            </Typography>
            <Box sx={{ my: 2 }}>
              <Chip 
                label="Admin Portal" 
                color="primary" 
                icon={<AdminIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label="User Management" 
                color="secondary" 
                icon={<PersonIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label="System Settings" 
                color="info" 
                icon={<DashboardIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
            </Box>
          </>
        );
      default:
        return (
          <>
            <Typography variant="h6" gutterBottom>Patient Dashboard</Typography>
            <Typography variant="body1" paragraph>
              Welcome to your patient dashboard. Here you can upload medical images for 
              diagnosis, view your records, and manage your appointments.
            </Typography>
            <Box sx={{ my: 2 }}>
              <Chip 
                label="Upload Images" 
                color="primary" 
                icon={<UploadIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label="My Records" 
                color="secondary" 
                icon={<DashboardIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
              <Chip 
                label="My Appointments" 
                color="info" 
                icon={<EventIcon />} 
                sx={{ mr: 1, mb: 1 }}
              />
            </Box>
          </>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Card */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getRoleIcon()}
              <Typography variant="h4" component="h1" sx={{ ml: 2 }}>
                Welcome, {user?.full_name || user?.username}!
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            {getRoleContent()}
          </Paper>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Account
              </Typography>
              <Typography variant="h5" component="div">
                {user?.username}
              </Typography>
              <Typography color="textSecondary">
                <Chip 
                  label={user?.role} 
                  size="small" 
                  color="primary" 
                  sx={{ textTransform: 'capitalize', mt: 1 }}
                />
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                Joined: {new Date(user?.created_at || '').toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Status
              </Typography>
              <Typography variant="h5" component="div">
                Active
              </Typography>
              <Typography color="textSecondary">
                Account in good standing
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                Last login: {new Date().toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Activity
              </Typography>
              <Typography variant="h5" component="div">
                Recent
              </Typography>
              <Typography color="textSecondary">
                No pending notifications
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                Last updated: {new Date().toLocaleTimeString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;