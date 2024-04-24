'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BannerImg1 from '@/assets/images/avrast/sample-banner-1.svg';
import BannerImg2 from '@/assets/images/avrast/sample-banner-2.svg';
import BannerImg3 from '@/assets/images/avrast/sample-banner-3.svg';
import BannerImg4 from '@/assets/images/avrast/sample-banner-4.svg';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import { EXTERNAL_URL } from '@/utils/baseUrl';

const bannerData = [
  {
    category: 'Avrist Total Solution:',
    title: (
      <p className="xs:text-[28px] md:text-[36px]">
        <span className="font-bold">Proteksi total</span> dalam satu genggaman
        untuk <span className="font-bold">nasabah, individu</span> maupun
        <span className="font-bold"> korporasi</span>
      </p>
    ),
    btn: 'Kami Peduli',
    color: 'purple_dark',
    img: BannerImg1
  },
  {
    category: 'Avrist Life Insurance',
    title: (
      <p className="xs:text-[28px] md:text-[36px]">
        Perlindungan dini <span className="font-bold">Anda dan keluarga</span>{' '}
        dari risiko kehidupan tidak terduga
      </p>
    ),
    btn: 'Kami Peduli',
    color: 'purple_dark',
    img: BannerImg2
  },
  {
    category: 'Avrist Asset Management',
    title: (
      <p className="xs:text-[28px] md:text-[36px]">
        Siapkan <span className="font-bold">investasi</span> dengan pengelolaan{' '}
        <span className="font-bold">Reksa Dana</span>
      </p>
    ),
    btn: 'Melangkah Bersama',
    color: 'avram_green',
    img: BannerImg3
  },
  {
    category: 'Avrist General Insurance',
    title: (
      <p className="xs:text-[28px] md:text-[36px]">
        Perlindungan terhadap{' '}
        <span className="font-bold">kendaraan, bangunan,</span> dan{' '}
        <span className="font-bold">usaha Anda</span>
      </p>
    ),
    btn: 'Solusi Tepat',
    color: 'agi_grey',
    img: BannerImg4
  }
];

const sliderSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: (
    dots:
    | string
    | number
    | boolean
    | React.ReactElement<string | React.JSXElementConstructor<string>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined
  ) => (
    <div
      style={{
        position: 'absolute',
        left: 36,
        width: 150,
        bottom: 32
      }}
    >
      <ul style={{ margin: '0px' }}> {dots} </ul>
    </div>
  )
};

const BannerAvrast = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
    <div className="flex w-full overflow-x-hidden">
      <div className="w-full">
        <div className="w-full relative flex items-center justify-center">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...sliderSettings}
            className="w-screen"
          >
            {bannerData.map((data, index) => (
              <div
                key={index}
                className="flex w-full xs:h-[65vh] md:h-[auto] relative"
              >
                <div className="md:hidden">
                  <Image
                    alt="loop-image"
                    src={data.img}
                    layout="fill"
                    className="w-full h-auto object-cover object-left-bottom"
                  />
                </div>
                <div className="md:block xs:hidden">
                  <Image
                    alt="loop-image"
                    src={data.img}
                    className="w-screen h-auto object-cover"
                  />
                </div>
                <div className="flex flex-col md:w-[40%] md:p-20 xs:p-10 gap-4 absolute z-50 top-10">
                  <p
                    className={`xs:text-[20px] md:text-[28px] text-${data.color} whitespace-nowrap xs:mt-10 md:mt-0`}
                  >
                    {data.category}
                  </p>
                  {data.title}
                  <div>
                    <Button
                      title={data.btn}
                      customButtonClass={`bg-${data.color} hover:bg-${data.color} text-white border-none`}
                      onClick={() => console.log('Button Clicked')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="flex flex-row justify-between absolute top-[50%] w-full px-5">
            <div className='p-2 border-2 rounded-full border-purple_dark' role='button' onClick={previous}>
              <Icon name='chevronLeft' color='purple_dark' />
            </div>
            <div className='p-2 border-2 rounded-full border-purple_dark' role='button' onClick={next}>
              <Icon name='chevronRight' color='purple_dark' />
            </div>
          </div>
        </div>
        <div className="w-full -mt-[6px] flex md:flex-row xs:flex-col">
          <div className="flex p-10 items-center justify-center text-white md:text-[28px] xs:text-[20px] text-left md:w-1/3 xs:w-full bg-dark-purple">
            <p>
              Temukan <span className="font-bold">kebutuhanmu </span> di sini?
            </p>
          </div>
          <div className="flex p-10 gap-4 items-center justify-left text-white md:text-[42px] xs:text-[24px] md:w-2/3 xs:w-full bg-purple_light relative">
            <p>
              <span className="font-bold">Saya </span> membutuhkan
            </p>
            <button
              className="text-white font-medium rounded-full text-sm p-2 text-center border-2"
              type="button"
              onClick={toggleDropdown}
            >
            { dropdownVisible ? <Icon name="chevronRight" color="white" /> : <Icon name="chevronDown" color="white" />}
            </button>
            {dropdownVisible && (
            <div
              className={`flex flex-col top-12 right-0 rounded-md bg-white w-full md:w-[37%] left-0 duration-300 transform h-full`}
            >
              <Link
                href="/produk/individu"
                className="font-karla text-gray-400 hover:text-purple_dark hover:font-medium md:text-[20px] xs:text-[11px]"
              >
                Perlindungan Jiwa dan Kesehatan
              </Link>
              <Link
                href={`${EXTERNAL_URL.agiUrl}`}
                className="font-karla text-gray-400 hover:text-purple_dark hover:font-medium md:text-[20px] xs:text-[11px]"
              >
                Perlindungan Harta Benda
              </Link>
              <Link
                href={`${EXTERNAL_URL.avramUrl}`}
                className="font-karla text-gray-400 hover:text-purple_dark hover:font-medium md:text-[20px] xs:text-[11px]"
              >
                Manajemen Investasi
              </Link>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerAvrast;
