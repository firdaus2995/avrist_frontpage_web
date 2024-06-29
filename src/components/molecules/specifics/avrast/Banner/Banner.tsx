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
    autoplay: true,
    autoplaySpeed: 3000,
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
          left: window.innerWidth > 480 ? 136 : 156,
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
            className="w-screen max-w-screen-2xl 3xl:max-w-screen-3xl"
          >
            {bannerData.length > 0 &&
              bannerData.map(
                (
                  data: { [x: string]: any },
                  index: React.Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="flex w-full h-[49rem] md:h-[40rem] relative"
                  >
                    <div className="md:hidden relative">
                      <div className="h-[49rem] absolute bg-gradient-to-b from-white from-40% via-white via-10% to-transparent to-60% z-10 w-full"></div>
                      <div className="h-[19rem]" />
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
                        className="w-full h-[30rem] object-cover object-right-bottom"
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
                    <div className="flex flex-col 2xl:w-[50%] md:px-[9rem] md:py-10 absolute z-50 top-10 w-full xs:items-center md:items-start gap-8">
                      <p
                        className={`xs:text-[1.5rem] md:text-[28px] text-purple_dark whitespace-nowrap font-karla font-medium text-shadow`}
                      >
                        {contentStringTransformer(data['hero-teks1'])}
                      </p>
                      <div
                        className="xs:px-[2rem] md:px-0 text-2xl/3 leading-none md:text-[1.5rem] xl:text-[2.25rem] xs:text-center md:text-left font-karla md:font-normal md:leading-9 tracking-tight text-shadow"
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
        <div className="w-full -mt-[6px] flex md:flex-row xs:flex-col mb-[5rem]">
          <div className="flex py-10 px-[2rem] md:px-[8.5rem] md:pr-0 items-center xs:justify-start text-white md:text-4xl xs:text-xl text-left w-full md:max-w-[45%] lg:max-w-[35%] bg-avrast_product_bg">
            <p className="font-karla font-light xs:w-full sm:hidden xs:text-xl sm:text-[2rem] xs:-tracking-[0.8px] sm:-tracking-[1.44px]">
              Apa <span className="font-bold">perlindungan </span> yang{' '}
              <span className="font-bold">Anda </span> butuhkan?
            </p>
            <div className="xs:hidden md:block font-karla font-light xs:text-xl sm:text-[2rem]/[43px] xs:-tracking-[0.8px] sm:-tracking-[1.44px]">
              <p className="block">
                Apa <span className="font-bold">perlindungan </span>
              </p>
              yang <span className="font-bold">Anda </span> butuhkan?
            </div>
          </div>
          <div className="flex xs:py-10 xs:px-[32px] md:pl-[4rem] md:pr-[8.5rem] flex-row justify-between items-center text-white md:text-[48px] xs:text-[24px] w-full bg-purple_light relative">
            <p className="sm:hidden font-karla font-bold text-[2.25rem] xs:-tracking-[0.8px] sm:-tracking-[1.44px] flex flex-col">
              <span>Saya Ingin</span>{' '}
              <span className="font-light">pilihan rencana</span>
            </p>
            <p className="xs:hidden md:block font-karla font-bold text-[3rem] xs:-tracking-[0.8px] sm:-tracking-[1.44px] flex flex-col">
              <span>Saya Ingin</span>{' '}
              <span className="font-light">pilihan rencana</span>
            </p>
            <button
              id="drop-down"
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
          <div>
            {dropdownVisible && (
              <div
                aria-label="drop-down"
                className={`absolute shadow-xl flex flex-col sm:top-[1220px] md:top-[1050px] lg:top-[950px] xl:top-[920px] rounded-md bg-white xs:left-0 md:left-[10rem] lg:left-[25rem] xl:left-[50rem] w-full md:w-[31.25rem] z-30 md:text-[36px]/[43.2px] md:-tracking-[1.44px] xs:text-[1.5rem] text-[#1A141F]`}
                ref={dropdownRef}
              >
                <Link
                  href="/produk/individu"
                  className="font-karla border-l-8 border-purple_dark bg-purple_bg rounded-r-[12px] rounded-tl-md hover:text-purple_dark hover:font-medium py-[24px] px-[32px]"
                >
                  Perlindungan Jiwa dan Kesehatan
                </Link>
                <Link
                  target="_blank"
                  href={`${EXTERNAL_URL.agiUrl}`}
                  className="font-karla border-l-8 border-agi_grey bg-grey_bg rounded-r-[12px] hover:text-purple_dark hover:font-medium py-[24px] px-[32px]"
                >
                  Perlindungan Harta Benda
                </Link>
                <Link
                  target="_blank"
                  href={`${EXTERNAL_URL.avramUrl}`}
                  className="font-karla border-l-8 border-avram_green rounded-r-[12px] bg-green_bg rounded-bl-md hover:text-purple_dark hover:font-medium py-[24px] px-[32px]"
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
