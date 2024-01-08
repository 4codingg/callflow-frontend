import {
  ChartBar,
  Chat,
  Envelope,
  PhoneIncoming,
  Users,
  UsersThree,
} from 'phosphor-react';

export const TABS_SIDEBAR = [
  {
    title: 'Dashboard',
    route: '/dashboard',
    icon: (isActive) => (
      <ChartBar size={20} color={isActive ? '#783EFD' : '#000'} />
    ),
  },
  {
    title: 'Ligações',
    route: '/calls',
    icon: (isActive) => (
      <PhoneIncoming size={20} color={isActive ? '#783EFD' : '#000'} />
    ),
  },
  {
    title: 'Mensagens',
    route: '/messages',
    icon: (isActive) => (
      <Chat size={20} color={isActive ? '#783EFD' : '#000'} />
    ),
  },
  {
    title: 'Emails',
    route: '/emails',
    icon: (isActive) => (
      <Envelope size={20} color={isActive ? '#783EFD' : '#000'} />
    ),
  },
  {
    title: 'Membros',
    route: '/members',
    icon: (isActive) => (
      <UsersThree size={20} color={isActive ? '#783EFD' : '#000'} />
    ),
  },
  {
    title: 'Contatos',
    route: '/contacts',
    icon: (isActive) => (
      <Users size={20} color={isActive ? '#783EFD' : '#000'} />
    ),
  },
];
