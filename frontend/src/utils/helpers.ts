import { UserRole } from '../types';

/**
 * Format date to locale string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

/**
 * Get user role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'patient':
      return 'Patient';
    case 'doctor':
      return 'Doctor';
    case 'admin':
      return 'Administrator';
    default:
      return role;
  }
};

/**
 * Get role color for UI
 */
export const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case 'patient':
      return 'primary';
    case 'doctor':
      return 'secondary';
    case 'admin':
      return 'error';
    default:
      return 'default';
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    if (payload.exp) {
      // Convert exp to milliseconds and compare with current time
      return Date.now() >= payload.exp * 1000;
    }
    
    // If there's no expiration in the token, assume it's not expired
    return false;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired if we can't parse the token
  }
};

/**
 * Extract user role from JWT token
 */
export const getRoleFromToken = (token: string): UserRole | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    
    return payload.role as UserRole || null;
  } catch (error) {
    console.error('Error extracting role from token:', error);
    return null;
  }
};