'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import YouTube, { YouTubeEvent } from 'react-youtube';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';

type VideoPlayerProps = {
  url: string;
  thumbnail: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, thumbnail }) => {
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const videoPlayerRef = useRef<any>(null);

  const videoId = useMemo(() => {
    if (!url) return '';
    // https://www.youtube.com/embed/y32pvtRTk1A
    const splittedUrl = url.split('/');
    return splittedUrl[splittedUrl.length - 1];
  }, [url]);

  useEffect(() => {
    if (isThumbnailVisible || !videoPlayerRef.current) return;

    videoPlayerRef.current?.playVideo();
  }, [isThumbnailVisible]);

  useEffect(() => {
    setIsThumbnailVisible(true);
    if (
      !videoPlayerRef.current ||
      videoPlayerRef.current === null ||
      !videoPlayerRef.current?.cueVideoById ||
      !videoId ||
      videoPlayerRef.current.g === null
    )
      return;
    videoPlayerRef.current?.cueVideoById(videoId);
  }, [videoId]);

  const handleReady = (ev: YouTubeEvent) => {
    videoPlayerRef.current = ev.target;
  };

  return (
    <div className="isolate relative w-full h-full">
      <div
        className={`
          inset-0 absolute z-10 cursor-pointer peer transition-all bg-white
          ${isThumbnailVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <Image
          fill={true}
          src={thumbnail}
          alt="Thumbnail"
          onClick={() => setIsThumbnailVisible(false)}
          sizes="100%"
        />
      </div>
      <Button.IconButton
        onClick={() => setIsThumbnailVisible(false)}
        customClass={`
          absolute rounded-full bg-purple-verylight 
          aspect-square w-[5rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          z-10 grid place-items-center pl-4 hover:opacity-50 peer-hover:opacity-50
          transition-all ${isThumbnailVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <Icon name="playIcon" color="white" width={45} height={45} />
      </Button.IconButton>
      {/* <iframe
        className="aspect-video -z-1"
        src={url}
        width={'100%'}
        ref={videoPlayerRef}
      /> */}
      <YouTube
        videoId={videoId}
        className="h-full"
        iframeClassName="-z-1 w-full h-full"
        onReady={handleReady}
      />
    </div>
  );
};

export default VideoPlayer;
