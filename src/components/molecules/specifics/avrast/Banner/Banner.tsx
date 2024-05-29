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

type BannerAvrastPopUp = {
  onPopUpURL: (x: string) => void;
};

const BannerAvrast = (props: BannerAvrastPopUp) => {
  const { onPopUpURL } = props;
  const sliderRef = useRef<Slider | null>(null);
  const dropdownRef = useRef<any>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [bannerData, setBannerData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await handleGetContent('homepage-avras');
        const { content } = pageTransformer(data);
        const popupUrl = content['popup-url'];
        if (popupUrl?.value) {
          onPopUpURL(popupUrl?.value);
        }

        setBannerData(heroContentTransformer(content['hero-slider']));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: any): void => {
      if (!dropdownRef?.current?.contains(e.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('click', handleOutsideClick, false);
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
    };
  }, [dropdownVisible]);

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
          left: 126,
          width: 150,
          bottom: 50
        }}
      >
        <ul style={{ margin: '0px', width: 12, height: 12, display: 'flex' }}>
          {' '}
          {dots}{' '}
        </ul>
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
    <div className="flex w-full overflow-x-hidden bg-white h-auto">
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
                    className="flex w-full xs:h-[49rem] md:h-[40rem] relative"
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
                        className="w-full h-auto object-cover object-right-bottom"
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
                        className="w-screen h-[40rem] object-cover"
                      />
                    </div>
                    <div className="flex flex-col 2xl:w-[50%] md:px-[9rem] md:py-10 absolute z-50 top-10 w-full xs:items-center md:items-start">
                      <p
                        className={`xs:text-[1.5rem] md:text-[28px] text-purple_dark whitespace-nowrap font-karla font-medium`}
                      >
                        {contentStringTransformer(data['hero-teks1'])}
                      </p>
                      <div
                        className="xs:px-[2rem] md:px-0 xs:text-[2.813rem] md:text-[1.5rem] xl:text-[2.25rem] xs:text-center md:text-left font-karla md:font-normal leading-[3rem]"
                        dangerouslySetInnerHTML={{
                          __html: contentStringTransformer(data['hero-teks2'])
                        }}
                      />
                      <div className="mt-3 py-[12px]">
                        <Link
                          href={contentStringTransformer(
                            data['hero-linkbutton']
                          )}
                        >
                          <Button
                            title={contentStringTransformer(
                              data['hero-lblbutton']
                            )}
                            customButtonClass={`bg-purple_dark hover:bg-purple_dark text-white border-none text-[1.25rem] xs:py-[12px] xs:px-[40px]`}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
          </Slider>
          <div className="xs:hidden md:block absolute top-[50%] w-full">
            <div className="flex flex-row justify-between w-full px-10">
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
        </div>
        <div className="w-full -mt-[6px] flex md:flex-row xs:flex-col relative mb-24">
          <div className="flex py-10 px-[2rem] md:px-[8.5rem] items-center xs:justify-start text-white md:text-4xl xs:text-xl text-left w-full md:max-w-[45%] lg:max-w-[35%] bg-dark-purple">
            <p className="font-karla font-light xs:w-full md:w-[200px] xs:text-[1.25rem]">
              Apa <span className="font-bold">perlindungan </span> yang <span className="font-bold">Anda </span> butuhkan
            </p>
          </div>
          <div className="flex xs:py-10 xs:px-[32px] md:pl-[4rem] md:pr-[8.5rem] flex-row justify-between items-center text-white md:text-[48px] xs:text-[24px] w-full bg-purple_light relative">
            <p className="font-karla font-bold text-[2.25rem]">
              <span className="font-bold">Saya Ingin</span> pilihan rencana
            </p>
            <button
              className="text-white font-medium rounded-full text-sm p-2 text-center border-2 xs:w-[2rem] xs:h-[2rem] md:w-[2.5rem] md:h-[2.5rem] xs:max-md:mr-4"
              type="button"
              onClick={toggleDropdown}
            >
              {dropdownVisible ? (
                <>
                  <div className="md:hidden rotate-[180deg]">
                    <Icon
                      name="chevronDown"
                      color="white"
                      width={12}
                      height={12}
                    />
                  </div>
                  <div className="xs:hidden md:block rotate-[180deg]">
                    <Icon name="chevronDown" color="white" />
                  </div>
                </>
              ) : (
                <>
                  <div className="md:hidden">
                    <Icon
                      name="chevronDown"
                      color="white"
                      width={12}
                      height={12}
                    />
                  </div>
                  <div className="xs:hidden md:block">
                    <Icon name="chevronDown" color="white" />
                  </div>
                </>
              )}
            </button>
          </div>
          <div className={`${dropdownVisible && 'mb-[80px]'}`}>
            {dropdownVisible && (
              <div
                className={`absolute flex flex-col xs:top-[200px] md:top-[160px] right-0 rounded-md bg-white w-[90%] xs:right-[1.25rem] xs:left-[1.25rem] duration-300 transform z-100`}
                ref={dropdownRef}
              >
                <Link
                  href="/produk/individu"
                  className="font-karla border-l-8 border-purple_dark rounded-tl-md text-gray-400 hover:text-purple_dark hover:font-medium p-[24px] md:text-[20px] xs:text-[11px]"
                >
                  Perlindungan Jiwa dan Kesehatan
                </Link>
                <Link
                  href={`${EXTERNAL_URL.agiUrl}`}
                  className="font-karla border-l-8 border-agi_grey text-gray-400 hover:text-purple_dark hover:font-medium md:text-[20px] xs:text-[11px] p-[24px]"
                >
                  Perlindungan Harta Benda
                </Link>
                <Link
                  href={`${EXTERNAL_URL.avramUrl}`}
                  className="font-karla text-gray-400 border-l-8 border-avram_green rounded-bl-md hover:text-purple_dark hover:font-medium md:text-[20px] xs:text-[11px] p-[24px]"
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
