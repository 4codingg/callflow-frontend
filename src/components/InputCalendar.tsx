import { Calendar as CalendarIcon } from 'phosphor-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Label } from './Label';
import { clsx } from 'clsx';
import { Paragraph } from './Paragraph';
import { formatDateToDDMMYYYYHHMM } from '@/utils/formatDateToDDMMYYYYHHMM';
import { subDays } from 'date-fns';

interface IInputCalendarProps {
  error?: string;
  label: string;
  value: string;
  onValueChange: any;
}

export const InputCalendar = ({
  error,
  label,
  value,
  onValueChange,
}: IInputCalendarProps) => {
  return (
    <Popover>
      <Label
        name={label}
        className="font-poppins font-semibold text-sm text-default-grey"
      >
        <PopoverTrigger asChild>
          <button
            className={clsx(
              'border outline-none focus-within:outline-primary text-black bg-white rounded p-3 flex items-center text-main-blue',
              {
                'outline outline-negative-dark': error,
                'outline-neutral-grey': !error,
                'mt-3': !!label,
              }
            )}
          >
            <Paragraph>{value ? value : 'Selecionar uma data'}</Paragraph>
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            onSelect={(e) => onValueChange(formatDateToDDMMYYYYHHMM(e, true))}
            disabled={(date) =>
              date < subDays(new Date(), 1) || date < new Date('1900-01-01')
            }
          />
        </PopoverContent>
      </Label>
    </Popover>
  );
};
