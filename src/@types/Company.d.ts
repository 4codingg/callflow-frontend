// company.d.ts

import { ContactList } from "./ContactsList";

interface CommunicationHistory {
  id: string;
  message: string;
  cost: number;
  contactsListId: string;
  contactsList: ContactList;
  type: 'sms' | 'email' | 'call';
  companyId: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: string;
  updatedAt: string;
}

interface Address {
  id: string;
  address: string;
  number: number;
  zipcode: string;
}

interface Usage {
  sms: {
    used: number;
    freeLimit: number;
  };
  calls: {
    used: number;
    freeLimit: number;
  };
  email: {
    used: number;
    freeLimit: number;
  };
}

interface Team {
  admins: number;
  members: number;
}

interface Company {
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

  address: Address;
  communicationsHistory: CommunicationHistory[];
  team: Team;
  usage: Usage;
}

export default Company;
