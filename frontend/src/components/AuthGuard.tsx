import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  CircularProgress, 
  Typography 
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Check if user has required role (if specified)
  const hasRequiredRole = (): boolean => {
    if (!requiredRoles.length) return true;
    if (!user) return false;
    return requiredRoles.includes(user.role);
  };

  // If still loading, show loading spinner
  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '80vh' 
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Authenticating...
        </Typography>
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role check fails, redirect to dashboard with insufficient permissions
  if (!hasRequiredRole()) {
    return <Navigate to="/dashboard" state={{ permissionDenied: true }} replace />;
  }

  // If authenticated and has required role, render children
  return <>{children}</>;
};

export default AuthGuard;