import {
  Heading,
  LayoutWithSidebar,
  Paragraph,
  ParagraphSizeVariant,
  Card,
  Input,
} from '@/components';
import clsx from 'clsx';
import { Plus } from 'phosphor-react';
import Image from 'next/image';
import { MOCK_ACTIVITIES, SERVICES } from '@/constants';
import CardCredit from '@/assets/card-credit.jpg';
import { useRouter } from 'next/router';
import { MOCK_ACTIVITIES2 } from '@/constants/recentActivies';

export const DashboardTemplate = () => {
  const router = useRouter();
  return (
    <LayoutWithSidebar>
      <div>
        <div className="flex flex-col w-full gap-4">
          <div className="flex gap-4">
            {SERVICES.map((service) => {
              return (
                <Card className="max-w-[300px] flex flex-col gap-2">
                  <header className="flex items-center justify-between">
                    <div
                      className={clsx(
                        'flex items-center justify-center p-3 rounded mr-12',
                        {
                          'bg-green': service.value === 'calls',
                          'bg-primary': service.value === 'sms',
                          'bg-orange': service.value === 'emails',
                        }
                      )}
                    >
                      {service.icon}
                    </div>
                    <Paragraph
                      className="font-medium"
                      size={ParagraphSizeVariant.Large}
                    >
                      R$ {service.cost}
                    </Paragraph>
                  </header>
                  <Paragraph className="uppercase mt-2 flex font-light">
                    {service.title}
                  </Paragraph>

                  <Paragraph
                    className="font-medium"
                    size={ParagraphSizeVariant.ExtraLarge}
                  >
                    R$ {service.cost * 10000}
                  </Paragraph>
                </Card>
              );
            })}
          </div>
          <Card className="flex flex-col flex-1">
            <header className="flex justify-between items-center">
              <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
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
                  <Paragraph className="w-[25%] text-left">
                    {activitie.title}
                  </Paragraph>
                  <Paragraph className="w-[30%] text-left">
                    {activitie.time}
                  </Paragraph>
                  <Paragraph className="w-[20%] text-left">
                    -R$ {activitie.cost}
                  </Paragraph>
                  <Paragraph
                    className={clsx('w-[10%] text-right', {
                      'text-green': activitie.status === 'completed',
                      'text-primary': activitie.status === 'pending',
                    })}
                  >
                    {activitie.status}
                  </Paragraph>
                </div>
              ))}
            </div>
          </Card>
          <div className="flex justify-end gap-4">
            <Card className="flex flex-col max-w-[300px]">
              <header className="flex justify-between items-center">
                <Paragraph size={ParagraphSizeVariant.ExtraLarge}>
                  Seu Saldo
                </Paragraph>
                <button
                  className="flex items-center justify-center bg-primary rounded p-2 shadow-primary"
                  onClick={() => router.push('/wallet')}
                >
                  <Plus color="#FFF" />
                </button>
              </header>
              <div className="flex items-center mt-4">
                <Paragraph
                  className="text-primary mr-2 font-medium"
                  size={ParagraphSizeVariant.ExtraLarge}
                >
                  R$
                </Paragraph>
                <Paragraph>Reais</Paragraph>
              </div>
              <Paragraph className="text-primary !text-2xl font-bold">
                19.203,11
              </Paragraph>
              <Image src={CardCredit} alt="" className="mt-4 mx-auto flex" />
            </Card>
            <Card className="flex flex-col max-w-[300px] p-5 ">
              <Paragraph size={ParagraphSizeVariant.ExtraLarge}>Time</Paragraph>
              <div className=" flex flex-col gap-5 mt-5 ">
                {MOCK_ACTIVITIES2.map((activity) => (
                  <div
                    key={activity.title}
                    className={` flex items-center rounded-md p-4 `}
                    style={{
                      backgroundColor: `${activity.colorIcon}35`,
                    }}
                  >
                    <div
                      className={clsx(
                        'flex items-center justify-center p-2 rounded mr-12',
                        {
                          'bg-green': activity.title === 'Member',
                          'bg-primary': activity.title === 'Admin',
                        }
                      )}
                    >
                      {activity.icon}
                    </div>
                    <div className={`flex flex-col -ml-3  `}>
                      <Paragraph
                        className="font-medium"
                        size={ParagraphSizeVariant.Large}
                      >
                        Total {activity.title}
                      </Paragraph>
                      <Paragraph> {activity.quantity}</Paragraph>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  );
};
