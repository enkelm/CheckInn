import React from 'react';
import CModal from '../../../components/UI/Modal/Modal';
import SignupForm from '../../../components/forms/Signup/SipnupForm';

const Register = () => {
  return (
    <CModal type='signupModal'>
      <SignupForm />
    </CModal>
  );
};

export default Register;
