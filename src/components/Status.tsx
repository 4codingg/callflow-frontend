import { getActivitieLabel } from '@/utils/getActivitieLabel';
import clsx from 'clsx';
import { Paragraph } from './Paragraph';

interface IStatusProps {
  value: 'completed' | 'pending' | 'failed';
}

export const Status = ({ value }: IStatusProps) => {
  return (
    <div
      className={clsx(
        'text-right flex items-center justify-center w-[120px] gap-2 rounded-full py-2',
        {
          'bg-green': value === 'completed',
          'bg-medium-grey': value === 'pending',
          'bg-negative-dark': value === 'failed',
        }
      )}
    >
      <Paragraph className={clsx('text-white !font-semibold')}>
        {getActivitieLabel(value)}
      </Paragraph>
    </div>
  );
};
