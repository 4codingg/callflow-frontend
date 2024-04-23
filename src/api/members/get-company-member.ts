import { CompanyMember } from "@/@types/CompanyMember";
import api from "@/services/axios";

export async function getCompanyMember(memberId: string) {
  const response = await api.get(`/company-member/${memberId}`);
  return response.data as CompanyMember;
}
