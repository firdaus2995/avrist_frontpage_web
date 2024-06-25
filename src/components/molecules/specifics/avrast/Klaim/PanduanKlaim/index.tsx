'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Slider from 'react-slick';
import YouTube, { YouTubeEvent } from 'react-youtube';
import MainCard from './components/VideoCards/MainCard';
import SubCard from './components/VideoCards/SubCard';
import COMMUNITY_DATA from './sample-data.json';
import { VideoItem } from './types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';

const PanduanKlaim = () => {
  const activePlayerRef = useRef<YouTubeEvent['target'] | null>(null);
  const sliderRef = useRef<Slider | null>(null);
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [videoData, setVideoData] = useState<VideoItem[]>([]);
  const [isMainVisible, setIsMainVisible] = useState(true);

  useEffect(() => {
    setVideoData(COMMUNITY_DATA['community-videos']);
  }, []);

  const handleSubcardClick = (cardId: string) => {
    setIsMainVisible(false);
    setTimeout(() => {
      setVideoData((prevState) => {
        const copiedState = structuredClone(prevState);
        let index = 0;
        copiedState.forEach((item, currentIndex) => {
          if (item.id === cardId) {
            index = currentIndex;
          }
        });

        const temp = copiedState[0];
        copiedState[0] = copiedState[index];
        copiedState[index] = temp;

        return copiedState;
      });
      setIsMainVisible(true);
      sliderRef.current?.slickGoTo(0);
    }, 150);
  };

  const renderSub = () => {
    return videoData
      .slice(1)
      .map((item) => (
        <SubCard onClick={handleSubcardClick} key={item.id} item={item} />
      ));
  };

  const handlePlay = (event: YouTubeEvent) => {
    const player = event.target;
    if (activePlayerRef.current && activePlayerRef.current !== player) {
      activePlayerRef.current.pauseVideo();
    }
    activePlayerRef.current = player;
  };

  const renderMobileVideo = () => {
    const getVideoId = (url: string) => {
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
    };

    return videoData.map((item) => (
      <div
        key={item.id}
        className="w-full h-[17.813rem] mb-10 flex items-center justify-center"
      >
        <YouTube
          videoId={getVideoId(item.videoUrl)}
          className="h-[90%] flex items-center justify-center"
          iframeClassName="-z-1 w-[95%] h-full rounded-t-xl"
          onPlay={handlePlay}
        />
        {item.type && (
          <div className="flex items-center justify-center">
            <div
              className={`p-[0.75rem] w-[95%] bg-${item.color} rounded-b-xl text-white font-bold md:text-2xl font-karla flex flex-row justify-between`}
            >
              {item.type}
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-full flex flex-col justify-center md:pt-[5rem] md:px-[8.5rem] md:pb-[3rem] p-4 gap-4 relative pb-[1.625rem] bg-purple_light_bg">
      <div className="w-full max-w-[78rem] m-auto flex flex-col sm:gap-[4rem] xs:gap-[2.25rem]">
        <div className="w-full flex flex-col items-center justify-center py-2 text-center">
          <h2 className="md:text-[3.5rem] xs:text-[2.25rem] font-medium text-purple_dark xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
            Video Panduan Klaim
          </h2>
          <h2 className="md:text-[2.25rem] xs:text-[1.5rem]">
            Kami memberikan <span className="font-bold">solusi</span> dan{' '}
            <span className="font-bold">efisiensi waktu</span> untuk Anda
          </h2>
        </div>
        {videoData.length >= 1 && (
          <div
            className={`transition-all hidden md:grid ${isMainVisible ? 'visible opacity-100' : 'invisible opacity-0'}`}
          >
            <MainCard item={videoData[0]} mute={true} />
          </div>
        )}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-2 justify-center p-2">
          {renderSub()}
        </div>
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          className="md:!hidden"
          {...sliderSettings}
        >
          {renderMobileVideo()}
        </Slider>
        <div className="flex flex-row justify-between mx-5 md:hidden xs:flex">
          <Image alt="prev" src={ARROW_LEFT} role="button" onClick={previous} />
          <Image alt="next" src={ARROW_RIGHT} role="button" onClick={next} />
        </div>
      </div>
    </div>
  );
};

export default PanduanKlaim;
