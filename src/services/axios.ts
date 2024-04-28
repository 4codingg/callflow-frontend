import axios from "axios";

// TODO: remove authorization headers when implement auth flow
const api = axios.create({
  baseURL: "http://localhost:3333",
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVsZSIsImVtYWlsIjoiY29vb29vaUBnbWFpbC5jb20iLCJjb21wYW55SWQiOiIyNmQ1MGRiMi0zMmQ2LTQ3NjYtODFjMy1mYWJkNjQzNDM1YzkiLCJpYXQiOjE3MTQyNjIzMDIsImV4cCI6MTcxNDg2NzEwMiwic3ViIjoiYWEzOWU3NjktOGE3MC00MzNiLWIxYjAtMWFmMjNlZGNhZjZhIn0._f3Gf14MhlhS5SlL0AqcftecT9DxbDeU_t051ylnCO0",
  },
});

export default api;
