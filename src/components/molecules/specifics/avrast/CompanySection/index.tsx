'use client';

import React, { useState, useEffect } from 'react';

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

  const data = [
    {
      category: 'Avrist Life Insurance',
      icon1: ICON1PRODUCT1,
      icon2: ICON2PRODUCT1,
      title1: 'Integritas.',
      title2: '1000+ Rekanan di Indonesia',
      link1: 'Penghargaan',
      link2: 'Rumah Sakit Rekanan',
      href1: '/tentang-avrist-life/tentang-avrist-life?tab=Penghargaan',
      href2: '/klaim-layanan/layanan?tab=Rumah+Sakit+Rekanan',
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
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
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
      color = 'avrast_product_bg';
      textColor = 'avrast_product_text';
    } else if (val.category === 'Avrist Asset Management') {
      color = 'avram_green';
      textColor = 'avram_product_text';
    } else {
      color = 'agi_grey';
      textColor = 'agi_product_text';
    }

    return (
      <div
        className={`w-full md:h-[50vh] xs:h-[65vh] flex mb-10 md:flex-row xs:flex-col gap-4 rounded-xl bg-${color} items-center justify-center text-center shadow-xl`}
      >
        <div
          className={`md:w-1/2 xs:w-full p-5 flex h-full flex-col items-start justify-center gap-10 text-white`}
        >
          <p className="md:text-5xl xs:text-2xl font-black text-left">
            {val.category}
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <Image
                src={val.icon1}
                alt={val.title1}
                className="xs:w-7 md:w-15"
                width={10}
                height={10}
              />
              <p className="md:text-xl xs:text-xs font-semibold">
                {val.title1}
              </p>
              <Link
                href={val.href1}
                className="flex flex-row items-center gap-1"
              >
                <p
                  className={`font-semibold md:text-xl xs:text-xs text-${textColor}`}
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
            <div className="flex flex-row items-center gap-2 flex-wrap">
              <Image
                src={val.icon2}
                alt={val.title2}
                className="xs:w-7 md:w-15"
                width={10}
                height={10}
              />
              <p className="md:text-xl xs:text-xs font-semibold">
                {val.title2}
              </p>
              <Link
                href={val.href2}
                role="button"
                className="flex flex-row items-center gap-1"
              >
                <p
                  className={`font-semibold md:text-xl xs:text-xs text-${textColor}`}
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
        <div
          className={`md:w-1/2 xs:w-full h-full md:rounded-r-xl xs:rounded-b-xl flex flex-col items-end justify-end overflow-hidden`}
        >
          <Image
            src={val.img ? val.img : BlankImage}
            alt={val.category}
            className="w-full md:rounded-r-xl xs:rounded-b-xl"
            width={10}
            height={10}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col self-stretch items-center justify-center py-32 gap-16 bg-purple_light_bg">
      <div>
        <p className="md:text-[64px] xs:text-3xl text-center font-extrabold text-purple_dark px-10">
          Mengapa Memilih Avrist?
        </p>
      </div>
      <div className="w-full grid grid-cols-1 gap-4">
        <Slider {...sliderSettings}>
          {data.map((val, idx) => (
            <div key={idx} className='w-full flex items-center justify-center px-5'>{renderCard(val)}</div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompanySection;
