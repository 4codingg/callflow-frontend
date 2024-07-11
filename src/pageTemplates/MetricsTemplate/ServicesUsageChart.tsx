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
    cost: 3000,
  },
  {
    name: 'Setembro 2023',
    cost: 2000,
  },
  {
    name: 'Outubro 2023',
    cost: 2781,
  },
  {
    name: 'Novembro 2023',
    cost: 1891,
  },
  {
    name: 'Dezembro 2023',
    cost: 2391,
  },
  {
    name: 'Janeiro 2024',
    cost: 340,
  },
];

export const ServicesUsageChart = ({ label, data, dataKey, fillColor }) => {
  return (
    <Card className="w-[100%] flex flex-col gap-6">
      <Paragraph className="!font-semibold !text-sm">
        Quantidade utilizada com os serviços
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
          <YAxis stroke="#888" axisLine={false} tickLine={false} />
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
