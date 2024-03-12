import {
  PhoneIncoming,
  Chat,
  Envelope,
  Crown,
  UsersThree,
} from 'phosphor-react';

export const MOCK_ACTIVITIES = [
  {
    title: 'Ligações',
    contactsList: 'Amplifi List',
    time: '19:13:22 PM',
    status: 'completed',
    cost: 11,
    icon: <PhoneIncoming color="#fff" weight="bold" />,
    colorIcon: '#00DEA3',
  },
  {
    title: 'SMSs',
    contactsList: 'Invoice List',
    time: '09:15:31 AM',
    status: 'pending',
    cost: 21,
    icon: <Chat color="#fff" weight="bold" />,
    colorIcon: '#FE8F66',
  },
  {
    title: 'SMSs',
    contactsList: 'Neivy LTDA',
    time: '09:15:31 AM',
    status: 'pending',
    cost: 21,
    icon: <Chat color="#fff" weight="bold" />,
    colorIcon: '#FE8F66',
  },
  {
    title: 'Emails',
    contactsList: 'Nexus Company',
    time: '09:15:31 AM',
    status: 'completed',
    cost: 5,
    icon: <Envelope color="#fff" weight="bold" />,
    colorIcon: '#FE8F66',
  },
];

export const MOCK_ACTIVITIES2 = [
  {
    title: 'Admin',
    quantity: 11,
    icon: <Crown color="#fff" size={30} weight="bold" />,
    colorIcon: '#783EFD',
  },
  {
    title: 'Member',
    quantity: 6,
    icon: <UsersThree color="#fff" size={30} weight="bold" />,
    colorIcon: '#00DEA3',
  },
];
