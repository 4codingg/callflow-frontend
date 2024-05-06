import Company from "@/@types/Company";
import api from "@/services/axios"

export const getCompanyDetail = async () => {
  const response = await api.get('/company')
  return response.data as Company;
}