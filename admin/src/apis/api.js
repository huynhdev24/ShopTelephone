import axios from "axios";
import camelCase from "camelcase-keys";
import { API_URL } from "../config";

const axiosClient = axios.create({
    baseURL: `${API_URL}`,
    responseType: "json",
    timeout: 15 * 1000
});


axiosClient.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    (response) => camelCase(response.data, { deep: true }),
    (error) => Promise.reject(error)
);

if (sessionStorage.getItem("auth")) {
    const accessToken = JSON.parse(sessionStorage.getItem("auth")).token;
    axiosClient.defaults.headers.common.Authorization = `Bear ${accessToken}`;
}

export default axiosClient;
