import React, { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { CaretDown } from "phosphor-react";
import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { DropdownItem } from "./DropdownItem";
import { Label } from "./Label";
import { Spinner } from "./Spinner";

import HiperCardIcon from "@/assets/icons/hipercard-icon.svg";
import MasterCardIcon from "@/assets/icons/mastercard-icon.svg";
import EloIcon from "@/assets/icons/elo-icon.svg";
import VisaIcon from "@/assets/icons/visa-icon.svg";
import { IPaymentMethod } from "@/@types/PaymentMethod";

interface DropdownPaymentMethodsProps {
  label?: string;
  value?: string;
  paymentMethods: IPaymentMethod[];
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
}

export const PreviewPaymentMethod = ({
  value,
  paymentMethods,
  label,
  placeholder = "Select",
  isLoading = false,
  className,
}: DropdownPaymentMethodsProps) => {
  const [defaultCard, setDefaultCard] = useState<IPaymentMethod>();
  useEffect(() => {
    if (paymentMethods && paymentMethods.length > 0) {
      const defaultCard = paymentMethods.find((card) => card.default);
      setDefaultCard(defaultCard);
    }
  }, [paymentMethods]);

  console.log(defaultCard);
  return (
    <Label name={label} className={clsx("w-full", className)}>
      <Select.Root defaultValue={value} value={value}>
        <Select.Trigger
          className={clsx(
            "p-3 text-sm font-poppins h-[40px] w-full flex justify-between items-center rounded-lg border border-muted shadow-sm"
          )}
          aria-label={label}
        >
          <Select.Value placeholder={placeholder} className="font-normal" />
          <Select.Icon>
            <CaretDown size={16} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            position="popper"
            side="bottom"
            className="bg-white p-4 flex flex-row border border-neutral-grey rounded z-[10000] min-w-[350px] max-h-[300px]"
          >
            <Select.Viewport className="text-neutral-darkest font-poppins">
              <Select.Group>
                {isLoading ? (
                  <div className="flex flex-1 justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
                  defaultCard && (
                    <DropdownItem
                      key={defaultCard.id}
                      leftIcon={getIconBrand(defaultCard.brand)}
                      label={`**** **** **** ${defaultCard.last4} - ${defaultCard.nickname}`}
                      value={defaultCard.id.toString()}
                    />
                  )
                )}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Label>
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
