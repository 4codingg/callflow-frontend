import React, { useState } from 'react';
import { Input } from "@/components";
import { AccordionCard } from "@/components/AccordionCard";
import { InputCalendar } from "@/components/InputCalendar";
import { formatTimeHour } from "@/utils/formatTime";
import { Clock } from "phosphor-react";

interface IScheduleSectionProps {
  reproduceAt: string;
  setReproduceAt: any;
}

export const MassCommunicationScheduleSection = ({
  reproduceAt,
  setReproduceAt,
}: IScheduleSectionProps) => {
  const [formattedTime, setFormattedTime] = useState('');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatTimeHour(inputValue);
    setFormattedTime(formattedValue);
   
  };

  return (
    <div>
      <AccordionCard
        title="Agende seu envio - opcional"
        description="Agende seu envio para uma data e hora específica do seu desejo."
      >
        <InputCalendar
          value={reproduceAt}
          onValueChange={(e) => setReproduceAt(e)}
          label="Data"
        />
        <Input 
          label="Horário"
          placeholder="Horário do disparo"
          iconRight={<Clock />}
          value={formattedTime} 
          onChange={handleTimeChange} 
        />
      </AccordionCard>
    </div>
  );
};
