import React from 'react';
import Image from 'next/image';

import BlankImage from '@/assets/images/blank-image.svg';
import MediumTag from '@/components/atoms/Tag/MediumTag';
import { isContentNotEmpty } from '@/utils/helpers';

interface ICardCategoryD {
  summary: string;
  category: string;
  time: string;
  title: string;
  tags: string[];
  type?: string;
  image?: string;
}

const CardCategoryD = ({
  summary,
  category,
  time,
  title,
  tags,
  type,
  image
}: ICardCategoryD) => {
  return (
    <div
      className={`flex ${type === 'row' ? 'md:flex-row-reverse px-6 py-9 xs:max-lg:flex-wrap xs:flex-col border-b-8 border-b-purple_dark' : 'flex-col border-b-8 border-b-purple_dark'} border border-gray_light rounded-[12px] h-full`}
    >
      <div
        className={`flex relative min-h-[300px] ${type === 'row' ? 'lg:w-1/3 xs:max-lg:w-full rounded-xl' : ''}`}
      >
        <Image
          alt="blank-image"
          width={0}
          height={170}
          src={image?.includes('no-image') ? BlankImage : image}
          className={`w-full object-cover ${type === 'row' ? 'rounded-xl' : 'rounded-t-xl'}`}
        />
      </div>
      <div
        className={`flex flex-col gap-3 ${type === 'row' ? 'lg:w-2/3 xs:max-lg:w-full py-5 pl-2 pr-12' : 'py-[36px] px-[24px]'}`}
      >
        {isContentNotEmpty(category) && (
          <p className="text-[14px] text-left font-opensans ">
            <span className="text-[14px]/[19.6px] font-bold text-purple_dark">
              {category === '-' ? '' : category}
            </span>{' '}
            {time === '-' ? '' : time}
          </p>
        )}
        {isContentNotEmpty(title) && (
          <p className="font-karla text-[24px]/[28.8px] -tracking-[0.72px] font-bold text-left xs:line-clamp-3 sm:line-clamp-2">
            {title}
          </p>
        )}
        {isContentNotEmpty(summary) && (
          <p className="text-[16px]/[22.4px] text-left line-clamp-2">
            {summary}
          </p>
        )}
        <div className="font-opensans flex flex-row gap-2 items-center flex-wrap">
          {tags?.length > 0 &&
            tags?.map((item, index) => (
              <MediumTag
                key={index}
                title={item}
                customClass="font-opensans font-semibold text-[14px]/[19.6px] py-1 px-2 whitespace-nowrap"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardCategoryD;
