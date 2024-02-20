'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import BannerImg from '@/assets/images/banner-img.svg';

interface IDetailHeader {
  title: string;
}

const DetailHeader: React.FC<IDetailHeader> = ({
  title
}) => {
  return (
    <div className="flex w-full">
      <div className="w-full h-[200px] bg-purple_dark shadow-lg flex md:items-center xs:items-start justify-center relative">
        <Image
          className="bg-purple_dark md:w-[25%] xs:w-full absolute bottom-0"
          src={BannerImg}
          alt="banner-img"
        />
        <div className="w-full md:px-32 xs:px-2 p-2 flex justify-between items-center absolute">
          <div className="md:text-[48px] xs:text-[18px] text-white">{title}</div>
          <div className="flex flex-row divide-x text-center h-5 text-white text-xs">
            <div className='px-2'>Beranda</div>
            <div className='px-2 font-semibold'>{title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeader;
