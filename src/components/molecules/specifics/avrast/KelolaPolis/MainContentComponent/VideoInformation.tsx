'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainCard from '../../Klaim/PanduanKlaim/components/VideoCards/MainCard';
import SubCard from '../../Klaim/PanduanKlaim/components/VideoCards/SubCard';
import { VideoItem } from '../../Klaim/PanduanKlaim/types';
import { IVideoData } from '@/app/klaim-layanan/layanan/kelola-polis/page';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';

export const VideoInformation = ({ pageVideoData } : { pageVideoData: IVideoData[] }) => {
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
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const [videoData, setVideoData] = useState<VideoItem[]>([]);
  const [isMainVisible, setIsMainVisible] = useState(true);


  useEffect(() => {
    const setDataVideo = () => {
      try {
        const communityVideos = convertData(pageVideoData)["community-videos"];
        setVideoData(communityVideos);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    setDataVideo();
  }, []);

  const convertData = (data: { [x: string]: any; }) => {
    const communityVideos = [];
    for (let i = 1; i <= 4; i++) {
      const videoId = `body-video${i}`;
      const captionId = `body-captionvideo${i}`;
      const videoData = data[videoId];
      const captionData = data[captionId];
      if (videoData && captionData) {
        let videoType = "";
        let color = "";
        switch (i) {
          case 1:
            videoType = "Asuransi Jiwa Individu";
            color = "purple_dark";
            break;
          case 2:
            videoType = "Avrist Jiwa Korporasi";
            color = "grey_video_footer";
            break;
          case 3:
            videoType = "Avrist Syariah";
            color = "green_border";
            break;
          case 4:
            videoType = "Avrist DPLK";
            color = "orange_border";
            break;
          default:
            break;
        }
        communityVideos.push({
          id: videoId,
          videoUrl: videoData.value,
          videoThumbnail: "",
          type: videoType,
          color: color,
        });
      }
    }
    return { "community-videos": communityVideos };
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

  const renderMobileVideo = () => {
    return videoData.map((item) => (
      <div className='w-full' key={item.id}>
        <SubCard onClick={handleSubcardClick} item={item} />
      </div>
    ));
  };

  return (
    <div className="w-full">
      <div className="w-full m-auto flex flex-col gap-4">
        {videoData.length >= 1 && (
          <div
            className={`transition-all hidden md:grid rounded-xl ${isMainVisible ? 'visible opacity-100' : 'invisible opacity-0'}`}
          >
            <MainCard item={videoData[0]} />
          </div>
        )}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mt-2">
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
