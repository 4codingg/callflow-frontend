import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import { CaretDown } from 'phosphor-react';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { ICreditCard } from '@/@types/Wallet';
import { DropdownItem } from './DropdownItem';
import { Label } from './Label';
import { Spinner } from './Spinner';

import HiperCardIcon from '@/assets/icons/hipercard-icon.svg';
import MasterCardIcon from '@/assets/icons/mastercard-icon.svg';
import EloIcon from '@/assets/icons/elo-icon.svg';
import VisaIcon from '@/assets/icons/visa-icon.svg';

interface DropdownPaymentMethodsProps {
  label?: string;
  value?: string;
  onValueChange?: (e: string | ChangeEvent<any>) => void;
  options: ICreditCard[];
  placeholder?: string;
  isLoading?: boolean;
}

export const DropdownPaymentMethods = ({
  value,
  onValueChange,
  options,
  label,
  placeholder = 'Select',
  isLoading = false,
}: DropdownPaymentMethodsProps) => {
  return (
    <Label name={label} className="max-w-[350px]">
      <Select.Root defaultValue={value} onValueChange={onValueChange}>
        <Select.Trigger
          className={clsx(
            'p-3 text-sm font-poppins h-[40px] max-w-[350px] flex justify-between items-center rounded-lg border border-muted shadow-sm'
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
            className="bg-white p-4 flex flex-row border border-neutral-grey rounded z-20 min-w-[350px] max-h-[300px]"
          >
            <Select.Viewport
              className="text-neutral-darkest font-poppins"
              defaultValue={'United States'}
            >
              <Select.Group>
                {isLoading && (
                  <div className="flex flex-1 justify-between items-center">
                    <Spinner />
                  </div>
                )}

                {options.map((option) => {
                  const label = `**** **** ****  ${option.last4} - ${option.name}`;

                  return (
                    <DropdownItem
                      key={option.id}
                      leftIcon={getIconBrand(option.brand)}
                      label={label}
                      value={option.id.toString()}
                    />
                  );
                })}
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
      {brand === 'visa' && <Image src={VisaIcon} alt="" width={26} />}
      {brand === 'elo' && <Image src={EloIcon} alt="" width={26} />}
      {brand === 'mastercard' && (
        <Image src={MasterCardIcon} alt="" width={26} />
      )}
      {brand === 'hipercard' && <Image src={HiperCardIcon} alt="" width={26} />}
    </>
  );
};
