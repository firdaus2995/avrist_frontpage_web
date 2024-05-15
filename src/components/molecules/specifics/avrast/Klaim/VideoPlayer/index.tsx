'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import YouTube, { YouTubeEvent } from 'react-youtube';
import PlayButtonGreen from '@/assets/images/play-button-green.svg';
import PlayButton from '@/assets/images/play-button.svg';

export type VideoPlayerProps = {
  url: string;
  thumbnail: string;
  type: string;
  color: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  thumbnail,
  type,
  color
}) => {
  const [isThumbnailVisible, setIsThumbnailVisible] = useState(true);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const videoPlayerRef = useRef<any>(null);
  const isReady = useRef<boolean>(false);

  const videoId = useMemo(() => {
    if (!url) return '';
    // Accepts the following pattern of youtube link
    // https://www.youtube.com/embed/y32pvtRTk1A
    // https://www.youtube.com/watch?v=uF7eT3nhyZ0
    // https://youtu.be/uF7eT3nhyZ0?si=Cbt5uoPXbYS9__v_
    const splittedUrl = url.split('/');
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
  }, [url]);

  useEffect(() => {
    if (isThumbnailVisible || !videoPlayerRef.current) return;
    try {
      videoPlayerRef.current?.playVideo();
    } catch (err) {
      console.error('Error auto playing media', err);
    }
  }, [isThumbnailVisible]);

  useEffect(() => {
    setIsThumbnailVisible(true);
    isReady.current = false;
    if (
      !videoPlayerRef.current ||
      !videoPlayerRef.current?.cueVideoById ||
      !videoId ||
      videoPlayerRef.current.g === null
    )
      return;
    videoPlayerRef.current?.cueVideoById(videoId);
  }, [videoId]);

  const handleReady = (ev: YouTubeEvent) => {
    videoPlayerRef.current = ev.target;
    isReady.current = true;
  };

  const handleThumbnailClick = () => {
    if (!isReady.current) return;
    setIsThumbnailVisible(false);
  };

  return (
    // isReady.current &&
    <div className="isolate relative w-full h-full">
      <div
        className={`
          inset-0 absolute z-10 cursor-pointer peer transition-all bg-white
          ${isThumbnailVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <Image
          alt="Thumbnail"
          width={0}
          height={0}
          className="absolute h-full w-full rounded-t-2xl"
          src={
            thumbnail || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          }
          onClick={handleThumbnailClick}
        />
        <div className="w-full h-full flex items-center justify-center">
          <Image
            alt={'play-button'}
            className="w-24 absolute"
            src={color.includes('syariah') ? PlayButtonGreen : PlayButton}
            onClick={handleThumbnailClick}
          />
        </div>
      </div>
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
      <div
        className={`p-4 w-full bg-${color} rounded-b-xl text-sm text-white font-semibold`}
      >
        {type}
      </div>
    </div>
  );
};

export default VideoPlayer;
