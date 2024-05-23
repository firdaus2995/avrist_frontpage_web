'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';
import Icon1 from '@/assets/images/avrast/component/panduan-pengajuan/icon-1.svg';
import Icon2 from '@/assets/images/avrast/component/panduan-pengajuan/icon-2.svg';
import Icon3 from '@/assets/images/avrast/component/panduan-pengajuan/icon-3.svg';
import Icon4 from '@/assets/images/avrast/component/panduan-pengajuan/icon-4.svg';
import Icon5 from '@/assets/images/avrast/component/panduan-pengajuan/icon-5.svg';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';

const data = [
  {
    title: 'Buku Panduan',
    icon: Icon1,
    btnText: 'Ketentuan pengajuan klaim',
    onClick: () => {}
  },
  {
    title: 'Asuransi Individu',
    icon: Icon2,
    btnText: 'Baca Panduan',
    onClick: () => { window.open('https://avrist.com/PDF/Prosedur Singkat Klaim Individu -update-.pdf', '_blank')}
  },
  {
    title: 'Asuransi Avrist Syariah',
    icon: Icon3,
    btnText: 'Baca Panduan',
    onClick: () => { window.open('https://avrist.com/PDF/Prosedur Singkat Klaim Individu -update-.pdf', '_blank')}
  },
  {
    title: 'Asuransi Korporasi',
    icon: Icon4,
    btnText: 'Baca Panduan',
    onClick: () => { window.open('https://avrist.com/PDF/Prosedur Singkat Klaim Individu -update-.pdf', '_blank')}
  },
  {
    title: 'Avrist DPLK',
    icon: Icon5,
    btnText: 'Baca Panduan',
    onClick: () => {}
  }
];

const PanduanPengajuanTab = () => {
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

  return (
    <div className="flex flex-col self-stretch items-center justify-center">
      <div className="grid grid-cols-3 gap-5 xs:hidden md:grid">
        {data.map((val, idx) => (
          <div
            key={idx}
            className={`max-w-sm flex ${idx === 0 ? 'flex-col row-span-3 border-b-8 border-b-purple_dark items-start' : 'flex-row items-center'} gap-4 justify-start py-[36px] px-[24px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
          >
            <div className="flex w-1/3 items-center justify-start">
              <Image src={val.icon} alt={val.title} width={100} height={100} />
            </div>
            <div
              className={`flex ${idx === 0 ? 'w-full' : 'w-2/3'} flex-col justify-start items-start gap-2`}
            >
              <h5
                className={`mb-2 ${idx === 0 ? 'text-[48px] font-extrabold' : 'text-[24px] font-bold'}  tracking-tight text-gray-900 dark:text-white mt-5 text-left`}
              >
                {val.title}
              </h5>
              {idx === 0 ? (
                <div className="w-full flex items-center justify-start font-medium rounded-xl text-[24px] text-left ml-0">
                  {val.btnText}
                </div>
              ) : (
                <div
                  role="button"
                  className="w-[80%] py-[8px] px-[20px] bg-purple_dark flex items-center justify-center text-white font-semibold rounded-xl text-[24px] text-center ml-0 whitespace-nowrap"
                  onClick={val.onClick}
                >
                  {val.btnText}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-1 md:hidden">
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings}
        >
          {data.map((val, idx) => (
            <div key={idx} className='p-4'>
              <div
                className={`w-full h-[35vh] flex ${idx === 0 ? 'flex-col row-span-3 border-b-8 border-b-purple_dark items-start' : 'flex-row items-center'} gap-4 justify-start p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
              >
                <div className="flex w-1/3 items-center justify-start">
                  <Image src={val.icon} alt={val.title} className="w-20" />
                </div>
                <div
                  className={`flex w-full flex-col justify-start items-start gap-2`}
                >
                  <h5
                    className={`mb-2 text-[20px] font-bold tracking-tight text-gray-900 dark:text-white mt-5 text-left`}
                  >
                    {val.title}
                  </h5>
                  {idx === 0 ? (
                    <div className="w-full flex items-center justify-start font-medium rounded-xl text-md text-left ml-0">
                      {val.btnText}
                    </div>
                  ) : (
                    <div
                      role="button"
                      className="w-full p-3 bg-purple_dark flex items-center justify-center text-white font-medium rounded-xl text-xs text-center ml-0 whitespace-nowrap"
                    >
                      {val.btnText}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex flex-row justify-between">
          <Image alt="prev" src={ARROW_LEFT} role="button" onClick={previous} />
          <Image alt="next" src={ARROW_RIGHT} role="button" onClick={next} />
        </div>
      </div>
    </div>
  );
};

export default PanduanPengajuanTab;
