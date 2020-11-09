import axios from 'axios';
import cookieCutter from 'cookie-cutter';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const api = (token?: string) => {
  const channel = axios.create({
    baseURL: publicRuntimeConfig.API_URL || 'http://localhost:3000',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  channel.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (401 === error.response.status) {
        if (typeof window !== 'undefined') {
          cookieCutter.set('user', '', { expires: new Date(0) });
          window.location = ('/login' as unknown) as Location;
        }
      } else {
        return Promise.reject(error);
      }
    }
  );

  return channel;
};
