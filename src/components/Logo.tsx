import { PhoneIncoming } from 'phosphor-react';

export const Logo = () => {
  return (
    <div className="flex gap-4 items-center">
      <PhoneIncoming size={20} color="#000" weight="bold" />
      <span className="text-base font-normal">call.flow</span>
    </div>
  );
};
