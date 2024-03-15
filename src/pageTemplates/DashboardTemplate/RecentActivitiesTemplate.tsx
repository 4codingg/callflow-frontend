import { Card, Paragraph } from '@/components';
import { MOCK_ACTIVITIES } from '@/constants';
import { getActivitieLabel } from '@/utils/getActivitieLabel';
import clsx from 'clsx';

export const RecentActivitiesTemplate = () => {
  return (
    <Card className="flex flex-col flex-1 w-full">
      <header className="flex justify-between items-center">
        <Paragraph className="!font-bold !text-lg">
          Atividades recentes
        </Paragraph>
      </header>
      <div className="flex flex-col gap-4 mt-4">
        {MOCK_ACTIVITIES.map((activitie) => (
          <div
            key={activitie.title}
            className="flex justify-between items-center hover:bg-neutral cursor-pointer p-1 rounded"
          >
            <div
              className={clsx(
                'flex items-center justify-center p-3 rounded mr-12',
                {
                  'bg-green': activitie.title === 'Ligações',
                  'bg-primary': activitie.title === 'SMSs',
                  'bg-orange': activitie.title === 'Emails',
                }
              )}
            >
              {activitie.icon}
            </div>
            <Paragraph className="w-[15%] text-left !font-normal">
              {activitie.title}
            </Paragraph>
            <Paragraph className="w-[25%] text-left !font-normal">
              {activitie.contactsList}
            </Paragraph>
            <Paragraph className="w-[30%] text-left !font-normal">
              {activitie.time}
            </Paragraph>
            <Paragraph className="w-[15%] text-left !font-normal">
              -R$ {activitie.cost}
            </Paragraph>
            <Paragraph
              className={clsx('w-[15%] text-right flex items-center gap-2', {
                'text-green': activitie.status === 'completed',
                'text-primary': activitie.status === 'pending',
              })}
            >
              <div
                className={clsx('w-2 h-2 rounded-full', {
                  'bg-green': activitie.status === 'completed',
                  'bg-primary': activitie.status === 'pending',
                })}
              />
              {getActivitieLabel(activitie.status)}
            </Paragraph>
          </div>
        ))}
      </div>
    </Card>
  );
};
