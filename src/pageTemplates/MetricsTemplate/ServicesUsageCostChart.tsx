import { Button, Card, DropdownMenu, Line, Paragraph } from "@/components";
import { CaretDown, Check } from "phosphor-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useQuery } from "@tanstack/react-query";
import { getCostPerService } from "@/api/metrics/get-metrics";
import { toast } from "@/utils/toast";

const options = [
  {
    label: "SMS",
    value: "sms",
  },
  {
    label: "E-mail",
    value: "email",
  },
  {
    label: "Ligações",
    value: "calls",
  },
];

export const ServicesUsageCostChart = ({}) => {
  const [serviceActive, setServiceActive] = useState("sms");

  const { data: getCostPerServiceFn, refetch } = useQuery({
    queryKey: ["metrics", serviceActive],
    queryFn: () => getCostPerService(serviceActive),
  });

  const handleChange = (value: string) => {
    setServiceActive(value);
    try {
      refetch();
    } catch (err: any) {
      toast("error", "Erro ao buscar suas métricas");
    }
  };

  return (
    <Card className="w-[100%] flex flex-col">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <Paragraph className="font-medium !text-base">
            Valor gasto por serviço
          </Paragraph>
        </div>
        <div className="items-center flex justify-between">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex ml-auto !w-[150px] ">
              <Button
                className="!bg-[#fff] border border-muted shadow-md rounded-lg font-medium !text-[#000]"
                rightIcon={<CaretDown size={16} color="#3F3F3F" />}
              >
                <Paragraph className="text-xs text-default-grey">
                  Serviço:
                </Paragraph>
                {serviceActive}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-white p-2 flex flex-col mt-1 min-w-[200px] border border-muted shadow-md rounded-lg">
              {options.map((action, index) => {
                const isActive = action.value === serviceActive;

                return (
                  <>
                    <button
                      onClick={() => handleChange(action.value)}
                      className={`flex gap-2 items-center justify-between p-2 rounded-md hover:bg-light-grey`}
                    >
                      <Paragraph>{action.label}</Paragraph>
                      {isActive && <Check size={16} color="#000" />}
                    </button>
                  </>
                );
              })}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
      <Line className="my-4" />

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          height={300}
          data={getCostPerServiceFn}
          style={{
            fontSize: 12,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis
            stroke="#888"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) =>
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
          />
          <Tooltip
            content={({ payload, label }) => (
              <CustomTooltip payload={payload} label={label} />
            )}
          />
          <Bar
            label={serviceActive}
            dataKey={"totalCost"}
            fill="#783EFD"
            activeBar={<Rectangle fill={"#783EFD"} />}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
