import Link from 'next/link';
import Image from 'next/image';
import { Paragraph } from '@/components/Paragraph';
import clsx from 'clsx';
import { CaretRight } from 'phosphor-react';

interface ICrumbProps {
  label: string | null;
  path?: string;
}

interface IBreadcrumbProps {
  crumbs: ICrumbProps[];
}

export const Breadcrumb = ({ crumbs }: IBreadcrumbProps) => {
  return (
    <nav>
      <ul className="list-none flex items-center gap-2">
        {crumbs.map((crumb, index) => (
          <li className="flex items-center" key={index}>
            {index > 0 && <CaretRight size={16} className="mr-2" />}
            {crumb.path ? (
              <Link href={crumb.path}>
                <Paragraph className="cursor-pointer text-neutral-grey">
                  {crumb.label}
                </Paragraph>
              </Link>
            ) : (
              <Paragraph
                className={clsx({
                  'text-primary font-semibold': crumbs.length === index + 1,
                })}
              >
                {crumb.label}
              </Paragraph>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
