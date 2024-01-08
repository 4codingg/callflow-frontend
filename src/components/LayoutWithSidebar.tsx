import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Sidebar } from './Sidebar';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';
import { Input } from './Input';
import { MagnifyingGlass } from 'phosphor-react';
import Image from 'next/image';
import MenProfile from '@/assets/men-profile.png';

type Props = {
  children?: ReactNode;
  title?: string;
  hiddenInput?: boolean;
};

export const LayoutWithSidebar = ({
  children,
  title = 'This is the default title',
  hiddenInput,
}: Props) => (
  <div className="flex h-full">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className="flex w-full pb-8 bg-background h-full min-h-screen">
      <div className="w-[16%] fixed h-[100vh]">
        <Sidebar />
      </div>
      <div className="w-[84%] ml-[16%]">
        <header className="flex w-full justify-between items-center bg-white px-8 py-4">
          <div className="flex flex-col ">
            <Heading>Hello João</Heading>
            <Paragraph>4.45 pm 19 Jan 2022</Paragraph>
          </div>
          {!hiddenInput && (
            <div className="flex-1 mx-12">
              <Input
                iconLeft={<MagnifyingGlass color="#000" />}
                placeholder="Procure por algo"
              />
            </div>
          )}
          <div className="flex items-center gap-4">
            <Paragraph>João Guilherme</Paragraph>
            <Image src={MenProfile} alt="" />
          </div>
        </header>
        <div className="mt-8 px-8">{children}</div>
      </div>
    </div>
  </div>
);
