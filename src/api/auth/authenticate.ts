import api from "@/services/axios";

export interface AuthenticateBody {
  email: string;
  password: string;
}

export async function authenticate({ email, password }: AuthenticateBody) {
  const response = await api.post("/signin", { email, password });
  return response.data;
}
