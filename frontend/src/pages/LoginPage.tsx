import React from 'react';
import { Container } from '@mui/material';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const LoginPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </>
  );
};

export default LoginPage;