import api from "@/services/axios";

interface IDeleteCompanyMemberProps {
  memberId: string;
}

export async function deleteCompanyMember(body: IDeleteCompanyMemberProps) {
  const response = await api.delete(`/company-member/${body}`);
  return response.data;
}
