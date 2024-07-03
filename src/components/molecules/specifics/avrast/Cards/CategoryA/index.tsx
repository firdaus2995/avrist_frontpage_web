import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

import BlankImage from '@/assets/images/blank-image.svg';
import ButtonSmall from '@/components/atoms/ButtonSmall';
import MediumTag from '@/components/atoms/Tag/MediumTag';

interface ICardCategoryA {
  symbol: StaticImport | string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  href?: string;
  imageProduk?: string;
  setStateTags?: React.Dispatch<React.SetStateAction<any>>;
}

const CardCategoryA = ({
  symbol,
  title,
  summary,
  description,
  tags,
  href,
  imageProduk,
  setStateTags
}: ICardCategoryA) => {
  return (
    <div className="flex flex-col gap-[1.5rem] px-[1.5rem] pt-[1.5rem] pb-[2.25rem] border border-gray_light border-b-purple_dark border-b-8 border-b-8 rounded-[12px] rounded-b-[12px]">
      <Image
        alt="blank-image"
        width={100}
        height={172}
        src={imageProduk || BlankImage}
        className="w-full h-min-[172px] max-h-[214px] rounded-[10px]"
      />
      <div className="flex flex-col gap-[0.75rem]">
        <div className="flex flex-row items-center gap-[8px]">
          <Image width={24} height={24} alt="symbol" src={symbol} />
          <p className={`font-bold text-sm font-opensans`}>{title}</p>
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
      <div className="flex flex-col justify-between grow gap-4">
        <div className="flex flex-row flex-wrap gap-[12px]">
          {tags.map((item: string, index: number) =>
            !setStateTags ? (
              <MediumTag key={index} title={item} />
            ) : (
              <MediumTag
                key={index}
                title={item}
                isLink={false}
                onClick={() => setStateTags(item)}
                customClass="cursor-pointer"
              />
            )
          )}
        </div>
        {href ? (
          <Link href={href} className="w-full">
            <ButtonSmall
              title="Pelajari Produk"
              customClassName="w-full text-[18px]"
            />
          </Link>
        ) : (
          <ButtonSmall title="Pelajari Produk" />
        )}
      </div>
    </div>
  );
};

export default CardCategoryA;
