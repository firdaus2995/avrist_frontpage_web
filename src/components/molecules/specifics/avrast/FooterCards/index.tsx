'use client';
import React, { useRef, useState } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowCarouselLeft from '@/assets/images/common/arrow-carousel-left.svg';
import ArrowCarouselRight from '@/assets/images/common/arrow-carousel-right.svg';

interface IFooterCards {
  cards: {
    title: string;
    icon: StaticImport | string;
    subtitle?: string;
    href?: string;
    hrefType?: string; // "phone" || "email"
    openInNewTab?: boolean;
    textColor?: string;
  }[];
  bgColor?: string;
}

const FooterCards: React.FC<IFooterCards> = ({ cards, bgColor }) => {
  const sliderRef: any = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    slidesToShow: 4,
    initialSlide: 0,
    infinite: false,
    swipeToSlide: false,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentSlide(Math.ceil(newIndex)),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
          swipeToSlide: true,
          verticalSwiping: true
        }
      }
    ]
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const previous = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <>
      {/* Desktop */}
      <div className={`xs:hidden md:block ${bgColor ?? ''}`}>
        <div className="container mx-auto flex flex-row justify-between gap-[1.5rem] pb-[5rem] h-full">
          {cards.map((item, index) => {
            const href =
              item?.hrefType === 'phone'
                ? encodeURIComponent(item?.href ?? '')
                : item?.href;

            return (
              <Link
                key={index}
                href={
                  item?.hrefType === 'phone'
                    ? `tel:${href}`
                    : item?.hrefType === 'email'
                      ? `mailto:${href}`
                      : href ?? '#'
                }
                className="relative border border-gray_superlight w-full h-auto pt-[1.5rem] px-[1.5rem] pb-[2.5rem] rounded-xl flex flex-col gap-[1.5rem] items-center text-center shadow-md bg-white xs:max-sm:mt-4"
              >
                <Image
                  alt={index.toString()}
                  src={item.icon}
                  className="w-[6.25rem] h-[6.25rem]" // 100px = 6.25rem
                />
                <span>
                  <p className="font-bold text-[1.5rem]">{item.title}</p>
                  {item.subtitle && (
                    <div className="flex items-end justify-center">
                      <p
                        className={`text-center items font-bold text-[1.5rem] ${item.textColor ? item.textColor : 'text-purple_dark'}`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  )}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className={'bg-white'}>
        <div className="md:hidden pb-[5rem] pt-[0.375rem] flex flex-col gap-[2.25rem]">
          <Slider {...settings} ref={sliderRef}>
            {cards.map((item, index) => {
              const href =
                item?.hrefType === 'phone'
                  ? encodeURIComponent(item?.href ?? '')
                  : item?.href;
              return (
                <div key={index}>
                  <div className="w-full flex justify-center">
                    <Link
                      href={
                        item?.hrefType === 'phone'
                          ? `tel:${href}`
                          : item?.hrefType === 'email'
                            ? `mailto:${href}`
                            : href ?? '#'
                      }
                      target={item.openInNewTab ? 'blank' : '_self'}
                      className="flex flex-col justify-between w-full mx-[2.5rem] h-full min-h-[18.75rem] px-[1.5rem] pt-[1.5rem] pb-[2.25rem] gap-[1.5rem] border border-gray_light rounded-[0.75rem] shadow-md bg-white"
                    >
                      <div className="flex justify-center">
                        <Image
                          alt={index.toString()}
                          src={item.icon}
                          className="w-[6.25rem] h-[6.25rem]" // 100px = 6.25rem
                        />
                      </div>
                      <div className="text-center pb-[2rem]">
                        <p className="font-bold text-[1.5rem]">{item.title}</p>
                        {item.subtitle && (
                          <div className="flex items-end justify-center">
                            <p
                              className={`text-center items font-bold text-[1.5rem] ${item.textColor ? item.textColor : 'text-purple_dark'}`}
                            >
                              {item.subtitle}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </Slider>
          <div className="w-full flex flex-row justify-between px-[2.5rem]">
            <Image
              style={{ rotate: '-90deg' }}
              width={36}
              height={36}
              alt="next"
              src={ArrowCarouselLeft}
              onClick={previous}
              className={currentSlide === 0 ? 'opacity-50' : 'opacity-100'}
            />
            <Image
              style={{ rotate: '90deg' }}
              width={36}
              height={36}
              alt="next"
              src={ArrowCarouselRight}
              onClick={next}
              className={
                currentSlide === cards.length - 1 ? 'opacity-50' : 'opacity-100'
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterCards;
