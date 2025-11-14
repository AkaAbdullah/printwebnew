// src/api.ts

import type { AxiosInstance } from "axios";
import axios from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here (401, 500, etc.)
    return Promise.reject(error);
  }
);

export default api;
