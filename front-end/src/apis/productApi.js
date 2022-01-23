import axiosClient from './axiosClient';
import constants from 'constants/index';

const PRODUCT_API_URL = '/product';

const productApi = {
  // api: Lấy 1 sản phẩm
  getProduct: (id) => {
    const url = PRODUCT_API_URL + `/${id}`;
    return axiosClient.get(url);
  },

  // api: Lấy danh sách sp, type = -1 : all, trừ sản phẩm có id
  getProductList: (type = -1, brand = '', limit = 1, id) => {
    const url = PRODUCT_API_URL + '/same';
    return axiosClient.get(url, { params: { type, brand, limit, id } });
  },

  // api: Lấy danh sách sản phẩm và phân trang
  getAllProducts: (page = 1) => {
    return axiosClient.get(PRODUCT_API_URL, { params: { pageNumber: page } });
  },

  // api: tìm kiếm sản phẩm
  getSearchProducts: (value = '', page = 1, perPage = 8) => {
    return axiosClient.get(PRODUCT_API_URL, {
      params: { pageNumber: page, name: value },
    });
  },

  // api: lọc sản phẩm
  getFilterProducts: (
    type = 0,
    query = {},
    page = 0,
    perPage = 8,
  ) => {
    const url = PRODUCT_API_URL + '/filter';
    RegExp.prototype.toJSON = RegExp.prototype.toString;
    const params = {
      type,
      ...query,
      page,
      perPage
    };
    return axiosClient.get(url, {
      params,
    });
  },

  reviewProduct: (productID, comment, rating) => {
    const url = PRODUCT_API_URL + '/review' + `/${productID}`;
    return axiosClient.post(
      url,
      { comment, rating },
      {
        headers: {
          Authorization:
            'Bearer ' + localStorage.getItem(constants.ACCESS_TOKEN_KEY),
        },
      },
    );
  },
};

export default productApi;
