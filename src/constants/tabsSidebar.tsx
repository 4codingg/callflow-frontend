import {
  ChartBar,
  Chat,
  Cube,
  Envelope,
  PhoneIncoming,
  UserCircle,
  Users,
  UsersThree,
  Wallet,
} from "phosphor-react";

export const TABS_SIDEBAR = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: (isActive) => (
      <ChartBar size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Ligações",
    route: "/calls",
    icon: (isActive) => (
      <PhoneIncoming size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Mensagens",
    route: "/messages",
    icon: (isActive) => (
      <Chat size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Emails",
    route: "/emails",
    icon: (isActive) => (
      <Envelope size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Membros",
    route: "/members",
    icon: (isActive) => (
      <UsersThree size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Contatos",
    route: "/contacts",
    icon: (isActive) => (
      <Users size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Carteira",
    route: "/wallet",
    icon: (isActive) => (
      <Wallet size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Métricas",
    route: "/metrics",
    icon: (isActive) => (
      <Cube size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
  {
    title: "Conta",
    route: "/account",
    icon: (isActive) => (
      <UserCircle size={20} color={isActive ? "#783EFD" : "#000"} />
    ),
  },
];
