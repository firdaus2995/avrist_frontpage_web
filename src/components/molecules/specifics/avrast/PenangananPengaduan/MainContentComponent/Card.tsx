'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import IMPORTANT_DOCUMENT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-1.svg';
import CHECK_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-2.svg';
import CHAT_ICON from '@/assets/images/avrast/component/footer-klaim-layanan/footer-3.svg';
import ArrowCarouselLeft from '@/assets/images/common/arrow-carousel-left.svg';
import ArrowCarouselRight from '@/assets/images/common/arrow-carousel-right.svg';

const mockData = [
  {
    id: '1',
    title: 'Aturan Asuransi',
    icon: IMPORTANT_DOCUMENT_ICON,
    btn: 'Lihat Detail',
    link: '/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi'
  },
  {
    id: '2',
    title: 'Prosedur Pengaduan',
    icon: CHECK_ICON,
    btn: 'Lihat Detail',
    link: '/klaim-layanan/layanan/penanganan-pengaduan/aturan-asuransi'
  },
  {
    id: '3',
    title: 'Saran Anda',
    icon: CHAT_ICON,
    btn: 'Beri Saran',
    link: '/hubungi-kami'
  }
];

interface CustomPrevArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

interface CustomNextArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
}

const CustomNextArrow: React.FC<CustomNextArrowProps> = (props) => {
  const { className, ...rest } = props;

  const isDisabled = className?.includes('slick-disabled');

  return (
    <div
      {...rest}
      className={className}
      style={{
        ...props.style,
        left: '100%',
        bottom: '0',
        opacity: isDisabled ? 0.5 : 1
      }}
    >
      <Image
        style={{ rotate: '90deg' }}
        width={36}
        height={36}
        alt="next"
        src={ArrowCarouselRight}
      />
    </div>
  );
};

const CustomPrevArrow: React.FC<CustomPrevArrowProps> = (props) => {
  const { className, ...rest } = props;

  const isDisabled = className?.includes('slick-disabled');

  return (
    <div
      {...rest}
      className={className}
      style={{
        ...props.style,
        bottom: '-302px',
        opacity: isDisabled ? 0.5 : 1
      }}
    >
      <Image
        style={{ rotate: '-90deg' }}
        width={36}
        height={36}
        alt="next"
        src={ArrowCarouselLeft}
      />
    </div>
  );
};

const settings = {
  slidesToShow: 3,
  initialSlide: 0,
  slidesToScroll: 0,
  infinite: false,
  swipeToSlide: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />
      }
    }
  ]
};

export const ContentCard = () => {
  return (  
      <div className="mt-[64px]">
        <Slider {...settings} className="grid grid-cols-3 gap-5 md:grid">
          {mockData.map((i) => (
            <div
              key={i.id}
              className="cursor-pointer border-[1px] border-gray_light rounded-xl overflow-hidden"
            >
              <div className="flex flex-1 flex-col items-center justify-center p-6">
                <Image alt={i.title} src={i.icon} className="w-[100px] h-[100px]"/>
                <div className="flex flex-col gap-2">
                  <h5 className="mb-2 sm:text-[24px] xs:text-[20px] tracking-tight font-bold font-karla text-[32px] text-gray_body mt-5 text-center">
                    {i.title}
                  </h5>
                  <Link href={i.link}>
                    <div
                      role="button"
                      className=" bg-purple_dark mx-10 flex text-white font-medium rounded-xl px-[20px] py-[8px] justify-center"
                    >
                      {i.btn}
                    </div>
                  </Link>
                </div>
              </div>
              <div className="h-[8px] bg-purple_dark" />
            </div>
          ))}
        </Slider>
      </div>
  );
};
