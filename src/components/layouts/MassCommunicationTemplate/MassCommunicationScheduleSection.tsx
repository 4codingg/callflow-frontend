import React, { useEffect, useState } from "react";
import { Input } from "@/components";
import { AccordionCard } from "@/components/AccordionCard";
import { InputCalendar } from "@/components/InputCalendar";
import { formatTimeHour } from "@/utils/formatTime";
import { Clock } from "phosphor-react";

interface IScheduleSectionProps {
  setReproduceAt: (value: string | null) => void;
}

export const MassCommunicationScheduleSection = ({
  setReproduceAt,
}: IScheduleSectionProps) => {
  const [timeDate, setTimeDate] = useState("");
  const [timeHours, setTimeHours] = useState("");

  const handleDateChange = (e: string) => {
    setTimeDate(e);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const formattedValue = formatTimeHour(inputValue);
    setTimeHours(formattedValue);
  };

  useEffect(() => {
    if (timeDate && timeHours) {
      combineDateTime();
    }
  }, [timeDate, timeHours]);

  const combineDateTime = () => {
    try {
      const [day, month, year] = timeDate.split("/").map(Number);
      const [hours, minutes] = timeHours.split(":").map(Number);
      const date = new Date(year, month - 1, day, hours, minutes);
      setReproduceAt(date.toISOString());
    } catch (err) {
      console.log(err);
    }
  };

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
          label="Horário"
          placeholder="Horário do disparo"
          iconRight={<Clock />}
          value={timeHours}
          onChange={handleTimeChange}
        />
      </AccordionCard>
    </div>
  );
};
