'use client';

import React from 'react';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import CHEVRONRIGHTPURPLE from '@/assets/images/avrast/component/layanan-nasabah/chevron-right.svg';
import ICON1 from '@/assets/images/avrast/component/layanan-nasabah/icon-1.svg';
import ICON2 from '@/assets/images/avrast/component/layanan-nasabah/icon-2.svg';

const data = [
  {
    icon: ICON1,
    title: 'FAQs',
    link1: 'Avrist Life Insurance',
    link2: 'Avrist Asset Management',
    link3: 'Avrist General Insurance',
    linkIcon: CHEVRONRIGHTPURPLE
  },
  {
    icon: ICON2,
    title: 'Hubungi Kami',
    link1: 'Avrist Life Insurance',
    link2: 'Avrist Asset Management',
    link3: 'Avrist General Insurance',
    linkIcon: CHEVRONRIGHTPURPLE
  }
];

const LayananNasabah = () => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const renderCard = (val: {
    icon: StaticImport;
    title: string;
    link1: string;
    link2: string;
    link3: string;
    linkIcon: StaticImport;
  }) => (
    <div
      className={`w-full h-[40vh] flex mb-10 md:flex-row xs:flex-col rounded-xl bg-foamy_milk items-center justify-center text-center shadow-xl border-b-8 border-b-purple_dark`}
    >
      <div className="xs:block md:hidden flex items-start w-full pt-5 pl-5">
        <Image src={val.icon} alt={val.title} className="w-20" />
      </div>
      <div
        className={`w-full md:p-10 xs:p-4 flex h-full flex-col items-start md:justify-center xs:justify-start md:gap-10 xs:gap-5`}
      >
        <p className="md:text-3xl xs:text-xl font-black md:text-center xs:text-left w-full">
          {val.title}
        </p>
        <div className="flex flex-row items-center gap-4">
          <div className="xs:hidden md:block">
            <Image src={val.icon} alt={val.title} className="xs:w-10 md:w-28" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <div
                role="button"
                className="flex flex-row items-center gap-4 whitespace-nowrap"
              >
                <p className={`font-semibold md:text-lg xs:text-xs`}>
                  {val.link1}
                </p>
                <Image src={val.linkIcon} alt={val.link1} className="w-4" />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <div
                role="button"
                className="flex flex-row items-center gap-4 whitespace-nowrap"
              >
                <p className={`font-semibold md:text-lg xs:text-xs`}>
                  {val.link2}
                </p>
                <Image src={val.linkIcon} alt={val.link2} className="w-4" />
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <div
                role="button"
                className="flex flex-row items-center gap-4 whitespace-nowrap"
              >
                <p className={`font-semibold md:text-lg xs:text-xs`}>
                  {val.link3}
                </p>
                <Image src={val.linkIcon} alt={val.link3} className="w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col self-stretch items-center justify-center py-32 gap-16 bg-white rounded-t-[65px] relative">
      <div className="w-full absolute z-20 top-2 h-20 bg-white rounded-t-[65px]"></div>
      <div className="w-full flex flex-row absolute z-10 top-0 h-20 rounded-t-[65px]">
        <div className="w-1/5 h-full bg-green_border rounded-tl-[65px]"></div>
        <div className="w-1/5 h-full bg-orange_border"></div>
        <div className="w-1/5 h-full bg-purple_dark"></div>
        <div className="w-1/5 h-full bg-agi_grey"></div>
        <div className="w-1/5 h-full bg-avram_green rounded-tr-[65px]"></div>
      </div>
      <div>
        <p className="md:text-5xl xs:text-3xl text-center font-bold text-purple_dark">
          Layanan Nasabah
        </p>
        <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center">
          Kami Melayani Dengan Senang Hati!
        </p>
      </div>
      <div className="w-full flex flex-row items-center justify-center gap-10 xs:hidden md:flex">
        {data.map((val, idx) => (
          <div key={idx}>{renderCard(val)}</div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 md:hidden gap-4">
        <Slider {...sliderSettings}>
          {data.map((val, idx) => (
            <div key={idx}>{renderCard(val)}</div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default LayananNasabah;
