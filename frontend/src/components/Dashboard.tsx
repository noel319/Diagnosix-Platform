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