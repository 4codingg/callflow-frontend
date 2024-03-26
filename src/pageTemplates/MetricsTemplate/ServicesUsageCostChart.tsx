import { Button, Card, DropdownMenu, Line, Paragraph } from '@/components';
import { CaretDown } from 'phosphor-react';
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

const options = [
  {
    label: 'SMS',
    value: 'sms',
  },
  {
    label: 'E-mail',
    value: 'email',
  },
  {
    label: 'Ligações',
    value: 'calls',
  },
];

export const ServicesUsageCostChart = ({ label, data, dataKey, fillColor }) => {
  const handleChange = (value: string) => {
    console.log(value);
  };

  return (
    <Card className="w-[100%] flex flex-col gap-6">
      <div className="items-center flex justify-between">
        <Paragraph className="!font-semibold !text-sm">
          Valor gasto (R$) - {label}
        </Paragraph>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="flex ml-auto !w-[150px] ">
            <Button
              className="!bg-[#fff] border border-muted shadow-md rounded-lg !text-[#000]"
              rightIcon={<CaretDown size={16} color="#3F3F3F" />}
            >
              SMS
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-white p-4 flex flex-col gap-4 mt-1 min-w-[200px] border border-muted shadow-md rounded-lg">
            {options.map((action, index) => {
              const isLastItem = options.length === index + 1;

              return (
                <>
                  <button
                    onClick={() => handleChange(action.value)}
                    className="flex gap-2  items-center"
                  >
                    <Paragraph>{action.label}</Paragraph>
                  </button>
                  {!isLastItem && <Line direction="horizontal" />}
                </>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
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
            dataKey={dataKey}
            fill="#783EFD"
            activeBar={<Rectangle fill={fillColor} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
