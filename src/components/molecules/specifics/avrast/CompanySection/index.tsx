'use client';

import React, { useState, useEffect, useMemo } from 'react';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CHEVRONRIGHTGRAY from '@/assets/images/avrast/component/product-section/chevron-right-gray.svg';
import CHEVRONRIGHTGREEN from '@/assets/images/avrast/component/product-section/chevron-right-green.svg';
import CHEVRONRIGHTPURPLE from '@/assets/images/avrast/component/product-section/chevron-right-purple.svg';
import ICON1PRODUCT1 from '@/assets/images/avrast/component/product-section/icon-1-product-1.svg';
import ICON1PRODUCT2 from '@/assets/images/avrast/component/product-section/icon-1-product-2.svg';
import ICON1PRODUCT3 from '@/assets/images/avrast/component/product-section/icon-1-product-3.svg';
import ICON2PRODUCT1 from '@/assets/images/avrast/component/product-section/icon-2-product-1.svg';
import ICON2PRODUCT2 from '@/assets/images/avrast/component/product-section/icon-2-product-2.svg';
import ICON2PRODUCT3 from '@/assets/images/avrast/component/product-section/icon-2-product-3.svg';
import BlankImage from '@/assets/images/blank-image.svg';
import { getHomeData } from '@/services/home-banner-modal-api';
import {
  pageTransformer,
  singleImageTransformer
} from '@/utils/responseTransformer';

const handleGetContent = async (slug: string) => {
  try {
    const data = await getHomeData(slug);
    return data;
  } catch (error) {
    return notFound();
  }
};

