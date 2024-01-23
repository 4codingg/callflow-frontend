import { PhoneIncoming, Chat, Envelope } from 'phosphor-react';

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
  {
    title: 'Emails',
    value: 'emails',
    cost: 0.01,
    icon: <Envelope color="#fff" weight="bold" size={16} />,
    colorIcon: '#FE8F66',
  },
];
