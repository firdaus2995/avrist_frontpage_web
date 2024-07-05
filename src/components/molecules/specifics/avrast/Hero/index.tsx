'use client';

import React, { ReactNode } from 'react';
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
  customComponent?: ReactNode;
}

const Hero: React.FC<IHero> = ({
  title,
  breadcrumbsData,
  bottomImage,
  imageUrl,
  customClassName,
  customComponent
}) => {
  return (
    <div
      className={`${customClassName} relative w-full md:auto z-0 overflow-hidden ${bottomImage ? 'h-[26.25rem] sm:h-[38.5rem]' : 'xs:h-[9.375rem] md:h-[18.75rem]'}`}
    >
      <div className="w-full flex items-center">
        <div
          className={`w-full flex sm:flex-row xs:flex-row-reverse justify-between px-[2rem] md:px-[8.5rem] items-center xs:pt-[2.5rem] md:pt-[3.75rem]`}
        >
          <div className="line-clamp-1">
            <p className="hidden sm:block font-karla text-white text-[1.125rem] sm:text-[3rem] font-light">
              {title}
            </p>
          </div>

          <span className="flex flex-row gap-2">
            {breadcrumbsData.map((item, index) => (
              <React.Fragment key={index}>
                <Link
                  href={item.href}
                  className={`line-clamp-1 font-opensans text-white text-[1.125rem] ${index === breadcrumbsData.length - 1 ? 'font-bold cursor-default' : ''}`}
                >
                  {item.title}
                </Link>
                {index < breadcrumbsData.length - 1 && (
                  <span className="w-[0.063rem] h-auto bg-[#AA95B4]" />
                )}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
      <Image
        className={`-z-[2] w-full top-0 absolute object-cover object-bottom ${bottomImage ? 'h-[9.375rem] sm:h-[17.5rem]' : 'md:h-[15.625rem] xs:h-[150px]'}`}
        alt="Avrist"
        src={imageUrl ?? HERO_IMAGE}
        width={0}
        height={0}
      />
      {bottomImage && (
        <div className="-z-[1] w-full top-[6.25rem] sm:top-[12.5rem] absolute h-[50vh]">
          <Image
            className="rounded-t-3xl md:rounded-t-[3.75rem] w-full h-full object-cover"
            alt="gambar-produk-individu"
            width={0}
            height={0}
            src={bottomImage}
          />
        </div>
      )}
      {customComponent && (
        <div className="w-full top-[12.5rem] absolute">{customComponent}</div>
      )}
    </div>
  );
};

export default Hero;
