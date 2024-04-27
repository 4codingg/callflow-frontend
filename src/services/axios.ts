import axios from "axios";

// TODO: remove authorization headers when implement auth flow
const api = axios.create({
  baseURL: "http://localhost:3333",
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2FpbyIsImVtYWlsIjoiQ2Fpb1ZpbmlAZ21haWwuY29tIiwiY29tcGFueUlkIjoiYTMyYzkxZjUtMjE5MC00NWY1LThjYzYtM2UzYjNjNTlhYTBiIiwiaWF0IjoxNzE0MjM2MjY4LCJleHAiOjE3MTQ4NDEwNjgsInN1YiI6IjdkYzYxMzI1LTJjNzEtNDdiNS05ZDc3LWNhNTIwMTJlNzBjOSJ9.uL5zPlDfwJqB24Y6Mf5Zcu6u6RW76fzaaDUuKd2Qtgk",
  },
});

export default api;
