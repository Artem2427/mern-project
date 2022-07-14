import axios, { AxiosInstance } from "axios";

import authServices from "./authService";

const API_URL = "http://localhost:5000/api";

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json", accept: "application/json" },
});

// api.interceptors.request.use(async (config): Promise<AxiosRequestConfig> => {
//   if (authServices.isLoggedIn() && config.headers) {
//     config.headers.Authorization = `Bearer ${authServices.getAccessKey()}`;
//   }

//   return config;
// });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("userData");
      // document.location.reload();
    }

    return Promise.reject(error);
  }
);
