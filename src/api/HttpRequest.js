import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add access token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If backend returns 401 (Unauthorized) → token expired / invalid
    if (error.response?.status === 401) {
      localStorage.clear(); // remove tokens + user
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(error);
  }
);



export default api;
