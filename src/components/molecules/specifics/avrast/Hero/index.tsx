'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HERO_IMAGE from '@/assets/images/hero-image.svg';

interface IHero {
  title: string;
  breadcrumbsData: {
    title: string;
    href: string;
  }[];
  bottomImage?: any;
}

const Hero: React.FC<IHero> = ({ title, breadcrumbsData, bottomImage }) => {
  const pathname = usePathname();
  return (
    <div className={`relative w-full md:auto z-0 overflow-hidden ${bottomImage ? 'h-[840px]' : 'h-[200px]'}`}>
      <div className="w-full flex items-center">
        <div className={`w-full flex flex-row justify-between px-20 md:px-40 xl:px-60 items-center ${bottomImage ? 'pt-[70px]' : 'pt-[50px]'}`}>
          <p className="font-karla text-white text-[48px] font-light">
            {title}
          </p>
          <span className="flex flex-row gap-2">
            {breadcrumbsData.map((item, index) => (
              <>
                <Link
                  href={item.href}
                  className={`font-opensans text-white ${pathname === item.href ? 'font-bold' : ''}`}
                >
                  {item.title}
                </Link>
                {index < breadcrumbsData.length - 1 && (
                  <span className="w-[1px] h-auto bg-[#AA95B4]" />
                )}
              </>
            ))}
          </span>
        </div>
      </div>
      <Image className={`-z-[2] w-full top-0 absolute object-cover ${bottomImage ? 'h-[280px]' : 'h-[200px]'}`} alt="Avrist" src={HERO_IMAGE} />
      {
        bottomImage && (
          <div className='-z-[1] w-full top-[200px] absolute'>
            <Image className="rounded-t-[60px] w-full object-cover h-[640px]" alt="gambar-produk-individu" src={bottomImage} />
          </div>
        )
      }
    </div>
  );
};

export default Hero;
