import axios from "axios";

const api = axios.create({
  // baseURL: "http://ec2-18-231-2-213.sa-east-1.compute.amazonaws.com:3333",
  baseURL: "http://localhost:3333",
  validateStatus: (status) => status >= 200 && status <= 299
});

export default api;
