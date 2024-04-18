import axios from "axios"

// TODO: remove authorization headers when implement auth flow
const api = axios.create({
  baseURL: "http://localhost:3333",
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28gR3VpbGhlcm1lIiwiZW1haWwiOiJqb2FvZ3VpbGhlcm1lX3BlQGhvdG1haWwuY29tIiwiY29tcGFueUlkIjoiZTc3MDc5YzktYjU2Yi00OTRkLThkMWUtNDcwY2VkNmY0ZmFlIiwiaWF0IjoxNzEzNDc4ODU5LCJleHAiOjE3MTQwODM2NTksInN1YiI6IjViMjNjZTIyLWY0ODMtNDA3My04MDcwLWVmMjA4NTA5NDJhZCJ9.qPaCGtQqOwehb1odGYqevoow2EFT7Qm0AsAOEvjxQTo"
  }
})

export default api