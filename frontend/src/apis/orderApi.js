import axiosClient from './axiosClient';
import constants from 'constants/index';

const ORDER_API_ENDPOINT = '/orders';

const orderApi = {
  // api: lấy danh sách đơn hàng
  getOrderList: (userId) => {
    const url = ORDER_API_ENDPOINT + '/myorders';
    return axiosClient.get(url, {
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      },
    });
  },

  // api: lấy chi tiết đơn hàng
  getOrderDetails: (orderId) => {
    const url = ORDER_API_ENDPOINT + `/${orderId}`;
    return axiosClient.get(url, {
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      },
    });
  },

  // api: update trạng thái đơn hàng
  destroyOrder: (orderId) => {
    const url = ORDER_API_ENDPOINT + `/${orderId}/destroy`;
    axiosClient.defaults.headers.common = {
      Authorization: `Bearer ${localStorage.getItem(
        constants.ACCESS_TOKEN_KEY,
      )}`,
    };
    return axiosClient.put(url);
  },

  // api: tạo đơn hàng
  postCreateOrder: (data) => {
    const url = ORDER_API_ENDPOINT;
    return axiosClient.post(url, data, {
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      },
    });
  },
};

export default orderApi;
