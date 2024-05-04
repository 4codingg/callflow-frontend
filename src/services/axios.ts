import axios from "axios";

// TODO: remove authorization headers when implement auth flow
const api = axios.create({
  baseURL: "http://localhost:3333",
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28gR3VpbGhlcm1lRUVFIiwiZW1haWwiOiJqb2FvZ3VpbGhlcm1lX3BlQGhvdG1haWwuY29tIiwiY29tcGFueUlkIjoiZTc3MDc5YzktYjU2Yi00OTRkLThkMWUtNDcwY2VkNmY0ZmFlIiwiaWF0IjoxNzE0Njg3MDg5LCJleHAiOjE3MTUyOTE4ODksInN1YiI6IjViMjNjZTIyLWY0ODMtNDA3My04MDcwLWVmMjA4NTA5NDJhZCJ9.Yal8xfDuPTmAdG7Oygp4VT7vr-ANLpogvSqx_ZfYg18"
  },
});

export default api;
