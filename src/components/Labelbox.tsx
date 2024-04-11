import clsx from 'clsx';
import { XCircle } from 'phosphor-react';
import { Paragraph } from './Paragraph';

interface ILabelboxProps {
  action?: (value: string) => void;
  label: string;
  className?: string;
  classNameLabel?: string;
  key: string | number;
}

export const Labelbox = ({
  action,
  label,
  key,
  className,
  classNameLabel,
}: ILabelboxProps) => {
  return (
    <div
      key={key}
      className={clsx(
        'h-8 bg-primary flex text-white rounded-3xl px-4 py-1 justify-between items-center gap-2 ',
        className
      )}
    >
      {action && (
        <button onClick={() => action(label)}>
          <XCircle size={19} />
        </button>
      )}
      <Paragraph
        className={clsx(
          ' text-white font-poppins font-medium text-sm',
          classNameLabel
        )}
      >
        {label}
      </Paragraph>
    </div>
  );
};
