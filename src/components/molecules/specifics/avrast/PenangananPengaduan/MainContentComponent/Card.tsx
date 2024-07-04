'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import IMPORTANT_DOCUMENT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-1.svg';
import CHECK_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-2.svg';
import CHAT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-3.svg';
import ARROW_LEFT from '@/assets/images/avrast/component/total-solution/arrow-left.svg';
import ARROW_RIGHT from '@/assets/images/avrast/component/total-solution/arrow-right.svg';

const mockData = [
  {
    id: '1',
    title: 'Hak - Hak Nasabah',
    icon: IMPORTANT_DOCUMENT_ICON,
    btn: 'Selengkapnya',
    link: '/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi'
  },
  {
    id: '2',
    title: 'Prosedur dan Form Pengaduan',
    icon: CHECK_ICON,
    btn: 'Selengkapnya',
    link: '/klaim-layanan/klaim?tab=Panduan+%26+Pengajuan'
  },
  {
    id: '3',
    title: 'Saran dari Anda',
    icon: CHAT_ICON,
    btn: 'Selengkapnya',
    link: '/hubungi-kami'
  }
];

export const ContentCard = () => {
  const sliderRef = React.useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

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

  return (
    <>
      <div className="w-full xs:hidden sm:grid sm:grid-cols-3 xs:grid-cols-1 gap-[1.5rem]">
        {mockData.map((i) => (
          <div
            key={i.id}
            className="flex flex-col grow items-center gap-[1.5rem] cursor-pointer border-[1px] border-gray_light rounded-xl overflow-hidden pt-[1.5rem] px-[1.5rem] pb-[2.25rem] border-b-8 border-b-purple_dark"
          >
            <Image
              alt={i.title}
              src={i.icon}
              className="w-[6.25rem] h-[6.25rem]"
            />
            <div className="flex flex-col justify-between grow">
              <h5 className="sm:text-[2rem] xs:text-[1.25rem] tracking-tight font-bold font-karla text-[2rem] text-gray_body mt-5 text-center leading-[38.4px] sm:-tracking-[0.96px]">
                {i.title}
              </h5>
              <Link href={i.link}>
                <div
                  role="button"
                  className="bg-purple_dark flex text-white font-semibold rounded-[0.375rem] px-[1.25rem] py-[0.5rem] justify-center text-[16px] leading-[23.68px] font-opensanspro mt-[24px]"
                >
                  {i.btn}
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full sm:hidden grid grid-cols-1">
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          className="sm:!hidden w-full flex flex-row items-center justify-center"
          {...sliderSettings}
          beforeChange={(_, next) => setCurrentSlide(next)}
        >
          {mockData.map((i) => (
            <div
              key={i.id}
              className="w-full flex flex-row items-center justify-center"
            >
              <div className="flex w-full min-h-[20.313rem] flex-col grow items-center gap-[1.5rem] cursor-pointer border-[1px] border-gray_light rounded-xl overflow-hidden pt-[1.5rem] px-[1.5rem] pb-[2.25rem] border-b-8 border-b-purple_dark">
                <Image
                  alt={i.title}
                  src={i.icon}
                  className="w-[6.25rem] h-[6.25rem]"
                />
                <div className="flex flex-col justify-between grow">
                  <h5 className="mb-2 sm:text-[2rem] xs:text-[1.25rem] tracking-tight font-bold font-karla text-[2rem] text-gray_body mt-5 text-center">
                    {i.title}
                  </h5>
                  <Link href={i.link}>
                    <div
                      role="button"
                      className="bg-purple_dark flex text-white font-semibold rounded-[0.375rem] px-[1.25rem] py-[0.5rem] justify-center"
                    >
                      {i.btn}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="flex flex-row justify-between md:mx-[1.25rem] xs:mt-[36px] md:mt-0 pb-[44px]">
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
    </>
  );
};
