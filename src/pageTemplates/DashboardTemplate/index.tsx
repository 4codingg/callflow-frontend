import { LayoutWithSidebar, Paragraph, Card, Button } from "@/components";
import { SERVICES } from "@/constants";
import { RecentActivitiesTemplate } from "./RecentActivitiesTemplate";
import { BalanceCardTemplate } from "./BalanceCardTemplate";
import { MembersCardTemplate } from "./MembersCardTemplate";
import { Tipbox } from "@/components/Tipbox";
import { ArrowRight, Warning } from "phosphor-react";
import { useAuth } from "@/hooks/useAuth";
import { IPlanSubscriptionValue } from "@/@types/Subscription";

export const DashboardTemplate = () => {
  const { plan } = useAuth();

  return (
    <LayoutWithSidebar>
      {plan.value === IPlanSubscriptionValue.Free && (
        <Tipbox
          iconLeft={<Warning size={20} />}
          buttonRight={
            <Button
              className="!w-56 font-medium !text-sm"
              rightIcon={<ArrowRight color="#FFF" />}
            >
              Fazer upgrade
            </Button>
          }
        >
          Você está usando o plano gratuito. Com planos melhores, você terá
          acesso a uma variedade de funcionalidades exclusivas que vão aprimorar
          sua experiência.
        </Tipbox>
      )}
      <div className="flex w-full gap-4 mt-4">
        <div className="flex flex-col gap-4 w-[70%]">
          <div className="flex items-center gap-4">
            {SERVICES.map((service) => {
              return (
                <Card
                  className="flex-1 flex flex-col gap-2"
                  key={service.value}
                >
                  <div className="flex items-center justify-between">
                    <Paragraph className="text-base font-semibold">
                      {service.title} (mês)
                    </Paragraph>

                    {service.icon}
                  </div>
                  <Paragraph className="!text-xl !font-bold">
                    {service.quantity}
                  </Paragraph>
                  <Paragraph className="!text-xs !text-default-grey">
                    Seu limite gratuito:{" "}
                    <span className="text-black">{service.max}</span>
                  </Paragraph>
                </Card>
              );
            })}
          </div>
          <RecentActivitiesTemplate />
        </div>
        <div className="flex flex-col items-center w-[30%] gap-4">
          <BalanceCardTemplate />
          <MembersCardTemplate />
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
