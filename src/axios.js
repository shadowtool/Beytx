import axios from "axios";

export const baseUrl =
  process.env.NEXT_PUBLIC_API_DOMAIN ?? "http://localhost:3001/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
