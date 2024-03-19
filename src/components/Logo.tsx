import clsx from 'clsx';
import { PhoneIncoming } from 'phosphor-react';
import { Paragraph } from './Paragraph';

export enum LogoVariant {
  Dark = 'dark',
  Light = 'light',
}

export const Logo = ({ variant }) => {
  const logoColorVariant = {
    [LogoVariant.Dark]: '#000',
    [LogoVariant.Light]: '#FFF',
  };

  return (
    <div className="flex gap-3 items-center">
      <PhoneIncoming
        size={20}
        color={logoColorVariant[variant]}
        weight="bold"
      />
      <Paragraph
        className={clsx('!text-[${logoColorVariant[variant]}]', {
          'text-white': variant === LogoVariant.Light,
          'text-black': variant === LogoVariant.Dark,
        })}
      >
        |
      </Paragraph>
      <span
        className={clsx('text-base font-normal ', {
          'text-white': variant === LogoVariant.Light,
          'text-black': variant === LogoVariant.Dark,
        })}
      >
        call.flow
      </span>
    </div>
  );
};
