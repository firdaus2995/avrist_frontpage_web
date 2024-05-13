import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/atoms/Button/Button';

interface IFooterInformation {
  title: ReactElement;
  buttonTitle?: string;
  image: string;
  buttonVariant?: string;
  bgColor?: string;
  href?: string;
}

// button variants: primary, secondary

const FooterInformation = ({
  title,
  buttonTitle,
  image,
  buttonVariant,
  href,
  bgColor
}: IFooterInformation) => {
  return (
    <div className="w-full flex md:px-[136px] md:pt-[100px] md:pb-[120px] xs:px-[24px] xs:pt-[24px] xs:pb-[36px] bg-avrast_product_bg justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[24px] bg-white overflow-hidden">
        <div
          className={`flex flex-col gap-[24px] justify-center py-[36px] md:pr-[36px] md:pl-[48px] xs:text-center md:text-start ${bgColor}`}
        >
          <div>{title}</div>
          {buttonTitle && (
            <Link
              href={href ?? ''}
              className="flex justify-center sm:justify-start"
            >
              <Button
                customButtonClass={
                  !buttonVariant || buttonVariant === 'primary'
                    ? '!bg-purple_dark'
                    : buttonVariant === 'secondary'
                      ? ''
                      : ''
                }
                customTextClass={`text-[20px]
                  ${
                    !buttonVariant || buttonVariant === 'primary'
                      ? 'text-white font-semibold'
                      : buttonVariant === 'secondary'
                        ? ''
                        : ''
                  }
                `}
                title={buttonTitle}
              />
            </Link>
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
