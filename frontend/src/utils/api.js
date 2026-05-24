import axios from "axios";

// backend base URL
const API = axios.create({
  baseURL: "https://feedback-mern-backend.onrender.com/api",
});

// automatically attach token if stored
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
