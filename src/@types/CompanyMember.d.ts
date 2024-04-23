export interface CompanyMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "member";
}

export interface IUpdateCompanyMemberDetailBody {
  nome?: string;
  email?: string;
  role?: string;
  password?: string;
}
