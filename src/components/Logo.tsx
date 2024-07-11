import Image from "next/image";
import LogoImage from "@/assets/logo.png";
import LogoImageWithBackground from "@/assets/logo-with-background.png";

export enum LogoVariant {
  Dark = "dark",
  Light = "light",
}

interface ILogoProps {
  variant?: LogoVariant;
}

export const Logo = ({ variant = LogoVariant.Dark }: ILogoProps) => {
  const logoVariant = {
    [LogoVariant.Dark]: LogoImage,
    [LogoVariant.Light]: LogoImageWithBackground,
  };

  return (
    <div className="flex gap-3 items-center">
      <Image
        src={logoVariant[variant]}
        alt=""
        width={100}
        height={50}
        className="object-cover !h-[40px]"
      />
    </div>
  );
};
