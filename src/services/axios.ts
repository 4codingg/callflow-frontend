import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  validateStatus: (status) => status >= 200 && status <= 299
});

export default api;