'use client';
import Image from 'next/image';
import Link from 'next/link';
import { handleDownload } from '@/utils/helpers';

interface Card {
  cardIcon: string;
  cardTitle?: string;
  cardBody: string;
  cardButtonText?: string;
  href?: string;
  isFile?: boolean;
}

interface InformationCardProps {
  heading: string;
  subHeading?: string;
  cards: Card[];
  cardClassname?: string;
  cardButtonClassname?: string;
  cardButtonTextClassname?: string;
  idTags?: string;
}

const InformationCard: React.FC<InformationCardProps> = ({
  heading,
  subHeading,
  cards,
  cardClassname,
  cardButtonClassname,
  cardButtonTextClassname,
  idTags
}) => (
  <div
    className="flex flex-col font-karla xs:py-[2.25rem] md:py-[4rem] mx-auto xs:gap-[1.5rem] md:gap-[4rem]"
    id={idTags}
  >
    <div className="sm:text-center text-center">
      <p className="font-bold xs:text-[2.25rem] md:text-[3.5rem]">{heading}</p>
      {subHeading && (
        <p className="xs:text-[1.5rem] md:text-[2.25rem]">{subHeading}</p>
      )}
    </div>
    <div className="grid sm:grid-cols-3 xs:grid-cols-1 justify-center items-center gap-[1.5rem]">
      {cards.map((item, index) => (
        <div
          key={index}
          className={`${cardClassname} flex flex-col justify-between w-full min-h-[270px] h-full border-1 rounded-[12px] border-b-[8px] rounded-b-[12px] bg-white`}
        >
          <div className="flex w-full justify-center my-[1.5rem]">
            <Image
              alt="blank-image"
              width={100}
              height={100}
              src={item.cardIcon}
              className="w-auto"
            />
          </div>
          <div className="text-center mb-[1.75rem] mx-[1.5rem] flex flex-col gap-[0.75rem]">
            {item.cardTitle && (
              <p className="text-[2rem] font-bold font-karla">
                {item.cardTitle}
              </p>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: item.cardBody }}
              className="text-base font-opensans"
            />
          </div>
          <div className="text-center">
            {item.cardButtonText && (
              <div className="h-full mt-[1.5rem] mb-[1.75rem] px-[3.542rem]">
                {item.isFile ? (
                  <button
                    className={`${cardButtonClassname} rounded-[6px] px-[20px] py-[8px] w-3/4`}
                    onClick={async () => {
                      item.href && (await handleDownload(item.href));
                    }}
                  >
                    <p
                      className={`${cardButtonTextClassname} font-semibold text-[16px]`}
                    >
                      {item.cardButtonText}
                    </p>
                  </button>
                ) : (
                  <Link href={item.href ?? '#'}>
                    <button
                      className={`${cardButtonClassname} rounded-[6px] px-[20px] py-[8px] w-3/4`}
                    >
                      <p
                        className={`${cardButtonTextClassname} font-semibold text-[16px]`}
                      >
                        {item.cardButtonText}
                      </p>
                    </button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default InformationCard;
