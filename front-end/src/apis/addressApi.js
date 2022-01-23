import axiosClient from './axiosClient';
import constants from 'constants/index';

const ADDRESS_API_ENDPOINT = '/deliveryAddress';

const addressApi = {
  // api: lấy danh sách các tỉnh thành
  getProvince: () => {
    const url = ADDRESS_API_ENDPOINT + '/province';
    return axiosClient.get(url);
  },

  // api: lấy danh sách huyện/quận theo id tỉnh
  getDistrict: (provinceId) => {
    const url = ADDRESS_API_ENDPOINT + '/district';
    return axiosClient.get(url, { params: { id: provinceId } });
  },

  // api: lấy danh sách huyện/quận theo id tỉnh
  getWardStreetList: (provinceId, districtId) => {
    const url = ADDRESS_API_ENDPOINT + '/street';
    return axiosClient.get(url, {
      params: { id: provinceId, district: districtId },
    });
  },

  // api: Lấy danh sách địa chỉ nhận hàng, flag = 1 lấy địa chỉ thô chưa convert sang string
  getDeliveryAddressList: (userId, flag = 0) => {
    return axiosClient.get(ADDRESS_API_ENDPOINT, {
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      },
    });
  },

  // api: Thêm địa chỉ nhận hàng
  postAddDeliveryAddress: (userId, newAddress) => {
    return axiosClient.post(
      ADDRESS_API_ENDPOINT,
      { ...newAddress },
      {
        headers: {
          Authorization:
            'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
        },
      },
    );
  },

  // api: Cap nhật địa chỉ nhận hàng
  updateDeliveryAddress: (userId, newAddress, item) => {
    console.log(item);
    return axiosClient.put(
      ADDRESS_API_ENDPOINT + `/${item}`,
      { ...newAddress },
      {
        headers: {
          Authorization:
            'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
        },
      },
    );
  },

  // api: Xoá 1 địa chỉ giao nhận
  delDeliveryAddress: (userId, item) => {
    return axiosClient.delete(ADDRESS_API_ENDPOINT, {
      params: { item },
      headers: {
        Authorization:
          'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
      },
    });
  },

  // api: sửa mặc định địa chỉ giao
  putSetDefaultDeliveryAddress: (userId, item) => {
    const url = ADDRESS_API_ENDPOINT + '/delivery';
    return axiosClient.put(url, null, { params: { userId, item } });
  },
};

export default addressApi;
