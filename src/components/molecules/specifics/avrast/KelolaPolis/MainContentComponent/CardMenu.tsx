import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MIN from '@/assets/images/avrast/component/panduan-polis/min.svg';
import PLUS from '@/assets/images/avrast/component/panduan-polis/plus.svg';
import CHEVRONRIGHTPURPLE from '@/assets/images/common/chevron-right-purple.svg';

type CardMenuLinkProps = {
  desc: string;
  href?: string;
  openNewTab?: boolean;
};

export const CardMenuLink = (props: CardMenuLinkProps) => {
  const { desc, href, openNewTab } = props;
  return (
    <Link
      href={href ?? '#'}
      target={openNewTab ? '_blank' : '_self'}
      className="w-full p-6 bg-purple_light_bg border-2 rounded-[12px] flex flex-row justify-between items-center font-bold text-[24px] font-opensanspro gap-[48px]"
    >
      {desc}
      <Image src={CHEVRONRIGHTPURPLE} alt="chevron-right" className="w-6 h-6" />
    </Link>
  );
};
type CardMenuDownloadProps = {
  desc: string;
  onDownload?: (href: string) => void;
  href?: string;
};

export const CardMenuDownload = (props: CardMenuDownloadProps) => {
  const { desc, onDownload, href } = props;
  return (
    <div
      role="button"
      onClick={() => {}}
      className="w-full p-[1.5rem] items-start bg-white border-2 rounded-[0.75rem] flex sm:flex-row xs:flex-col justify-between font-bold mb-3 mt-[24px] text-[1.5rem] gap-[0.75rem]"
    >
      <span className="font-opensanspro text-[24px] font-bold xs:text-left flex">
        <span className="w-[90%]">{desc} </span>
        <span className="font-semibold text-[0.875rem] text-purple_dark/80 bg-purple_dark/5 rounded-sm px-[0.5rem] py-[0.25rem] ml-[0.75rem] max-h-[30px] xs:mt-2 sm:mt-0">
          PDF
        </span>
      </span>
      <button
        className="font-opensans font-semibold text-[1rem] bg-purple_dark hover:!bg-purple_light text-white w-[8.5rem] h-[2.5rem] rounded-md px-[1.25rem] py-[0.5rem] xs:self-start sm:self-end"
        onClick={() => onDownload && onDownload(href!)}
      >
        Unduh
      </button>
    </div>
  );
};

type CardMenuChildrenProps = {
  desc: string;
  children: React.ReactNode;
};

export const CardMenuChildren: React.FC<CardMenuChildrenProps> = (props) => {
  const { desc, children } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full p-4 bg-purple_light_bg border-2 rounded-[12px] flex flex-col font-black">
      <div
        className="flex flex-row justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {desc}
        <Image src={open ? MIN : PLUS} alt="chevron-right" className="w-4 " />
      </div>
      {open ? children : null}
    </div>
  );
};
