import { Card, Paragraph, ParagraphSizeVariant } from "@/components";
import { MOCK_TEAM } from "@/constants/recentActivies";
import { useCompany } from "@/hooks/useCompany";
import clsx from "clsx";

export const MembersCardTemplate = () => {
  const { companyDetail } = useCompany();

  return (
    <Card className="flex flex-col p-5 w-full">
      <Paragraph className="!font-bold !text-lg">Time</Paragraph>
      <div className=" flex flex-col gap-5 mt-5 ">
        {MOCK_TEAM.map((activity) => {
          const quantity = companyDetail?.team[activity.value];

          return (
            <div
              key={activity.title}
              className={` flex items-center rounded-md p-4 `}
              style={{
                backgroundColor: `${activity.colorIcon}35`,
              }}
            >
              <div
                className={clsx(
                  "flex items-center justify-center p-2 rounded mr-12",
                  {
                    "bg-green": activity.title === "Member",
                    "bg-primary": activity.title === "Admin",
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
                <Paragraph> {quantity}</Paragraph>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
