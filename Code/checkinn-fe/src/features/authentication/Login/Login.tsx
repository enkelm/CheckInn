import React, { useState, forwardRef, FC, FormEventHandler } from 'react';
import { uiActions } from '../../../store/ui-slice';
import { loginThunk } from '../../../store/user-slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { Modal, IconButton, InputAdornment } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CCard from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import styles from './Login.module.css';
import CButton from '../../../components/UI/Button/Button';

const LoginForm = forwardRef(function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    dispatch(loginThunk({ email, password }));

    dispatch(uiActions.toggleModal());
  };

  return (
    <CCard className={styles.card}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h1 style={{ margin: 0 }}>Login</h1>
        <AccountCircleRoundedIcon sx={{ fontSize: '5rem' }} />
        <Input
          label='Email'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          startAdornment={<EmailIcon style={{ marginRight: '0.5rem' }} />}
        />
        <Input
          label='Password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={(event) => event.preventDefault()}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <CButton type='submit'>Login</CButton>
        {/* <button type='submit'>Login</button> */}
      </form>
    </CCard>
  );
});

const Login: FC = () => {
  const modalIsVisible = useAppSelector((state) => state.ui.modalIsVisible);
  const dispatch = useAppDispatch();

  return (
    <Modal open={modalIsVisible} onClose={() => dispatch(uiActions.toggleModal())}>
      <LoginForm />
    </Modal>
  );
};

export default Login;
