export interface CompanyMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "member";
}
