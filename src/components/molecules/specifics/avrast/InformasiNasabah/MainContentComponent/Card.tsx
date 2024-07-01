'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';
import CONTACTS from '@/assets/images/common/contacts.svg';
import DOCUMENT_SEARCH from '@/assets/images/common/document-search.svg';
import PERSON from '@/assets/images/common/person.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const mockData = [
  {
    id: '1',
    title: 'Panduan polis Anda',
    desc: 'Lihat detail panduan polis yang anda miliki di sini',
    icon: CONTACTS,
    btn: 'Lihat Di Sini',
    link: 'layanan/kelola-polis',
    isFile: false
  },
  {
    id: '2',
    title: 'Mekanisme Penanganan Pengaduan',
    desc: 'Kami menghargai dan mendengarkan saran dan keluhan dari nasabah Kami.',
    icon: DOCUMENT_SEARCH,
    btn: 'Selengkapnya',
    link: 'layanan/penanganan-pengaduan',
    isFile: false
  },
  {
    id: '3',
    title: 'Daftar Tenaga Pemasar',
    desc: 'Temukan daftar tenaga pemasar aktif Avrist Assurance',
    icon: PERSON,
    btn: 'Temukan Di sini',
    link: '/hubungi-kami',
    isFile: false
  }
];

export const ContentCard = () => {
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
    slidesToShow: 1.1,
    slidesToScroll: 1
  };

  return (
    <div className="flex flex-col self-stretch items-center justify-center gap-[4rem]">
      <div className="xs:hidden sm:grid sm:grid-cols-3 xs:grid-cols-1 gap-[1.5rem]">
        {mockData.map((i) => (
          <div
            key={i.id}
            className="flex flex-col items-center justify-center gap-[1.5rem] p-[1.5rem] pt-[1.5rem] pb-[2.25rem] border border-gray_light border-b-8 border-b-purple_dark rounded-[0.75rem]"
          >
            <Image
              alt={i.toString()}
              src={i.icon}
              className="w-[6.25rem] h-[6.25rem]"
            />
            <p className="text-center font-bold text-[2rem] font-karla">
              {i.title}
            </p>
            <div className="flex flex-col justify-end grow items-center gap-[1.5rem]">
              <p className="font-opensans text-[1rem] text-center">{i.desc}</p>
              <Link
                href={i.link}
                className="bg-purple_dark max-w-[16.25rem] w-full text-white rounded-md flex items-center justify-center py-[0.5rem] px-[1.25rem] text-[1rem]"
                target={i.isFile ? '_blank' : '_self'}
              >
                {i.btn}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col md:hidden gap-[1rem]">
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings}
          className="flex"
        >
          {mockData.map((i) => (
            <div
              key={i.id}
              className="mt-[2.25rem] flex p-2 items-center justify-center grow"
            >
              <div className="flex w-full min-h-[32.8125rem] flex-col items-center justify-center gap-[1.5rem] p-[1.5rem] pt-[1.5rem] pb-[2.25rem] border border-gray_light border-b-8 border-b-purple_dark rounded-[0.75rem]">
                <Image
                  alt={i.toString()}
                  src={i.icon}
                  className="w-[6.25rem] h-[6.25rem]"
                />
                <p className="text-center font-bold text-[2rem] font-karla">
                  {i.title}
                </p>
                <div className="flex flex-col justify-end grow items-center gap-[1.5rem] self-end">
                  <p className="font-opensans text-[1rem] text-center">
                    {i.desc}
                  </p>
                  <Link
                    href={i.link}
                    className="bg-purple_dark max-w-[16.25rem] w-full text-white rounded-md flex items-center justify-center py-[0.5rem] px-[1.25rem]"
                    target={i.isFile ? '_blank' : '_self'}
                  >
                    {i.btn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex flex-row justify-between mx-[1.25rem]">
          <Image alt="prev" src={ARROW_LEFT} role="button" onClick={previous} />
          <Image alt="next" src={ARROW_RIGHT} role="button" onClick={next} />
        </div>
      </div>
    </div>
  );
};
