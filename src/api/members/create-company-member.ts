import { ICreateCompanyMemberProps } from "@/pageTemplates/MembersTemplate/CreateMemberTemplate";
import api from "@/services/axios";

export async function createCompanyMember(body: ICreateCompanyMemberProps) {
  const response = await api.post(`/company-member`, body);
  return response.data as ICreateCompanyMemberProps;
}
