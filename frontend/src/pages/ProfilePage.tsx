import React from 'react';
import UserProfile from '../components/UserProfile';
import Header from '../components/Header';
import AuthGuard from '../components/AuthGuard';

const ProfilePage: React.FC = () => {
  return (
    <AuthGuard>
      <Header />
      <UserProfile />
    </AuthGuard>
  );
};

export default ProfilePage;