'use client';

import React from 'react';
import VideoPlayer from '../../../../VideoPlayer';
import { VideoItem } from '../../../types';

type MainCardProps = {
  item: VideoItem;
  mute?: boolean;
};

const MainCard: React.FC<MainCardProps> = ({ item, mute = false }) => {
  return (
    <div className="grid lg:grid-cols-2 rounded-lg border border-solid border-gray_bglightgray">
      <div className="w-full sm:min-h-[40.688rem] xs:h-[17.5rem] lg:col-span-2 rounded-lg border border-solid border-gray_bglightgray shadow-md">
        <VideoPlayer
          url={item.videoUrl}
          thumbnail={item.videoThumbnail}
          type={item.type}
          color={item.color}
          mute={mute}
        />
      </div>
    </div>
  );
};

export default MainCard;
