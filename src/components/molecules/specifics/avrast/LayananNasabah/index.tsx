'use client';

import React, { useRef, useState } from 'react';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import CustomLink from '../CustomLink';
import CHEVRONRIGHTPURPLE from '@/assets/images/avrast/component/layanan-nasabah/chevron-right.svg';
import ICON1 from '@/assets/images/avrast/component/layanan-nasabah/icon-1.svg';
import ICON2 from '@/assets/images/avrast/component/layanan-nasabah/icon-2.svg';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';
import { EXTERNAL_URL } from '@/utils/baseUrl';

const data = [
  {
    icon: ICON1,
    title: 'FAQs',
    linkIcon: CHEVRONRIGHTPURPLE,
    items: [
      { label: 'Avrist Life Insurance', url: '/tanya-avrista' },
      {
        label: 'Avrist Asset Management',
        url: `${EXTERNAL_URL.avramUrl}/contact-us`
      },
      {
        label: 'Avrist General Insurance',
        url: `${EXTERNAL_URL.agiUrl}/contact-us`
      }
    ]
  },
  {
    icon: ICON2,
    title: 'Hubungi Kami',
    linkIcon: CHEVRONRIGHTPURPLE,
    items: [
      { label: 'Avrist Life Insurance', url: '/hubungi-kami' },
      {
        label: 'Avrist Asset Management',
        url: `${EXTERNAL_URL.avramUrl}/contact-us`
      },
      {
        label: 'Avrist General Insurance',
        url: `${EXTERNAL_URL.agiUrl}/contact-us`
      }
    ]
  }
];

const LayananNasabah = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    centerMode: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const renderCard = (val: {
    icon: StaticImport;
    title: string;

    linkIcon: StaticImport;
    items: {
      label: string;
      url: string;
    }[];
  }) => (
    //   <div
    //   className={`w-full max-h-[40vh] gap-[32px] flex mb-10 md:flex-row xs:flex-col rounded-xl bg-foamy_milk items-center justify-center text-center shadow-xl border-b-8 border-b-purple_dark py-[24px] px-[32px]`}
    // >
    <div
      className={`rounded-xl bg-foamy_milk flex xs:flex-col sm:flex-row py-[24px] px-[32px] sm:items-center gap-[24px] shadow-xl border-b-8 border-b-purple_dark`}
    >
      <div className="xs:block">
        <Image src={val.icon} alt={val.title} className="w-20" />
      </div>
      {/* <div
        className={`w-full md:pt-[24px] md:px-[32px] md:pb-[36px] xs:px-4 xs:pb-4 flex h-full flex-col items-start md:justify-center xs:justify-start md:gap-[24px] xs:gap-5`}
      > */}
      <div className={``}>
        <div className="flex flex-row gap-4">
          <div className="xs:hidden md:block">
            <Image
              src={val.icon}
              alt={val.title}
              className="xs:hidden md:w-28 mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p className="md:text-[32px] xs:text-[2rem] font-bold text-left w-full mb-[1.5rem] font-karla -tracking-[1.6px] leading-[38.4px]">
              {val.title}
            </p>
            <div className="flex flex-col gap-[16px]">
              {val.items?.map((item, index) => (
                <div
                  className="flex flex-row items-center gap-2 flex-wrap font-opensans"
                  key={index}
                >
                  <CustomLink
                    href={item.url}
                    className="flex flex-row items-center gap-4 whitespace-nowrap"
                    role="button"
                  >
                    <p className={`font-bold text-xl leading-[28px]`}>
                      {item.label}
                    </p>
                    <Image
                      src={val.linkIcon}
                      alt={item.url}
                      className="w-[18px] mix-blend-multiply"
                      width={18}
                      height={18}
                    />
                  </CustomLink>
                </div>
              ))}
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
      <div className="px-[2rem]">
        <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
          Layanan Nasabah
        </p>
        <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
          Kami Melayani Dengan Senang Hati!
        </p>
      </div>
      <div className="w-full sm:flex sm:flex-row items-center justify-center gap-10 xs:hidden md:flex xs:grid xs:grid-cols-1">
        {data.map((val, idx) => (
          <div key={idx}>{renderCard(val)}</div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 md:hidden gap-[32px]">
        <div className="w-[85%] m-auto">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            beforeChange={(_, index) => setCurrentSlide(index)}
            {...sliderSettings}
          >
            {data.map((val, idx) => (
              <div className="px-[12px]" key={idx}>
                {renderCard(val)}
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-row gap-4 justify-between w-[85%] m-auto">
          <Image
            alt="prev"
            src={ARROW_LEFT}
            role="button"
            onClick={() => sliderRef.current?.slickPrev()}
            className={currentSlide === 0 ? 'opacity-50' : 'opacity-100'}
          />
          <Image
            alt="next"
            src={ARROW_RIGHT}
            role="button"
            onClick={() => sliderRef.current?.slickNext()}
            className={
              currentSlide === data.length - 1 ? 'opacity-50' : 'opacity-100'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LayananNasabah;
