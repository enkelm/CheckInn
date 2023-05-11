import axios, { AxiosResponse, CancelTokenSource } from 'axios';

export interface APIErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
}

const BASE_URL = 'https://localhost:44313/api/';

export const ENDPOINTS = {
  HOTEL: 'Hotel/',
  RESERVATION: 'Reservation/',
  USER: 'User',
};

interface CreateEnpointReturn {
  fetchAll: (cancelToken?: CancelTokenSource) => Promise<AxiosResponse>;
  fetchById: (id: number | string, cancelToken?: CancelTokenSource) => Promise<AxiosResponse>;
  create: (newRecord: unknown, cancelToken?: CancelTokenSource) => Promise<AxiosResponse>;
  update: (
    id: number | string,
    updatedRecord: unknown,
    cancelToken?: CancelTokenSource,
  ) => Promise<AxiosResponse>;
  delete: (id: number | string, cancelToken?: CancelTokenSource) => Promise<AxiosResponse>;
}

export const createApiEndpoint = (endpoint: string, method?: string): CreateEnpointReturn => {
  const user = localStorage.getItem('USER');
  const token = user && JSON.parse(user)?.token;

  axios.defaults.headers.post['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.delete['Authorization'] = `Bearer ${token}`;
  axios.defaults.headers.put['Authorization'] = `Bearer ${token}`;

  const url = BASE_URL + endpoint + '/' + method + '/';

  return {
    fetchAll: (cancelToken) => axios.get(url, { cancelToken: cancelToken?.token }),
    fetchById: (id, cancelToken) => axios.get(url + id, { cancelToken: cancelToken?.token }),
    create: (newRecord, cancelToken) =>
      axios.post(url, newRecord, { cancelToken: cancelToken?.token }),
    update: (id, updatedRecord, cancelToken) =>
      axios.put(url + id, updatedRecord, { cancelToken: cancelToken?.token }),
    delete: (id, cancelToken) => axios.delete(url + id, { cancelToken: cancelToken?.token }),
  };
};
