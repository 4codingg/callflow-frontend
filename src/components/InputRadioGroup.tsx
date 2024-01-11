import * as Radio from '@radix-ui/react-radio-group';
import Image from 'next/image';
import { Paragraph } from '@/components/Paragraph';
import clsx from 'clsx';

export enum InputRadioGroupVariant {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

interface IRadioOptionProps {
  label: string;
  value: string;
  icon?: string;
}

export interface IInputRadioGroupProps {
  options: IRadioOptionProps[];
  onChange: (e: string) => void;
  variant?: InputRadioGroupVariant;
  defaultValue?: string;
}

export const InputRadioGroup = ({
  options,
  onChange,
  variant = InputRadioGroupVariant.Vertical,
  defaultValue,
}: IInputRadioGroupProps) => {
  const headingClassesSize = {
    [InputRadioGroupVariant.Vertical]: 'flex flex-col',
    [InputRadioGroupVariant.Horizontal]: 'flex',
  };

  return (
    <Radio.Root
      onValueChange={onChange}
      className={clsx('flex gap-5', headingClassesSize[variant])}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <div key={option.label} className="flex items-center">
          <Radio.Item
            className="w-6 h-6 border-2 flex items-center justify-center border-neutral-light-grey rounded-full"
            value={option.value}
            id={option.label}
          >
            <Radio.Indicator className="w-3 h-3 bg-primary rounded-full" />
          </Radio.Item>
          <label
            htmlFor={option?.label}
            className="flex items-center justify-center cursor-pointer"
          >
            {option.icon && <Image src={option.icon} alt="" className="ml-2" />}
            <Paragraph className="ml-2">{option.label}</Paragraph>
          </label>
        </div>
      ))}
    </Radio.Root>
  );
};
