import { ENDPOINTS, createApiEndpoint } from '../lib/axios';
import { UserState } from '../store/user-slice';

export const login = async (email: string, password: string): Promise<UserState> => {
  const data = await createApiEndpoint(ENDPOINTS.USER, 'login')
    .create({ email, password })
    .then((res) => res.data)
    .catch((error) => console.log(error));

  return data;
};
