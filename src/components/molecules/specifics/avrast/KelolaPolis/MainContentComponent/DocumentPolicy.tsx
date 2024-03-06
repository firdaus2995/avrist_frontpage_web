import React from 'react';
import Image from 'next/image';
import MIN from '@/assets/images/avrast/component/panduan-polis/min.svg';
import PLUS from '@/assets/images/avrast/component/panduan-polis/plus.svg';
import CHEVRONRIGHTPURPLE from '@/assets/images/avrast/component/product-section/chevron-right-purple.svg';
import Button from '@/components/atoms/Button/Button';

type CardMenuLinkProps = {
  desc: string;
};
const CardMenuLink = (props: CardMenuLinkProps) => {
  const { desc } = props;
  return (
    <div
      role="button"
      onClick={() => {}}
      className="w-full p-4 bg-purple_light_bg border-2 rounded-lg flex flex-row justify-between font-black"
    >
      {desc}
      <Image src={CHEVRONRIGHTPURPLE} alt="chevron-right" className="w-4" />
    </div>
  );
};
type CardMenuDownloadProps = {
  desc: string;
};
const CardMenuDownload = (props: CardMenuDownloadProps) => {
  const { desc } = props;
  return (
    <div
      role="button"
      onClick={() => {}}
      className="w-full p-4 items-center bg-white border-2 rounded-lg flex flex-row justify-between font-black"
    >
      <span>
        {desc}{' '}
        <span className="font-opensans font-semibold text-[14px] text-purple_dark/80 bg-purple_dark/5 rounded-sm px-[8px] py-[4px] ml-[12px]">
          PDF
        </span>
      </span>
      <Button
        title="Unduh"
        customTextClass="text-white"
        customButtonClass="bg-purple_dark"
      />
    </div>
  );
};

type CardMenuChildrenProps = {
  desc: string;
  children: React.ReactNode;
};
const CardMenuChildren: React.FC<CardMenuChildrenProps> = (props) => {
  const { desc, children } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full p-4 bg-purple_light_bg border-2 rounded-lg flex flex-col font-black">
      <div className="flex flex-row justify-between">
        {desc}
        <Image
          src={open ? MIN : PLUS}
          alt="chevron-right"
          className="w-4 cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      {open ? children : null}
    </div>
  );
};
export const DocumentPolicy = () => {
  return (
    <div>
      <CardMenuLink desc="Panduan Pembayaran Premi" />
      <div className="mt-[24px]">
        <CardMenuChildren desc="Formulir Pelayanan Perubahan Polis">
          <div className="mt-[24px]">
            <CardMenuDownload desc="Perubahan Data Polis" />
          </div>
        </CardMenuChildren>
      </div>
      <div className="mt-[64px]">
        <CardMenuLink desc="Login untuk mengetahui informasi polis Anda" />
      </div>
    </div>
  );
};
