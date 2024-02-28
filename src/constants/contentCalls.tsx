export enum EStatus {
  Completed = 'completed',
  Pending = 'pending',
}

export const CONTENT_CALLS = [
  {
    id: 1,
    name: 'Billing Calls',
    quantity: 13,
    lastPlay: '03/11/2023 11:23',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Amplifi Calls',
    quantity: 132,
    lastPlay: '13/10/2023 17:23',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Marketing Calls',
    quantity: 3,
    lastPlay: '03/11/2023 21:23',
    status: 'completed',
  },
];

export const MOCK_CONTACTS = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 1234-5678',
    email: 'joao.silva@email.com',
    price: 'R$ 33,33',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    phone: '(21) 9876-5432',
    email: 'maria.oliveira@email.com',
    price: 'R$ 23,11',
  },
  {
    id: '3',
    name: 'Carlos Santos',
    phone: '(31) 8765-4321',
    email: 'carlos.santos@email.com',
    price: 'R$ 99,11',
  },
  {
    id: '4',
    name: 'Ana Souza',
    phone: '(41) 2345-6789',
    email: 'ana.souza@email.com',
    price: 'R$ 54,31',
  },
  {
    id: '5',
    name: 'Rafael Pereira',
    phone: '(51) 7654-3210',
    email: 'rafael.pereira@email.com',
    price: 'R$ 33,33',
  },
  {
    id: '6',
    name: 'Isabel Lima',
    phone: '(61) 3456-7890',
    email: 'isabel.lima@email.com',
    price: 'R$ 512,33',
  },
  {
    id: '7',
    name: 'Antônio Rocha',
    phone: '(71) 8765-4321',
    email: 'antonio.rocha@email.com',
    price: 'R$ 11,22',
  },
  {
    id: '8',
    name: 'Patrícia Costa',
    phone: '(81) 2345-6789',
    email: 'patricia.costa@email.com',
    price: 'R$ 512,33',
  },
  {
    id: '9',
    name: 'Lucas Oliveira',
    phone: '(91) 7654-3210',
    email: 'lucas.oliveira@email.com',
    price: 'R$ 512,33',
  },
  {
    id: '10',
    name: 'Fernanda Silva',
    phone: '(01) 2345-6789',
    email: 'fernanda.silva@email.com',
    price: 'R$ 512,33',
  },
  {
    id: '11',
    name: 'Roberto Santos',
    phone: '(21) 8765-4321',
    email: 'roberto.santos@email.com',
    price: 'R$ 512,33',
  },
  {
    id: '12',
    name: 'Cristina Lima',
    phone: '(31) 2345-6789',
    email: 'cristina.lima@email.com',
    price: 'R$ 512,33',
  },
  {
    id: '13',
    name: 'Pedro Costa',
    phone: '(41) 7654-3210',
    email: 'pedro.costa@email.com',
    price: 'R$ 512,33',
  },
];

export const MOCK_MEMBERS = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 1234-5678',
    email: 'joao.silva@email.com',
    role: 'Super Administrador',
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    phone: '(21) 9876-5432',
    email: 'maria.oliveira@email.com',
    role: 'Administrador',
  },
  {
    id: '3',
    name: 'Carlos Santos',
    phone: '(31) 8765-4321',
    email: 'carlos.santos@email.com',
    role: 'Membro',
  },
];
