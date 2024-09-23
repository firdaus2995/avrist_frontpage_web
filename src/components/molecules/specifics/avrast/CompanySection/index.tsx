'use client';

import React, { useState, useEffect, useMemo } from 'react';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CustomLink from '../CustomLink';
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
import { EXTERNAL_URL } from '@/utils/baseUrl';
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
        category: 'Avrist Assurance',
        icon1: ICON1PRODUCT1,
        icon2: ICON2PRODUCT1,
        title1: 'Perlindungan Komprehensif.',
        title2: 'Proses Klaim Mudah & Cepat.',
        link1: 'Produk Avrist',
        link2: 'Halaman Klaim',
        href1: '/produk/individu?tab=Asuransi+Jiwa',
        href2: '/klaim-layanan/klaim?tab=Informasi+Klaim',
        linkIcon: CHEVRONRIGHTPURPLE,
        img: img1.imageUrl
      },
      {
        category: 'Avrist General Insurance',
        icon1: ICON1PRODUCT3,
        icon2: ICON2PRODUCT3,
        title1: 'Beragam perlindungan Asset.',
        title2: 'Perlindungan asset yang lengkap.',
        link1: 'Selengkapnya',
        link2: 'Selengkapnya',
        href1: `${EXTERNAL_URL.agiUrl}/about/tentang-avrist`,
        href2: `${EXTERNAL_URL.agiUrl}/about/tentang-avrist`,
        linkIcon: CHEVRONRIGHTGRAY,
        img: img3.imageUrl
      },
      {
        category: 'Avrist Asset Management',
        icon1: ICON1PRODUCT2,
        icon2: ICON2PRODUCT2,
        title1: 'Investasi yang terjangkau.',
        title2: 'Berpengalaman dan terus berkembang.',
        link1: 'Selengkapnya',
        link2: 'Tentang Avram',
        href1: `${EXTERNAL_URL.avramUrl}/about/tentang-avrist`,
        href2: `${EXTERNAL_URL.avramUrl}/about/tentang-avrist`,
        linkIcon: CHEVRONRIGHTGREEN,
        img: img2.imageUrl
      }
    ],
    [img1, img2, img3]
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000
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

    if (val.category === 'Avrist Assurance') {
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
        className={`mx-[0.5rem] md:mx-[7rem] md:h-[383px] 2xl:h-full flex mb-10 md:flex-row xs:flex-col gap-4 rounded-2xl ${color} items-center justify-center shadow-xl`}
      >
        <div
          className={`xs:h-full md:w-1/2 xs:w-full md:pl-[48px] py-[36px] xs:px-[32px] md:pr-0 flex flex-col items-start justify-center gap-[32px] text-white`}
        >
          <p className="md:text-[3.5rem] xs:text-[40px] font-extrabold text-left font-karla xs:leading-[48px] sm:leading-[2.7rem] xs:-tracking-[1.2px] sm:-tracking-[1.68px]">
            {val.category}
          </p>
          <div className="flex flex-col gap-4">
            {/* Baris 1 */}
            <section>
              <div className="w-full flex flex-row gap-[8px] items-center">
                <Image
                  src={val.icon1}
                  alt={val.title1}
                  className="w-[48px] max-h-[540px]"
                  width={10}
                  height={10}
                />

                <div
                  className={`flex flex-col ${val.title1.length < 33 ? '3xl:flex-row' : ''} gap-2`}
                >
                  <p className="md:text-[28px] xs:text-2xl font-bold font-karla text-left xs:-tracking-[0.72px] sm:-tracking-[0.84px] !leading-[28.8px]">
                    {val.title1}
                  </p>
                  <div className="flex flex-row items-center gap-2">
                    <CustomLink
                      href={val.href1}
                      className="flex flex-row items-center gap-1"
                    >
                      <p
                        className={`font-bold md:text-[28px] xs:text-2xl ${textColor} font-karla xs:-tracking-[0.72px] sm:-tracking-[0.84px] !leading-[28.8px]`}
                      >
                        {val.link1}
                      </p>
                      <Image
                        src={val.linkIcon}
                        alt={val.link1}
                        className="w-[24px]"
                        width={10}
                        height={10}
                      />
                    </CustomLink>
                  </div>
                </div>
              </div>
            </section>

            {/* Baris 2 */}
            <section>
              <div className="w-full flex flex-row gap-[8px] items-center">
                <Image
                  src={val.icon2}
                  alt={val.title2}
                  className="w-[48px] max-h-[540px]"
                  width={10}
                  height={10}
                />

                <div
                  className={`flex flex-col ${val.title2.length < 33 ? '3xl:flex-row' : ''} gap-2`}
                >
                  <p className="md:text-[28px] xs:text-2xl font-bold font-karla text-left xs:-tracking-[0.72px] sm:-tracking-[0.84px] !leading-[28.8px]">
                    {val.title2}
                  </p>
                  <div className="flex flex-row items-center gap-2">
                    <CustomLink
                      href={val.href2}
                      className="flex flex-row items-center gap-1"
                    >
                      <p
                        className={`font-bold md:text-[28px] xs:text-2xl ${textColor} font-karla xs:-tracking-[0.72px] sm:-tracking-[0.84px] !leading-[28.8px]`}
                      >
                        {val.link2}
                      </p>
                      <Image
                        src={val.linkIcon}
                        alt={val.link2}
                        className="w-[24px]"
                        width={10}
                        height={10}
                      />
                    </CustomLink>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div
          className={`md:w-1/2 xs:w-full h-full xs:max-md:h-[212px] md:rounded-r-xl md:rounded-bl-none xs:rounded-b-xl flex flex-col items-end justify-end overflow-hidden relative 3xl:h-full`}
        >
          {/* Desktop */}
          <Image
            src={val.img ? val.img : BlankImage}
            alt={val.category}
            className="lg:hidden w-full md:rounded-r-xl md:rounded-bl-none xs:rounded-b-xl"
            fill
          />
          {/* Mobile */}
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
      <div className="px-[2rem]">
        <p className="md:text-5xl xs:text-3xl text-center font-extrabold text-purple_dark font-karla xs:-tracking-[1.44px] sm:-tracking-[2.56px]">
          Mengapa Avrist Assurance?
        </p>
        <p className="md:text-4xl xs:text-2xl text-gray_black_dark text-center lg:mt-2">
          Satu Polis untuk setiap rumah tangga di Indonesia!
        </p>
      </div>
      <div className="w-full grid grid-cols-1 gap-4 px-[2rem]">
        <Slider {...sliderSettings}>
          {data.map((val, idx) => (
            <div key={idx} className="w-full">
              {renderCard(val)}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CompanySection;
