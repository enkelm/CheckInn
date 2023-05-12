import React, { FC } from 'react';
import LoginForm from '../../../components/forms/Login/LoginForm';
import CModal from '../../../components/UI/Modal/Modal';

const Login: FC = () => {
  return (
    <CModal type='loginModal'>
      <LoginForm />
    </CModal>
  );
};

export default Login;
