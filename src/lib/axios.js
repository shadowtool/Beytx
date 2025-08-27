import axios from "axios";

export const baseUrl =
  process.env.NEXT_PUBLIC_API_DOMAIN ?? "https://beyt-personal.vercel.app/api";

// Utility functions to handle localStorage token changes
export const setToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event("tokenChanged"));
  }
};

export const removeToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
  }
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
