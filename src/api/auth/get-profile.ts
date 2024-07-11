import api from "@/services/axios"
import User from "@/@types/User";

export const getProfile = async () => {
  const response = await api.get('/me')
  return response.data as User;
}