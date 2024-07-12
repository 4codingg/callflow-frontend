import clsx from 'clsx';

interface ISpinnerProps {
  className?: string;
  size?: number;
}

export const Spinner = ({ className, size = 20 }: ISpinnerProps) => {
  return (
    <span
      role="status"
      aria-label="Loading..."
      className={clsx(
        'w-5 h-5 border-4 rounded-full border-l-neutral-light-grey border-t-neutral-light-grey border-r-transparent border-b-transparent animate-spin',
        className
      )}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};
