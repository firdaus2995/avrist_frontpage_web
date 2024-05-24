'use client';
import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Slider from 'react-slick';
import Button from '@/components/atoms/Button/Button';

interface IButtonMenu {
  buttonList: string[];
}

const ButtonMenu: React.FC<IButtonMenu> = ({ buttonList }) => {
  const searchParams = useSearchParams();
  const params = searchParams.get('tab') ?? '';
  const sliderRef = useRef<Slider | null>(null);

  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  useEffect(() => {
    const activeIndex = buttonList.findIndex((button) => button === params);
    if (sliderRef.current && activeIndex !== -1) {
      sliderRef.current.slickGoTo(activeIndex);
    }
  }, [params, buttonList]);

  return (
    <>
      <div className="xs:hidden md:flex flex-row justify-between gap-[0.75rem]">
        {buttonList.map((i) => (
          <Link
            href={{
              pathname: '/klaim-layanan/layanan',
              query: { tab: i }
            }}
            scroll={false}
            key={i}
            className="w-full"
          >
            <Button
              key={i}
              title={i}
              customButtonClass={`w-full flex-1 h-full py-[8px] px-[20px] ${params === i ? 'bg-purple_dark' : ''}`}
              customTextClass={`${params === i ? 'text-white' : ''} font-semibold text-[1rem]`}
            />
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings}
        >
          {buttonList.map((i) => (
            <Link
              href={{
                pathname: '/klaim-layanan/layanan',
                query: { tab: i }
              }}
              scroll={false}
              key={i}
              className="w-full"
            >
              <Button
                key={i}
                title={i}
                customButtonClass={`w-[95%] h-full ${params === i ? 'bg-purple_dark' : ''}`}
                customTextClass={`${params === i ? 'text-white' : ''} line-clamp-1`}
              />
            </Link>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ButtonMenu;
