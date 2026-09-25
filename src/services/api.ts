import axios from "axios";

/** Shared Axios instance. Point VITE_API_URL at the backend when it's ready. */
const api = axios.create({
  baseURL: import.meta.env["VITE_API_URL"] || "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

export default api;
