import axios from "axios";

export const baseUrl =
  process.env.NEXT_PUBLIC_SHOP_API_URL ?? "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
