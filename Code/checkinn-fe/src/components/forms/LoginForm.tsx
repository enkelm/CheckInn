import React, { useState, forwardRef, FormEventHandler } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CCard from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import CButton from '../UI/Button/Button';
import styles from './LoginForm.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginThunk } from '../../store/user-slice';
import CAlert from '../UI/Alerts/Alert';
import { toggleAlert } from '../../store/ui-slice';

const LoginForm = forwardRef(function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailIcon, setShowEmailIcon] = useState(true);
  const alertIsActive = useAppSelector((state) => state.ui.alert);
  const dispatch = useAppDispatch();

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    alertIsActive && dispatch(toggleAlert());

    await dispatch(loginThunk({ email, password }));
  };

  return (
    <CCard className={styles.card}>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <h1 style={{ margin: 0 }}>Login</h1>
        <AccountCircleRoundedIcon sx={{ fontSize: '5rem' }} />
        <CAlert severity='error' variant='filled' title='Login Error'>
          Wrong Credentials!
        </CAlert>
        <Input
          label='Email'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => !email && setShowEmailIcon((show) => !show)}
          onBlur={() => !email && setShowEmailIcon((show) => !show)}
          startAdornment={showEmailIcon && <EmailIcon style={{ marginRight: '0.5rem' }} />}
        />
        <Input
          label='Password'
          type={showPassword ? 'text' : 'password'}
          required
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
        <CButton type='submit' endIcon={<LoginRoundedIcon />}>
          Login
        </CButton>
      </form>
    </CCard>
  );
});

export default LoginForm;
