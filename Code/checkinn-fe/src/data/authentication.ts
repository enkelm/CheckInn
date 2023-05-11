import { CancelTokenSource } from 'axios';
import { ENDPOINTS, createApiEndpoint } from '../lib/axios';
import { UserState } from '../store/user-slice';
import { toggleLoading } from '../store/ui-slice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

interface ILogin {
  (email: string, password: string, reqConfig: LoginReqConfig): Promise<UserState>;
}

interface LoginReqConfig {
  cancelToken?: CancelTokenSource;
  dispatch?: ThunkDispatch<unknown, unknown, AnyAction>;
}

export const login: ILogin = async (email, password, { cancelToken, dispatch }) => {
  dispatch && dispatch(toggleLoading());
  const data = await createApiEndpoint(ENDPOINTS.USER, 'login')
    .create({ email, password }, cancelToken)
    .then((res) => {
      return res.status === 202 && res.data;
    })
    .catch((error) => console.log(error))
    .finally(() => dispatch && dispatch(toggleLoading()));

  return data;
};
