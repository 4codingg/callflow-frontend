import { PhoneIncoming, Chat, Envelope } from 'phosphor-react';

export const SERVICES = [
  {
    title: 'Ligações',
    value: 'calls',
    cost: 0.05,
    quantity: 33,
    max: 15,
    icon: <PhoneIncoming color="#737373" weight="bold" />,
    colorIcon: '#00DEA3',
  },
  {
    title: 'SMS',
    value: 'sms',
    cost: 0.25,
    quantity: 54,
    max: 50,
    icon: <Chat color="#737373" weight="bold" />,
    colorIcon: '#FE8F66',
  },
  {
    title: 'Emails',
    value: 'emails',
    cost: 0.01,
    quantity: 99,
    max: 500,
    icon: <Envelope color="#737373" weight="bold" size={16} />,
    colorIcon: '#FE8F66',
  },
];
