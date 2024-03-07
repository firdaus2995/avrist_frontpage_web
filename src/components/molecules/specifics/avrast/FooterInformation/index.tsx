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
    <div className="flex px-[136px] py-[72px] bg-avrast_product_bg">
      <div className="grid grid-cols-2 rounded-[24px] bg-white overflow-hidden">
        <div className="flex flex-col gap-[24px] items-start justify-center p-[36px]">
          <div>{title}</div>
          <Button title={buttonTitle} />
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
