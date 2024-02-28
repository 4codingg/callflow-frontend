import { Heading, Input, Paragraph } from '@/components';
import Image from 'next/image';
import BannerLogin from '@/assets/banner-login.jpeg';
import Link from 'next/link';
import { Button, ButtonVariant } from '@/components/Button';

export const RegisterTemplate = () => {
  return (
    <div className="h-[100vh] w-full flex  flex-wrap justify-between">
      <div className="w-[50%]">
        <Image src={BannerLogin} layout="fill" objectFit="cover" alt="" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-[50%] px-20">
        <Heading>CALLFLOW</Heading>
        <Paragraph>Olá, seja bem vindo! Registre sua conta.</Paragraph>
        <form className="w-full">
          <Input placeholder="Enter your email" label="Email" />
          <Input
            placeholder="Enter your password"
            type="password"
            label="Password"
          />
          <Link
            href="/reset-password"
            className="w-full flex justify-end mb-8 text-primary font-medium text-sm"
          >
            Esqueceu a senha?
          </Link>
          <Button variant={ButtonVariant.Primary}>Login</Button>
        </form>
        <Paragraph>
          Ainda não tem uma conta?{' '}
          <Link
            href="/register"
            className="bg-transparent border-none outline-none text-primary font-bold"
          >
            Cadastre-se
          </Link>
        </Paragraph>
      </div>
    </div>
  );
};
