import React, { FC } from 'react';
import { toggleAlert } from '../../../store/ui-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import LoginForm from '../../../components/forms/Login/LoginForm';
import CModal from '../../../components/UI/Modal/Modal';

const Login: FC = () => {
  const alertIsVisible = useAppSelector((state) => state.ui.alert);
  const dispatch = useAppDispatch();

  return (
    <CModal
      type='loginModal'
      onClose={() => {
        alertIsVisible && dispatch(toggleAlert());
      }}
    >
      <LoginForm />
    </CModal>
  );
};

export default Login;
