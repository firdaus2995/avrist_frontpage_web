'use client';

import React, { useRef, useState } from 'react';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CustomLink from '../CustomLink';
import AGI1 from '@/assets/images/avrast/component/total-solution/agi-1.svg';
import AGI2 from '@/assets/images/avrast/component/total-solution/agi-2.svg';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';
import AVRAM1 from '@/assets/images/avrast/component/total-solution/avram-1.svg';
import AVRAM2 from '@/assets/images/avrast/component/total-solution/avram-2.svg';
import AVRAST1 from '@/assets/images/avrast/component/total-solution/avrast-1.svg';
import AVRAST2 from '@/assets/images/avrast/component/total-solution/avrast-2.svg';
import Button from '@/components/atoms/Button/Button';
import { EXTERNAL_URL } from '@/utils/baseUrl';

const data = [
  {
    category: 'Avrist Life Insurance',
    icon: AVRAST1,
    title: 'Asuransi Jiwa Individu',
    content:
      'Beragam perlindungan kesehatan dan jiwa yang bisa dipilih sesuai kebutuhan dengan premi terjangkau',
    btnText: 'Selengkapnya',
    bgColor: 'foamy_milk',
    color: 'purple_dark',
    link: '/produk/individu?tab=Asuransi+Jiwa',
    openInNewTab: false
  },

  {
    category: 'Avrist General Insurance',
    icon: AGI1,
    title: 'Asuransi Properti',
    content:
      'Perlindungan terbaik dari Avrist dengan flexibilitas dan tingkat premi yang kompetitif',
    btnText: 'Selengkapnya',
    bgColor: 'soft_grey',
    color: 'agi_grey',
    inlineStyling: '#F6F6F6',
    link: EXTERNAL_URL.agiUrl,
    openInNewTab: true
  },

  {
    category: 'Avrist Asset Management',
    icon: AVRAM1,
    title: 'Reksa Dana',
    content:
      'Mulai dari 10 ribu rupiah,  Anda sudah bisa berinvestasi dengan mudah',
    btnText: 'Selengkapnya',
    bgColor: 'avram_bg',
    color: 'avram_green',
    inlineStyling: '#EBFCFA',
    link: EXTERNAL_URL.avramUrl,
    openInNewTab: true
  },
  {
    category: 'Avrist Life Insurance',
    icon: AVRAST2,
    title: 'Asuransi Jiwa Korporasi',
    content:
      'Dapatkan berbagai perlindungan jiwa dan kesehatan yang lengkap dan flexible untuk kebutuhan bisnis Anda',
    btnText: 'Selengkapnya',
    bgColor: 'foamy_milk',
    color: 'purple_dark',
    link: '/produk/korporasi?tab=Employee+Benefit',
    openInNewTab: false
  },

  {
    category: 'Avrist General Insurance',
    icon: AGI2,
    title: 'Asuransi Kendaraan',
    content: 'Perlindungan menyeluruh bagi kendaraan kesayangan Anda',
    btnText: 'Selengkapnya',
    bgColor: 'soft_grey',
    color: 'agi_grey',
    inlineStyling: '#F6F6F6',
    link: EXTERNAL_URL.agiUrl,
    openInNewTab: true
  },
  {
    category: 'Avrist Asset Management',
    icon: AVRAM2,
    title: 'Jasa Investasi',
    content:
      'Mulai investasi dari Rp 10.000, dengan didampingi manajer investasi professional yang sudah berpengalaman',
    btnText: 'Selengkapnya',
    bgColor: 'avram_bg',
    color: 'avram_green',
    inlineStyling: '#EBFCFA',
    link: EXTERNAL_URL.avramUrl,
    openInNewTab: true
  }
];

