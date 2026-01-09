import axios from "axios";

// Correct backend URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  console.warn("NEXT_PUBLIC_API_URL is not defined");
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Transactions API (NOTE THE /api PREFIX)
export const transactionsAPI = {
  getAll: () => api.get("/api/transactions"),
  getById: (id: string) => api.get(`/api/transactions/${id}`),
  create: (data: {
    toAddress: string;
    amount: string;
    gasLimit?: string;
    gasPrice?: string;
  }) => api.post("/api/transactions", data),
};

// Init API
export const initAPI = {
  seed: () => api.post("/init"),
};

// Stats API
export const statsAPI = {
  getStats: () => api.get("/stats"),
};

export default api;
