import { Input } from "@/components";
import { AccordionCard } from "@/components/AccordionCard";
import { InputCalendar } from "@/components/InputCalendar";
import { Clock } from "phosphor-react";

interface IScheduleSectionProps {
  reproduceAt: string;
  setReproduceAt: any;
}

export const MassCommunicationScheduleSection = ({
  reproduceAt,
  setReproduceAt,
}: IScheduleSectionProps) => {
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
        />
      </AccordionCard>
    </div>
  );
};
