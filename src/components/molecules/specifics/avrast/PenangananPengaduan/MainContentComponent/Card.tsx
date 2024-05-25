'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import IMPORTANT_DOCUMENT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-1.svg';
import CHECK_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-2.svg';
import CHAT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-3.svg';

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
    link: '/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi'
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
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1.1,
    slidesToScroll: 1
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
        ))}
      </div>
      <div className="w-full sm:hidden grid grid-cols-1">
        <Slider className="sm:!hidden w-full flex flex-row items-center justify-center" {...sliderSettings}>
          {mockData.map((i) => (
            <div key={i.id} className="w-full flex flex-row items-center justify-center">
              <div className="flex w-[95%] min-h-[20.313rem] flex-col grow items-center gap-[1.5rem] cursor-pointer border-[1px] border-gray_light rounded-xl overflow-hidden pt-[1.5rem] px-[1.5rem] pb-[2.25rem] border-b-8 border-b-purple_dark">
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
      </div>
    </>
  );
};
