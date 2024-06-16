import { useState } from 'react';
import { Input } from "@/components";
import { AccordionCard } from "@/components/AccordionCard";
import { InputCalendar } from "@/components/InputCalendar";
import { Clock } from "phosphor-react";
import { formatDateToDDMMYYYYHHMM } from '@/utils/formatDateToDDMMYYYYHHMM';

interface IScheduleSectionProps {
  reproduceAt: string | null; 
  setReproduceAt: (value: string | null) => void; 
}

export const MassCommunicationScheduleSection = ({
  reproduceAt,
  setReproduceAt,
}: IScheduleSectionProps) => {
  const [timeHours, setTimeHours] = useState('');
  const [timeDate, setTimeDate] = useState('');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeHours(e.target.value);
    if (timeDate) {
      combineDateTime(timeDate, e.target.value);
    }
  };

  const handleDateChange = (e: string) => {
    setTimeDate(e);
    if (timeHours) {
      combineDateTime(e, timeHours);
    }
  };

  const combineDateTime = (date: string, time: string) => {
    const combinedDateTime = `${date} ${time}`;
    const dateObject = formatDateToDDMMYYYYHHMM(combinedDateTime);
    setReproduceAt(dateObject);
  };

  console.log(reproduceAt)
  return (
    <div>
      <AccordionCard
        title="Agende seu envio - opcional"
        description="Agende seu envio para uma data e hora específica do seu desejo."
      >
        <InputCalendar
          value={timeDate}
          onValueChange={(e) => handleDateChange(e)}
          label="Data"
        />
        <Input
          value={timeHours}
          onChange={handleTimeChange}
          label="Horário"
          placeholder="Horário do disparo"
          iconRight={<Clock />}
        />
      </AccordionCard>
    </div>
  );
};
