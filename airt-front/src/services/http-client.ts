import axios from "axios";
import Cookies from "js-cookie";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (config.headers && token) {
      config.headers["authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);
