import { CompanyMember } from "@/@types/CompanyMember";
import api from "@/services/axios";

export async function fetchCompanyMembers() {
  const response = await api.get("/company-members");
  return response.data as CompanyMember[];
}
