import { ICreateCompanyMemberProps } from "@/pageTemplates/MembersTemplate/CreateMemberTemplate";
import api from "@/services/axios";

export async function postCompanyMember(body: ICreateCompanyMemberProps) {
  console.log("Enviando dados do membro:", body);
  const response = await api.post(`/company-member`, body);
  console.log("Resposta da API:", response);
  return response.data as ICreateCompanyMemberProps;
}