const CompanySection = () => {
  const [img1, setImg1] = useState({ imageUrl: '', altText: '' });
  const [img2, setImg2] = useState({ imageUrl: '', altText: '' });
  const [img3, setImg3] = useState({ imageUrl: '', altText: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('homepage-avras');
        const { content } = pageTransformer(data);

        setImg1(singleImageTransformer(content['memilih-image1']));
        setImg2(singleImageTransformer(content['memilih-image2']));
        setImg3(singleImageTransformer(content['memilih-image3']));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const data = useMemo(
    () => [
      {
        category: 'Avrist Life Insurance',
        icon1: ICON1PRODUCT1,
        icon2: ICON2PRODUCT1,
        title1: 'Perlindungan Komprehensif.',
        title2: 'Proses Klaim mudah & cepat',
        link1: 'Produk Avrist',
        link2: 'Halaman Klaim',
        href1: '/produk/individu?tab=Asuransi+Jiwa',
        href2: '/klaim-layanan/klaim?tab=Informasi+Klaim',
        linkIcon: CHEVRONRIGHTPURPLE,
        img: img1.imageUrl
      },
      {
        category: 'Avrist Asset Management',
        icon1: ICON1PRODUCT2,
        icon2: ICON2PRODUCT2,
        title1: 'Inovasi Solusi.',
        title2: 'Investasi dengan Tim Profesional',
        link1: 'Penghargaan',
        link2: 'Tentang Kami',
        href1: '/under-construction',
        href2: '/under-construction',
        linkIcon: CHEVRONRIGHTGREEN,
        img: img2.imageUrl
      },
      {
        category: 'Avrist General Insurance',
        icon1: ICON1PRODUCT3,
        icon2: ICON2PRODUCT3,
        title1: 'Dinamis progresif.',
        title2: 'Efektif, terpercaya dan transparan ',
        link1: 'Penghargaan',
        link2: 'Tentang Kami',
        href1: '/under-construction',
        href2: '/under-construction',
        linkIcon: CHEVRONRIGHTGRAY,
        img: img3.imageUrl
      }
    ],
    [img1, img2, img3]
  );

  const sliderSettings = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  const renderCard = (val: {
    category: string;
    icon1: StaticImport;
    icon2: StaticImport;
    title1: string;
    title2: string;
    link1: string;
    link2: string;
    href1: string;
    href2: string;
    linkIcon: StaticImport;
    img: string;
  }) => {
    let color: string;
    let textColor: string;

    if (val.category === 'Avrist Life Insurance') {
      color = 'bg-avrast_product_bg';
      textColor = 'text-avrast_product_text';
    } else if (val.category === 'Avrist Asset Management') {
      color = 'bg-avram_green';
      textColor = 'text-avram_product_text';
    } else {
      color = 'bg-agi_grey';
      textColor = 'text-agi_product_text';
    }

    return (
      <div
        className={`mx-[0.5rem] md:mx-[7rem] md:h-[383px] max-h-[540px] flex mb-10 md:flex-row xs:flex-col gap-4 rounded-xl ${color} items-center justify-center text-center shadow-xl`}
      >
        <div
          className={`xs:h-[320px] md:w-1/2 xs:w-full p-5 flex flex-col items-start justify-center gap-6 md:gap-10 text-white`}
        >
          <p className="md:text-[3.5rem] xs:text-[2rem] font-extrabold text-left font-karla leading-normal md:leading-[2.7rem]">
            {val.category}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 flex-wrap">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={val.icon1}
                  alt={val.title1}
                  className="xs:w-7 md:w-15 max-h-[540px]"
                  width={10}
                  height={10}
                />
                <p className="md:text-xl xs:text-xs font-bold font-karla text-left">
                  {val.title1}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="xs:w-7 md:w-15" />
                <Link
                  href={val.href1}
                  className="flex flex-row items-center gap-1"
                >
                  <p
                    className={`font-bold md:text-xl xs:text-xs ${textColor} font-karla`}
                  >
                    {val.link1}
                  </p>
                  <Image
                    src={val.linkIcon}
                    alt={val.link1}
                    className="w-4"
                    width={10}
                    height={10}
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 flex-wrap">
              <div className="flex flex-row items-center gap-2">
                <Image
                  src={val.icon2}
                  alt={val.title2}
                  className="xs:w-7 md:w-15"
                  width={10}
                  height={10}
                />
                <p className="md:text-xl xs:text-xs font-bold font-karla text-left">
                  {val.title2}
                </p>
              </div>

              <div className="flex flex-row items-center gap-2">
                <div className="xs:w-7 md:w-15" />
                <Link
                  href={val.href2}
                  role="button"
                  className="flex flex-row items-center gap-1"
                >
                  <p
                    className={`font-bold font-karla md:text-xl xs:text-xs ${textColor}`}
                  >
                    {val.link2}
                  </p>
                  <Image
                    src={val.linkIcon}
                    alt={val.link2}
                    className="w-4"
                    width={10}
                    height={10}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`md:w-1/2 xs:w-full h-full xs:max-md:h-[212px] md:rounded-r-xl md:rounded-bl-none xs:rounded-b-xl flex flex-col items-end justify-end overflow-hidden relative`}
        >
          <Image
            src={val.img ? val.img : BlankImage}
            alt={val.category}
            className="xs:hidden w-full md:arounded-r-xl md:rounded-bl-none xs:rounded-b-xl"
            fill
          />

          <Image
            src={val.img ? val.img : BlankImage}
            alt={val.category}
            className="sm:hidden w-full md:rounded-r-xl md:rounded-bl-none xs:rounded-b-xl"
            width={0}
            height={0}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col self-stretch items-center justify-center sm:py-32 xs:pt-[5rem] xs:pb-[3rem] gap-[5rem] bg-purple_light_bg">
      <div className='px-[2rem]'>
        <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
          Mengapa Avrist Assurance?
        </p>
        <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
          Satu Polis untuk setiap rumah tangga di Indonesia!
        </p>
      </div>
      <div className="w-full grid grid-cols-1 gap-4">
        <Slider {...sliderSettings}>
          {data.map((val, idx) => (
            <div
              key={idx}
              className="w-full flex items-center justify-center px-[24px] py-[36px]"
            >
              {renderCard(val)}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompanySection;
