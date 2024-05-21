import { ReactElement } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HelpCardProps {
  title: ReactElement;
  buttonTitle: string;
  cardClassname?: string;
  buttonClassname?: string;
  buttonTextClassname?: string;
  image: string;
  href?: string;
}

const HelpCard = ({
  title,
  buttonTitle,
  cardClassname,
  buttonClassname,
  buttonTextClassname,
  image,
  href
}: HelpCardProps) => {
  return (
    <div className="flex px-[2rem] py-[3.125rem] sm:px-[8.5rem] sm:pt-[6.25rem] sm:pb-[7.5rem]">
      <div
        className={`${cardClassname} grid grid-cols-1 sm:grid-cols-2 rounded-[1.5rem] overflow-hidden`}
      >
        <div className="flex flex-col gap-[1.5rem] justify-center py-[2.25rem] pr-[2.25rem] pl-[3rem]">
          <div>{title}</div>
          <div className="flex justify-center sm:justify-start">
            <Link
              href={href ?? '#'}
              className={`${buttonClassname} rounded-[0.5rem] hover:shadow-lg px-[2.5rem] py-[0.75rem] w-[fit-content]`}
            >
              <p
                className={`${buttonTextClassname} font-semibold text-[1.25rem]`}
              >
                {buttonTitle}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex">
          <Image
            height={0}
            width={0}
            alt="HelpCardImage"
            className="min-h-[25rem] w-full object-cover"
            src={image}
          />
        </div>
      </div>
    </div>
  );
};

export default HelpCard;
