import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { Paragraph } from '@/components';

export interface ITabProps {
  options: string[];
  optionActive: string;
  onClick: Dispatch<SetStateAction<any>>;
  tabDivStyle?: string;
  divStyle?: string;
}

export const Tabs = ({
  options,
  onClick,
  optionActive,
  tabDivStyle,
  divStyle,
}: ITabProps) => {
  return (
    <>
      <div className={clsx('flex w-full cursor-pointer', divStyle)}>
        {options.map((option) => {
          const isActive = optionActive === option;
          return (
            <div
              onClick={() => onClick(option)}
              key={option}
              className={clsx(
                'flex flex-col w-full mt-4 justify-center items-center',
                tabDivStyle
              )}
            >
              <Paragraph
                className={clsx('text-dark-grey font-normal', {
                  '!font-bold !text-primary': isActive,
                })}
              >
                {option}
              </Paragraph>
              <div
                className={clsx('mt-2 w-full', {
                  'bg-primary h-[2px]': isActive,
                  'bg-neutral-light-grey h-[1px]': !isActive,
                })}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
