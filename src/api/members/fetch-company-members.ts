import { CompanyMember } from "@/@types/CompanyMember";
import { Pagination } from "@/@types/Pagination";
import api from "@/services/axios";

interface IFetchCompanyMemberResponse extends Pagination {
  members: CompanyMember[],
}

export async function fetchCompanyMembers() {
  const response = await api.get("/company-members");
  return response.data as IFetchCompanyMemberResponse;
}
