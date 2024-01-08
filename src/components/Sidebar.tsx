import { TABS_SIDEBAR } from '@/constants';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Line } from './Line';

export const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <aside className="w-full h-full flex flex-col gap-4 items-center bg-white px-6 py-8">
      <div>LOGO</div>
      <Line />
      <div className="w-full flex flex-col items-center">
        <ul className="flex flex-col gap-4 mt-8">
          {TABS_SIDEBAR.map((tab) => {
            const isActive = tab.route === pathname;

            return (
              <Link
                key={tab.title}
                className="flex items-center justify-start gap-2 py-3"
                href={tab.route}
              >
                <div>{tab.icon(isActive)}</div>
                <span
                  className={clsx('text-base', {
                    'text-primary': isActive,
                  })}
                >
                  {tab.title}
                </span>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
