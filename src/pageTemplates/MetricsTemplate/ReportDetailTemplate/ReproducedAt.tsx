import { Card, Paragraph } from "@/components";
import { differenceInSeconds, isFuture, parseISO } from "date-fns";

interface ReproducedAtProps {
  reproducedAt: string;
}

export const ReproducedAt = ({ reproducedAt }: ReproducedAtProps) => {
  if (!reproducedAt) {
    return (
      <Card className="flex justify-center items-center flex-col">
        <Paragraph>Data de reprodução não disponível</Paragraph>
      </Card>
    );
  }

  let reproducedAtDate;
  try {
    reproducedAtDate = parseISO(reproducedAt);
  } catch (error) {
    console.error("Erro ao analisar a data:", error);
    return (
      <Card className="flex justify-center items-center flex-col">
        <Paragraph>Data de reprodução inválida</Paragraph>
      </Card>
    );
  }

  const now = new Date();

  let timeRemaining = "";

  if (isFuture(reproducedAtDate)) {
    const secondsRemaining = differenceInSeconds(reproducedAtDate, now);
    timeRemaining = `${secondsRemaining} segundos restantes`;
  } else {
    timeRemaining = "A mensagem já foi enviada";
  }

  return (
    <Card className="flex justify-center items-center flex-col">
      <Paragraph>Esse anúncio será reproduzido em:</Paragraph>
      <Paragraph>{timeRemaining}</Paragraph>
    </Card>
  );
};
