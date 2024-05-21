import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "./Spinner";

import HiperCardIcon from "@/assets/icons/hipercard-icon.svg";
import MasterCardIcon from "@/assets/icons/mastercard-icon.svg";
import EloIcon from "@/assets/icons/elo-icon.svg";
import VisaIcon from "@/assets/icons/visa-icon.svg";
import { IPaymentMethod } from "@/@types/PaymentMethod";
import { Paragraph } from "./Paragraph";

interface DropdownPaymentMethodsProps {
  label?: string;
  value?: string;
  paymentMethods: IPaymentMethod[];
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

export const PreviewPaymentMethod = ({
  paymentMethods,
  isLoading = false,
}: DropdownPaymentMethodsProps) => {
  const [defaultCard, setDefaultCard] = useState<IPaymentMethod>();
  useEffect(() => {
    if (paymentMethods && paymentMethods.length > 0) {
      const defaultCard = paymentMethods.find((card) => card.default);
      setDefaultCard(defaultCard);
    }
  }, [paymentMethods]);

  return (
    <section>
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          {defaultCard && (
            <div
              className="p-3 text-sm font-poppins h-[40px] w-full flex items-center rounded-lg border border-muted shadow-sm gap-2"
              key={defaultCard.id}
            >
              <div> {getIconBrand(defaultCard.brand)}</div>
              <Paragraph>
                {`**** **** **** ${defaultCard.last4} - ${defaultCard.nickname}`}
              </Paragraph>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export const getIconBrand = (brand: string) => {
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
