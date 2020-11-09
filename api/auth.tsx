import { api } from '../api';
export const loginAPI = (data: any) => {
  return api().post('/auth/login', data);
};
