import axios from 'axios';
import LocalStorageService from '../Common/LocalStorageService';

const localStorageService = LocalStorageService.getService();
const baseURL = 'https://localhost:5001/api';

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === '/Account/RefreshToken') {
      localStorageService.clearToken();
      window.location.href = '/SignIn';
    }

    if (error.response) {
      if (error.response.status === 401 && !originalRequest.retry) {
        originalRequest.retry = true;

        return axios
          .post('/Account/RefreshToken', {
            token: localStorageService.getRefreshToken(),
          })
          .then((response) => {
            localStorageService.setToken(response.data);
            axios.defaults.headers.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
            return axios(originalRequest);
          });
      }
    } else {
      // handle server down
    }

    return Promise.reject(error);
  }
);

export default {
  axios,
};
