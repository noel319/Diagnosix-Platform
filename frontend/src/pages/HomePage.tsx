import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  useTheme 
} from '@mui/material';
import { 
  Security as SecurityIcon, 
  CloudUpload as UploadIcon, 
  MedicalServices as MedicalIcon 
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  return (
    <>
      <Header />
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8, 
          mb: 4 
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Diagnosix
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Medical Image Processing and Diagnostic Platform
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 700 }}>
            Securely upload, store, and analyze medical images with our state-of-the-art 
            diagnostic platform. Connecting patients and healthcare professionals for 
            faster, more accurate diagnoses.
          </Typography>
          
          {!isAuthenticated && (
            <Box sx={{ mt: 4 }}>
              <Button 
                component={RouterLink} 
                to="/register" 
                variant="contained" 
                size="large" 
                color="secondary" 
                sx={{ mr: 2, mb: 2 }}
              >
                Register
              </Button>
              <Button 
                component={RouterLink} 
                to="/login" 
                variant="outlined" 
                size="large" 
                sx={{ color: 'white', borderColor: 'white', mb: 2 }}
              >
                Login
              </Button>
            </Box>
          )}
          
          {isAuthenticated && (
            <Box sx={{ mt: 4 }}>
              <Button 
                component={RouterLink} 
                to="/dashboard" 
                variant="contained" 
                size="large" 
                color="secondary"
              >
                Go to Dashboard
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%', 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <SecurityIcon color="primary" sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h5" component="h3" gutterBottom align="center">
                Secure Authentication
              </Typography>
              <Typography>
                Role-based access control ensures that only authorized personnel can access 
                sensitive medical data. Our platform supports patient, doctor, and admin roles 
                with appropriate permissions.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <UploadIcon color="primary" sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h5" component="h3" gutterBottom align="center">
                File Upload Service
              </Typography>
              <Typography>
                Easily upload medical images in various formats including DICOM, JPG, PNG, and PDF. 
                Our system securely stores files in MinIO and maintains metadata in PostgreSQL for 
                efficient retrieval.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                }
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <MedicalIcon color="primary" sx={{ fontSize: 60 }} />
              </Box>
              <Typography variant="h5" component="h3" gutterBottom align="center">
                Medical Diagnostics
              </Typography>
              <Typography>
                Healthcare professionals can review uploaded images, provide diagnoses, and 
                communicate results securely. Our platform streamlines the diagnostic workflow 
                from image upload to final assessment.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;