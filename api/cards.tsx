import { api } from '../api';
export const fetchAllCardsAPI = (token: string) => {
  return api(token).get('/cards/all');
};

export const addNewCardAPI = (token: string, data: any) => {
  return api(token).post('/cards/new', data);
};

export const editCardAPI = (token: string, id: string, data: any) => {
  return api(token).put(`/cards/${id}`, data);
};

export const daleteCardAPI = (token: string, id: string) => {
  return api(token).delete(`/cards/${id}`);
};
