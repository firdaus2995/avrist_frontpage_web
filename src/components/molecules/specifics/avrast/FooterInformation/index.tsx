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
  outerClassName?: string;
}

// button variants: primary, secondary

const FooterInformation = ({
  title,
  buttonTitle,
  image,
  buttonVariant,
  href,
  bgColor,
  outerClassName
}: IFooterInformation) => {
  return (
    <div
      className={`w-full md:px-[136px] md:pt-[6.25rem] md:pb-[7.5rem] xs:px-[2rem] xs:py-[3.125rem] bg-avrast_product_bg justify-center ${outerClassName}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 rounded-[24px] bg-white overflow-hidden">
        <div
          className={`xs:px-[1.5rem] xs:pb-16 sm:h-auto flex flex-col gap-[24px] md:justify-center py-[2.25rem] md:pr-[36px] md:pl-[48px] xs:text-center md:text-start ${bgColor}`}
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
                      ? 'bg-white'
                      : buttonVariant === 'syariah'
                        ? 'bg-white hover:bg-syariah_green hover:text-white border-none'
                        : ''
                }
                customTextClass={`text-[20px]
                  ${
                    !buttonVariant || buttonVariant === 'primary'
                      ? 'text-white font-semibold'
                      : buttonVariant === 'secondary'
                        ? ''
                        : buttonVariant === 'syariah'
                          ? 'text-syariah_green font-semibold hover:text-white'
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
