import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Sidebar } from './Sidebar';
import { Heading } from '../../Heading';
import { Paragraph } from '../../Paragraph';
import Image from 'next/image';
import MenProfile from '@/assets/men-profile.png';
import { useAuth } from '@/hooks/useAuth';
import { useCompany } from '@/hooks/useCompany';

type Props = {
  children?: ReactNode;
  title?: string;
  hiddenInput?: boolean;
};

export const LayoutWithSidebar = ({
  children,
  title = '✆ | callflow',
  hiddenInput,
}: Props) => {
  const { userDetail } = useAuth();
  const { companyDetail } = useCompany();

  return (
    <div className="flex h-full">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex w-full pb-8 bg-white h-full min-h-screen">
        <div className="w-[16%] fixed h-[100vh]">
          <Sidebar />
        </div>
        <div className="w-[84%] ml-[16%]">
          <header className="flex w-full justify-between items-center px-8 py-4 border-b border-muted shadow-sm">
            <div className="flex flex-col ">
              <Heading>Olá {userDetail?.name?.split(' ')[0]}</Heading>
              <Paragraph>
                Seja bem vindo(a) ao{' '}
                <span className="text-primary">call.flow</span>.
              </Paragraph>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1 items-end justify-end text-end">
                <Paragraph className="text-base">
                  {companyDetail?.name}
                </Paragraph>
                <Paragraph className="text-xs text-default-grey">
                  {userDetail?.name}
                </Paragraph>
              </div>
              {/* <Notifications /> */}
              <Image src={MenProfile} alt="" />
            </div>
          </header>
          <div className="mt-8 px-8 relative">{children}</div>
        </div>
      </div>
    </div>
  );
};
