import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import AuthGuard from '../components/AuthGuard';

interface LocationState {
  permissionDenied?: boolean;
}

const DashboardPage: React.FC = () => {
  const location = useLocation();
  const [showPermissionAlert, setShowPermissionAlert] = React.useState(false);
  
  const state = location.state as LocationState;

  useEffect(() => {
    // Check if redirected due to permission issues
    if (state?.permissionDenied) {
      setShowPermissionAlert(true);
    }
  }, [state]);

  const handleCloseAlert = () => {
    setShowPermissionAlert(false);
  };

  return (
    <AuthGuard>
      <Header />
      <Dashboard />
      
      <Snackbar
        open={showPermissionAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseAlert} 
          severity="warning" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          You don't have permission to access the requested page
        </Alert>
      </Snackbar>
    </AuthGuard>
  );
};

export default DashboardPage;