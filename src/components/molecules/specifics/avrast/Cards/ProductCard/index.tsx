import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

import BlankImage from '@/assets/images/blank-image.svg';

interface CardProductProps {
  symbol: StaticImport | string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  cardClassname?: string;
  cardTitleClassname?: string;
  cardTagsClassname?: string;
  cardButtonClassname?: string;
  href?: string;
  imageProduk?: string;
  onClickTags?: (item: string) => void;
}

const CardProduct = ({
  symbol,
  title,
  summary,
  description,
  tags,
  cardClassname,
  cardTitleClassname,
  cardTagsClassname,
  cardButtonClassname,
  href,
  imageProduk,
  onClickTags
}: CardProductProps) => {
  return (
    <div
      className={`${cardClassname} flex flex-col gap-[1.5rem] px-[1.5rem] pt-[1.5rem] pb-[2.25rem] border border-gray_light border-b-8 rounded-[12px] rounded-b-[12px]`}
    >
      <Image
        alt="blank-image"
        width={318}
        height={172}
        src={imageProduk || BlankImage}
        className="w-full w-full h-[172px] rounded-[10px]"
      />
      <div className="flex flex-col gap-[0.75rem]">
        <div className="flex flex-row items-center gap-[8px]">
          <Image width={24} height={24} alt="symbol" src={symbol} />
          <p
            className={`${cardTitleClassname} font-bold text-sm font-opensans`}
          >
            {title}
          </p>
        </div>
        <p className="text-[32px] font-bold leading-[38.4px] xs:-tracking-[1.44px] sm:-tracking-[2.56px] font-karla">
          {summary}
        </p>
        <span>
          <p
            className="line-clamp-3 font-opensans"
            dangerouslySetInnerHTML={{ __html: description ?? '' }}
          />
        </span>
      </div>

      <div className="flex flex-row flex-wrap gap-[12px]">
        {tags &&
          tags.map((item: string, index: number) => (
            <Link
              key={index}
              href={{
                pathname: `/pencarian`,
                query: { searchValue: item }
              }}
              onClick={() => {
                onClickTags ? onClickTags(item) : null;
              }}
              className={`${cardTagsClassname} px-2 py-1 rounded-[2px] text-sm font-semibold`}
            >
              <p>{item}</p>
            </Link>
          ))}
      </div>
      <div className="h-full flex items-end font-opensanspro">
        {href ? (
          <Link href={href} className="w-full">
            <button
              className={`${cardButtonClassname} w-full px-[20px] py-[8px] rounded-[6px] font-bold text-[18px]`}
            >
              <p>Pelajari Produk</p>
            </button>
          </Link>
        ) : (
          <button
            className={`${cardButtonClassname} w-full px-[20px] py-[8px] rounded-[6px] font-bold text-[18px]`}
          >
            <p>Pelajari Produk</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CardProduct;
