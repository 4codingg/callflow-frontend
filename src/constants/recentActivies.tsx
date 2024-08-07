import {
  PhoneIncoming,
  Chat,
  Envelope,
  Crown,
  UsersThree,
} from "phosphor-react";

// export const MOCK_ACTIVITIES = [
//   {
//     id: 1,
//     title: 'Ligações',
//     contactsList: 'Amplifi List',
//     time: '19:13:22 PM',
//     status: 'completed',
//     cost: 11,
//     icon: <PhoneIncoming color="#fff" weight="bold" />,
//     colorIcon: '#00DEA3',
//   },
//   {
//     id: 2,
//     title: 'SMSs',
//     contactsList: 'Invoice List',
//     time: '09:15:31 AM',
//     status: 'pending',
//     cost: 21,
//     icon: <Chat color="#fff" weight="bold" />,
//     colorIcon: '#FE8F66',
//   },
//   {
//     id: 3,
//     title: 'SMSs',
//     contactsList: 'Neivy LTDA',
//     time: '09:15:31 AM',
//     status: 'pending',
//     cost: 21,
//     icon: <Chat color="#fff" weight="bold" />,
//     colorIcon: '#FE8F66',
//   },
//   {
//     id: 4,
//     title: 'Emails',
//     contactsList: 'Nexus Company',
//     time: '09:15:31 AM',
//     status: 'completed',
//     cost: 5,
//     icon: <Envelope color="#fff" weight="bold" />,
//     colorIcon: '#FE8F66',
//   },
//   {
//     id: 5,
//     title: 'Emails',
//     contactsList: 'Nexus Company',
//     time: '09:15:31 AM',
//     status: 'completed',
//     cost: 5,

//     colorIcon: '#FE8F66',
//   },
//   {
//     id: 6,
//     title: 'Ligações',
//     contactsList: 'Nexus Company',
//     time: '09:15:31 AM',
//     status: 'completed',
//     cost: 5,

//     colorIcon: '#00DEA3',
//   },
//   {
//     id: 7,
//     title: 'SMSs',
//     contactsList: 'Nexus Company',
//     time: '09:15:31 AM',
//     status: 'completed',
//     cost: 51,
//     icon: ,
//     colorIcon: '#FE8F66',
//   },

// ];

export const ACTIVITIES_VALUES = {
  sms: {
    icon: <Chat color="#fff" weight="bold" />,
    label: "SMSs",
  },
  call: {
    icon: <PhoneIncoming color="#fff" weight="bold" />,
    label: "Ligações",
  },
  email: {
    icon: <Envelope color="#fff" weight="bold" />,
    label: "E-mails",
  },
};

export const MOCK_TEAM = [
  {
    title: "Admins",
    value: "admins",
    quantity: 11,
    icon: <Crown color="#fff" size={30} weight="bold" />,
    colorIcon: "#783EFD",
  },
  {
    title: "Members",
    value: "members",
    quantity: 6,
    icon: <UsersThree color="#fff" size={30} weight="bold" />,
    colorIcon: "#00DEA3",
  },
];
