import constants from 'constants/index';
import axiosClient from './axiosClient';

const LOGIN_API_ENDPOINT = '/user/login';
const USER_API_ENDPOINT = '/user';

const loginApi = {
  // api: đăng nhập
  postLogin: (data) => {
    const url = USER_API_ENDPOINT + '/login';
    const { email, password } = data.account
    return axiosClient.post(url, {email, password});
  },

  // api: đăng nhập với google
  postLoginWithGoogle: (accessToken) => {
    const url = LOGIN_API_ENDPOINT + '/gg';
    return axiosClient.post(url, accessToken);
  },

  // api: authentication
  getAuth: () => {
    const url = USER_API_ENDPOINT + '/profile';
    if (process.env.NODE_ENV === 'production')
      return axiosClient.get(url, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY)
        }
      });
    else return axiosClient.get(url, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY)
      }
    });
  },

  // api: refresh token
  postRefreshToken: (refreshToken) => {
    const url = LOGIN_API_ENDPOINT + '/refresh_token';
    return axiosClient.post(url, refreshToken);
  },

  // api: logout
  postLogout: () => {
    const url = LOGIN_API_ENDPOINT + '/logout';
    if (process.env.NODE_ENV === 'production')
      return axiosClient.post(url, {
        token: localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      });
    else return axiosClient.post(url);
  },
};

export default loginApi;
