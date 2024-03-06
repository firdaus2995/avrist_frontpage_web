'use client';

import Image from 'next/image';
import ROUNDED_FRAME_BOTTOM from '@/assets/images/rounded-frame-bottom.svg';
import ROUNDED_FRAME_TOP from '@/assets/images/rounded-frame-top.svg';
import Button from '@/components/atoms/Button/Button';

interface IKelolaPolis {
  title: string | React.ReactNode;
  buttonTitle: string;
  image: string;
}

const KelolaPolis = ({ title, buttonTitle, image }: IKelolaPolis) => {
  const TopSeparator = () => {
    return (
      <div className="w-full bg-avrast_product_bg">
        <Image
          alt="border"
          className="w-full h-auto -z-[0] mt-1"
          src={ROUNDED_FRAME_TOP}
          style={{ userSelect: 'none' }}
        />
      </div>
    );
  };

  const BottomSeparator = () => {
    return (
      <div className="w-full bg-avrast_product_bg">
        <Image
          alt="border"
          className="w-full h-auto"
          src={ROUNDED_FRAME_BOTTOM}
          style={{ userSelect: 'none' }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <BottomSeparator />
      <div className="w-full flex justify-center py-[72px] bg-avrast_product_bg -mt-[1px]">
        <div className="grid grid-cols-2 rounded-[24px] bg-white overflow-hidden">
          <div className="flex flex-col gap-[24px] items-start justify-center p-[36px] w-[605px]">
            <div>{title}</div>
            <Button
              customButtonClass="!border-none !bg-purple_dark text-white"
              title={buttonTitle}
            />
          </div>
          <div className="flex">
            <Image
              height={0}
              width={0}
              alt="footerInformationImage"
              className="min-h-[400px] w-full object-cover"
              src={image}
            />
          </div>
        </div>
      </div>
      <TopSeparator />
    </div>
  );
};

export default KelolaPolis;
