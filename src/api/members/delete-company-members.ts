import api from "@/services/axios";


export async function deleteCompanyMember(memberId: string) {
  const response = await api.delete(`/company-member/${memberId}`);
  return response.data;
}
