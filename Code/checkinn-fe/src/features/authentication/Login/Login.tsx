import React, { useState, FC, FormEventHandler } from 'react';
import Card from '../../../components/UI/Card/Card';
import { uiActions } from '../../../store/ui-slice';
import { loginThunk } from '../../../store/user-slice';
import { useAppDispatch } from '../../../hooks/hooks';

// interface LoginProps {}

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    dispatch(loginThunk({ email, password }));

    dispatch(uiActions.toggleModal());
  };

  return (
    <Card style={{ width: '30vw' }}>
      <form onSubmit={onSubmitHandler}>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </Card>
  );
};

export default Login;
