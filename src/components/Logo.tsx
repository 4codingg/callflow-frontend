import { PhoneIncoming } from "phosphor-react";
import { Paragraph } from "./Paragraph";

export const Logo = () => {
  return (
    <div className="flex gap-4 items-center">
      <PhoneIncoming size={20} color="#fff" weight="bold" />
      <Paragraph className="mx-[-12px] text-white h["> |</Paragraph>
      <span className="text-base font-normal">call.flow</span>
    </div>
  );
};
