import React from 'react';
import Image from 'next/image';

import BlankImage from '@/assets/images/blank-image.svg';
import { isContentNotEmpty } from '@/utils/helpers';

interface ICardCategoryB {
  summary: string;
  description: string;
  imageUrl?: string;
  lineClamp?: number;
  imageStyle?: string;
  isLoading?: boolean;
}

const CardCategoryB = ({
  summary,
  description,
  imageUrl,
  imageStyle,
  lineClamp,
  isLoading
}: ICardCategoryB) => {
  return (
    <div className="flex flex-col gap-[24px] border border-gray_light border-b-8 border-b-purple_dark rounded-[12px] text-left xs:h-[400px] sm:h-full">
      <div>
        <Image
          alt="blank-image"
          width={0}
          height={0}
          src={imageUrl ?? BlankImage}
          className={`w-full rounded-t-[12px] ${imageStyle ?? ''} ${isLoading ? 'opacity-0' : ''}`}
        />
      </div>

      {!isLoading ? (
        <div className="h-full flex flex-col justify-between px-6 pb-6 gap-3">
          {isContentNotEmpty(summary) && (
            <p
              className={`text-[24px]/[28.8px] tracking-[-0.72px] font-bold font-karla line-clamp-3 ${lineClamp?.toString() ?? ''}`}
              dangerouslySetInnerHTML={{
                __html: summary
              }}
            />
          )}
          {isContentNotEmpty(description) && (
            <p className="text-sm/[1.225rem] mt-2 font-opensans">
              {description}
            </p>
          )}
        </div>
      ) : (
        <div className="h-full flex flex-col justify-between px-6 pb-6 gap-3">
          <p></p>
          {isContentNotEmpty(summary) && (
            <p
              className={`text-[24px]/[28.8px] tracking-[-0.72px] font-bold font-karla line-clamp-3 ${lineClamp?.toString() ?? ''}`}
              dangerouslySetInnerHTML={{
                __html: 'Loading Data...'
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CardCategoryB;
