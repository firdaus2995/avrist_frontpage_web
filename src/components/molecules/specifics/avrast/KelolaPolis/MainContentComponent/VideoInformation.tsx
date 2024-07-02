'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import YouTube, { YouTubeEvent } from 'react-youtube';
import MainCard from '../../Klaim/PanduanKlaim/components/VideoCards/MainCard';
import SubCard from '../../Klaim/PanduanKlaim/components/VideoCards/SubCard';
import { VideoItem } from '../../Klaim/PanduanKlaim/types';
import { IVideoData } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';

export const VideoInformation = ({
  pageVideoData,
  mute = false
}: {
  pageVideoData: IVideoData[];
  mute?: boolean;
}) => {
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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const setDataVideo = () => {
      try {
        const communityVideos = convertData(pageVideoData)['community-videos'];
        setVideoData(communityVideos);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    setDataVideo();
  }, []);

  const convertData = (data: { [x: string]: any }) => {
    const communityVideos = [];
    for (let i = 1; i <= 4; i++) {
      const videoId = `body-video${i}`;
      const captionId = `body-captionvideo${i}`;
      const videoData = data[videoId];
      const captionData = data[captionId];
      if (videoData && captionData) {
        let videoType = '';
        let color = '';
        switch (i) {
          case 1:
            videoType = 'Asuransi Jiwa Individu';
            color = 'purple_dark';
            break;
          case 2:
            videoType = 'Avrist Jiwa Korporasi';
            color = 'grey_video_footer';
            break;
          case 3:
            videoType = 'Avrist Syariah';
            color = 'green_border';
            break;
          case 4:
            videoType = 'DPLK Avrist';
            color = 'orange_border';
            break;
          default:
            break;
        }
        communityVideos.push({
          id: videoId,
          videoUrl: videoData.value,
          videoThumbnail: '',
          type: videoType,
          color: color
        });
      }
    }
    return { 'community-videos': communityVideos };
  };

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
        className="w-full h-[13rem] mb-10 flex items-center justify-center"
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
              className={`p-[0.75rem] w-[95%] bg-${item.color} rounded-b-xl text-white font-bold md:text-2xl font-karla flex flex-row justify-between h-auto`}
            >
              {item.type}
            </div>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="w-full pb-0">
      <div className="w-full m-auto flex flex-col gap-[20]">
        {videoData.length >= 1 && (
          <div
            className={`transition-all hidden md:grid rounded-xl ${isMainVisible ? 'visible opacity-100' : 'invisible opacity-0'}`}
          >
            <MainCard item={videoData[0]} mute={mute} />
          </div>
        )}
        <div className="hidden w-full md:grid md:grid-cols-3 gap-[24px] mt-[24px]">
          {renderSub()}
        </div>
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          className="md:!hidden"
          {...sliderSettings}
          beforeChange={(_, next) => setCurrentSlide(next)}
        >
          {renderMobileVideo()}
        </Slider>
        <div className="flex flex-row justify-between md:hidden xs:flex mt-[32px]">
          <Image
            alt="prev"
            className={currentSlide === 0 ? 'opacity-50' : 'opacity-100'}
            src={ARROW_LEFT}
            role="button"
            onClick={previous}
          />
          <Image
            alt="next"
            className={
              currentSlide === videoData.length - 1
                ? 'opacity-50'
                : 'opacity-100'
            }
            src={ARROW_RIGHT}
            role="button"
            onClick={next}
          />
        </div>
      </div>
    </div>
  );
};
