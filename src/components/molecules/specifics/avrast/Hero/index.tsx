'use client';

import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';

import HERO_IMAGE from '@/assets/images/hero-image.svg';

interface IHero {
  title: string;
  breadcrumbsData: {
    title: string;
    href: string;
  }[];
  bottomImage?: StaticImport | string;
  imageUrl?: string;
  customClassName?: string;
}

const Hero: React.FC<IHero> = ({
  title,
  breadcrumbsData,
  bottomImage,
  imageUrl,
  customClassName
}) => {
  return (
    <div
      className={`${customClassName} relative w-full md:auto z-0 overflow-hidden ${bottomImage ? 'h-[740px] sm:h-[840px]' : 'xs:h-[250px] md:h-[300px]'}`}
    >
      <div className="w-full flex items-center">
        <div
          className={`w-full flex flex-row justify-between px-[2rem] md:px-[8.5rem] items-center ${bottomImage ? 'pt-[40px] sm:pt-[70px]' : 'xs:pt-[60px] md:pt-[50px]'}`}
        >
          <div className="line-clamp-1">
            <p className="hidden sm:block font-karla text-white text-[18px] sm:text-[48px] font-light">
              {title}
            </p>
          </div>

          <span className="flex flex-row gap-2">
            {breadcrumbsData.map((item, index) => (
              <React.Fragment key={index}>
                <Link
                  href={item.href}
                  className={`font-opensans text-white text-[18px] ${index === breadcrumbsData.length - 1 ? 'font-bold line-clamp-1' : ''}`}
                >
                  {item.title}
                </Link>
                {index < breadcrumbsData.length - 1 && (
                  <span className="w-[1px] h-auto bg-[#AA95B4]" />
                )}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
      <Image
        className={`-z-[2] w-full top-0 absolute object-cover object-bottom ${bottomImage ? 'h-[150px] sm:h-[280px]' : 'lg:h-[250px] xs:h-[150px]'}`}
        alt="Avrist"
        src={imageUrl ?? HERO_IMAGE}
        width={100}
        height={100}
      />
      {bottomImage && (
        <div className="-z-[1] w-full top-[100px] sm:top-[200px] absolute">
          <Image
            className="rounded-t-[60px] w-full object-cover h-[640px] xs:max-md:object-cover"
            alt="gambar-produk-individu"
            width={100}
            height={100}
            src={bottomImage}
          />
        </div>
      )}
    </div>
  );
};

export default Hero;
