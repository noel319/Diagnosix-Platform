import React from 'react';
import { Container } from '@mui/material';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';

const RegisterPage: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <RegisterForm />
      </Container>
    </>
  );
};

export default RegisterPage;