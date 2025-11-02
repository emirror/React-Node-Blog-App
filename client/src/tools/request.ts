import axios, { AxiosError } from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../utils/token";
import { handleError } from "../utils/errorHandler";

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
});

export const requestWithoutAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
});

request.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const token = getToken();

    if (token && config.headers) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError) {
    // Handle 401 unauthorized
    if (error.response?.status === 401) {
      removeToken();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
      // Don't show error notification for 401 redirect
      return Promise.reject(error);
    }

    // Show error notification for other errors
    handleError(error);

    return Promise.reject(error);
  }
);

// Also add error handling for requestWithoutAuth
requestWithoutAuth.interceptors.response.use(
  function (response) {
    console.log(response);
    
    return response;
  },
  function (error: AxiosError) {
    handleError(error);
    return Promise.reject(error);
  }
);

export default request;

