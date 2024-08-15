'use client';
import Image from 'next/image';
import Link from 'next/link';

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
  cardContainerClassName?: string;
  cardButtonClassname?: string;
  cardButtonTextClassname?: string;
  cardHeadingClassName?: string;
  idTags?: string;
}

const InformationCard: React.FC<InformationCardProps> = ({
  heading,
  subHeading,
  cards,
  cardClassname,
  cardButtonClassname,
  cardButtonTextClassname,
  cardContainerClassName,
  cardHeadingClassName,
  idTags
}) => (
  <div className="flex flex-col font-karla pb-[0.875rem] mx-auto" id={idTags}>
    <div className="sm:text-center text-center py-[5rem]">
      <p
        className={`font-bold xs:text-[2.25rem] md:text-[3.5rem] xs:-tracking-[1.44px] sm:-tracking-[2.56px] ${cardHeadingClassName}`}
      >
        {heading}
      </p>
      {subHeading && (
        <p className="xs:text-[1.5rem] md:text-[2.25rem]">{subHeading}</p>
      )}
    </div>
    <div
      className={`grid sm:grid-cols-3 xs:grid-cols-1 justify-center items-center gap-x-[1.5rem] xs:gap-y-[1.5rem] sm:gap-y-[4rem] ${cardContainerClassName}`}
    >
      {cards.map((item, index) => (
        <div
          key={index}
          className={`${cardClassname} flex flex-col justify-between w-full min-h-[270px] h-full border-1 rounded-[12px] border-b-[8px] rounded-b-[12px] bg-white px-[1.5rem]`}
        >
          <div className="flex flex-col justify-center mt-[1.5rem] text-center items-center mb-4 gap-4">
            <Image
              alt="blank-image"
              width={100}
              height={100}
              src={item.cardIcon}
              className="w-[6.25rem] h-[6.25rem]"
            />
            {item.cardTitle && (
              <p className="text-[2rem] font-bold font-karla leading-[38.4px]">
                {item.cardTitle}
              </p>
            )}
          </div>
          <div className="text-center mb-[1.75rem] mx-[1.5rem] flex flex-col gap-[0.75rem] h-full">
            <div
              dangerouslySetInnerHTML={{ __html: item.cardBody }}
              className="text-base font-opensans"
            />
          </div>
          <div className="text-center">
            {item.cardButtonText && (
              <div className="h-full mt-[1.5rem] mb-[2.25rem] px-[3.542rem] font-opensans">
                {item.isFile ? (
                  <button
                    className={`${cardButtonClassname} rounded-[6px] px-[20px] py-[8px]`}
                    onClick={() => {
                      window.open(item.href, '_blank');
                    }}
                  >
                    <p
                      className={`${cardButtonTextClassname} font-semibold text-[16px]`}
                    >
                      {item.cardButtonText}
                    </p>
                  </button>
                ) : (
                  <Link
                    href={item.href ?? '#'}
                    target="_self"
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`${cardButtonClassname} rounded-[6px] px-[20px] py-[8px]`}
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
