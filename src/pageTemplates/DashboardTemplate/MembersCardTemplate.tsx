import { Card, Paragraph, ParagraphSizeVariant } from '@/components';
import { MOCK_ACTIVITIES2 } from '@/constants/recentActivies';
import clsx from 'clsx';

export const MembersCardTemplate = () => {
  return (
    <Card className="flex flex-col p-5 w-full">
      <Paragraph className="!font-bold !text-lg">Time</Paragraph>
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
  );
};
