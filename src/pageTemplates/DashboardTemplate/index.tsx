import {
  LayoutWithSidebar,
  Paragraph,
  ParagraphSizeVariant,
  Card,
} from '@/components';
import { SERVICES } from '@/constants';
import { MOCK_ACTIVITIES2 } from '@/constants/recentActivies';
import { RecentActivitiesTemplate } from './RecentActivitiesTemplate';
import clsx from 'clsx';
import { BalanceCardTemplate } from './BalanceCardTemplate';
import { MembersCardTemplate } from './MembersCardTemplate';

export const DashboardTemplate = () => {
  return (
    <LayoutWithSidebar>
      <div className="px-32">
        <div className="flex w-full gap-4">
          <div className="flex flex-col gap-4 w-[70%]">
            <div className="flex items-center gap-4">
              {SERVICES.map((service) => {
                return (
                  <Card className="flex-1 flex flex-col gap-2">
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
                      Seu limite gratuito:{' '}
                      <span className="text-black">{service.max}</span>
                    </Paragraph>
                  </Card>
                );
              })}
            </div>
            <RecentActivitiesTemplate />
          </div>
          <div className="flex flex-col items-center w-[30%] gap-4">
            <MembersCardTemplate />
            <BalanceCardTemplate />
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
