import { PhoneIncoming, Chat } from 'phosphor-react';

export const SERVICES = [
  {
    title: 'Ligações',
    value: 'calls',
    cost: 0.05,
    icon: <PhoneIncoming color="#fff" weight="bold" />,
    colorIcon: '#00DEA3',
  },
  {
    title: 'SMS',
    value: 'sms',
    cost: 0.25,
    icon: <Chat color="#fff" weight="bold" />,
    colorIcon: '#FE8F66',
  },
];
