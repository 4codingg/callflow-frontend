import axios from "axios";

// TODO: remove authorization headers when implement auth flow
const api = axios.create({
  baseURL: "http://localhost:3333",
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm_Do28gR3VpbGhlcm1lIiwiZW1haWwiOiJqb2FvZ3VpbGhlcm1lX3BlQGhvdG1haWwuY29tIiwiY29tcGFueUlkIjoiNDVjMGQzOGEtODg5Ny00ZmEzLWJiZWQtOTBiZGJlMTU0NTZhIiwiaWF0IjoxNzEzODMxNzY1LCJleHAiOjE3MTQ0MzY1NjUsInN1YiI6IjQ4ODM4ODkzLTcyMWQtNDcxNy05OGZiLWQ5YjQ1NGU5NGY2ZiJ9.llK6tsoe1Bx1gFxOzN-9MvQm1AUm0wpw0404_dxQHVQ",
  },
});

export default api;
