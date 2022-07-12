import constants from 'constants/index';
import axiosClient from './axiosClient';

const USER_API_URL = '/user/profile';

const userApi = {
  //get admin user
  getUser: () => {
    const url = USER_API_URL;
    if (process.env.NODE_ENV === 'production')
      return axiosClient.get(url, {
        // params: {
        //   token: localStorage.getItem(constants.ACCESS_TOKEN_KEY),
        // },
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY)
        }
      });
    else return axiosClient.get(url, {
      // params: {
      //   token: localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      // },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY)
      }
    });
  },
  putUpdateUser: (userId = '', value = {}) => {
    const url = USER_API_URL;
    return axiosClient.put(url, { userId, ...value }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY)
      }
    });
  },
};

export default userApi;
