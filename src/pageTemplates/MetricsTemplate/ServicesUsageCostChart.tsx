import { Card, Paragraph } from '@/components';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Agosto 2023',
    sms: 300,
    email: 198,
    call: 220,
  },
  {
    name: 'Setembro 2023',
    sms: 200,
    email: 900,
    call: 220,
  },
  {
    name: 'Outubro 2023',
    sms: 278,
    email: 308,
    call: 200,
  },
  {
    name: 'Novembro 2023',
    sms: 189,
    email: 400,
    call: 211,
  },
  {
    name: 'Dezembro 2023',
    sms: 239,
    email: 300,
    call: 250,
  },
  {
    name: 'Janeiro 2024',
    sms: 340,
    email: 400,
    call: 210,
  },
];

export const ServicesUsageCostChart = () => {
  return (
    <Card className="w-[100%] flex flex-col gap-6">
      <Paragraph className="!font-semibold !text-sm">
        Valor gasto (R$) com os serviços
      </Paragraph>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          height={300}
          data={data}
          style={{
            fontSize: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis
            stroke="#888"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) =>
              value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })
            }
          />
          <Tooltip />
          <Bar
            label="SMSs"
            dataKey="sms"
            fill="#783EFD"
            activeBar={<Rectangle fill="#783EFD" />}
          />
          <Bar
            label="Ligações"
            dataKey="call"
            fill="#00DEA3"
            activeBar={<Rectangle fill="#00DEA3" />}
          />
          <Bar
            label="E-mails"
            dataKey="email"
            fill="#FE8F66"
            activeBar={<Rectangle fill="#FE8F66" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
