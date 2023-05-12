import { ENDPOINTS, createApiEndpoint } from '../lib/axios';
import { UserState } from '../store/user-slice';
import { toggleAlert, toggleLoading } from '../store/ui-slice';
import { ReqConfig } from '.';

interface ILogin {
  (email: string, password: string, reqConfig: ReqConfig): Promise<UserState>;
}

export const login: ILogin = async (email, password, { cancelToken, dispatch }) => {
  dispatch && dispatch(toggleLoading());
  const response = await createApiEndpoint(ENDPOINTS.USER, 'login')
    .create({ email, password }, cancelToken)
    .then((res) => res.status < 400 && res.data)
    .catch(() => dispatch && dispatch(toggleAlert()))
    .finally(() => dispatch && dispatch(toggleLoading()));

  return response;
};

interface ISignup {
  (formData: FormData, reqConfig: ReqConfig): Promise<boolean>;
}

export const signup: ISignup = async (formData, { cancelToken, dispatch }) => {
  dispatch && dispatch(toggleLoading());
  const response = await createApiEndpoint(ENDPOINTS.USER, 'register')
    .create(formData, cancelToken)
    .then((res) => res.status < 400 && res.data)
    .catch(() => dispatch && dispatch(toggleAlert()))
    .finally(() => dispatch && dispatch(toggleLoading()));

  return response;
};
