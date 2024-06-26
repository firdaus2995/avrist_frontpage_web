import React from 'react';
import Image from 'next/image';

import BlankImage from '@/assets/images/blank-image.svg';
import Book from '@/assets/images/common/book.svg';

interface ICardCategoryD {
  summary: string;
  category: string;
  time: string;
  title: string;
  tags: string[];
  type?: string;
  image?: string;
  readTime?: string;
}

const CardCategoryD = ({
  summary,
  category,
  time,
  title,
  tags,
  type,
  image,
  readTime
}: ICardCategoryD) => {
  return (
    <div
      className={`flex ${type === 'row' ? 'flex-row-reverse p-4 xs:max-lg:flex-wrap' : 'flex-col border-b-8 border-b-purple_dark'} gap-[18px] border border-gray_light rounded-[12px]`}
    >
      <div
        className={`flex relative ${type === 'row' ? 'lg:w-1/3 xs:max-lg:w-full rounded-xl' : ''}`}
      >
        <Image
          alt="blank-image"
          width={0}
          height={170}
          src={image?.includes('no-image') ? BlankImage : image}
          className="w-full object-cover rounded-xl"
        />
      </div>
      <div
        className={`flex flex-col gap-4 py-[36px] px-[24px] ${type === 'row' ? 'lg:w-2/3 xs:max-lg:w-full' : ''}`}
      >
        <p className="text-[14px] text-left lg:min-h-[40px] xs:min-h-auto">
          <span className="font-bold text-purple_dark">
            {category === '-' ? '' : category}
          </span>{' '}
          {time === '-' ? '' : time}
        </p>
        <p className="text-[24px] font-bold text-left lg:min-h-[110px] xs:min-h-auto">
          {title === '-' ? '' : title}
        </p>
        <p className="text-[16px] text-left line-clamp-2">
          {summary === '-' ? '' : summary}
        </p>
        <div className="flex flex-row gap-2 items-center">
          <Image alt="book-image" width={0} height={20} src={Book} />
          <p className="font-bold text-[14px]">
            {readTime !== '-' && `${readTime}`}
          </p>
        </div>
        <div className="min-h-[70px]">
          <div className="flex flex-row gap-2 items-center flex-wrap">
            {tags?.length > 0 &&
              tags?.map((item, index) => (
                <p
                  key={index}
                  className="text-purple_dark font-semibold bg-gray_bglightgray px-2 py-1 text-sm"
                >
                  {item}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategoryD;
