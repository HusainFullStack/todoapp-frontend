import axios from "axios";

export const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const noAuthRoutes = ["/login", "/register"];
const REFRESH_THRESHOLD = 1 * 60 * 1000; // 50 minutes in ms

Axios.interceptors.request.use(async (config) => {
  const isPublicRoute = noAuthRoutes.some((route) =>
    config.url?.includes(route)
  );

  if (!isPublicRoute) {
    const token = localStorage.getItem("authToken");
    const createdAt = localStorage.getItem("tokenCreatedAt");

    try {
      if (token) {
        // Check token age and refresh if needed
        if (createdAt && Date.now() - Number(createdAt) > REFRESH_THRESHOLD) {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URI}/refresh`,
            {},
            { withCredentials: true }
          );

          const newToken = res.data.token;

          localStorage.setItem("authToken", newToken);
          localStorage.setItem("tokenCreatedAt", Date.now().toString());

          config.headers.Authorization = `Bearer ${newToken}`;
        } else {
          // Token still valid, just attach it
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.error("Token refresh failed", err);
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenCreatedAt");
      // Optionally redirect to login:
      // window.location.href = "/login";
    }
  }

  return config;
});
