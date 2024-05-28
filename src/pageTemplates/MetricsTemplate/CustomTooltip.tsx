import { Card, Paragraph } from "@/components";

export const CustomTooltip = ({ payload, label }) => {
  const value = (payload[0]?.value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <Card className="justify-start">
      <Paragraph className="!text-xs !font-medium text-primary">
        {label}
      </Paragraph>
      <Paragraph className="!text-xs !font-medium">Custo: {value}</Paragraph>
    </Card>
  );
};
