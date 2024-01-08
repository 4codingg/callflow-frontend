import clsx from 'clsx';

interface ILineProps {
  direction?: 'horizontal' | 'vertical';
  color?: 'default-grey' | 'background';
  className?: string;
}

export const Line = ({ direction = 'horizontal', className }: ILineProps) => {
  return (
    <div
      className={clsx(' h-[2px] w-full bg-background', className, {
        '!h-full !w-[2px]': direction === 'vertical',
      })}
    ></div>
  );
};
