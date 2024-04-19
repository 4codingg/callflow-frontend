import { IUpdateCompanyMemberDetailBody } from "@/@types/CompanyMember";
import api from "@/services/axios";

export async function UpdateCompanyMembers(
  memberId: any,
  updatedDetails: IUpdateCompanyMemberDetailBody
) {
  const response = await api.put(
    `/company-members/${memberId}`,
    updatedDetails
  );
  return response.data as IUpdateCompanyMemberDetailBody;
}
