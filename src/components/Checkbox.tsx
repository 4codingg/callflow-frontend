import { Root, Indicator, CheckboxProps } from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Check } from 'phosphor-react';
import { Label } from './Label';

interface ICheckboxProps extends CheckboxProps {
  label?: string;
  size?: number;
}
export const Checkbox = ({
  name,
  label,
  defaultChecked = false,
  disabled = false,
  onCheckedChange,
  className,
  size = 24,
  ...props
}: ICheckboxProps) => {
  return (
    <div className="flex items-center gap-4">
      <Root
        className={clsx(
          ` flex items-center justify-center appearance-none rounded bg-white border-2 border-neutral-grey outline-none data-[state=checked]:bg-primary data-[state=checked]:border data-[state=checked]:border-secondary disabled:bg-neutral-light-grey`,
          className
        )}
        style={{ width: size, height: size }}
        id={name}
        name={name}
        disabled={disabled}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        {...props}
      >
        <Indicator>
          <Check color="#fff" size={16} />
        </Indicator>
      </Root>
      {label && <Label htmlFor={name} name={label} disabled={disabled} />}
    </div>
  );
};
