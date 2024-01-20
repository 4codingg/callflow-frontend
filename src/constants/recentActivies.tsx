import { PhoneIncoming, Chat, CookingPot, Confetti } from "phosphor-react";

export const MOCK_ACTIVITIES = [
  {
    title: "Ligações",
    time: "19:13:22 PM",
    status: "completed",
    cost: 11,
    icon: <PhoneIncoming color="#fff" weight="bold" />,
    colorIcon: "#00DEA3",
  },
  {
    title: "SMSs",
    time: "09:15:31 AM",
    status: "pending",
    cost: 21,
    icon: <Chat color="#fff" weight="bold" />,
    colorIcon: "#FE8F66",
  },
];
export const MOCK_ACTIVITIES2 = [
  {
    title: "Admin",
    time: "19:13:22 PM",
    status: "completed",
    cost: 11,
    icon: <CookingPot color="#fff" size={30} weight="bold" />,
    colorIcon: "#783EFD",
  },
  {
    title: "Member",
    time: "19:13:22 PM",
    status: "completed",
    cost: 6,
    icon: <Confetti color="#fff" size={30} weight="bold" />,
    colorIcon: "#00DEA3",
  },
];
