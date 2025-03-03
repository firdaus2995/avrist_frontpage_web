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
import Button from '@/components/atoms/Button/Button';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface CustomContentCardProps {
  tenagaPemasaranFile?: any;
}

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

export const ContentCard: React.FC<CustomContentCardProps> = ({
  tenagaPemasaranFile
}) => {
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);

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
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="flex flex-col self-stretch items-center justify-center gap-[4rem]">
      <div className="xs:hidden sm:grid sm:grid-cols-3 xs:grid-cols-1 gap-[1.5rem]">
        {mockData.map((i) => {
          return (
            <div
              key={i.id}
              className="max-w-sm flex flex-col gap-[24px] items-center justify-between pt-[1.5rem] px-[1.5rem] pb-[2.25rem] bg-white border border-gray-200 rounded-[0.75rem] shadow dark:bg-gray-800 dark:border-gray-700 border-b-8 border-b-purple_dark"
            >
              <div className="flex flex-col items-center justify-center gap-[24px]">
                <Image
                  alt={i.toString()}
                  src={i.icon}
                  className="w-[6.25rem] h-[6.25rem] mix-blend-multiply"
                />
                <div className="flex flex-col items-center justify-between gap-3">
                  <h5 className="text-center font-bold text-[2rem] font-karla line-clamp-3 font-karla sm:leading-[38.4px]">
                    {i.title}
                  </h5>
                  <p className="font-opensans text-[1rem] text-center font-normal sm:leading-[22.4px]">
                    {i.desc}
                  </p>
                </div>
              </div>
              {i.title === 'Daftar Tenaga Pemasar' ? (
                <Button
                  onClick={() =>
                    window.open(tenagaPemasaranFile?.filePath, '_blank')
                  }
                  customButtonClass="bg-purple_dark hover:bg-purple_light max-w-[16.25rem] w-full text-white rounded-md flex items-center justify-center py-[0.5rem] px-[1.25rem]"
                  customTextClass="text-[1rem] sm:leading-[23.68px] font-semibold font-opensans"
                >
                  {i.btn}
                </Button>
              ) : (
                <Link
                  href={i.link}
                  className="bg-purple_dark hover:bg-purple_light max-w-[16.25rem] w-full text-white rounded-md flex items-center justify-center py-[0.5rem] px-[1.25rem] text-[1rem] sm:leading-[23.68px] font-semibold font-opensans"
                  target={i.isFile ? '_blank' : '_self'}
                >
                  {i.btn}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full flex flex-col md:hidden mx-4 gap-5 ml-5">
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          beforeChange={(_, next) => setCurrentSlide(next)}
          {...sliderSettings}
          className="flex w-full"
        >
          {mockData.map((i) => (
            <div key={i.id} className="flex gap-4">
              <div className="flex max-w-[98%] min-h-[29rem] flex-col items-center justify-center gap-[1.5rem] p-[1.5rem] pt-[1.5rem] pb-[2.25rem] border border-gray_light border-b-8 border-b-purple_dark rounded-[0.75rem]">
                <Image
                  alt={i.toString()}
                  src={i.icon}
                  className="w-[6.25rem] h-[6.25rem] mix-blend-multiply"
                />
                <p className="text-center font-bold text-[2rem] font-karla leading-[38.4px]">
                  {i.title}
                </p>
                <div className="flex flex-col justify-end grow items-center gap-[1.5rem] self-center">
                  <p className="font-opensans text-[1rem] text-center font-normal leading-[22.4px]">
                    {i.desc}
                  </p>
                  <Link
                    href={i.link}
                    className="bg-purple_dark max-w-[16.25rem] w-full text-white rounded-md flex items-center justify-center py-[0.5rem] px-[1.25rem] font-semibold leading-[23.68px]"
                    target={i.isFile ? '_blank' : '_self'}
                  >
                    {i.btn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex flex-row justify-between md:mx-[1.25rem] xs:mt-[36px] md:mt-0">
          <Image
            className={currentSlide === 0 ? 'opacity-50' : 'opacity-100'}
            alt="prev"
            src={ARROW_LEFT}
            role="button"
            onClick={previous}
          />
          <Image
            className={
              currentSlide === mockData.length - 1
                ? 'opacity-50'
                : 'opacity-100'
            }
            alt="next"
            src={ARROW_RIGHT}
            role="button"
            onClick={next}
          />
        </div>
      </div>
    </div>
  );
};
