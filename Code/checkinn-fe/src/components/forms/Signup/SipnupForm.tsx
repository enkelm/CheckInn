import React, { forwardRef } from 'react';
import styles from './SignupForm.module.css';
import CCard from '../../UI/Card/Card';

const SignupForm = forwardRef(function SignupForm() {
  const submitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  return (
    <CCard className={styles.card}>
      <form onSubmit={submitHandler} className={styles.form}>
        <h1>Signup</h1>
      </form>
    </CCard>
  );
});

export default SignupForm;
