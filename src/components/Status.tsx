import { getActivitieLabel } from '@/utils/getActivitieLabel';
import clsx from 'clsx';
import { Paragraph } from './Paragraph';
import { Circle } from 'lucide-react';

interface IStatusProps {
  value: 'completed' | 'pending' | 'failed';
}

export const Status = ({ value }: IStatusProps) => {
  return (
    <div className={clsx('w-[15%] text-right flex items-center gap-2')}>
      <Circle
        color="#000"
        className={clsx('flex w-2 h-2 rounded-full', {
          'bg-green': value === 'completed',
          'bg-primary': value === 'pending',
          'bg-negative-dark': value === 'failed',
        })}
      />
      <Paragraph
        className={clsx({
          '!text-green': value === 'completed',
          '!text-primary': value === 'pending',
          '!text-negative-dark': value === 'failed',
        })}
      >
        {getActivitieLabel(value)}
      </Paragraph>
    </div>
  );
};
