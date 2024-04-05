'use client';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';
import BannerImg from '@/assets/images/avrast/component/klaim-header/header-image.svg';

interface IHeader {
  menu: {label:string,href:string}[];
  title: string;
  bannerImageSrc?: string;
}

export const Header: React.FC<IHeader> = (props) => {
  const { menu, title, bannerImageSrc = BannerImg } = props;
  return (
    <div className="flex w-full">
      <div className="w-full md:h-[300px] xs:h-[200px] shadow-lg flex md:items-center xs:items-start justify-center relative">
        <Image
          className="bg-purple_dark w-full absolute top-0 object-top"
          src={bannerImageSrc}
          alt="banner-img"
          layout="fill"
          objectFit="cover"
          object-position="center"
        />
        <div className="w-full h-full mx-auto max-w-[100rem] px-8 flex md:justify-between md:justify-center xs:justify-start md:items-center items-start absolute flex-col md:flex-row flex-wrap gap-4">
          <h2 className="font-light text-[48px] md:block xs:hidden text-white">
            {title}
          </h2>
          <div className="flex flex-row divide-x gap-2 text-center h-5 text-white text-base flex-wrap md:mt-0 xs:mt-10">
            <p className="md:px-2">Beranda</p>
            {menu.map((i, index) => (
              <Link
                key={i.label}
                href={i.href}
                className={`px-2 ${menu.length === index + 1 ? 'font-semibold' : ''}`}
              >
                {i.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
