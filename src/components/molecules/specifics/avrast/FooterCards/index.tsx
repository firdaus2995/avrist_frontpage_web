'use client';
import React from 'react';
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
        position: 'relative',
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
        position: 'relative',
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

const FooterCards: React.FC<IFooterCards> = ({ cards, bgColor }) => {
  const settings = {
    slidesToShow: 4,
    initialSlide: 0,
    infinite: false,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          nextArrow: <CustomNextArrow />,
          prevArrow: <CustomPrevArrow />,
          vertical: true,
          swipeToSlide: true,
          verticalSwiping: true
        }
      }
    ]
  };

  return (
    <>
      {/* Desktop */}
      <div className={`xs:hidden md:block ${bgColor ?? ''}`}>
        <div className="flex flex-row justify-between px-[8.5rem] gap-[1.5rem] pb-[5rem] h-full">
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
                  className="w-[100px] h-[100px]"
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
      <div className={bgColor ?? ''}>
        <div className="md:hidden xs:mx-10 sm:px-[8.5rem] pb-[5rem] pt-[6px]">
          <Slider {...settings}>
            {cards.map((item, index) => {
              const href =
                item?.hrefType === 'phone'
                  ? encodeURIComponent(item?.href ?? '')
                  : item?.href;
              return (
                <Link
                  href={
                    item?.hrefType === 'phone'
                      ? `tel:${href}`
                      : item?.hrefType === 'email'
                        ? `mailto:${href}`
                        : href ?? '#'
                  }
                  key={index}
                  target={item.openInNewTab ? 'blank' : '_self'}
                  className="flex flex-col justify-between w-full max-w-[274px] h-full min-h-[300px] px-[24px] pt-[24px] pb-[36px] gap-[24px] border border-gray_light rounded-[12px] shadow-md bg-white"
                >
                  <div className="flex justify-center">
                    <Image
                      alt={index.toString()}
                      src={item.icon}
                      className="w-[100px] h-[100px]"
                    />
                  </div>
                  <div className="text-center pt-[1.5rem]">
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
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default FooterCards;
