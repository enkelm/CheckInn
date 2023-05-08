import axios, { AxiosResponse } from 'axios';

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
  fetchAll: () => Promise<AxiosResponse>;
  fetchById: (id: number | string) => Promise<AxiosResponse>;
  create: (newRecord: unknown) => Promise<AxiosResponse>;
  update: (id: number | string, updatedRecord: unknown) => Promise<AxiosResponse>;
  delete: (id: number | string) => Promise<AxiosResponse>;
}

export const createApiEndpoint = (endpoint: string, method?: string): CreateEnpointReturn => {
  const JWT = localStorage.getItem('access_token');

  axios.defaults.headers.post['Authorization'] = `Bearer ${JWT}`;
  axios.defaults.headers.delete['Authorization'] = `Bearer ${JWT}`;
  axios.defaults.headers.put['Authorization'] = `Bearer ${JWT}`;

  const url = BASE_URL + endpoint + '/' + method + '/';

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
