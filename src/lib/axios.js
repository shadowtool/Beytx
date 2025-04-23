import axios from "axios";

export const baseUrl =
  process.env.NEXT_PUBLIC_API_DOMAIN ?? "https://beyt-personal.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
