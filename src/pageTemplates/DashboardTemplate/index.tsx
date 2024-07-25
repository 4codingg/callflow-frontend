import {
  LayoutWithSidebar,
  Paragraph,
  Card,
  Button,
  Spinner,
} from '@/components';
import { SERVICES } from '@/constants';
import { RecentActivitiesTemplate } from './RecentActivitiesTemplate';
import { BalanceCardTemplate } from './BalanceCardTemplate';
import { MembersCardTemplate } from './MembersCardTemplate';
import { Tipbox } from '@/components/Tipbox';
import { ArrowRight, Warning } from 'phosphor-react';
import { IPlanSubscriptionValue } from '@/@types/Subscription';
import { useCompany } from '@/hooks/useCompany';
import { useRouter } from 'next/router';

export const DashboardTemplate = () => {
  const { companyDetail, plan } = useCompany();
  const router = useRouter();

  return (
    <LayoutWithSidebar>
      {companyDetail ? (
        <>
          {plan.value === IPlanSubscriptionValue.Free && (
            <Tipbox
              iconLeft={<Warning size={20} />}
              buttonRight={
                <Button
                  className="!w-56 font-medium !text-sm"
                  rightIcon={<ArrowRight color="#FFF" />}
                  onClick={() => router.push('/plans')}
                >
                  Fazer upgrade
                </Button>
              }
            >
              Você está usando o plano gratuito. Com planos melhores, você terá
              acesso a uma variedade de funcionalidades exclusivas que vão
              aprimorar sua experiência.
            </Tipbox>
          )}
          <div className="flex w-full gap-4 mt-4">
            <div className="flex flex-col gap-4 w-[70%]">
              <div className="flex items-center gap-4">
                {SERVICES.map((service) => {
                  const dataService = companyDetail?.usage[service.value];

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
                        {dataService?.used}
                      </Paragraph>
                      <Paragraph className="!text-xs !text-default-grey">
                        Seu limite gratuito{' '}
                        <span className="text-black">
                          {dataService?.freeLimit}
                        </span>
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
        </>
      ) : (
        <div className="w-full mx-auto flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </LayoutWithSidebar>
  );
};
