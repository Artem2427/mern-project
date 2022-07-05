import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import authServices from "./authService";

const API_URL = "api";

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json", accept: "application/json" },
});

api.interceptors.request.use(async (config): Promise<AxiosRequestConfig> => {
  if (authServices.isLoggedIn() && config.headers) {
    config.headers.Authorization = `Bearer ${authServices.getAccessKey()}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      authServices.logout();
      document.location.reload();
    }

    return Promise.reject(error);
  }
);
