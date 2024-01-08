import { PlusCircle, Trash, Users } from 'phosphor-react';

export const CALL_DETAIL_ACTIONS = [
  {
    label: 'Adicionar contato',
    icon: (isActive) => (
      <PlusCircle color={isActive ? '#783EFD' : '#000'} size={20} />
    ),
  },
  {
    label: 'Adicionar de seus contatos',
    icon: (isActive) => (
      <Users color={isActive ? '#783EFD' : '#000'} size={20} />
    ),
  },
  {
    label: 'Deletar lista',
    icon: (isActive) => (
      <Trash color={isActive ? '#783EFD' : '#000'} size={20} />
    ),
  },
];
