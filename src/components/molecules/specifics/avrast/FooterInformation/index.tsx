import { ReactElement } from 'react';
import Image from 'next/image';
import Button from '@/components/atoms/Button/Button';

interface IFooterInformation {
  title: ReactElement;
  buttonTitle?: string;
  image: string;
  buttonVariant?: string;
}

// button variants: primary, secondary

const FooterInformation = ({
  title,
  buttonTitle,
  image,
  buttonVariant
}: IFooterInformation) => {
  return (
    <div className="w-full flex px-[136px] py-[72px] bg-avrast_product_bg justify-center">
      <div className="grid grid-cols-2 rounded-[24px] bg-white overflow-hidden">
        <div className="flex flex-col gap-[24px] items-start justify-center p-[36px]">
          <div>{title}</div>
          {buttonTitle && (
            <Button
              customButtonClass={
                !buttonVariant || buttonVariant === 'primary'
                  ? '!bg-purple_dark'
                  : buttonVariant === 'secondary'
                    ? ''
                    : ''
              }
              customTextClass={
                !buttonVariant || buttonVariant === 'primary'
                  ? 'text-white font-medium'
                  : buttonVariant === 'secondary'
                    ? ''
                    : ''
              }
              title={buttonTitle}
            />
          )}
        </div>
        <div className="flex rounded-r-[24px]">
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
