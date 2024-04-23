import { IUpdateCompanyMemberDetailBody } from "@/@types/CompanyMember";
import api from "@/services/axios";

interface CompanyMember {
  memberId: string;
  body: IUpdateCompanyMemberDetailBody;
}

export async function updateCompanyMemberDetail({
  memberId,
  body,
}: CompanyMember) {
  const response = await api.put(`/company-member/${memberId}`, body);
  return response.data as IUpdateCompanyMemberDetailBody;
}
