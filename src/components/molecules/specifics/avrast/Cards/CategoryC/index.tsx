import React, { useState } from 'react';
import Image from 'next/image';

import BlankImage from '@/assets/images/blank-image.svg';
import PlayButton from '@/assets/images/play-button.svg';
import { VideoModal } from '@/components/molecules/specifics/avrast/Modal/VideoModal';
import { getYouTubeId } from '@/utils/helpers';

interface ICardCategoryC {
  summary: string;
  name: string;
  position: string;
  image: string;
  isVideo?: boolean;
}

const CardCategoryC = ({
  summary,
  name,
  position,
  isVideo,
  image
}: ICardCategoryC) => {
  const imageUrl = isVideo
    ? `https://img.youtube.com/vi/${getYouTubeId(image)}/hqdefault.jpg`
    : image;

  const [show, setShow] = useState(false);

  return (
    <>
      {' '}
      <div className="flex flex-col gap-[18px] border border-gray_light border-b-8 border-b-purple_dark rounded-[12px]">
        <div
          className={`flex relative ${isVideo && 'cursor-pointer'}`}
          onClick={() => {
            isVideo && setShow(true);
          }}
        >
          <Image
            alt="blank-image"
            width={0}
            height={170}
            src={imageUrl ?? BlankImage}
            className="w-full object-cover rounded-t-xl"
          />
          {isVideo && (
            <div className="w-full h-full absolute flex items-center justify-center">
              <Image alt={'play-button'} className="w-16" src={PlayButton} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4 px-[24px] pb-[36px]">
          <p className="text-[24px] font-bold text-left">{summary}</p>
          <p className="text-[14px] text-left">
            <span className="font-bold text-purple_dark">{name}</span>{' '}
            {position}
          </p>
        </div>
      </div>
      <VideoModal
        show={show}
        onClose={() => {
          setShow(!show);
        }}
        videoUrl={getYouTubeId(image) ?? ''}
      />
    </>
  );
};

export default CardCategoryC;
