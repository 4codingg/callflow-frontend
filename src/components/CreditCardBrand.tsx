import HiperCardIcon from "@/assets/icons/hipercard-icon.svg";
import MasterCardIcon from "@/assets/icons/mastercard-icon.svg";
import EloIcon from "@/assets/icons/elo-icon.svg";
import VisaIcon from "@/assets/icons/visa-icon.svg";
import Image from "next/image";

export const CreditCardBrand = ({ brand }) => {
  return (
    <>
      {brand.toLowerCase() === "visa" && (
        <Image src={VisaIcon} alt="" width={26} />
      )}
      {brand.toLowerCase() === "elo" && (
        <Image src={EloIcon} alt="" width={26} />
      )}
      {brand.toLowerCase() === "mastercard" && (
        <Image src={MasterCardIcon} alt="" width={26} />
      )}
      {brand.toLowerCase() === "hipercard" && (
        <Image src={HiperCardIcon} alt="" width={26} />
      )}
    </>
  );
};
