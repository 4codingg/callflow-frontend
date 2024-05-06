export enum EStatus {
  Completed = "completed",
  Pending = "pending",
}

export const CONTENT_CALLS = [
  {
    id: 1,
    name: "Billing Calls",
    quantity: 13,
    lastPlay: "03/11/2023 11:23",
    status: "pending",
  },
  {
    id: 2,
    name: "Amplifi Calls",
    quantity: 132,
    lastPlay: "13/10/2023 17:23",
    status: "pending",
  },
  {
    id: 3,
    name: "Marketing Calls",
    quantity: 3,
    lastPlay: "03/11/2023 21:23",
    status: "completed",
  },
];

export const MOCK_CONTACTS = [
  {
    id: "1",
    name: "João Silva",
    phone: "(11) 1234-5678",
    email: "joao.silva@email.com",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    phone: "(21) 9876-5432",
    email: "maria.oliveira@email.com",
  },
  {
    id: "3",
    name: "Carlos Santos",
    phone: "(31) 8765-4321",
    email: "carlos.santos@email.com",
  },
  {
    id: "4",
    name: "Ana Souza",
    phone: "(41) 2345-6789",
    email: "ana.souza@email.com",
  },
  {
    id: "5",
    name: "Rafael Pereira",
    phone: "(51) 7654-3210",
    email: "rafael.pereira@email.com",
  },
  {
    id: "6",
    name: "Isabel Lima",
    phone: "(61) 3456-7890",
    email: "isabel.lima@email.com",
  },
  {
    id: "7",
    name: "Antônio Rocha",
    phone: "(71) 8765-4321",
    email: "antonio.rocha@email.com",
  },
  {
    id: "8",
    name: "Patrícia Costa",
    phone: "(81) 2345-6789",
    email: "patricia.costa@email.com",
  },
  {
    id: "9",
    name: "Lucas Oliveira",
    phone: "(91) 7654-3210",
    email: "lucas.oliveira@email.com",
  },
  {
    id: "10",
    name: "Fernanda Silva",
    phone: "(01) 2345-6789",
    email: "fernanda.silva@email.com",
  },
  {
    id: "11",
    name: "Roberto Santos",
    phone: "(21) 8765-4321",
    email: "roberto.santos@email.com",
  },
  {
    id: "12",
    name: "Cristina Lima",
    phone: "(31) 2345-6789",
    email: "cristina.lima@email.com",
  },
  {
    id: "13",
    name: "Pedro Costa",
    phone: "(41) 7654-3210",
    email: "pedro.costa@email.com",
  },
];

export const OPTIONS_LIST = [
  { value: "contact1", label: "Amplifi List" },
  { value: "contact2", label: "Yarley Uni" },
  { value: "contact3", label: "Travel Agency USP" },
];

export const COMPANY_TYPES = [
  {
    value: "development-software",
    label: "Desenvolvimento de Software",
  },
  {
    value: "consulting",
    label: "Consultoria",
  },
  {
    value: "ecommerce",
    label: "Comércio Eletrônico",
  },
  {
    value: "finance",
    label: "Finanças",
  },
  {
    value: "healthcare",
    label: "Saúde",
  },
  {
    value: "education",
    label: "Educação",
  },
];
