import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://localhost:44313/api/';

export const ENDPOINTS = {
  HOTEL: 'Hotel/',
  RESERVATION: 'Reservation/',
  USER: 'User',
};

interface CreateEnpointReturn {
  fetchAll: () => Promise<AxiosResponse<any, any>>;
  fetchById: (id: number | string) => Promise<AxiosResponse<any, any>>;
  create: (newRecord: any) => Promise<AxiosResponse<any, any>>;
  update: (id: number | string, updatedRecord: any) => Promise<AxiosResponse<any, any>>;
  delete: (id: number | string) => Promise<AxiosResponse<any, any>>;
}

export const createApiEndpoint = (endpoint: string, method?: string): CreateEnpointReturn => {
  const JWT = localStorage.getItem('access_token');

  axios.defaults.headers.post['Authorization'] = `Bearer ${JWT}`;
  axios.defaults.headers.delete['Authorization'] = `Bearer ${JWT}`;
  axios.defaults.headers.put['Authorization'] = `Bearer ${JWT}`;

  let url = BASE_URL + endpoint + '/' + method + '/';

  return {
    fetchAll: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    create: (newRecord) => axios.post(url, newRecord),
    update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
    delete: (id) => axios.delete(url + id),
  };
};
