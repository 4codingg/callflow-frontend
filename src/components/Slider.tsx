import { Root, Track, Range, Thumb, SliderProps } from '@radix-ui/react-slider';
import clsx from 'clsx';
import { Label, Paragraph } from '@/components';

interface ISliderProps extends SliderProps {
  label?: string;
}

export const Slider = ({
  className,
  defaultValue = [1],
  value,
  onValueChange,
  name,
  disabled,
  label,
  ...props
}: ISliderProps) => {
  return (
    <Label
      name={label}
      htmlFor={name}
      disabled={disabled}
      className="gap-7 h-[124px]"
    >
      <Root
        className={clsx(
          'relative flex items-center h-[10px] w-full',
          className
        )}
        min={10}
        max={3000}
        defaultValue={defaultValue}
        name={name}
        disabled={disabled}
        value={value}
        onValueChange={onValueChange}
        {...props}
      >
        <Track className="relative grow rounded-full h-[10px] bg-medium-grey">
          <Range className="absolute rounded-full h-full bg-primary data-[disabled]:bg-medium-grey" />
        </Track>
        <Thumb className="group block w-8 h-8 bg-white border-[10px] border-primary rounded-full outline-none data-[disabled]:border-neutral-grey">
          <div className="flex items-center justify-center mt-8 p-3 h-7 w-28 bg-primary rounded-full group-data-[disabled]:bg-neutral-grey">
            <Paragraph className="text-white">
              R${value ?? defaultValue}
            </Paragraph>
          </div>
        </Thumb>
      </Root>
    </Label>
  );
};
