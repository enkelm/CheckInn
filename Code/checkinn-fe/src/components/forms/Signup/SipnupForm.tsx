import React, { forwardRef, useState, useEffect } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import styles from './SignupForm.module.css';
import CCard from '../../UI/Card/Card';
import Input from '../../UI/Input/Input';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import CButton from '../../UI/Button/Button';
import { signup } from '../../../data/authentication';
import { useAppDispatch } from '../../../hooks/hooks';
import CAlert from '../../UI/Alerts/Alert';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phonenumber: '',
};

const initialValidation = {
  firstNameInvalid: false,
  lastNameInvalid: false,
  emailInvalid: false,
  passwordInvalid: false,
  confirmPasswordInvalid: false,
  phonenumberInvalid: false,
};

const regex = {
  firstName: /^\w{0,20}$/,
  lastName: /^\w{0,20}$/,
  email: /^[a-z A-Z 0-9 .%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
};

const SignupForm = forwardRef(function SignupForm() {
  const [form, setForm] = useState(initialForm);
  const [formValidation, setFormValidation] = useState(initialValidation);
  const [showEmailIcon, setShowEmailIcon] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const dispatch = useAppDispatch();

  function validationFormEntry(property: string) {
    return Object.entries(formValidation).find(([key]) => key === property)?.[1];
  }

  useEffect(() => {
    const formIsFilled = Object.entries(form).every(([, value]) => value !== '');
    const formIsValid = Object.entries(initialValidation).every(
      ([key, value]) => value === validationFormEntry(key),
    );
    const submitableForm = formIsValid && formIsFilled;
    submitableForm ? setDisableButton(false) : setDisableButton(true);
  }, [formValidation]);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('roles', 'Client');
    const res = await signup(formData, { dispatch });
    console.log(res);
  };

  return (
    <CCard className={styles.card}>
      <form onSubmit={submitHandler} className={styles.form}>
        <h1>Sign Up</h1>
        <CAlert severity='error' title='Error' variant='filled'>
          An error has occured while signing up
        </CAlert>
        <div className={styles.flexRow}>
          <Input
            style={{ width: '45%' }}
            label='First Name'
            name='firstName'
            type='text'
            error={formValidation?.firstNameInvalid}
            value={form?.firstName}
            onChange={(e) =>
              setForm((prevState) => prevState && { ...prevState, firstName: e.target.value })
            }
            onBlur={(e) => {
              const isValid = regex.firstName.test(e.target.value);
              setFormValidation((state) => state && { ...state, firstNameInvalid: !isValid });
            }}
          />
          <Input
            style={{ width: '45%' }}
            label='Last Name'
            name='lastName'
            type='text'
            error={formValidation?.lastNameInvalid}
            value={form?.lastName}
            onChange={(e) =>
              setForm((prevState) => prevState && { ...prevState, lastName: e.target.value })
            }
            onBlur={(e) => {
              const isValid = regex.lastName.test(e.target.value);
              setFormValidation((state) => state && { ...state, lastNameInvalid: !isValid });
            }}
          />
        </div>
        <Input
          label='Email'
          name='email'
          type='email'
          style={{ width: '90%' }}
          required
          error={formValidation?.emailInvalid}
          value={form?.email}
          onChange={(e) =>
            setForm((prevState) => {
              return prevState && { ...prevState, email: e.target.value };
            })
          }
          onFocus={() => form?.email && setShowEmailIcon((show) => !show)}
          onBlur={(e) => {
            const isValid = regex.email.test(e.target.value);
            setFormValidation((state) => state && { ...state, emailInvalid: !isValid });
            !form?.email && setShowEmailIcon((show) => !show);
          }}
          startAdornment={showEmailIcon && <EmailIcon style={{ marginRight: '0.5rem' }} />}
        />
        <Input
          label='Password'
          name='password'
          type={showPassword ? 'text' : 'password'}
          style={{ width: '90%' }}
          required
          error={formValidation?.passwordInvalid}
          value={form?.password}
          onChange={(e) =>
            setForm((prevState) => {
              return prevState && { ...prevState, password: e.target.value };
            })
          }
          onBlur={(e) => {
            const isValid = regex.password.test(e.target.value);
            setFormValidation((state) => state && { ...state, passwordInvalid: !isValid });
          }}
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
        <Input
          label='Confirm Password'
          type={showPassword ? 'text' : 'password'}
          style={{ width: '90%' }}
          required
          error={formValidation?.confirmPasswordInvalid}
          value={form?.confirmPassword}
          onChange={(e) =>
            setForm((prevState) => prevState && { ...prevState, confirmPassword: e.target.value })
          }
          onBlur={(e) => {
            const isValid = !formValidation.passwordInvalid && form?.password === e.target.value;
            setFormValidation((state) => state && { ...state, confirmPasswordInvalid: !isValid });
          }}
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
        <MuiTelInput
          style={{ width: '90%' }}
          label='Phone Numer'
          name='phoneNumber'
          size='small'
          error={formValidation?.phonenumberInvalid}
          value={form?.phonenumber}
          onChange={(value) =>
            setForm((prevState) => {
              return prevState && { ...prevState, phonenumber: value };
            })
          }
          onBlur={(e) => {
            const isValid = matchIsValidTel(e.target.value, 'AL');
            setFormValidation((state) => state && { ...state, phonenumberInvalid: !isValid });
          }}
        />
        <CButton type='submit' disabled={disableButton} endIcon={<AppRegistrationRoundedIcon />}>
          Sign Up
        </CButton>
      </form>
    </CCard>
  );
});

export default SignupForm;
