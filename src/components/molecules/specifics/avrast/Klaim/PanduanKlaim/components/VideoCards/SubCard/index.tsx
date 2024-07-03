import React, { useMemo } from 'react';
import Image from 'next/image';
import { VideoItem } from '../../../types';
import PlayButton from '@/assets/images/play-button.svg';

type SubCardProps = {
  item: VideoItem;
  onClick: (cardId: string) => void;
};

const SubCard: React.FC<SubCardProps> = ({ item, onClick }) => {
  const videoId = useMemo(() => {
    if (!item.videoUrl) return '';
    const splittedUrl = item.videoUrl.split('/');
    const lastPiece = splittedUrl.at(-1);

    if (lastPiece && lastPiece.includes('watch')) {
      const anotherSplitted = lastPiece.split('?v=');
      return anotherSplitted.at(-1) ?? '';
    } else if (lastPiece && lastPiece.includes('?si=')) {
      const anotherSplitted = lastPiece.split('?si=');
      return anotherSplitted.at(0);
    } else if (lastPiece && lastPiece.includes('?')) {
      const videoIdParam = lastPiece.split('?')[0];
      return videoIdParam ?? '';
    }
    return lastPiece ?? '';
  }, [item.videoUrl]);

  return (
    <div
      onClick={() => onClick(item.id)}
      className="w-full md:max-w-[25rem] flex flex-col rounded-xl shadow-md cursor-pointer group"
    >
      <div className="w-full relative h-[13rem] md:h-[10rem] overflow-hidden rounded-t-xl">
        <Image
          alt={item.type}
          width={0}
          height={0}
          className="absolute w-full h-full inset-0"
          src={
            item.videoThumbnail ||
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          }
        />
        <div className="w-full h-full absolute flex items-center justify-center">
          <Image alt={'play-button'} className="w-16" src={PlayButton} />
        </div>
      </div>
      <div
        className={`font-karla p-4 w-full bg-${item.color} rounded-b-xl text-xl text-white font-bold font-opensanspro leading-[24px]`}
      >
        {item.type}
      </div>
    </div>
  );
};

export default SubCard;
