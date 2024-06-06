import { TABS_SIDEBAR } from "@/constants";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Line } from "@/components/Line";
import { Logo } from "@/components/Logo";
import { SignOut } from "phosphor-react";
import { useAuth } from "@/hooks/useAuth";
import { Paragraph } from "@/components/Paragraph";

export const Sidebar = () => {
  const { pathname } = useRouter();

  const { handleSignOut } = useAuth();

  return (
    <aside className="w-full h-full flex flex-col gap-4 items-center px-6 py-8 border-r border-muted shadow-sm">
      <Logo />
      <Line />
      <div className="w-full flex flex-col items-center">
        <ul className="flex flex-col gap-4 mt-8">
          {TABS_SIDEBAR.map((tab) => {
            const isActive = pathname.startsWith(tab.route);
            return (
              <Link
                key={tab.title}
                className="flex items-center justify-start gap-4 py-3"
                href={tab.route}
              >
                <div>{tab.icon(isActive)}</div>
                <span
                  className={clsx("text-sm font-medium font-poppins", {
                    "text-primary !font-bold": isActive,
                  })}
                >
                  {tab.title}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="mt-auto flex">
        <button
          className="flex items-center gap-2 border-b border-black"
          onClick={handleSignOut}
        >
          <Paragraph>Sair</Paragraph>
          <SignOut size={16} color="#000" />
        </button>
      </div>
    </aside>
  );
};
