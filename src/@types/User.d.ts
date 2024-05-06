interface User {
  id: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
  companyId: string;
  company: {
    id: string;
    name: string;
    email: string;
    balance: number;
    CNPJ: string;
    quantityEmployers: number;
    type: string;
    active: boolean;
    objective: string | null;
    customerId: string;
    createdAt: string;
    updatedAt: string;
    addressId: string;
  };
}

export default User;
