import axios from "axios";

// TODO: remove authorization headers when implement auth flow
const api = axios.create({
  baseURL: "http://localhost:3333",
  validateStatus: (status) => status >= 200 && status <= 299,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2FpbyIsImVtYWlsIjoiQ2Fpb1ZpbmlAZ21haWwuY29tIiwiY29tcGFueUlkIjoiYTMyYzkxZjUtMjE5MC00NWY1LThjYzYtM2UzYjNjNTlhYTBiIiwiaWF0IjoxNzE0MDAwNTE0LCJleHAiOjE3MTQ2MDUzMTQsInN1YiI6IjdkYzYxMzI1LTJjNzEtNDdiNS05ZDc3LWNhNTIwMTJlNzBjOSJ9.afkh8zzvwybTBLK8xgvzIdsI60jDiygiC7WiHgUh4i8",
  },
});

export default api;
