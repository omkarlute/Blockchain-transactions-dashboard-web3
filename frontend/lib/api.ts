import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// ✅ ONLY VALID BACKEND ROUTES
export const transactionsAPI = {
  getAll: () => api.get("/api/transactions"),
  getById: (id: string) => api.get(`/api/transactions/${id}`),
  create: (data: any) => api.post("/api/transactions", data),
};

export default api;
