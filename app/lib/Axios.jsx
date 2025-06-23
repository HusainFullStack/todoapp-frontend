import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

Axios.interceptors.request.use((config) => {
  const noAuthRoutes = ["/login", "/register"];
  const isPublicRoute = noAuthRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (!isPublicRoute) {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