const TotalSolution = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
      setCurrentSlide((prev) => prev + 1);
    }
  };
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
      setCurrentSlide((prev) => prev - 1);
    }
  };
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const renderCard = (
    val: {
      category?: string;
      icon: StaticImport;
      title?: string;
      content?: string;
      btnText?: string;
      bgColor?: string;
      color?: string;
      inlineStyling?: string;
      href?: string;
      link: string;
      openInNewTab?: boolean;
    },
    idx: number
  ) => (
    <div
      className={`flex flex-col gap-4 rounded-xl bg-${val.bgColor} items-center justify-center text-center shadow-xl h-full`}
      style={{ backgroundColor: val.inlineStyling }}
    >
      {idx <= 2 && (
        <div
          className={`w-full bg-${val.color} text-lg font-bold !py-[8px] text-white rounded-t-xl`}
        >
          {val.category}
        </div>
      )}
      <div
        className={`px-[1.5rem] py-[2.25rem] flex flex-col gap-[1.5rem] items-center justify-between h-full ${idx <= 2 ? 'pb-10' : ''}`}
      >
        <div className="flex flex-col gap-[1.5rem] items-center">
          <Image
            alt="loop-image"
            src={val.icon}
            className="mix-blend-multiply"
          />
          <div className="py-[1.5rem] flex flex-col gap-[12px]">
            <p className="font-bold text-[32px] font-karla -tracking-[1.28px]">
              {val.title}
            </p>
            <p className="text-[16px] font-opensans">{val.content}</p>
          </div>
        </div>
        <Link
          href={val.link}
          className="justify-self-end"
          target={val.openInNewTab ? '_blank' : '_self'}
        >
          <Button
            title={val.btnText}
            customButtonClass={`bg-${val.color} hover:bg-${val.color} border-none`}
            customTextClass="text-white font-opensans font-semibold"
          />
        </Link>
      </div>
      {idx > 2 && (
        <div
          className={`w-full bg-${val.color} text-sm font-semibold p-2 text-white rounded-b-xl`}
        ></div>
      )}
    </div>
  );

  const renderMobileCard = (val: {
    category?: string;
    icon: StaticImport;
    title?: string;
    content?: string;
    btnText?: string;
    bgColor?: string;
    color?: string;
    inlineStyling?: string;
    link: string;
  }) => (
    <div
      className={`w-84 flex flex-col gap-4 rounded-xl bg-${val.bgColor} items-center justify-center text-center shadow-xl mx-1`}
      style={{ backgroundColor: val.inlineStyling }}
    >
      <div
        className={`w-full bg-${val.color} text-lg font-semibold py-[8px] px-[24px] text-white rounded-t-xl `}
      >
        {val.category}
      </div>
      <div className="p-5 flex flex-col items-center justify-center gap-4 pb-10">
        <Image alt="loop-image" src={val.icon} className="mix-blend-multiply" />
        <div className="py-[1.5rem] flex flex-col gap-[12px]">
          <p className="font-bold text-[32px] font-karla -tracking-[1.28px] leading-[38.4px]">
            {val.title}
          </p>
          <p className="text-[16px] font-opensans leading-[22.4px]">
            {val.content}
          </p>
        </div>
        <div>
          <CustomLink href={val.link}>
            <Button
              title={val.btnText}
              customButtonClass={`bg-${val.color} hover:bg-${val.color} border-none`}
              customTextClass="text-white font-opensans"
            />
          </CustomLink>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col self-stretch items-center justify-center pb-32 px-[2rem] md:px-[8.5rem] gap-[5rem] bg-white rounded-b-[65px] relative">
      <div className="px-[2rem]">
        <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
          Kami ada untuk Anda
        </p>
        <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
          Avrist Total Solution
        </p>
      </div>
      <div className="lg:hidden" style={{ width: '90%' }}>
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings}
        >
          {data.map((val, idx) => (
            <div key={idx}>{renderMobileCard(val)}</div>
          ))}
        </Slider>
        <div className="flex flex-row gap-4 justify-between mt-[36px]">
          <Image
            alt="prev"
            src={ARROW_LEFT}
            role="button"
            onClick={previous}
            className={currentSlide === 0 ? 'opacity-50' : 'opacity-100'}
          />
          <Image
            alt="next"
            src={ARROW_RIGHT}
            role="button"
            onClick={next}
            className={currentSlide === 5 ? 'opacity-50' : 'opacity-100'}
          />
        </div>
      </div>
      <div className="xs:hidden lg:grid grid-cols-3 gap-4">
        {data.map((val, idx) => (
          <div key={idx}>{renderCard(val, idx)}</div>
        ))}
      </div>
      <div className="w-full absolute z-20 bottom-2 h-20 bg-white rounded-b-[65px]"></div>
      <div className="w-full flex flex-row absolute z-10 bottom-0 h-20 rounded-b-[65px]">
        <div className="w-1/5 h-full bg-green_border rounded-bl-[65px]"></div>
        <div className="w-1/5 h-full bg-orange_border"></div>
        <div className="w-1/5 h-full bg-purple_dark"></div>
        <div className="w-1/5 h-full bg-agi_grey"></div>
        <div className="w-1/5 h-full bg-avram_green rounded-br-[65px]"></div>
      </div>
    </div>
  );
};

export default TotalSolution;
