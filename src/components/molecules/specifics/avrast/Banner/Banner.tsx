'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Slider from 'react-slick';
import BlankImage from '@/assets/images/blank-image.svg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Button from '@/components/atoms/Button/Button';
import Icon from '@/components/atoms/Icon';
import { getHomeData } from '@/services/home-banner-modal-api';
import { EXTERNAL_URL } from '@/utils/baseUrl';
import {
  contentStringTransformer,
  heroContentTransformer,
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

const BannerAvrast = () => {
  const sliderRef = useRef<Slider | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [bannerData, setBannerData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('homepage-avras');
        const { content } = pageTransformer(data);

        setBannerData(heroContentTransformer(content['hero-slider']));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: bannerData.length > 1 ? true : false,
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
    <div className="flex w-full overflow-x-hidden bg-white">
      <div className="w-full">
        <div className="w-full relative flex items-center justify-center">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...sliderSettings}
            className="w-screen"
          >
            {bannerData.length > 0 &&
              bannerData.map(
                (
                  data: { [x: string]: any },
                  index: React.Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="flex w-full xs:h-[65vh] md:h-[auto] relative"
                  >
                    <div className="md:hidden">
                      <Image
                        alt="loop-image"
                        src={
                          singleImageTransformer(data['hero-image']).imageUrl
                            ? singleImageTransformer(data['hero-image'])
                                .imageUrl
                            : BlankImage
                        }
                        fill
                        className="w-full h-auto object-cover object-left-bottom"
                      />
                    </div>
                    <div className="md:block xs:hidden">
                      <Image
                        alt="loop-image"
                        src={
                          singleImageTransformer(data['hero-image']).imageUrl
                            ? singleImageTransformer(data['hero-image'])
                                .imageUrl
                            : BlankImage
                        }
                        width={100}
                        height={100}
                        className="w-screen h-auto object-cover"
                      />
                    </div>
                    <div className="flex flex-col md:w-[40%] md:p-20 xs:p-10 gap-4 absolute z-50 top-10">
                      <p
                        className={`xs:text-[20px] md:text-[28px] text-purple_dark whitespace-nowrap xs:mt-10 md:mt-0`}
                      >
                        {contentStringTransformer(data['hero-teks1'])}
                      </p>
                      <div
                        className="xs:text-[14px] md:text-[24px] xl:text-[36px]"
                        dangerouslySetInnerHTML={{
                          __html: contentStringTransformer(data['hero-teks2'])
                        }}
                      />
                      <div>
                        <Link
                          href={contentStringTransformer(
                            data['hero-linkbutton']
                          )}
                        >
                          <Button
                            title={contentStringTransformer(
                              data['hero-lblbutton']
                            )}
                            customButtonClass={`bg-purple_dark hover:bg-purple_dark text-white border-none`}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
          </Slider>
          <div className="flex flex-row justify-between absolute top-[50%] w-full px-5">
            <div
              className="p-2 border-2 rounded-full border-purple_dark"
              role="button"
              onClick={previous}
            >
              <Icon name="chevronLeft" color="purple_dark" />
            </div>
            <div
              className="p-2 border-2 rounded-full border-purple_dark"
              role="button"
              onClick={next}
            >
              <Icon name="chevronRight" color="purple_dark" />
            </div>
          </div>
        </div>
        <div className="w-full -mt-[6px] flex md:flex-row xs:flex-col relative mb-24">
          <div className="flex p-10 items-center justify-center text-white md:text-[36px] xs:text-[20px] text-left md:w-1/3 xs:w-full bg-dark-purple">
            <p>
              Temukan <span className="font-bold">kebutuhanmu </span> di sini
            </p>
          </div>
          <div className="flex p-10 gap-4 items-center justify-left text-white md:text-[48px] xs:text-[24px] md:w-2/3 xs:w-full bg-purple_light relative">
            <p>
              <span className="font-bold">Saya </span> membutuhkan
            </p>
            <button
              className="text-white font-medium rounded-full text-sm p-2 text-center border-2"
              type="button"
              onClick={toggleDropdown}
            >
              {dropdownVisible ? (
                <Icon name="chevronRight" color="white" />
              ) : (
                <Icon name="chevronDown" color="white" />
              )}
            </button>
          </div>
            {dropdownVisible && (
              <div
                className={`absolute flex flex-col top-28 right-0 rounded-md bg-white w-[40vh] left-[50%] duration-300 transform`}
              >
                <Link
                  href="/produk/individu"
                  className="font-karla border-l-8 border-purple_dark rounded-tl-md text-gray-400 hover:text-purple_dark hover:font-medium px-4 py-2 md:text-[20px] xs:text-[11px]"
                >
                  Perlindungan Jiwa dan Kesehatan
                </Link>
                <Link
                  href={`${EXTERNAL_URL.agiUrl}`}
                  className="font-karla border-l-8 border-agi_grey text-gray-400 hover:text-purple_dark hover:font-medium md:text-[20px] xs:text-[11px] px-4 py-2"
                >
                  Perlindungan Harta Benda
                </Link>
                <Link
                  href={`${EXTERNAL_URL.avramUrl}`}
                  className="font-karla text-gray-400 border-l-8 border-avram_green rounded-bl-md hover:text-purple_dark hover:font-medium md:text-[20px] xs:text-[11px] px-4 py-2"
                >
                  Manajemen Investasi
                </Link>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BannerAvrast;
