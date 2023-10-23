import axios from "axios";
import { URL_BASE } from "@env";

const axiosInstance = axios.create({
  baseURL: URL_BASE,
  timeout: 60000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = JSON.parse(localStorage.getItem("token"));
    // console.log('Interceptando la peticion...');

    // if (accessToken) {
    //   if (config.headers) config.headers.token = accessToken;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    //Para cuando se desea modificar el contenido de la respuesta
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
