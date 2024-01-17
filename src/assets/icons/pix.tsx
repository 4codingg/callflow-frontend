import Pix from '@/assets/pix.svg';
import Image from 'next/image';

export const PixIcon = () => {
  return (
    <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center  ml-2">
      <Image src={Pix} alt="" className="" />
    </div>
  );
};
