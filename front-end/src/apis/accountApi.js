import axiosClient from './axiosClient';

const ACCOUNT_API_ENDPOINT = '/user';

const accountApi = {
  // fn: gửi mã xác nhận
  postSendVerifyCode: (email) => {
    const url = ACCOUNT_API_ENDPOINT + '/verify';
    return axiosClient.post(url, email);
  },

  // fn: đăng ký
  postSignUp: (account) => {
    const url = ACCOUNT_API_ENDPOINT + '/resgister';
    return axiosClient.post(url, account);
  },

  // fn: gửi mã xác nhận lấy lại mật khẩu
  postSendCodeForgotPW: (email) => {
    const url = ACCOUNT_API_ENDPOINT + '/verify/forgot';
    return axiosClient.post(url, email);
  },

  // fn: reset password
  postResetPassword: (account) => {
    const url = ACCOUNT_API_ENDPOINT + '/reset-pw';
    return axiosClient.post(url, account);
  },
};

export default accountApi;
