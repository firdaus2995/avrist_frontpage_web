import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Slider, { LazyLoadTypes } from 'react-slick';
import { IDAta } from '../Content';
import MAPS from '@/assets/images/maps.svg';
import Icon from '@/components/atoms/Icon';
import MarkerCard from '@/components/molecules/specifics/avrast/RSRekanan/Maps/MarkerCard';
import SearchBox from '@/components/molecules/specifics/avrast/SearchBox';

const Maps = ({ hospitalData, onClickSearch }: IProviderProps) => {
  const sliderRef = useRef<Slider | null>(null);

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

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  }, [hospitalData]);

  const sliderSettings = (totalData: number) => ({
    dots: false,
    infinite: false,
    focusOnSelect: true,
    arrows: false,
    centerMode: false,
    initialSlide: 0,
    lazyLoad: 'progressive' as LazyLoadTypes,
    speed: 500,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          initialSlide: 0,
          slidesToShow: totalData > 3 ? 3.2 : 3,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1100,
        settings: {
          initialSlide: 0,
          slidesToShow: totalData > 2 ? 2 : 1,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          initialSlide: 0,
          slidesToShow: 1,
          lazyLoad: 'progressive' as LazyLoadTypes,
          slidesToScroll: 1,
        }
      }
    ]
  });

  return (
    <div className="w-[80%] h-full rounded rounded-xl border border-gray_light flex flex-col pb-6">
      <Image alt="maps" src={MAPS} className="w-full rounded-xl" />
      <div className="px-[5%] -mt-10">
        <SearchBox onSearch={(e) => onClickSearch(e)} />
      </div>
      <div className="flex flex-row px-3">
        <div className="flex items-center justify-center">
          <div className="p-2 rounded-full border border-purple_dark cursor-pointer" onClick={previous}>
            <Icon name="chevronLeft" color="purple_dark" />
          </div>
        </div>
        <Slider
          ref={(slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings(hospitalData.length)}
          className="lg:w-[90%] w-[85%] flex flex-row px-2"
        >
          {hospitalData?.length !== 0 && hospitalData!.map((item, index) => (
            <MarkerCard
              key={index}
              name={item.name}
              address={item.address}
              phone={item.phone}
            />
          ))}
        </Slider>
        <div className="flex items-center justify-center">
          <div className="p-2 rounded-full border border-purple_dark cursor-pointer" onClick={next}>
            <Icon name="chevronRight" color="purple_dark" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;

export interface IProviderProps {
  hospitalData: IDAta[] | [],
  onClickSearch: (value: string) => void
}
