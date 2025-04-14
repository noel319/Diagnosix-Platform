import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import { 
  Person as PersonIcon,
  Email as EmailIcon,
  AccessTime as TimeIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography>Loading user profile...</Typography>
        </Paper>
      </Container>
    );
  }

  // Function to get avatar color based on role
  const getAvatarColor = () => {
    switch (user.role) {
      case 'doctor':
        return '#1976d2'; // blue
      case 'admin':
        return '#d32f2f'; // red
      default:
        return '#388e3c'; // green
    }
  };

  // Format dates
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, mb: 3 }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              bgcolor: getAvatarColor(),
              fontSize: '2.5rem',
              mr: { xs: 0, sm: 3 },
              mb: { xs: 2, sm: 0 }
            }}
          >
            {user.username[0].toUpperCase()}
          </Avatar>
          
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h4" gutterBottom>
              {user.full_name || user.username}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
              <Chip
                icon={<PersonIcon />}
                label={user.role}
                color="primary"
                size="small"
                sx={{ mr: 1, mb: 1, textTransform: 'capitalize' }}
              />
              {user.is_active && (
                <Chip
                  label="Active Account"
                  color="success"
                  size="small"
                  sx={{ mr: 1, mb: 1 }}
                />
              )}
            </Box>
            
            <Typography variant="body2" color="textSecondary">
              Member since {formatDate(user.created_at).split(',')[0]}
            </Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PersonIcon sx={{ mr: 1 }} />
              Account Information
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Username" 
                  secondary={user.username} 
                  primaryTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Full Name" 
                  secondary={user.full_name || 'Not provided'} 
                  primaryTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Email" 
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ fontSize: 16, mr: 0.5, color: 'action.active' }} />
                      {user.email}
                    </Box>
                  } 
                  primaryTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Role" 
                  secondary={
                    <Chip
                      label={user.role}
                      size="small"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  }
                  primaryTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                />
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SecurityIcon sx={{ mr: 1 }} />
              Account Details
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText 
                  primary="Account Status" 
                  secondary={user.is_active ? 'Active' : 'Inactive'} 
                  primaryTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                  secondaryTypographyProps={{ 
                    variant: 'body1',
                    color: user.is_active ? 'success.main' : 'error.main'
                  }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Created At" 
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'action.active' }} />
                      {formatDate(user.created_at)}
                    </Box>
                  } 
                  primaryTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Last Updated" 
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'action.active' }} />
                      {formatDate(user.updated_at)}
                    </Box>
                  } 
                  primaryTypographyProps={{ variant: 'body2', color: 'textSecondary' }}
                  secondaryTypographyProps={{ variant: 'body1' }}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;