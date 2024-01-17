import clsx from 'clsx';

export enum DotStepsVariant {
  Circle = 'circle',
  Rectangle = 'rectangle',
}

interface DotStepsProps {
  quantity: number;
  currentStep: number;
  className?: string;
  variant?: DotStepsVariant;
}

export const DotSteps = ({
  quantity,
  currentStep,
  className,
  variant = DotStepsVariant.Circle,
}: DotStepsProps) => {
  const dotStepsVariant = {
    [DotStepsVariant.Circle]: 'w-4 h-4 rounded-full bg-secondary',
    [DotStepsVariant.Rectangle]: 'w-8 h-[7px] rounded',
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-center gap-3 transition-opacity duration-700 ease-in-out',
        className
      )}
    >
      {Array.from({ length: quantity }).map((_, index) => (
        <div
          key={index}
          className={clsx(
            'w-4 h-4 rounded-full',
            dotStepsVariant[variant],
            {
              ' opacity-50':
                DotStepsVariant.Circle && currentStep !== index + 1,
            },
            {
              'bg-primary':
                DotStepsVariant.Rectangle && currentStep === index + 1,
              'bg-medium-grey':
                DotStepsVariant.Rectangle && currentStep !== index + 1,
            }
          )}
        />
      ))}
    </div>
  );
};
