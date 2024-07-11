import * as Radio from '@radix-ui/react-radio-group';
import { Paragraph } from '@/components/Paragraph';
import clsx from 'clsx';

export enum InputRadioGroupVariant {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export enum InputRadioGroupSize {
  Normal = 'normal',
  Large = 'large',
}

interface IRadioOptionProps {
  label: string;
  value: string;
  icon?: any;
}

export interface IInputRadioGroupProps {
  options: IRadioOptionProps[];
  onChange: (e: string) => void;
  variant?: InputRadioGroupVariant;
  defaultValue?: string;
  size?: InputRadioGroupSize;
}

export const InputRadioGroup = ({
  options,
  onChange,
  variant = InputRadioGroupVariant.Vertical,
  defaultValue,
  size = InputRadioGroupSize.Normal,
}: IInputRadioGroupProps) => {
  const inputRadioGroupClassesVariant = {
    [InputRadioGroupVariant.Vertical]: 'flex flex-col',
    [InputRadioGroupVariant.Horizontal]: 'flex',
  };

  const inputRadioGroupClassesSize = {
    [InputRadioGroupSize.Normal]: 'w-6 h-6',
    [InputRadioGroupSize.Large]: 'w-8 h-8',
  };

  const inputRadioGroupIndicatorClassesSize = {
    [InputRadioGroupSize.Normal]: 'w-5 h-5',
    [InputRadioGroupSize.Large]: 'w-8 h-8',
  };
  const indicatorClassesSize = {
    [InputRadioGroupSize.Normal]: 'w-3 h-3',
    [InputRadioGroupSize.Large]: 'w-4 h-4',
  };

  return (
    <Radio.Root
      onValueChange={onChange}
      className={clsx('flex gap-5', inputRadioGroupClassesVariant[variant])}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <div key={option.label} className="flex items-center">
          <Radio.Item
            className={clsx(
              'border flex items-center justify-center border-medium-grey rounded-full',
              inputRadioGroupClassesSize[size]
            )}
            value={option.value}
            id={option.label}
          >
            <Radio.Indicator
              className={clsx(
                ' bg-primary rounded-full flex items-center justify-center',
                inputRadioGroupIndicatorClassesSize[size]
              )}
            >
              <div
                className={clsx(
                  'rounded-full bg-white',
                  indicatorClassesSize[size]
                )}
              />
            </Radio.Indicator>
          </Radio.Item>
          <label
            htmlFor={option?.label}
            className="ml-2 flex items-center justify-center cursor-pointer "
          >
            {option.icon}
            <Paragraph className="ml-2 text-base">{option.label}</Paragraph>
          </label>
        </div>
      ))}
    </Radio.Root>
  );
};
