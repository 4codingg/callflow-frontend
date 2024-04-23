import { Card, EmptyState, Paragraph } from "@/components";
import { ACTIVITIES_VALUES } from "@/constants/recentActivies";
import { useCompany } from "@/hooks/useCompany";
import { formatDateToDDMMYYYYHHMM } from "@/utils/formatDateToDDMMYYYYHHMM";
import { getActivitieLabel } from "@/utils/getActivitieLabel";
import clsx from "clsx";
import Empty from "@/assets/empty-state.png";

export const RecentActivitiesTemplate = () => {
  const { companyDetail } = useCompany();

  companyDetail.communicationsHistory = [];

  return (
    <Card className="flex flex-col flex-1 w-full">
      <header className="flex justify-between items-center">
        <Paragraph className="!font-bold !text-lg">
          Atividades recentes
        </Paragraph>
      </header>
      {!!companyDetail?.communicationsHistory.length ? (
        <div className="flex flex-col gap-4 mt-4">
          {companyDetail?.communicationsHistory.map((record) => (
            <div
              key={record.id}
              className="flex justify-between items-center hover:bg-neutral cursor-pointer p-1 rounded"
            >
              <div
                className={clsx(
                  "flex items-center justify-center p-3 rounded mr-12",
                  {
                    "bg-green": record.type === "call",
                    "bg-primary": record.type === "sms",
                    "bg-orange": record.type === "email",
                  }
                )}
              >
                {ACTIVITIES_VALUES[record.type].icon}
              </div>
              <Paragraph className="w-[15%] text-left !font-normal">
                {ACTIVITIES_VALUES[record.type].label}
              </Paragraph>
              <Paragraph className="w-[25%] text-left !font-normal">
                {record.contactsList?.name}
              </Paragraph>
              <Paragraph className="w-[30%] text-left !font-normal">
                {formatDateToDDMMYYYYHHMM(record.createdAt)}
              </Paragraph>
              <Paragraph className="w-[15%] text-left !font-normal">
                -R$ {record.cost}
              </Paragraph>
              <div
                className={clsx("w-[15%] text-right flex items-center gap-2")}
              >
                <div
                  className={clsx("w-2 h-2 rounded-full", {
                    "bg-green": record.status === "completed",
                    "bg-primary": record.status === "pending",
                  })}
                />
                <Paragraph
                  className={clsx({
                    "!text-green": record.status === "completed",
                    "!text-primary": record.status === "pending",
                  })}
                >
                  {getActivitieLabel(record.status)}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={Empty}
            title="A lista está vazia!"
            description="Comece a realizar envios em massa para preencher a listagem."
          />
        </div>
      )}
    </Card>
  );
};
