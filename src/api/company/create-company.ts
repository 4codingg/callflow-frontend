import api from "@/services/axios";

export interface Address {
  address: string;
  number: number;
  zipcode: string;
}

export interface ICreateCompanyBody {
  email: string;
  name: string;
  CNPJ: string;
  address: Address;
  quantityEmployers: number;
  type: string;
}

export async function createCompany(body: ICreateCompanyBody) {
  const response = await api.post(`/company`, body);
  return response.data;
}
