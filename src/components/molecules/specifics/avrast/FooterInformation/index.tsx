import { ReactElement } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';

interface IFooterInformation {
  title: ReactElement;
  buttonTitle: string;
  image: string;
}

const FooterInformation = ({
  title,
  buttonTitle,
  image
}: IFooterInformation) => {
  return (
    <div className="flex px-[32px] py-[50px] sm:px-[136px] sm:py-[72px] bg-avrast_product_bg">
      <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[24px] bg-white overflow-hidden">
        <div className="flex flex-col gap-[24px] justify-center p-[36px]">
          <div>{title}</div>
          <div className="flex justify-center sm:justify-start">
            <Button
              customButtonClass="bg-purple_dark border border-purple_dark hover:shadow-lg px-[40px] py-[14px] w-[fit-content]"
              customTextClass="font-semibold text-white text-[20px]"
              title={buttonTitle}
            />
          </div>
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
  );
};

export default FooterInformation;
