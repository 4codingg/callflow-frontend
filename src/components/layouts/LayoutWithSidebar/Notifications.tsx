import { Button } from "@/components/Button";
import { Paragraph } from "@/components/Paragraph";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import clsx from "clsx";
import { Bell } from "phosphor-react";

const MOCK_NOTIFICATIONS = [
  {
    type: "sms-schedulling",
    description:
      "O agendamento de SMS #44671 foi disparado com sucesso no dia 14/05/2024 16:34:31.",
    readedAt: null,
  },
  {
    type: "email-schedulling",
    description:
      "O agendamento de SMS #44671 foi disparado com sucesso no dia 14/05/2024 16:34:31.",
    readedAt: null,
  },
  {
    type: "email-schedulling",
    description:
      "O agendamento de SMS #44671 foi disparado com sucesso no dia 14/05/2024 16:34:31.",
    readedAt: new Date(),
  },
];

export const Notifications = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="bg-transparent !w-10 !h-10 rounded-md hover:border-0 hover:bg-slate-200 transition-all duration-300">
          <Bell color="#000" size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0">
        <>
          <div className="border-b border-muted flex items-center gap-2   px-4">
            <div className="flex items-center justify-center w-4 h-6 bg-primary rounded-sm">
              <Paragraph className="!text-white !font-bold">2</Paragraph>
            </div>
            <Paragraph className="!font-bold my-2 ">Notificações</Paragraph>
          </div>
          {MOCK_NOTIFICATIONS.map((notification) => {
            const wasRead = notification.readedAt !== null;

            return (
              <div
                className={clsx(
                  "flex items-center border-b border-b-muted py-2 px-4 gap-4"
                )}
              >
                <div className="w-4">
                  {!wasRead && (
                    <div className="bg-primary w-2 h-2 rounded-full" />
                  )}
                </div>
                <div>
                  <Paragraph className="!font-bold text-xs">
                    {getTitle(notification.type)}
                  </Paragraph>
                  <Paragraph className="text-default-grey text-xs">
                    {notification.description}
                  </Paragraph>
                </div>
              </div>
            );
          })}
        </>
      </PopoverContent>
    </Popover>
  );
};

const getTitle = (type: string) => {
  const titles = [
    {
      type: "email-schedulling",
      value: "Agendamento de E-mail",
    },
    {
      type: "sms-schedulling",
      value: "Agendamento de SMS",
    },
  ];

  return titles.find((title) => title.type === type).value;
};
