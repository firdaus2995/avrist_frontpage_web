import React from 'react';
import Image from 'next/image';

import BlankImage from '@/assets/images/blank-image.svg';

interface ICardCategoryB {
  summary: string;
  description: string;
  imageUrl?: string;
}

const CardCategoryB = ({ summary, description, imageUrl }: ICardCategoryB) => {
  return (
    <div className="flex flex-col gap-[18px] border border-gray_light border-b-8 border-b-purple_dark rounded-[12px] text-left h-full">
      <Image
        alt="blank-image"
        width={0}
        height={170}
        src={imageUrl ?? BlankImage}
        className="w-auto rounded-t-[12px]"
      />
      <div className="h-full flex flex-col justify-between p-5">
        <p
          className="text-[20px] font-bold"
          dangerouslySetInnerHTML={{
            __html: summary
          }}
        />
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

export default CardCategoryB;
